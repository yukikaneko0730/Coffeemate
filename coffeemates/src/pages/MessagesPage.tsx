// src/pages/MessagesPage.tsx
import { useState, useEffect, useRef } from "react";
import "../styles/MessagesPage.css";

import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

import { CURRENT_USER } from "../mocks/mockUsers";
import hqIcon from "../photo/coffeemateicon.png";

type Chat = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string; // "HH:MM"
  unreadCount?: number;
  isHQ?: boolean;
};

type Message = {
  id: string;
  sender: "me" | "them";
  text?: string;
  imageUrl?: string;
  time: string;
  read?: boolean;
};

const EMOJI_OPTIONS = ["😊", "😂", "👍", "☕️", "❤️", "🎉"];

type IconProps = {
  symbol: string;
  size?: number;
  className?: string;
};

const Icon = ({ symbol, size = 16, className }: IconProps) => (
  <span
    aria-hidden="true"
    className={className}
    style={{ fontSize: size, lineHeight: 1 }}
  >
    {symbol}
  </span>
);

// Format Date -> "HH:MM" for UI
const formatTime = (date: Date | null): string => {
  if (!date) return "";
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

// Coffeemates HQ constants
const HQ_USER_ID = "OkfA8JuCtZOjZmvtvGkIexDHzy13";
const HQ_DEFAULT_WELCOME =
  "Welcome to Coffeemates ☕ Let’s discover cozy cafés together.";

export default function MessagesPage() {
  const { user, loading: authLoading } = useAuth();
  const currentUserProfile = CURRENT_USER.profile; // still using mock profile for name/avatar

  const [chatList, setChatList] = useState<Chat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // ==============================
  // Ensure HQ chat exists for this user
  // ==============================
  useEffect(() => {
    if (!user) return;

    const ensureHQChat = async () => {
      const chatId = `hq-${user.uid}`;
      const chatRef = doc(db, "chats", chatId);
      const snap = await getDoc(chatRef);

      if (!snap.exists()) {
        // Create a personal 1:1 chat with HQ for this user
        await setDoc(chatRef, {
          members: [user.uid, HQ_USER_ID],
          memberDisplayNames: {
            [user.uid]: currentUserProfile.name,
            [HQ_USER_ID]: "Coffeemates HQ",
          },
          memberAvatars: {
            [user.uid]:
              currentUserProfile.avatarUrl ??
              "/profiphoto/default-profile.png",
            [HQ_USER_ID]: hqIcon,
          },
          lastMessage: HQ_DEFAULT_WELCOME,
          lastMessageAt: serverTimestamp(),
          unreadCounts: {
            [user.uid]: 0,
          },
          isHQ: true,
        });
      }
    };

    void ensureHQChat();
  }, [user, currentUserProfile.name, currentUserProfile.avatarUrl]);

  // ==============================
  // Subscribe to chats for current user
  // ==============================
  useEffect(() => {
    if (!user) return;

    // Expected chat document shape:
    // {
    //   members: string[];
    //   memberDisplayNames: { [uid: string]: string };
    //   memberAvatars: { [uid: string]: string };
    //   lastMessage: string;
    //   lastMessageAt: Timestamp;
    //   unreadCounts: { [uid: string]: number };
    //   isHQ?: boolean;
    // }
    const qChats = query(
      collection(db, "chats"),
      where("members", "array-contains", user.uid),
      orderBy("lastMessageAt", "desc")
    );

    const unsub = onSnapshot(qChats, (snap) => {
      const rawList: Chat[] = snap.docs.map((d) => {
        const data = d.data() as any;
        const members: string[] = data.members ?? [];

        // Pick "other" person for 1:1 chat display
        const otherId =
          members.find((m) => m !== user.uid) ?? HQ_USER_ID; // fallback

        const nameFromDoc =
          data.memberDisplayNames?.[otherId] ??
          data.title ??
          "Coffeemate chat";
        const avatarFromDoc =
          data.memberAvatars?.[otherId] ?? "/profiphoto/default.png";

        const lastDate = data.lastMessageAt?.toDate
          ? data.lastMessageAt.toDate()
          : null;

        const unreadCount =
          data.unreadCounts?.[user.uid] !== undefined
            ? data.unreadCounts[user.uid]
            : undefined;

        const isHQ = !!data.isHQ || d.id.startsWith("hq-");

        return {
          id: d.id,
          name: isHQ ? "Coffeemates HQ" : nameFromDoc,
          avatar: isHQ ? hqIcon : avatarFromDoc,
          lastMessage: data.lastMessage ?? "",
          time: formatTime(lastDate),
          unreadCount,
          isHQ,
        };
      });

      // Pin HQ chat(s) at top, keep the rest in Firestore order
      const hqChats = rawList.filter((c) => c.isHQ);
      const otherChats = rawList.filter((c) => !c.isHQ);

      const ordered = [...hqChats, ...otherChats];

      setChatList(ordered);

      // If nothing selected yet, select the first chat (HQ will be first)
      if (!selectedChatId && ordered.length > 0) {
        setSelectedChatId(ordered[0].id);
      }
    });

    return () => unsub();
  }, [user, selectedChatId]);

  // ==============================
  // Subscribe to messages for selected chat
  // ==============================
  useEffect(() => {
    if (!user || !selectedChatId) return;

    // Expected message document shape:
    // {
    //   senderId: string;
    //   text?: string;
    //   imageUrl?: string;
    //   createdAt: Timestamp;
    //   readBy: string[];
    // }
    const messagesRef = collection(db, "chats", selectedChatId, "messages");
    const qMessages = query(messagesRef, orderBy("createdAt", "asc"));

    const unsub = onSnapshot(qMessages, (snap) => {
      const list: Message[] = snap.docs.map((d) => {
        const data = d.data() as any;
        const createdAt = data.createdAt?.toDate
          ? data.createdAt.toDate()
          : null;
        const readBy: string[] = data.readBy ?? [];

        const sender: "me" | "them" =
          data.senderId === user.uid ? "me" : "them";

        return {
          id: d.id,
          sender,
          text: data.text ?? undefined,
          imageUrl: data.imageUrl ?? undefined,
          time: formatTime(createdAt),
          read: readBy.includes(user.uid),
        };
      });

      setMessages(list);

      // Auto scroll
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    });

    return () => unsub();
  }, [user, selectedChatId]);

  // ==============================
  // Send message → Firestore
  // ==============================
  const handleSend = async () => {
    if (!user || !selectedChatId) return;
    if (!newMessage && !preview) return;

    const textToSend = newMessage.trim();

    try {
      // Add message to subcollection
      await addDoc(collection(db, "chats", selectedChatId, "messages"), {
        senderId: user.uid,
        text: textToSend || null,
        imageUrl: preview || null,
        createdAt: serverTimestamp(),
        readBy: [user.uid], // sender has already read it
      });

      // Update chat summary fields
      await setDoc(
        doc(db, "chats", selectedChatId),
        {
          lastMessage: textToSend || (preview ? "Photo" : ""),
          lastMessageAt: serverTimestamp(),
          lastSenderId: user.uid,
          // unreadCounts update would usually be done in Cloud Functions
        },
        { merge: true }
      );

      setNewMessage("");
      setPreview(null);
      setShowEmojiPicker(false);
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  // ==============================
  // Derived data
  // ==============================
  const filteredChats = chatList.filter((chat) =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedChat =
    chatList.find((c) => c.id === selectedChatId) ?? chatList[0];

  // ==============================
  // Loading / no-auth states
  // ==============================
  if (authLoading) {
    return (
      <div className="cm-chat-page cm-chat-page--center">
        <p>Loading messages...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="cm-chat-page cm-chat-page--center">
        <p>Please log in to view your messages.</p>
      </div>
    );
  }

  // If there are no chats yet, show a friendly empty state
  if (!selectedChat) {
    return (
      <div className="cm-chat-page">
        <section className="cm-chat-list-panel">
          <header className="cm-user-card">
            <div className="cm-user-card__info">
              <span className="cm-user-card__hello">Hello</span>
              <span className="cm-user-card__name">
                {currentUserProfile.name}
              </span>
            </div>
            <img
              src={
                currentUserProfile.avatarUrl ??
                "/profiphoto/default-profile.png"
              }
              alt={currentUserProfile.name}
              width={40}
              height={40}
              className="cm-user-card__avatar"
            />
          </header>

          <div className="cm-chat-search">
            <Icon symbol="🔍" size={16} className="cm-chat-search__icon" />
            <input
              className="cm-chat-search__input"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="cm-chat-list cm-chat-list--empty">
            <p className="cm-chat-empty-text">
              No chats yet. Start a conversation from a profile or post.
            </p>
          </div>
        </section>

        <section className="cm-chat-window cm-chat-window--empty">
          <div className="cm-chat-window-empty-message">
            <p>Select a coffeemate to start chatting ☕</p>
          </div>
        </section>
      </div>
    );
  }

  // ==============================
  // Main UI
  // ==============================
  return (
    <div className="cm-chat-page">
      {/* Left: current user card + chat list */}
      <section className="cm-chat-list-panel">
        {/* Logged-in user card */}
        <header className="cm-user-card">
          <div className="cm-user-card__info">
            <span className="cm-user-card__hello">Hello</span>
            <span className="cm-user-card__name">
              {currentUserProfile.name}
            </span>
          </div>
          <img
            src={
              currentUserProfile.avatarUrl ?? "/profiphoto/default-profile.png"
            }
            alt={currentUserProfile.name}
            width={40}
            height={40}
            className="cm-user-card__avatar"
          />
        </header>

        {/* Search in chats */}
        <div className="cm-chat-search">
          <Icon symbol="🔍" size={16} className="cm-chat-search__icon" />
          <input
            className="cm-chat-search__input"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Chat list (HQ is always first because of isHQ) */}
        <div className="cm-chat-list">
          {filteredChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChatId(chat.id)}
              className={
                "cm-chat-list-item" +
                (chat.id === selectedChatId ? " cm-chat-list-item--active" : "")
              }
            >
              <img
                src={chat.avatar}
                alt={chat.name}
                width={36}
                height={36}
                className="cm-chat-list-item__avatar"
              />
              <div className="cm-chat-list-item__main">
                <div className="cm-chat-list-item__row">
                  <span className="cm-chat-list-item__name">{chat.name}</span>
                  <span className="cm-chat-list-item__time">{chat.time}</span>
                </div>
                <div className="cm-chat-list-item__row">
                  <span className="cm-chat-list-item__last">
                    {chat.lastMessage}
                  </span>
                  {chat.unreadCount ? (
                    <span className="cm-chat-list-item__badge">
                      {chat.unreadCount}
                    </span>
                  ) : null}
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Right: chat window */}
      <section className="cm-chat-window">
        {/* Chat header */}
        <header className="cm-chat-header">
          <div className="cm-chat-header__left">
            <img
              src={selectedChat.avatar}
              alt={selectedChat.name}
              width={36}
              height={36}
              className="cm-chat-header__avatar"
            />
            <div>
              <p className="cm-chat-header__name">{selectedChat.name}</p>
              <p className="cm-chat-header__status">last seen 5 mins ago</p>
            </div>
          </div>
          <div className="cm-chat-header__actions">
            <button className="cm-icon-button" aria-label="Search in chat">
              <Icon symbol="🔍" size={18} />
            </button>
            <button className="cm-icon-button" aria-label="Call">
              <Icon symbol="📞" size={18} />
            </button>
            <button className="cm-icon-button" aria-label="Video call">
              <Icon symbol="📹" size={18} />
            </button>
            <button className="cm-icon-button" aria-label="More">
              <Icon symbol="⋯" size={18} />
            </button>
          </div>
        </header>

        {/* Date label (simple for now) */}
        <div className="cm-chat-date-label">Today</div>

        {/* Messages */}
        <div className="cm-chat-messages">
          {messages.map((m) => (
            <div
              key={m.id}
              className={
                "cm-message-row " +
                (m.sender === "me"
                  ? "cm-message-row--me"
                  : "cm-message-row--them")
              }
            >
              <div
                className={
                  "cm-message-bubble " +
                  (m.sender === "me"
                    ? "cm-message-bubble--me"
                    : "cm-message-bubble--them")
                }
              >
                {m.text && <p className="cm-message-text">{m.text}</p>}
                {m.imageUrl && (
                  <img
                    src={m.imageUrl}
                    alt="sent"
                    className="cm-message-image"
                    onClick={() => setPreview(m.imageUrl!)}
                  />
                )}
                <div className="cm-message-meta">
                  <span className="cm-message-time">{m.time}</span>
                  {m.sender === "me" && m.read && (
                    <Icon symbol="✓" size={14} className="cm-message-check" />
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input bar */}
        <footer className="cm-chat-input-bar">
          <div className="cm-chat-input-bar__left">
            <button
              className="cm-icon-button"
              type="button"
              onClick={() => setShowEmojiPicker((v) => !v)}
            >
              <Icon symbol="😊" size={20} />
            </button>
            {showEmojiPicker && (
              <div className="cm-emoji-picker">
                {EMOJI_OPTIONS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    className="cm-emoji-button"
                    onClick={() => {
                      setNewMessage((prev) => prev + emoji);
                      setShowEmojiPicker(false);
                    }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
            <button
              className="cm-icon-button"
              type="button"
              onClick={() => fileInputRef.current?.click()}
            >
              <Icon symbol="🖼️" size={20} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="cm-file-input"
              onChange={handleImageSelect}
            />
          </div>

          <input
            className="cm-chat-input"
            placeholder="Message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />

          <button
            className="cm-send-button"
            type="button"
            onClick={handleSend}
          >
            ➤
          </button>
        </footer>
      </section>

      {/* Image modal */}
      {preview && (
        <div className="cm-image-modal" onClick={() => setPreview(null)}>
          <img src={preview} alt="preview" className="cm-image-modal__img" />
        </div>
      )}
    </div>
  );
}
