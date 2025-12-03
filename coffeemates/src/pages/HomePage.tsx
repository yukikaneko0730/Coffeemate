// src/pages/HomePage.tsx
import { useEffect, useMemo, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import SuggestionCard from "../components/SuggestionCard";
import FeedPostCard from "../components/FeedPostCard";
import { mockCafes } from "../mocks/cafes";
import { mockPosts } from "../mocks/posts";
import type { Cafe } from "../types/cafe";
import type { FeedPost } from "../types/feedPost";
import "../styles/HomePage.css";

type LatLng = {
  lat: number;
  lng: number;
};

type TabKey = "friends" | "others";

const mapContainerStyle = {
  width: "100%",
  height: "320px",
  borderRadius: "12px",
  border: "1px solid #e5e5e5",
  overflow: "hidden",
};

const defaultCenter: LatLng = {
  lat: 52.52,
  lng: 13.405,
};

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
  const [mapCenter, setMapCenter] = useState<LatLng>(defaultCenter);
  const [activeTab, setActiveTab] = useState<TabKey>("friends");
  const [posts, setPosts] = useState<FeedPost[]>(mockPosts);

  // Just for the visual of the search bar (no heavy logic yet)
  const [friendQuery, setFriendQuery] = useState("");

  // Load Google Maps script
  const { isLoaded } = useJsApiLoader({
    id: "google-map",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
  });

  // Try to read browser location
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords: LatLng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(coords);
        setMapCenter(coords);
      },
      () => {
        setUserLocation(null);
      }
    );
  }, []);

  // Cafes from mocks
  const cafes: Cafe[] = mockCafes;

  // Always up to 3 items for “Suggestions for you”
  const suggestionCafes = useMemo(() => {
    if (cafes.length >= 3) {
      return cafes.slice(0, 3);
    }
    // If less than 3, loop through existing ones to fill 3 slots
    const result: Cafe[] = [];
    for (let i = 0; i < 3 && cafes.length > 0; i += 1) {
      result.push(cafes[i % cafes.length]);
    }
    return result;
  }, [cafes]);

  // Posts from mocks (friend / others)
  const friendPosts: FeedPost[] = posts.filter((p) => p.isFriend);
  const otherPostsPool: FeedPost[] = posts.filter((p) => !p.isFriend);

  const visibleOtherPosts = useMemo(
    () => shuffle(otherPostsPool),
    [otherPostsPool, activeTab]
  );

  const visiblePosts: FeedPost[] =
    activeTab === "friends" ? friendPosts : visibleOtherPosts;

  // ==== Actions for FeedPostCard ====

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
    // Later we will hook this into react-router
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

      {/* 1. Map (full width) */}
      <section className="home-section home-map-section">
        <div className="home-section-header">
          <h2 className="home-section-title">Map</h2>
          <span className="home-chip">
            {userLocation ? "Centered on your location" : "Berlin default"}
          </span>
        </div>

        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={mapCenter}
            zoom={13}
            options={{ disableDefaultUI: true }}
          >
            {/* Center marker */}
            <Marker position={mapCenter} />
            {/* Optional: highlight exact user location in blue */}
            {userLocation && (
              <Marker
                position={userLocation}
                icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
              />
            )}
          </GoogleMap>
        ) : (
          <div className="home-map__placeholder">Loading map…</div>
        )}
      </section>

      {/* 2. Suggestions for you (flat, 3 cards horizontal) */}
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

      {/* 3. Simple friend search bar (like Figma) */}
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

        {/* key={activeTab} → smooth fade on tab change */}
        <div
          key={activeTab}
          className="home-post-list home-post-list--animated"
        >
          {visiblePosts.map((post) => (
            <FeedPostCard
              key={post.id}
              post={post}
              onDeleteComment={handleDeleteComment}
              onOpenChat={handleOpenChat}
              onOpenDirections={handleOpenDirections}
              onToggleSave={handleToggleSave}
              onShare={handleShare}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
