// src/components/CoffeematesModal.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/ProfilePage.css";

export type CoffeemateUser = {
  id: string;
  handle: string;
  avatarUrl?: string;
};

type CoffeematesModalProps = {
  isOpen: boolean;
  coffeemates: CoffeemateUser[];
  isOwnProfile: boolean;
  onClose: () => void;
  onRemoveCoffeemate?: (id: string) => void; // called after confirmed delete
};

const CoffeematesModal: React.FC<CoffeematesModalProps> = ({
  isOpen,
  coffeemates,
  isOwnProfile,
  onClose,
  onRemoveCoffeemate,
}) => {
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAskDelete = (id: string) => {
    setPendingDeleteId(id);
  };

  const handleCancelDelete = () => {
    setPendingDeleteId(null);
  };

  const handleConfirmDelete = () => {
    if (!pendingDeleteId) return;
    onRemoveCoffeemate?.(pendingDeleteId);
    setPendingDeleteId(null);
  };

  return (
    <div className="profile-coffeemates-overlay">
      <div className="profile-coffeemates-modal">
        {/* Close button */}
        <button
          type="button"
          className="profile-coffeemates-close"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        <div className="profile-coffeemates-inner">
          {/* Left column: count + avatars */}
          <div className="profile-coffeemates-left">
            <div className="profile-coffeemates-title">Coffeemates</div>
            <div className="profile-coffeemates-count">
              {coffeemates.length}
            </div>

            <ul className="profile-coffeemates-avatars">
              {coffeemates.map((mate) => (
                <li key={mate.id} className="profile-coffeemates-avatar">
                  {mate.avatarUrl ? (
                    <img
                      src={mate.avatarUrl}
                      alt={mate.handle}
                      className="profile-coffeemates-avatar-img"
                    />
                  ) : (
                    <div className="profile-coffeemates-avatar-placeholder" />
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Right column: handles list */}
          <div className="profile-coffeemates-right">
            {coffeemates.length === 0 ? (
              <div className="profile-coffeemates-empty">
                You don&apos;t have any Coffeemates yet ☕
              </div>
            ) : (
              <ul className="profile-coffeemates-list">
                {coffeemates.map((mate) => (
                  <li key={mate.id} className="profile-coffeemates-row">
                    <Link
                      to={`/user/${mate.id}`}
                      className="profile-coffeemates-handle"
                    >
                      {mate.handle}
                    </Link>

                    {isOwnProfile && (
                      <button
                        type="button"
                        className="profile-coffeemates-delete"
                        onClick={() => handleAskDelete(mate.id)}
                        aria-label="Remove coffeemate"
                      >
                        ✕
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Confirm delete dialog */}
        {pendingDeleteId && (
          <div className="profile-coffeemates-confirm">
            <p className="profile-coffeemates-confirm-text">
              Do you really want to delete this Account?
            </p>
            <div className="profile-coffeemates-confirm-actions">
              <button
                type="button"
                className="profile-coffeemates-btn profile-coffeemates-btn--cancel"
                onClick={handleCancelDelete}
              >
                No
              </button>
              <button
                type="button"
                className="profile-coffeemates-btn profile-coffeemates-btn--danger"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoffeematesModal;
