// src/components/FeedPostCard.tsx
import React, { useEffect, useState } from "react";
import type { FeedPost } from "../types/feedPost";

type FeedPostCardProps = {
  post: FeedPost;
  onDeleteComment?: (postId: string, commentId: string) => void;
  onOpenChat?: (post: FeedPost) => void;
  onOpenDirections?: (post: FeedPost) => void;
  onToggleSave?: (postId: string) => void;
  onShare?: (post: FeedPost) => void;
};

type GooglePlaceInfo = {
  name: string;
  rating: number;
  reviewCount: number;
  address: string;
  website?: string;
  isOpenNow?: boolean;
  googleMapsUrl?: string;
};

const FeedPostCard: React.FC<FeedPostCardProps> = ({
  post,
  onDeleteComment,
  onOpenChat,
  onOpenDirections,
  onToggleSave,
  onShare,
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(
    !!post.isLikedByCurrentUser
  );
  const [likeCount, setLikeCount] = useState<number>(post.likeCount ?? 0);

  const [placeInfo, setPlaceInfo] = useState<GooglePlaceInfo | null>(null);
  const [showAllComments, setShowAllComments] = useState(false);

  const visibleComments = showAllComments
    ? post.comments
    : post.comments.slice(0, 4);

  useEffect(() => {
    if (!post.googlePlaceId) return;

    const fetchPlace = async () => {
      try {
        const res = await fetch(`/api/places/${post.googlePlaceId}`);
        if (!res.ok) return;
        const data = await res.json();
        setPlaceInfo(data);
      } catch (error) {
        console.error("Failed to fetch place info", error);
      }
    };

    fetchPlace();
  }, [post.googlePlaceId]);

  const handleToggleLike = () => {
    setIsLiked((prev) => {
      const nextLiked = !prev;
      setLikeCount((prevCount) =>
        nextLiked ? prevCount + 1 : Math.max(0, prevCount - 1)
      );
      return nextLiked;
    });
  };

  const handleDeleteComment = (commentId: string) => {
    if (!onDeleteComment) return;
    onDeleteComment(post.id, commentId);
  };

  const handleToggleSave = () => {
    onToggleSave?.(post.id);
  };

  const handleOpenGoogle = () => {
    const url =
      placeInfo?.googleMapsUrl ||
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        placeInfo?.name || post.cafeName
      )}`;
    window.open(url, "_blank");
  };

  // rating from Google → fallback to post.rating
  const ratingNumber = placeInfo?.rating ?? post.rating ?? 0;

  return (
    <article className="feed-card">
      {/* ===== Header row ===== */}
      <header className="feed-card__header">
        <div className="feed-card__header-left">
          <div className="feed-card__avatar">
            {post.authorAvatarUrl ? (
              <img
                src={post.authorAvatarUrl}
                alt={post.authorName}
                className="feed-card__avatar-img"
              />
            ) : (
              <span className="feed-card__avatar-placeholder" />
            )}
          </div>
          <div className="feed-card__header-text">
            <span className="feed-card__author">{post.authorName}</span>
            <span className="feed-card__dot">·</span>
            {/* TODO: replace hard-coded time later */}
            <span className="feed-card__time">8h</span>
          </div>
        </div>

        <div className="feed-card__header-right">
          <button
            type="button"
            className={
              "feed-card__like-btn" +
              (isLiked ? " feed-card__like-btn--active" : "")
            }
            onClick={handleToggleLike}
          >
            <span className="feed-card__like-icon">♡</span>
            <span className="feed-card__like-count">{likeCount}</span>
          </button>

          <button
            type="button"
            className="feed-card__ghost-btn"
            onClick={() => onOpenChat?.(post)}
          >
            💬 Chat
          </button>

          <button
            type="button"
            className={
              "feed-card__ghost-btn" +
              (post.isSavedByCurrentUser
                ? " feed-card__ghost-btn--active"
                : "")
            }
            onClick={handleToggleSave}
          >
            🔖 Save
          </button>
        </div>
      </header>

      {/* ===== 3-column body ===== */}
      <div className="feed-card__body">
        {/* Left: photo / image placeholder */}
        <div className="feed-card__media" />

        {/* Middle column: cafe info (Google-powered block) */}
        <div
          className="feed-card__middle"
          onClick={handleOpenGoogle}
        >
          <h3 className="feed-card__cafe-name">
            {placeInfo?.name ?? post.cafeName}
          </h3>

          <div className="feed-card__rating-row">
            <span className="feed-card__rating-score">
              {ratingNumber.toFixed(1)}
            </span>
            <span className="feed-card__rating-stars">★★★★★</span>
            {placeInfo?.reviewCount && (
              <span className="feed-card__rating-count">
                ({placeInfo.reviewCount})
              </span>
            )}
          </div>

          <div className="feed-card__status-row">
            <span className="feed-card__status-dot" />
            <span className="feed-card__status-text">
              {placeInfo?.isOpenNow === undefined
                ? "Hours info not available"
                : placeInfo.isOpenNow
                ? "Open now"
                : "Closed"}
            </span>
          </div>

          <div className="feed-card__address-row">
            <span className="feed-card__address-icon">📍</span>
            <span className="feed-card__address-text">
              {placeInfo?.address ?? "Address info not available"}
            </span>
          </div>

          <div className="feed-card__button-row">
            <button
              className="feed-card__pill-btn"
              onClick={(e) => {
                e.stopPropagation();
                onOpenDirections?.(post);
              }}
            >
              Directions
            </button>
            <button
              className="feed-card__pill-btn"
              onClick={(e) => e.stopPropagation()}
            >
              Star
            </button>
            <button
              className="feed-card__pill-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleToggleSave();
              }}
            >
              Save
            </button>
            <button
              className="feed-card__pill-btn"
              onClick={(e) => {
                e.stopPropagation();
                onShare?.(post);
              }}
            >
              Share
            </button>
          </div>

          <div className="feed-card__popular">
            <div className="feed-card__popular-header">
              <span>Popular time: Mondays</span>
              <span className="feed-card__popular-arrow">›</span>
            </div>
            <div className="feed-card__chart">
              {Array.from({ length: 10 }).map((_, i) => (
                <span
                  key={i}
                  className={
                    "feed-card__chart-bar" +
                    (i === 6 || i === 7
                      ? " feed-card__chart-bar--highlight"
                      : "")
                  }
                  style={{ height: 18 + i * 4 }}
                />
              ))}
            </div>
          </div>

          {placeInfo?.website && (
            <a
              href={placeInfo.website}
              target="_blank"
              rel="noreferrer"
              className="feed-card__website"
              onClick={(e) => e.stopPropagation()}
            >
              🌐 {new URL(placeInfo.website).hostname}
            </a>
          )}
        </div>

        {/* Right column: memo + comments */}
        <div className="feed-card__right">
          <div className="feed-card__memo-header">
            <span className="feed-card__memo-title">
              {post.authorName}&apos;s Memo
            </span>
            <div className="feed-card__rating-row feed-card__rating-row--small">
              <span className="feed-card__rating-score">
                {ratingNumber.toFixed(1)}
              </span>
              <span className="feed-card__rating-stars">★★★★★</span>
            </div>
          </div>

          <p className="feed-card__memo-text">{post.text}</p>

          <div className="feed-card__comments">
            <div className="feed-card__comments-title">Comments</div>

            <div
              className={
                "feed-card__comments-scroll" +
                (showAllComments
                  ? " feed-card__comments-scroll--open"
                  : "")
              }
            >
              <ul className="feed-card__comments-list">
                {visibleComments.map((comment) => (
                  <li
                    key={comment.id}
                    className="feed-card__comment-item"
                  >
                    <span className="feed-card__comment-author">
                      {comment.authorName}
                    </span>
                    <span className="feed-card__comment-text">
                      {comment.text}
                    </span>
                    {comment.isOwner && (
                      <button
                        className="feed-card__comment-delete"
                        onClick={() => handleDeleteComment(comment.id)}
                        aria-label="Delete comment"
                      >
                        🗑
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {post.comments.length > 4 && !showAllComments && (
              <button
                className="feed-card__view-all"
                onClick={() => setShowAllComments(true)}
              >
                View all {post.comments.length} comments
              </button>
            )}

            <div className="feed-card__comment-input-row">
              <input
                className="feed-card__comment-input"
                placeholder="Add a comment…"
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default FeedPostCard;
