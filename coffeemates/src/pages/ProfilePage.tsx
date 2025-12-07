import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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

import type { Profile, CoffeeProfileItem } from "../mocks/mockUsers"; // or your real types path

/* =============================
   Constants
============================= */

const MAX_ROWS = 5;

/* =============================
   Helpers
============================= */

const initRowsFromProfile = (source: Profile | null): CoffeeProfileRow[] => {
  const baseRows: CoffeeProfileRow[] = Array.from(
    { length: MAX_ROWS },
    (_, index) => ({
      id: `row-${index + 1}`,
      questionKey: "" as CoffeeQuestionKey | "",
      answer: "",
    })
  );

  if (source && source.coffeeProfile && source.coffeeProfile.length > 0) {
    source.coffeeProfile.slice(0, MAX_ROWS).forEach((item, index) => {
      baseRows[index].questionKey = item.questionKey;
      baseRows[index].answer = item.answer;
    });
  } else {
    // Default first row
    baseRows[0].questionKey = "favoriteTypeOfCoffee";
  }

  return baseRows;
};

/* =============================
   Component
============================= */

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userPosts, setUserPosts] = useState<FeedPost[]>([]);
  const [coffeemates, setCoffeemates] = useState<CoffeemateUser[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [isEditing, setIsEditing] = useState(false);

  const [editHandle, setEditHandle] = useState("");
  const [editName, setEditName] = useState("");
  const [editLocation, setEditLocation] = useState("");

  const [rows, setRows] = useState<CoffeeProfileRow[]>([]);

  /* =============================
     Image upload refs
  ============================== */

  const coverInputRef = useRef<HTMLInputElement | null>(null);
  const avatarInputRef = useRef<HTMLInputElement | null>(null);

  /* =============================
     Derived counts
  ============================== */

  const postsCount = userPosts.length;
  const coffeematesCount = coffeemates.length;

  /* =============================
     Load data from API
  ============================== */

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setLoadError(null);

        // Example endpoints – adjust to your backend
        const [profileRes, postsRes, coffeematesRes] = await Promise.all([
          fetch("/api/me"), // returns the current user's profile
          fetch("/api/me/posts"), // returns FeedPost[]
          fetch("/api/me/coffeemates"), // returns CoffeemateUser[]
        ]);

        if (!profileRes.ok || !postsRes.ok || !coffeematesRes.ok) {
          throw new Error("Failed to load profile data");
        }

        const profileData: Profile = await profileRes.json();
        const postsData: FeedPost[] = await postsRes.json();
        const coffeematesData: CoffeemateUser[] = await coffeematesRes.json();

        setProfile(profileData);
        setUserPosts(postsData);
        setCoffeemates(coffeematesData);

        // Initialize coffee profile editor rows from loaded profile
        setRows(initRowsFromProfile(profileData));

        // Initialize edit fields
        setEditHandle(profileData.handle);
        setEditName(profileData.name);
        setEditLocation(profileData.location);
      } catch (err) {
        console.error(err);
        setLoadError("Could not load profile. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  /* =============================
     Question map
  ============================== */

  const questionMap = useMemo(() => {
    const map = new Map<CoffeeQuestionKey, CoffeeQuestion>();
    COFFEE_QUESTIONS.forEach((q) => map.set(q.key, q));
    return map;
  }, []);

  const isOwnProfile = profile?.isOwnProfile ?? true;

  /* =============================
     Image handlers
  ============================== */

  const handleClickCover = () => {
    coverInputRef.current?.click();
  };

  const handleChangeCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;

    // For now we only update the local preview.
    // TODO: send file to API / storage and store resulting URL.
    const url = URL.createObjectURL(file);
    setProfile((prev) =>
      prev
        ? {
            ...prev,
            coverImageUrl: url,
          }
        : prev
    );
  };

  const handleClickAvatar = () => {
    avatarInputRef.current?.click();
  };

  const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;

    // Local preview update; integrate with API/upload as needed.
    const url = URL.createObjectURL(file);
    setProfile((prev) =>
      prev
        ? {
            ...prev,
            avatarUrl: url,
          }
        : prev
    );
  };

  /* =============================
     Coffee profile row handlers
  ============================== */

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

  /* =============================
     Edit mode handlers
  ============================== */

  const handleStartEdit = () => {
    if (!profile) return;
    setEditHandle(profile.handle);
    setEditName(profile.name);
    setEditLocation(profile.location);
    setRows(initRowsFromProfile(profile));
    setIsEditing(true);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

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

    try {
      // Example API call; change URL/method/body structure for your backend
      const res = await fetch(`/api/me`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      if (!res.ok) {
        throw new Error("Failed to save profile");
      }

      const savedProfile: Profile = await res.json();
      setProfile(savedProfile);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      // Fallback: at least update local UI so user doesn’t lose changes
      setProfile(updated);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    if (!profile) return;
    setRows(initRowsFromProfile(profile));
    setEditHandle(profile.handle);
    setEditName(profile.name);
    setEditLocation(profile.location);
    setIsEditing(false);
  };

  /* =============================
     Coffeemates modal handlers
  ============================== */

  const [isCoffeematesOpen, setIsCoffeematesOpen] = useState(false);

  const handleOpenCoffeemates = () => {
    setIsCoffeematesOpen(true);
  };

  const handleCloseCoffeemates = () => {
    setIsCoffeematesOpen(false);
  };

  const handleRemoveCoffeemate = async (id: string) => {
    // Optimistic UI update
    setCoffeemates((prev) => prev.filter((mate) => mate.id !== id));

    try {
      // Example API call; adjust URL/method to your backend
      await fetch(`/api/me/coffeemates/${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error(err);
      // Optional: re-fetch coffeemates from server if needed
    }
  };

  /* =============================
     Derived view data
  ============================== */

  const coffeeProfileDisplay =
    profile?.coffeeProfile?.map((item) => {
      const q = questionMap.get(item.questionKey);
      return {
        label: q ? q.label : item.questionKey,
        answer: item.answer,
      };
    }) ?? [];

  /* =============================
     Loading / error states
  ============================== */

  if (isLoading) {
    return (
      <div className="profile-page">
        <div className="profile-loading">Loading profile…</div>
      </div>
    );
  }

  if (loadError || !profile) {
    return (
      <div className="profile-page">
        <div className="profile-error">{loadError ?? "Profile not found."}</div>
      </div>
    );
  }

  /* ============================
     VIEW MODE
  ============================ */

  if (!isEditing) {
    return (
      <div className="profile-page">
        <div className="profile-main-block">
          {/* Cover + avatar (not clickable in view mode) */}
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

          {/* Header row */}
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
                    {coffeematesCount}
                  </span>
                </button>
                <div className="profile-stat">
                  <span className="profile-stat__label1">Post</span>
                  <span className="profile-stat__value">{postsCount}</span>
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
        {/* Cover + avatar (clickable in edit mode) */}
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

          {/* ID / Name / Location fields */}
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
                Location:
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
