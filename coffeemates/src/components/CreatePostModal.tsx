// src/components/CreatePostModal.tsx
import React, { useState, useEffect } from "react";
import PlaceAutocompleteInput from "./PlaceAutocompleteInput";
import type { CreatePostFormValues } from "../types/postForm";
import "../styles/CreatePostModal.css";


type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: CreatePostFormValues) => Promise<void> | void;
};

const CreatePostModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [googlePlaceId, setGooglePlaceId] = useState("");
  const [cafeName, setCafeName] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [text, setText] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // reset when modal opens/closes
  useEffect(() => {
    if (!isOpen) return;
    setTitle("");
    setLocationInput("");
    setGooglePlaceId("");
    setCafeName("");
    setUserRating(0);
    setText("");
    setImageFile(null);
    setIsSubmitting(false);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStarClick = (value: number) => {
    setUserRating(value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // close only when clicking on backdrop, not inside the card
    if (e.target === e.currentTarget && !isSubmitting) {
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!googlePlaceId) {
      alert("Please select a location from suggestions.");
      return;
    }
    if (!title.trim()) {
      alert("Please enter a title.");
      return;
    }

    setIsSubmitting(true);

    const values: CreatePostFormValues = {
      title: title.trim(),
      text: text.trim(),
      userRating,
      googlePlaceId,
      cafeName,
      imageFile,
    };

    try {
      await onSubmit(values);
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to create post.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-card">
        <button
          className="modal-card__close"
          onClick={onClose}
          type="button"
          disabled={isSubmitting}
        >
          ✕
        </button>

        <h2 className="modal-card__title">create new post</h2>

        <form className="modal-card__form" onSubmit={handleSubmit}>
          <div className="modal-card__content">
            {/* Left: image upload */}
            <div className="modal-card__left">
              <label className="upload-box">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  hidden
                />
                <div className="upload-box__inner">
                  <div className="upload-box__icon">🖼</div>
                  <div className="upload-box__text">
                    Drag photos and videos here
                    <br />
                    or click to upload
                  </div>
                  {imageFile && (
                    <div className="upload-box__filename">
                      {imageFile.name}
                    </div>
                  )}
                </div>
              </label>
            </div>

            {/* Right: form fields */}
            <div className="modal-card__right">
              <label className="modal-field">
                <span className="modal-field__label">Title</span>
                <input
                  className="modal-field__input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Cafe Berlin with Marie"
                />
              </label>

              <label className="modal-field">
                <span className="modal-field__label">Location</span>
                <PlaceAutocompleteInput
                  value={locationInput}
                  onChange={setLocationInput}
                  onSelectPlace={(place) => {
                    setGooglePlaceId(place.placeId);
                    setCafeName(place.description);
                  }}
                />
              </label>

              <div className="modal-field">
                <span className="modal-field__label">Stars</span>
                <div className="modal-stars">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <button
                      key={i}
                      type="button"
                      className={
                        "modal-stars__star" +
                        (userRating >= i ? " modal-stars__star--active" : "")
                      }
                      onClick={() => handleStarClick(i)}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <label className="modal-field">
                <span className="modal-field__label">Memo</span>
                <textarea
                  className="modal-field__textarea"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={5}
                  placeholder="Write your thoughts about this cafe..."
                />
              </label>
            </div>
          </div>

          <div className="modal-card__footer">
            <button
              type="submit"
              className="modal-card__submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
