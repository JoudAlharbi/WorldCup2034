import React from "react";
import { DIFFICULTY_META } from "./difficultyConfig";
import "./startChallengeModal.css";

const TIER_BADGES = {
  easy: "Beginner",
  medium: "Intermediate",
  hard: "Expert",
};

export default function StartChallengeModal({ open, game, difficulty, config, onClose, onStart }) {
  if (!open || !game || !difficulty || !config) return null;

  const meta = DIFFICULTY_META[difficulty];
  const { settings } = config;

  return (
    <div className="scm-overlay" role="dialog" aria-modal="true" aria-labelledby="scm-title">
      <button type="button" className="scm-overlay__backdrop" aria-label="Close" onClick={onClose} />
      <div className={`scm-card scm-card--${meta.theme}`}>
        <button type="button" className="scm-card__close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="scm-card__inner">
          <span className="scm-card__game">{game.title}</span>
          <span className="scm-card__badge">{TIER_BADGES[difficulty]}</span>
          <h2 id="scm-title" className="scm-card__title">
            {meta.label} Challenge
          </h2>
          <p className="scm-card__rating">{meta.rating} · {meta.stars}</p>

          <ul className="scm-card__rules">
            <li><span>Hints</span><strong>{settings.hints}</strong></li>
            <li><span>Timer</span><strong>{settings.timer}</strong></li>
            <li><span>Questions</span><strong>{settings.questions}</strong></li>
            <li><span>Success Rate</span><strong>{meta.successRate}%</strong></li>
            {settings.choices && (
              <li><span>Choices</span><strong>{settings.choices}</strong></li>
            )}
            {settings.penalty && settings.penalty !== "None" && (
              <li><span>Penalty</span><strong>{settings.penalty}</strong></li>
            )}
          </ul>

          <p className="scm-card__tagline">{settings.tagline}</p>

          <button type="button" className="scm-card__start" onClick={onStart}>
            Start Challenge
          </button>
        </div>
      </div>
    </div>
  );
}
