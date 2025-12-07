// src/components/CreatePostModal.tsx
import React, { useState } from "react";
import type { CreatePostFormValues } from "../types/postForm";
import "../styles/PostCreatePage.css";

type CreatePostModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: CreatePostFormValues) => Promise<void> | void;
};

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [cafeName, setCafeName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState("4.5");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !submitting) {
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const parsedRating = Number(rating);
    if (Number.isNaN(parsedRating) || parsedRating < 0 || parsedRating > 5) {
      setError("Rating must be between 0 and 5.");
      return;
    }
    if (!cafeName.trim()) {
      setError("Please enter a café name.");
      return;
    }
    if (!text.trim()) {
      setError("Please write something about the coffee.");
      return;
    }

    const values: CreatePostFormValues = {
      cafeName: cafeName.trim(),
      text: text.trim(),
      rating: parsedRating,
    };

    try {
      setSubmitting(true);
      await onSubmit(values);

      // reset fields after success
      setCafeName("");
      setText("");
      setRating("4.5");
      onClose();
    } catch (err) {
      console.error(err);
      setError("Could not publish your post. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="cp-modal-backdrop" onClick={handleOverlayClick}>
      <div className="cp-modal">
        <header className="cp-modal__header">
          <h2 className="cp-modal__title">New Coffeemates post</h2>
          <button
            type="button"
            className="cp-modal__close"
            onClick={onClose}
            disabled={submitting}
          >
            ×
          </button>
        </header>

        <form className="cp-modal__form" onSubmit={handleSubmit}>
          <label className="cp-field">
            <span className="cp-field__label">Café name</span>
            <input
              className="cp-input"
              value={cafeName}
              onChange={(e) => setCafeName(e.target.value)}
              placeholder="Never Ending Love Story"
              disabled={submitting}
            />
          </label>

          <label className="cp-field">
            <span className="cp-field__label">Your thoughts</span>
            <textarea
              className="cp-textarea"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="How was the coffee, the vibe, the seats, the music..."
              rows={4}
              disabled={submitting}
            />
          </label>

          <label className="cp-field cp-field--inline">
            <span className="cp-field__label">Rating</span>
            <input
              className="cp-input cp-input--small"
              type="number"
              min={0}
              max={5}
              step={0.1}
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              disabled={submitting}
            />
            <span className="cp-field__hint">0–5</span>
          </label>

          {error && <p className="cp-error">{error}</p>}

          <footer className="cp-modal__footer">
            <button
              type="button"
              className="cp-btn cp-btn--ghost"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cp-btn cp-btn--primary"
              disabled={submitting}
            >
              {submitting ? "Publishing..." : "Publish"}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
