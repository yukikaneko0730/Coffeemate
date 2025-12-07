// src/pages/HomePage.tsx
import { useEffect, useMemo, useState } from "react";
import BerlinMapPlaceholder from "../components/BerlinMapPlaceholder";
import SuggestionCard from "../components/SuggestionCard";
import FeedPostCard from "../components/FeedPostCard";

import { mockCafes } from "../mocks/cafes";
import type { Cafe } from "../types/cafe";
import type { FeedPost } from "../types/feedPost";

import "../styles/HomePage.css";

import { db } from "../firebase/firebaseConfig";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { CURRENT_USER } from "../mocks/mockUsers";

type LatLng = {
  lat: number;
  lng: number;
};

type TabKey = "friends" | "others";

// Simple shuffle helper for “Others Post”
const shuffle = <T,>(items: T[]): T[] => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const HomePage = () => {
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("friends");

  // Firestore から取ってくる FeedPost 一覧
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  // simple friend-search UI 用
  const [friendQuery, setFriendQuery] = useState("");

  // ===== 現在ログイン中ユーザー（モック情報から coffeemateIds を使う） =====
  const currentProfile = CURRENT_USER.profile;
  const coffeemateIds = currentProfile.coffeemateIds ?? [];

  // ===== ブラウザの現在地（Map セクションの chip 用） =====
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords: LatLng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(coords);
      },
      () => {
        setUserLocation(null);
      }
    );
  }, []);

  // ===== Firestore から posts 購読 =====
  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const next: FeedPost[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data() as any;

          const createdAt =
            data.createdAt?.toDate && typeof data.createdAt.toDate === "function"
              ? data.createdAt.toDate()
              : null;

          // 「友だち投稿」かどうか判定（自分 + coffeemateIds）
          const authorId: string = data.authorId ?? "";
          const isFriend =
            authorId === currentProfile.id || coffeemateIds.includes(authorId);

          return {
            id: docSnap.id,
            authorId,
            authorName: data.authorName ?? "Unknown coffeemate",
            authorAvatarUrl: data.authorAvatarUrl ?? "",
            cafeName: data.cafeName ?? "",
            text: data.text ?? "",
            rating: Number(data.rating ?? 0),
            googlePlaceId: data.googlePlaceId ?? "",

            likeCount: Number(data.likeCount ?? 0),
            isLikedByCurrentUser: !!data.isLikedByCurrentUser,
            isSavedByCurrentUser: !!data.isSavedByCurrentUser,

            comments: Array.isArray(data.comments) ? data.comments : [],

            createdAt,
            isFriend,
          } as FeedPost;
        });

        setPosts(next);
        setLoadingPosts(false);
      },
      (err) => {
        console.error("Failed to fetch posts from Firestore:", err);
        setLoadingPosts(false);
      }
    );

    return () => unsub();
  }, [coffeemateIds, currentProfile.id]);

  // ===== Cafes (Suggestion 用はモックのまま) =====
  const cafes: Cafe[] = mockCafes;

  // Always up to 3 items for “Suggestions for you”
  const suggestionCafes = useMemo(() => {
    if (cafes.length >= 3) {
      return cafes.slice(0, 3);
    }
    const result: Cafe[] = [];
    for (let i = 0; i < 3 && cafes.length > 0; i += 1) {
      result.push(cafes[i % cafes.length]);
    }
    return result;
  }, [cafes]);

  // ===== Friend / Others 分け =====
  const friendPosts: FeedPost[] = posts.filter(
    (p: any) => p.isFriend && p.authorName.toLowerCase().includes(friendQuery.toLowerCase())
  );

  const otherPostsPool: FeedPost[] = posts.filter((p: any) => !p.isFriend);

  const visibleOtherPosts = useMemo(
    () => shuffle(otherPostsPool),
    [otherPostsPool, activeTab]
  );

  const visiblePosts: FeedPost[] =
    activeTab === "friends" ? friendPosts : visibleOtherPosts;

  // ===== FeedPostCard へのコールバック群（今はローカル状態だけ更新） =====
  const handleDeleteComment = (postId: string, commentId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.filter((c) => c.id !== commentId),
            }
          : post
      )
    );
  };

  const handleOpenChat = (post: FeedPost) => {
    // TODO: ここは /messages に遷移して、そのユーザーとのチャットを開くようにする
    console.log("Open chat with:", post.authorName);
    alert(`Chat with ${post.authorName} (routing coming soon)`);
  };

  const handleOpenDirections = (post: FeedPost) => {
    const query = `${post.cafeName} Berlin`;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      query
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleToggleSave = (postId: string) => {
    // savedPosts は localStorage 管理なので、ここは UI 用にだけ反転させる
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, isSavedByCurrentUser: !post.isSavedByCurrentUser }
          : post
      )
    );
  };

  const handleShare = async (post: FeedPost) => {
    const shareUrl = `${window.location.origin}/cafe/${post.id}`;
    const navAny = navigator as any;

    if (navAny.share) {
      try {
        await navAny.share({
          title: post.cafeName,
          text: `Check out ${post.cafeName}!`,
          url: shareUrl,
        });
      } catch {
        // user canceled share
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert("Link copied to clipboard ✨");
      } catch {
        alert("Could not copy link.");
      }
    }
  };

  // ===== ローディング / 投稿ゼロのときの表示 =====
  if (loadingPosts) {
    return (
      <main className="home-main home-main--center">
        <p>Loading your coffeemates feed…</p>
      </main>
    );
  }

  return (
    <main className="home-main">
      {/* Hero / heading */}
      <header className="home-hero">
        <div>
          <p className="home-kicker">Plan the next coffee run</p>
          <h1 className="home-title">Discover cafes with your friends</h1>
          <p className="home-subtitle">
            Where coffee lovers connect, one cup at a time.
          </p>
        </div>
      </header>

      {/* 1. Map */}
      <section className="home-section home-map-section">
        <div className="home-section-header">
          <h2 className="home-section-title">Map</h2>
          <span className="home-chip">
            {userLocation ? "Centered on your location" : "Berlin default"}
          </span>
        </div>

        <BerlinMapPlaceholder />
      </section>

      {/* 2. Suggestions for you */}
      <section className="home-suggestions-section">
        <div className="home-suggestions-header">
          <h2 className="home-section-title">Suggestions for you</h2>
          <button type="button" className="home-suggestions-seeall">
            See all
          </button>
        </div>

        <div className="home-suggestions-row">
          {suggestionCafes.map((cafe) => (
            <SuggestionCard key={cafe.id} cafe={cafe} />
          ))}
        </div>
      </section>

      {/* 3. Friend search bar */}
      <section className="home-search-section">
        <p className="home-search-label">Find Your Friend:</p>

        <div className="home-search-bar">
          <span className="home-search-bar__icon" aria-hidden="true">
            🔍
          </span>
          <input
            type="text"
            className="home-search-bar__input"
            placeholder="@mariecoffeelove"
            value={friendQuery}
            onChange={(e) => setFriendQuery(e.target.value)}
          />
        </div>
      </section>

      {/* 4. Feed: Your friend posts / Others Post */}
      <section className="home-section">
        <div className="home-tabs-header">
          <button
            type="button"
            className={
              "home-tab-button" +
              (activeTab === "friends" ? " home-tab-button--active" : "")
            }
            onClick={() => setActiveTab("friends")}
          >
            Your friend posts
          </button>
          <button
            type="button"
            className={
              "home-tab-button" +
              (activeTab === "others" ? " home-tab-button--active" : "")
            }
            onClick={() => setActiveTab("others")}
          >
            Others Post
          </button>
        </div>

        <div
          key={activeTab}
          className="home-post-list home-post-list--animated"
        >
          {visiblePosts.length === 0 ? (
            <p className="home-empty-text">
              {activeTab === "friends"
                ? "No posts from your coffeemates yet. Maybe post the first one ☕"
                : "No other posts yet."}
            </p>
          ) : (
            visiblePosts.map((post) => (
              <FeedPostCard
                key={post.id}
                post={post}
                onDeleteComment={handleDeleteComment}
                onOpenChat={handleOpenChat}
                onOpenDirections={handleOpenDirections}
                onToggleSave={handleToggleSave}
                onShare={handleShare}
              />
            ))
          )}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
