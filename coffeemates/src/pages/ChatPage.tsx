// src/pages/ChatPage.tsx
import React, { useState } from "react";

type Message = {
  id: string;
  fromMe: boolean;
  text: string;
};

const initialMessages: Message[] = [
  { id: "1", fromMe: false, text: "Hi, coffee tomorrow?" },
  { id: "2", fromMe: true, text: "Yes! 11:00 at Neukölln." },
];

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: Message = {
      id: crypto.randomUUID(),
      fromMe: true,
      text: input.trim(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  return (
    <div className="chat-page">
      <header className="chat-header">
        <div className="chat-header__avatar" />
        <div>
          <h1>Yuki</h1>
          <p>online</p>
        </div>
      </header>

      <div className="chat-messages">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`chat-message ${m.fromMe ? "chat-message--me" : ""}`}
          >
            <p>{m.text}</p>
          </div>
        ))}
      </div>

      <form className="chat-input" onSubmit={handleSend}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message…"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatPage;
