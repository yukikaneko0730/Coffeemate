// src/components/PlaceAutocompleteInput.tsx
import React, { useState, useEffect } from "react";

type PlaceSuggestion = {
  placeId: string;
  description: string;
};

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSelectPlace: (place: PlaceSuggestion) => void;
};

const PlaceAutocompleteInput: React.FC<Props> = ({
  value,
  onChange,
  onSelectPlace,
}) => {
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!value || value.length < 2) {
      setSuggestions([]);
      return;
    }

    const handle = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/places/autocomplete?query=${encodeURIComponent(value)}`
        );
        if (!res.ok) return;
        const data = await res.json();
        setSuggestions(data.suggestions);
        setIsOpen(true);
      } catch (e) {
        console.error("Failed to fetch suggestions", e);
      }
    }, 250);

    return () => clearTimeout(handle);
  }, [value]);

  const handleSelect = (s: PlaceSuggestion) => {
    onSelectPlace(s);
    onChange(s.description);
    setIsOpen(false);
  };

  return (
    <div className="place-input">
      <input
        className="place-input__field"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search cafe or address…"
      />
      {isOpen && suggestions.length > 0 && (
        <ul className="place-input__dropdown">
          {suggestions.map((s) => (
            <li
              key={s.placeId}
              className="place-input__option"
              onClick={() => handleSelect(s)}
            >
              {s.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlaceAutocompleteInput;
