// src/App.tsx
// src/App.tsx
import React from "react";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";

import "./App.css";
import "./styles/Sidebar.css";
import "./styles/HomePage.css";
import "./styles/FeedPostCard.css";

const App: React.FC = () => {
  // TODO: 
  const isLoggedIn = true;

  return (
    <div className="app-shell">
      <Sidebar isLoggedIn={isLoggedIn} />
      <main className="app-content">
        <HomePage />
      </main>
    </div>
  );
};

export default App;
