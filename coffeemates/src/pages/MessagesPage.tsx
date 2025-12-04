// src/pages/MessagesPage.tsx
import React from "react";
import "../styles/MessagesPage.css";

const MessagesPage: React.FC = () => {
  return (
    <div className="messages-layout">
      {/* Left side inside the content area: conversation list */}
      <section className="messages-list">
        <h2 className="messages-list__title">Messages</h2>

        {/* Later: show real conversations here */}
        <p className="messages-list__empty">
          You don’t have any conversations yet.
        </p>
      </section>

      {/* Right side: selected conversation */}
      <section className="messages-detail">
        <div className="messages-detail__empty">
          <h3 className="messages-detail__empty-title">Select a conversation</h3>
          <p className="messages-detail__empty-text">
            When you start chatting, your messages will appear here.
          </p>
        </div>
      </section>
    </div>
  );
};

export default MessagesPage;
