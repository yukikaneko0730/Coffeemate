// src/components/BerlinMapPlaceholder.tsx
import React from "react";
import "../styles/BerlinMapPlaceholder.css";

const BerlinMapPlaceholder: React.FC = () => {
  return (
    <div className="map-placeholder">
      <div className="map-placeholder__badge">Prototype</div>

      <div className="map-placeholder__content">
        <h3 className="map-placeholder__title">Berlin map (placeholder)</h3>
        <p className="map-placeholder__text">
          Google Maps API is not connected yet.
          <br />
          This is a static placeholder for the map section.
        </p>
      </div>
    </div>
  );
};

export default BerlinMapPlaceholder;
