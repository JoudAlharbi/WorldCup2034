import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Award, CheckCircle, ShieldCheck, Trophy } from "lucide-react";
import { PlayIcon } from "./games/GameIcons";
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

const TIER_BADGES = {
  easy: "Beginner",
  medium: "Intermediate",
  hard: "Expert",
};

const GAME_VARIANTS = {
  "who-am-i": {
    variant: "scout",
    kicker: "Player Scouting",
    visual: "Silhouette reveal · Face identification",
  },
  mcq: {
    variant: "tournament",
    kicker: "World Cup Quiz",
    visual: "Tournament trivia · Records & finals",
  },
  quotes: {
    variant: "legend",
    kicker: "Legend Quotes",
    visual: "Iconic voices · Football history",
  },
};

const ACHIEVEMENT_ICONS = {
  "easy-complete": CheckCircle,
  "medium-complete": Award,
  "hard-complete": ShieldCheck,
  "world-cup-master": Trophy,
};

function DifficultyTier({ level, isActive, onClick }) {
  const meta = DIFFICULTY_META[level];
  return (
    <button
      type="button"
      className={`pz-tier pz-tier--${level}${isActive ? " is-active" : ""}`}
      onClick={onClick}
      aria-pressed={isActive}
    >
      <span className="pz-tier__badge">{TIER_BADGES[level]}</span>
      <span className="pz-tier__name">{meta.label}</span>
      <span className="pz-tier__rating">{meta.rating}</span>
      <span className="pz-tier__check" aria-hidden="true">
        {isActive ? "✓" : ""}
      </span>
    </button>
  );
}

function GameCard({ game, selectedDifficulty, onSelectDifficulty, onPlay }) {
  const slug = selectedDifficulty[game.id];
  const meta = slug ? DIFFICULTY_META[slug] : null;
  const settings = slug ? game.difficulties[slug] : null;
  const info = GAME_VARIANTS[game.id] || {};

  return (
    <article className={`pz-game pz-game--${info.variant}${slug ? ` is-${slug}` : ""}`}>
      <div className="pz-game__visual">
        <img src={`${PUBLIC}${game.image}`} alt="" loading="lazy" />
        <div className="pz-game__visual-overlay" aria-hidden="true" />

        {game.id === "who-am-i" && (
          <div className="pz-game__scout" aria-hidden="true">
            <span className="pz-game__scan-line" />
            <span className="pz-game__classified">Scouting File</span>
          </div>
        )}

        {game.id === "mcq" && (
          <div className="pz-game__trophy-wrap" aria-hidden="true">
            <svg viewBox="0 0 48 48" className="pz-game__trophy">
              <path d="M14 8h20v4a10 10 0 0 1-20 0V8z" fill="currentColor" />
              <path d="M12 8h-3v2a5 5 0 0 0 5 5M36 8h3v2a5 5 0 0 1-5 5" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M24 22v6M18 34h12l-2 6h-8l-2-6z" fill="currentColor" />
            </svg>
            <span className="pz-game__tournament-tag">FIFA WC</span>
          </div>
        )}

        {game.id === "quotes" && (
          <div className="pz-game__quote-mark" aria-hidden="true">
            <span>&ldquo;</span>
            <span className="pz-game__quote-sub">Who said it?</span>
          </div>
        )}

        <div className="pz-game__visual-foot">
          <span className="pz-game__kicker">{info.kicker}</span>
          <h3>{game.title}</h3>
          <p>{info.visual}</p>
        </div>
      </div>

      <div className="pz-game__panel">
        <p className="pz-game__desc">{game.description}</p>

        <div className="pz-game__tiers" role="group" aria-label={`${game.title} difficulty`}>
          {DIFFICULTY_SLUGS.map((level) => (
            <DifficultyTier
              key={level}
              level={level}
              isActive={slug === level}
              onClick={() => onSelectDifficulty(game.id, level)}
            />
          ))}
        </div>

        {meta && settings && (
          <div className={`pz-game__brief pz-game__brief--${slug}`}>
            <div className="pz-game__brief-head">
              <strong>{meta.label} Mode</strong>
              <span>{settings.tagline}</span>
            </div>
            <ul className="pz-game__brief-list">
              <li><span>Pool</span><em>{settings.poolLabel || `${settings.questions} questions`}</em></li>
              <li><span>Timer</span><em>{settings.timer}</em></li>
              <li><span>Hints</span><em>{settings.hints}</em></li>
            </ul>
          </div>
        )}

        <button
          type="button"
          className={`pz-game__play${slug ? ` pz-game__play--${slug}` : ""}`}
          disabled={!slug}
          onClick={() => onPlay(game, slug)}
        >
          <PlayIcon />
          {slug ? `Enter ${meta.label} Challenge` : "Select Difficulty to Play"}
        </button>
      </div>
    </article>
  );
}

function AchievementCard({ achievement }) {
  const Icon = ACHIEVEMENT_ICONS[achievement.id] || CheckCircle;
  const { unlocked, title, subtitle, progress, progressPct } = achievement;
  const showProgress = !unlocked && progress.target > 1;

  return (
    <article
      className={`pz-achievement${unlocked ? " is-unlocked" : " is-locked"}`}
      aria-label={`${title}${unlocked ? ", earned" : ", locked"}`}
    >
      <div className="pz-achievement__icon-wrap">
        <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
      </div>
      <div className="pz-achievement__body">
        <div className="pz-achievement__head">
          <h3 className="pz-achievement__title">{title}</h3>
          {unlocked && <span className="pz-achievement__earned">Earned</span>}
        </div>
        <p className="pz-achievement__desc">{subtitle}</p>
        {showProgress && (
          <div className="pz-achievement__progress">
            <div className="pz-achievement__progress-bar">
              <span style={{ width: `${progressPct}%` }} />
            </div>
            <span className="pz-achievement__progress-label">
              {progress.current} / {progress.target}
            </span>
          </div>
        )}
      </div>
    </article>
  );
}

export default function GameSelectionPage() {
  const navigate = useNavigate();
  const [selectedDifficulty, setSelectedDifficulty] = useState({});
  const [modal, setModal] = useState(null);
  const [, setProgressTick] = useState(0);

  const achievements = getAchievements();
  const progress = getProgressSummary();
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      document.documentElement.style.setProperty("--pz-parallax", `${y * 0.35}px`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <div className="pz">
      <header className="pz-hero">
        <div
          className="pz-hero__bg"
          style={{ backgroundImage: `url(${PUBLIC}/games/hero-stadium.jpg)` }}
          aria-hidden="true"
        />
        <div className="pz-hero__grain" aria-hidden="true" />
        <div className="pz-hero__overlay" aria-hidden="true" />

        <div className="pz-hero__content">
          <div className="pz-hero__brand">
            <h1>
              <span className="pz-hero__line">Prove Your</span>
              <span className="pz-hero__line pz-hero__line--accent">Football IQ</span>
            </h1>
          </div>

          <div className="pz-hero__cta-strip">
            <span className="pz-hero__pill">3 Challenges</span>
            <span className="pz-hero__pill">3 Difficulty Tiers</span>
            <span className="pz-hero__pill">Live Progress</span>
          </div>
        </div>

        <div className="pz-hero__fade" aria-hidden="true" />
      </header>

      <main className="pz-main">
        <section className="pz-section pz-section--games">
          <header className="pz-section__head">
            <div>
              <span className="pz-section__label">Fan Challenges</span>
              <h2>Select Your Game</h2>
            </div>
            <p>Each card is a unique experience. Choose a difficulty tier before you play.</p>
          </header>

          <div className="pz-games">
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
        </section>

        <section className="pz-section pz-section--progress">
          <div className="pz-progress-bar">
            <div className="pz-progress-bar__stat">
              <span>Games Played</span>
              <strong>{progress.gamesPlayed}</strong>
            </div>
            <div className="pz-progress-bar__divider" aria-hidden="true" />
            <div className="pz-progress-bar__stat">
              <span>Accuracy</span>
              <strong>{progress.accuracy}%</strong>
            </div>
            <div className="pz-progress-bar__divider" aria-hidden="true" />
            <div className="pz-progress-bar__stat">
              <span>Hard Wins</span>
              <strong>{progress.hardCompletions}</strong>
            </div>
            <div className="pz-progress-bar__divider" aria-hidden="true" />
            <div className="pz-progress-bar__stat">
              <span>Achievements</span>
              <strong>{unlockedCount}/{achievements.length}</strong>
            </div>
          </div>
        </section>

        <section className="pz-section pz-section--achievements">
          <header className="pz-section__head pz-section__head--compact">
            <div>
              <span className="pz-section__label">Progress</span>
              <h2>Achievements</h2>
            </div>
            <p>Milestones earned from completing fan challenges.</p>
          </header>

          <div className="pz-achievements">
            {achievements.map((a) => (
              <AchievementCard key={a.id} achievement={a} />
            ))}
          </div>
        </section>
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
