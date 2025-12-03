// src/components/SuggestionCard.tsx
import React from "react";
import type { Cafe } from "../types/cafe";
import "../styles/SuggestionCard.css";

type SuggestionCardProps = {
  cafe: Cafe;
};

const SuggestionCard: React.FC<SuggestionCardProps> = ({ cafe }) => {
  const {
    name,
    addressLine,
    walkMinutes,
    isOpen,
    tagline,
    tags,
    imageUrl,
  } = cafe;

  const handleOpenMap = () => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${name} ${addressLine}`
    )}`;

    window.open(mapsUrl, "_blank", "noopener,noreferrer");
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLElement> = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleOpenMap();
    }
  };

  return (
    <article
      className="suggestion-card"
      onClick={handleOpenMap}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Open ${name} in Google Maps`}
    >
      <div className="suggestion-card__media-wrapper">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="suggestion-card__image" />
        ) : (
          <div className="suggestion-card__image suggestion-card__image--placeholder" />
        )}

        {/* Y bubble */}
        <div className="suggestion-card__bubble">
          <span className="suggestion-card__bubble-text">Y</span>
        </div>
      </div>

      <div className="suggestion-card__body">
        <h3 className="suggestion-card__name">{name}</h3>

        <p className="suggestion-card__meta">
          {addressLine}
          <br />
          {walkMinutes} min walk · {isOpen ? "Open now" : "Closed"}
        </p>

        {tagline && <p className="suggestion-card__tagline">{tagline}</p>}

        {tags && tags.length > 0 && (
          <div className="suggestion-card__tags">
            {tags.map((tag) => (
              <span key={tag} className="suggestion-card__tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

export default SuggestionCard;
