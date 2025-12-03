// src/pages/NotFoundPage.tsx
import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div className="notfound-page">
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default NotFoundPage;
