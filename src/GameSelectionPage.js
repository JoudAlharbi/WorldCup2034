import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PlayIcon,
  QuoteIcon,
  SearchUserIcon,
  TrophyIcon,
} from "./games/GameIcons";
import {
  DIFFICULTY_META,
  DIFFICULTY_SLUGS,
  GAMES,
  getDifficultyConfig,
} from "./games/difficultyConfig";
import { getAchievements, getProgressSummary } from "./games/progression";
import StartChallengeModal from "./games/StartChallengeModal";
import "./games/difficultyThemes.css";
import "./games/gamesHub.css";

const PUBLIC = process.env.PUBLIC_URL;

const ICONS = {
  "who-am-i": SearchUserIcon,
  mcq: TrophyIcon,
  quotes: QuoteIcon,
};

function GameCard({ game, selectedDifficulty, onSelectDifficulty, onPlay }) {
  const Icon = ICONS[game.id];
  const slug = selectedDifficulty[game.id];
  const meta = slug ? DIFFICULTY_META[slug] : null;
  const settings = slug ? game.difficulties[slug] : null;
  const themeClass = slug ? `gh-card--${slug}` : "";

  return (
    <article className={`gh-card ${themeClass}`}>
      <div className="gh-card__media">
        <img src={`${PUBLIC}${game.image}`} alt={game.imageAlt} loading="lazy" />
        <div className="gh-card__media-overlay" aria-hidden="true" />
        <span className={`gh-card__icon-badge gh-card__icon-badge--${game.accent}`}>
          <Icon />
        </span>
      </div>

      <div className="gh-card__body">
        <div className="gh-card__title-row">
          <span className={`gh-card__title-icon gh-card__title-icon--${game.accent}`}>
            <Icon />
          </span>
          <h3>{game.title}</h3>
        </div>

        <p className="gh-card__desc">{game.description}</p>

        <div className="gh-card__diff-label">Select Difficulty</div>
        <div className="gh-card__diff-grid" role="group" aria-label={`${game.title} difficulty`}>
          {DIFFICULTY_SLUGS.map((level) => {
            const m = DIFFICULTY_META[level];
            const isActive = slug === level;
            return (
              <button
                key={level}
                type="button"
                className={`gh-diff-btn gh-diff-btn--${level}${isActive ? " is-active" : ""}`}
                onClick={() => onSelectDifficulty(game.id, level)}
              >
                <span className="gh-diff-btn__name">{m.label}</span>
                <span className="gh-diff-btn__stars">{m.stars}</span>
              </button>
            );
          })}
        </div>

        {meta && settings && (
          <div className={`gh-card__diff-panel gh-card__diff-panel--${slug}`}>
            <p className="gh-card__diff-tagline">
              <strong>{meta.label} {meta.stars}</strong>
              <span>{settings.tagline}</span>
            </p>
            <dl className="gh-card__diff-stats">
              <div>
                <dt>Success Rate</dt>
                <dd>{meta.successRate}%</dd>
              </div>
              <div>
                <dt>Questions</dt>
                <dd>{settings.poolLabel || settings.questions}</dd>
              </div>
              <div>
                <dt>Timer</dt>
                <dd>{settings.timer}</dd>
              </div>
            </dl>
          </div>
        )}

        <button
          type="button"
          className={`gh-card__cta${slug ? ` gh-card__cta--${slug}` : ""}`}
          disabled={!slug}
          onClick={() => onPlay(game, slug)}
        >
          <PlayIcon />
          {slug ? `Play ${DIFFICULTY_META[slug].label}` : "Select Difficulty"}
        </button>
      </div>
    </article>
  );
}

export default function GameSelectionPage() {
  const navigate = useNavigate();
  const [selectedDifficulty, setSelectedDifficulty] = useState({});
  const [modal, setModal] = useState(null);
  const [progressTick, setProgressTick] = useState(0);

  const achievements = useMemo(() => getAchievements(), [progressTick]);
  const progress = useMemo(() => getProgressSummary(), [progressTick]);

  const handleSelectDifficulty = (gameId, level) => {
    setSelectedDifficulty((prev) => ({ ...prev, [gameId]: level }));
  };

  const handlePlayClick = (game, slug) => {
    if (!slug) return;
    setModal({ gameId: game.id, slug });
  };

  const handleStart = () => {
    if (!modal) return;
    const game = GAMES.find((g) => g.id === modal.gameId);
    if (game) navigate(game.playRoute(modal.slug));
    setModal(null);
    setProgressTick((t) => t + 1);
  };

  const modalConfig = modal ? getDifficultyConfig(modal.gameId, modal.slug) : null;
  const modalGame = modal ? GAMES.find((g) => g.id === modal.gameId) : null;

  return (
    <div className="gh">
      <header
        className="gh-hero"
        style={{ backgroundImage: `url(${PUBLIC}/games/hero-stadium.jpg)` }}
      >
        <div className="gh-hero__overlay" aria-hidden="true" />
        <div className="gh-hero__inner">
          <div className="gh-hero__copy">
            <span className="gh-hero__eyebrow">FIFA Fan Games</span>
            <h1>Fan Challenge Center</h1>
            <p>Three distinct experiences — choose your difficulty, then prove your level.</p>
          </div>
          <dl className="gh-hero__metrics">
            <div>
              <dt>Played</dt>
              <dd>{progress.gamesPlayed}</dd>
            </div>
            <div>
              <dt>Accuracy</dt>
              <dd>{progress.accuracy}%</dd>
            </div>
            <div>
              <dt>Hard Wins</dt>
              <dd>{progress.hardCompletions}</dd>
            </div>
          </dl>
        </div>
      </header>

      <main className="gh-main">
        <section className="gh-achievements">
          <h3>Your Achievements</h3>
          <div className="gh-achievements__grid">
            {achievements.map((a) => (
              <div
                key={a.id}
                className={`gh-achievement${a.unlocked ? " is-unlocked" : ""}`}
                title={a.label}
              >
                <span className="gh-achievement__icon">{a.icon}</span>
                <span className="gh-achievement__label">{a.label}</span>
              </div>
            ))}
          </div>
        </section>

        <header className="gh-main__head">
          <h2>Choose Your Challenge</h2>
          <p>Select a difficulty on each card — Easy, Medium, and Hard are completely different experiences.</p>
        </header>

        <div className="gh-grid">
          {GAMES.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              selectedDifficulty={selectedDifficulty}
              onSelectDifficulty={handleSelectDifficulty}
              onPlay={handlePlayClick}
            />
          ))}
        </div>
      </main>

      <StartChallengeModal
        open={Boolean(modal)}
        game={modalGame}
        difficulty={modal?.slug}
        config={modalConfig}
        onClose={() => setModal(null)}
        onStart={handleStart}
      />
    </div>
  );
}
