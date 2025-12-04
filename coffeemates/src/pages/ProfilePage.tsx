// src/pages/ProfilePage.tsx
import React, { useMemo, useRef, useState } from "react";
import "../styles/ProfilePage.css";

import CoffeeQuestionRow, {
  type CoffeeProfileRow,
} from "../components/CoffeeQuestionRow";

import {
  COFFEE_QUESTIONS,
  type CoffeeQuestion,
  type CoffeeQuestionKey,
} from "../data/coffeeQuestions";

import FeedPostCard from "../components/FeedPostCard";
import type { FeedPost } from "../types/feedPost";

import CoffeematesModal, {
  type CoffeemateUser,
} from "../components/CoffeematesModal";

import {
  CURRENT_USER,
  MOCK_USERS,
  type Profile,
  type CoffeeProfileItem,
} from "../mocks/mockUsers";

/* =============================
   Constants
============================= */

const MAX_ROWS = 5;

/* =============================
   Helpers
============================= */

const initRowsFromProfile = (source: Profile): CoffeeProfileRow[] => {
  const baseRows: CoffeeProfileRow[] = Array.from(
    { length: MAX_ROWS },
    (_, index) => ({
      id: `row-${index + 1}`,
      questionKey: "" as CoffeeQuestionKey | "",
      answer: "",
    })
  );

  if (source.coffeeProfile.length > 0) {
    source.coffeeProfile.slice(0, MAX_ROWS).forEach((item, index) => {
      baseRows[index].questionKey = item.questionKey;
      baseRows[index].answer = item.answer;
    });
  } else {
    baseRows[0].questionKey = "favoriteTypeOfCoffee";
  }

  return baseRows;
};

/* =============================
   Component
============================= */

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<Profile>(CURRENT_USER.profile);
  const [isEditing, setIsEditing] = useState(false);

  const [editHandle, setEditHandle] = useState(profile.handle);
  const [editName, setEditName] = useState(profile.name);
  const [editLocation, setEditLocation] = useState(profile.location);

  const [rows, setRows] = useState<CoffeeProfileRow[]>(() =>
    initRowsFromProfile(CURRENT_USER.profile)
  );

  const userPosts: FeedPost[] = CURRENT_USER.posts;

  const questionMap = useMemo(() => {
    const map = new Map<CoffeeQuestionKey, CoffeeQuestion>();
    COFFEE_QUESTIONS.forEach((q) => map.set(q.key, q));
    return map;
  }, []);

  const isOwnProfile = profile.isOwnProfile;

  /* image upload refs (used only in edit mode) */

  const coverInputRef = useRef<HTMLInputElement | null>(null);
  const avatarInputRef = useRef<HTMLInputElement | null>(null);

  const handleClickCover = () => {
    coverInputRef.current?.click();
  };

  const handleChangeCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setProfile((prev) => ({
      ...prev,
      coverImageUrl: url,
    }));
  };

  const handleClickAvatar = () => {
    avatarInputRef.current?.click();
  };

  const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setProfile((prev) => ({
      ...prev,
      avatarUrl: url,
    }));
  };

  /* coffee profile row handlers */

  const handleQuestionChange = (rowIndex: number, key: CoffeeQuestionKey) => {
    setRows((prev) =>
      prev.map((row, index) =>
        index === rowIndex ? { ...row, questionKey: key } : row
      )
    );
  };

  const handleAnswerChange = (rowIndex: number, value: string) => {
    setRows((prev) =>
      prev.map((row, index) =>
        index === rowIndex ? { ...row, answer: value } : row
      )
    );
  };

  const isRowEnabled = (index: number) => {
    if (index === 0) return true;
    const prev = rows[index - 1];
    return prev.questionKey !== "";
  };

  /* edit mode start / save / cancel */

  const handleStartEdit = () => {
    setEditHandle(profile.handle);
    setEditName(profile.name);
    setEditLocation(profile.location);
    setRows(initRowsFromProfile(profile));
    setIsEditing(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();

    const newCoffeeProfile: CoffeeProfileItem[] = rows
      .filter((row) => row.questionKey !== "" && row.answer.trim() !== "")
      .map((row) => ({
        questionKey: row.questionKey as CoffeeQuestionKey,
        answer: row.answer.trim(),
      }));

    const updated: Profile = {
      ...profile,
      handle: editHandle.trim(),
      name: editName.trim(),
      location: editLocation.trim(),
      coffeeProfile: newCoffeeProfile,
    };

    setProfile(updated);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setRows(initRowsFromProfile(profile));
    setEditHandle(profile.handle);
    setEditName(profile.name);
    setEditLocation(profile.location);
    setIsEditing(false);
  };

  /* =============================
     Coffeemates modal state
  ============================== */

  const [coffeemates, setCoffeemates] = useState<CoffeemateUser[]>(() =>
    MOCK_USERS.filter((u) => u.profile.id !== CURRENT_USER.profile.id).map(
      (u) => ({
        id: u.profile.id,
        handle: u.profile.handle,
        avatarUrl: u.profile.avatarUrl,
      })
    )
  );

  const [isCoffeematesOpen, setIsCoffeematesOpen] = useState(false);

  const handleOpenCoffeemates = () => {
    setIsCoffeematesOpen(true);
  };

  const handleCloseCoffeemates = () => {
    setIsCoffeematesOpen(false);
  };

  const handleRemoveCoffeemate = (id: string) => {
    setCoffeemates((prev) => prev.filter((mate) => mate.id !== id));

    setProfile((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        coffeemates: Math.max(0, prev.stats.coffeemates - 1),
      },
    }));
  };

  /* derived view data */

  const coffeeProfileDisplay = profile.coffeeProfile.map((item) => {
    const q = questionMap.get(item.questionKey);
    return {
      label: q ? q.label : item.questionKey,
      answer: item.answer,
    };
  });

  /* ============================
     VIEW MODE
  ============================ */

  if (!isEditing) {
    return (
      <div className="profile-page">
        <div className="profile-main-block">
          {/* cover + avatar (not clickable in view mode) */}
          <div className="profile-cover">
            {profile.coverImageUrl && (
              <img
                src={profile.coverImageUrl}
                alt="Cover"
                className="profile-cover__img"
              />
            )}

            {profile.avatarUrl && (
              <div className="profile-avatar-wrapper">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="profile-avatar"
                />
              </div>
            )}
          </div>

          {/* header row */}
          <div className="profile-header">
            <div className="profile-header__left">
              <div className="profile-basic">
                <div className="profile-handle">{profile.handle}</div>
                <div className="profile-name">{profile.name}</div>
                <div className="profile-location">📍 {profile.location}</div>
              </div>

              <div className="profile-stats">
                <button
                  type="button"
                  className="profile-stat profile-stat--clickable"
                  onClick={handleOpenCoffeemates}
                >
                  <span className="profile-stat__label2">Coffeemates</span>
                  <span className="profile-stat__value">
                    {profile.stats.coffeemates}
                  </span>
                </button>
                <div className="profile-stat">
                  <span className="profile-stat__label1">Post</span>
                  <span className="profile-stat__value">
                    {profile.stats.posts}
                  </span>
                </div>
              </div>
            </div>

            <div className="profile-header__right">
              {isOwnProfile ? (
                <button
                  type="button"
                  className="profile-btn profile-btn--primary"
                  onClick={handleStartEdit}
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className="profile-btn profile-btn--primary"
                  >
                    Follow
                  </button>
                  <button
                    type="button"
                    className="profile-btn profile-btn--ghost"
                  >
                    Send Message
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Coffee profile view */}
          <section className="profile-section profile-section--coffee-view">
            <h2 className="profile-section__title">Coffee profile</h2>

            <div className="profile-coffee-table">
              {coffeeProfileDisplay.map((row) => (
                <div key={row.label} className="profile-coffee-row">
                  <div className="profile-coffee-row__q">{row.label}</div>
                  <div className="profile-coffee-row__a">{row.answer}</div>
                </div>
              ))}

              {coffeeProfileDisplay.length === 0 && (
                <p className="profile-coffee-row__a">
                  No coffee profile yet. Edit your profile to add one ☕
                </p>
              )}
            </div>
          </section>
        </div>

        {/* Posts area */}
        <div className="profile-posts-wrapper">
          <section className="profile-posts-card">
            <h2 className="profile-posts-card__title">Post</h2>
            <div className="profile-posts-list">
              {userPosts.map((post) => (
                <FeedPostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        </div>

        {/* Coffeemates modal */}
        <CoffeematesModal
          isOpen={isCoffeematesOpen}
          coffeemates={coffeemates}
          isOwnProfile={isOwnProfile}
          onClose={handleCloseCoffeemates}
          onRemoveCoffeemate={handleRemoveCoffeemate}
        />
      </div>
    );
  }

  /* ============================
     EDIT MODE
  ============================ */

  return (
    <div className="profile-page profile-page--edit">
      <div className="profile-main-block">
        {/* cover + avatar (clickable in edit mode) */}
        <div
          className="profile-cover profile-cover--clickable"
          onClick={handleClickCover}
        >
          {profile.coverImageUrl && (
            <img
              src={profile.coverImageUrl}
              alt="Cover"
              className="profile-cover__img"
            />
          )}

          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            className="profile-cover__file-input"
            onChange={handleChangeCover}
          />

          {profile.avatarUrl && (
            <div
              className="profile-avatar-wrapper"
              onClick={(e) => {
                e.stopPropagation();
                handleClickAvatar();
              }}
            >
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="profile-avatar"
              />
              <div className="profile-avatar__overlay">Change</div>
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                className="profile-avatar__file-input"
                onChange={handleChangeAvatar}
              />
            </div>
          )}
        </div>

        <form className="profile-edit-form" onSubmit={handleSaveProfile}>
          <div className="profile-edit-header">
            <h1 className="profile-name">{profile.name}</h1>
            <button
              type="submit"
              className="profile-btn profile-btn--primary"
            >
              Save
            </button>
          </div>

          {/* ID / Name / Place fields */}
          <div className="profile-edit-fields">
            <div className="profile-edit-field">
              <label className="profile-edit-label" htmlFor="profile-id">
                ID:
              </label>
              <input
                id="profile-id"
                className="profile-edit-input"
                value={editHandle}
                onChange={(e) => setEditHandle(e.target.value)}
              />
            </div>

            <div className="profile-edit-field">
              <label
                className="profile-edit-label"
                htmlFor="profile-name-input"
              >
                Name:
              </label>
              <input
                id="profile-name-input"
                className="profile-edit-input"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>

            <div className="profile-edit-field">
              <label
                className="profile-edit-label"
                htmlFor="profile-location-input"
              >
                Place:
              </label>
              <input
                id="profile-location-input"
                className="profile-edit-input"
                value={editLocation}
                onChange={(e) => setEditLocation(e.target.value)}
              />
            </div>
          </div>

          {/* Coffee profile editor */}
          <section className="profile-section profile-section--coffee-edit">
            <div className="profile-coffee-edit-header">
              <h2 className="profile-section__title">Coffee profile</h2>
              <p className="profile-coffee-edit-caption">
                Tell us up to five things you love about coffee.
              </p>
            </div>

            <div className="profile-coffee-editor">
              {rows.map((row, index) => {
                const enabled = isRowEnabled(index);

                const usedQuestionKeys = rows
                  .map((r) => r.questionKey)
                  .filter((k): k is CoffeeQuestionKey => k !== "");

                const availableQuestions = COFFEE_QUESTIONS.filter(
                  (q) =>
                    !usedQuestionKeys.includes(q.key) ||
                    q.key === row.questionKey
                );

                return (
                  <CoffeeQuestionRow
                    key={row.id}
                    row={row}
                    index={index}
                    isEnabled={enabled}
                    availableQuestions={availableQuestions}
                    onChangeQuestion={handleQuestionChange}
                    onChangeAnswer={handleAnswerChange}
                  />
                );
              })}
            </div>
          </section>

          <div className="profile-edit-footer">
            <button
              type="button"
              className="profile-btn profile-btn--ghost"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
