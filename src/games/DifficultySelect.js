import React from "react";
import { Link } from "react-router-dom";
import "./difficultySelect.css";

const LEVELS = [
  {
    slug: "easy",
    name: "Easy",
    badge: "Starter",
    description: "Perfect for casual fans — iconic names and unforgettable moments.",
  },
  {
    slug: "medium",
    name: "Medium",
    badge: "Fan Level",
    description: "For regular followers of international football and the World Cup.",
  },
  {
    slug: "hard",
    name: "Hard",
    badge: "Expert",
    description: "Deep knowledge required — rising stars, legends, and tough calls.",
  },
];

export default function DifficultySelect({
  title,
  subtitle,
  backLink = "/play-zone",
  backLabel = "All Games",
  onSelect,
}) {
  return (
    <div className="ds">
      <div className="ds__inner">
        <Link to={backLink} className="ds__back">
          ← {backLabel}
        </Link>

        <header className="ds__header">
          <span className="ds__eyebrow">Select Difficulty</span>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </header>

        <div className="ds__grid">
          {LEVELS.map((level) => (
            <button
              type="button"
              key={level.slug}
              className="ds__card"
              onClick={() => onSelect(level.slug)}
            >
              <span className="ds__badge">{level.badge}</span>
              <h2>{level.name}</h2>
              <p>{level.description}</p>
              <span className="ds__cta">Start Challenge</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export { LEVELS };
