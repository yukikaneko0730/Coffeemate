// src/pages/MessagesPage.tsx
// src/pages/MessagesPage.tsx
import { useState, useEffect, useRef } from "react";

import {
  MOCK_USERS,
  CURRENT_USER,
  type UserWithPosts,
} from "../mocks/mockUsers";
import "../styles/MessagesPage.css";

type Chat = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string; // "HH:MM"
  unreadCount?: number;
};

type Message = {
  id: number;
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

// Convert "HH:MM" to minutes to sort by time (descending)
const parseTimeToMinutes = (time: string): number => {
  const [h, m] = time.split(":").map((v) => Number(v));
  if (Number.isNaN(h) || Number.isNaN(m)) return 0;
  return h * 60 + m;
};

// Build chat list (HQ + Mia's coffeemates)
const buildChatsFromMock = (currentUser: UserWithPosts): Chat[] => {
  const currentProfile = currentUser.profile;

  // Coffeemates HQ
  const hq = MOCK_USERS.find((u) => u.profile.id === "user_hq");
  const hqChat: Chat | null = hq
    ? {
        id: hq.profile.id,
        name: hq.profile.name,
        avatar: hq.profile.avatarUrl ?? "/profiphoto/coffeemates.png",
        lastMessage: "Welcome back, Mia. New coffeemates are waiting ☕️",
        time: "19:48",
        unreadCount: 1,
      }
    : null;

  // Friends based on coffeemateIds
  const friendIds = currentProfile.coffeemateIds ?? [];
  const friendUsers = MOCK_USERS.filter((u) =>
    friendIds.includes(u.profile.id)
  );

  // Static meta for now
  const friendMeta: Record<string, { lastMessage: string; time: string }> = {
    user_marie: {
      lastMessage: "Next time let’s try a new spot in Neukölln.",
      time: "19:10",
    },
    user_alex: {
      lastMessage: "Just brewed an insane Ethiopian, you’d love it.",
      time: "18:52",
    },
  };

  const friendChats: Chat[] = friendUsers.map((u) => {
    const meta =
      friendMeta[u.profile.id] ?? {
        lastMessage: "Hi! How’s your day going? ☕️",
        time: "18:00",
      };

    return {
      id: u.profile.id,
      name: u.profile.name,
      avatar: u.profile.avatarUrl ?? "/profiphoto/default.png",
      lastMessage: meta.lastMessage,
      time: meta.time,
    };
  });

  // Sort friends by time (newest first)
  friendChats.sort(
    (a, b) => parseTimeToMinutes(b.time) - parseTimeToMinutes(a.time)
  );

  if (hqChat) {
    return [hqChat, ...friendChats];
  }
  return friendChats;
};

export default function MessagesPage() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>("user_hq");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const currentUser = CURRENT_USER; // Mia for now
  const chats = buildChatsFromMock(currentUser);

  const sortedChats = chats; // already sorted
  const filteredChats = sortedChats.filter((chat) =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedChat =
    sortedChats.find((c) => c.id === selectedChatId) ?? sortedChats[0];

  // Set dummy messages based on selected chat
  useEffect(() => {
    if (!selectedChatId) return;

    if (selectedChatId === "user_hq") {
      setMessages([
        {
          id: 1,
          sender: "them",
          text: "Welcome to Coffeemates ☕️ Let’s discover cozy cafés together.",
          time: "19:40",
          read: true,
        },
        {
          id: 2,
          sender: "me",
          text: "Hi HQ! Any new spots I should try this week?",
          time: "19:45",
          read: true,
        },
        {
          id: 3,
          sender: "them",
          text: "Check your feed – some coffeemates just posted great places in Neukölln ✨",
          time: "19:48",
          read: true,
        },
      ]);
    } else if (selectedChatId === "user_marie") {
      setMessages([
        {
          id: 1,
          sender: "them",
          text: "Found a new flat white place near your area!",
          time: "19:02",
          read: true,
        },
        {
          id: 2,
          sender: "me",
          text: "Send me the pin please ☕️",
          time: "19:05",
          read: true,
        },
      ]);
    } else if (selectedChatId === "user_alex") {
      setMessages([
        {
          id: 1,
          sender: "them",
          text: "Next time you’re in Hamburg, I’ll make you a V60.",
          time: "18:50",
          read: true,
        },
        {
          id: 2,
          sender: "me",
          text: "Deal. I’ll bring the beans.",
          time: "18:52",
          read: true,
        },
      ]);
    } else {
      setMessages([
        {
          id: 1,
          sender: "them",
          text: "Hi! How’s your day going? ☕️",
          time: "16:05",
          read: true,
        },
      ]);
    }
  }, [selectedChatId]);

  // Scroll to the bottom when messages or preview change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, preview]);

  const handleSend = () => {
    if (!newMessage && !preview) return;

    const msg: Message = {
      id: Date.now(),
      sender: "me",
      text: newMessage || undefined,
      imageUrl: preview || undefined,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      read: false,
    };

    setMessages((prev) => [...prev, msg]);
    setNewMessage("");
    setPreview(null);
    setShowEmojiPicker(false);

    // Simulate read status after a short delay
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, read: true } : m))
      );
    }, 1500);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="cm-chat-page">
      {/* Middle: current user card + chat list */}
      <section className="cm-chat-list-panel">
        {/* Logged-in user card (Mia for now) */}
        <header className="cm-user-card">
          <div className="cm-user-card__info">
            <span className="cm-user-card__hello">Hello</span>
            <span className="cm-user-card__name">
              {currentUser.profile.name}
            </span>
          </div>
          <img
            src={
              currentUser.profile.avatarUrl ?? "/profiphoto/default-profile.png"
            }
            alt={currentUser.profile.name}
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

        {/* Chat list (HQ + friends) */}
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
                  {chat.unreadCount && (
                    <span className="cm-chat-list-item__badge">
                      {chat.unreadCount}
                    </span>
                  )}
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

        {/* Date label */}
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

          <button className="cm-send-button" type="button" onClick={handleSend}>
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
