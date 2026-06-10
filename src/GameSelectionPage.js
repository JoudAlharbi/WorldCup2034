import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ClockIcon,
  HashIcon,
  LayersIcon,
  PlayIcon,
  QuoteIcon,
  SearchUserIcon,
  TrophyIcon,
} from "./games/GameIcons";
import "./games/gamesHub.css";

const PUBLIC = process.env.PUBLIC_URL;

const GAMES = [
  {
    id: "who-am-i",
    title: "Who Am I?",
    description: "Spot the star from mystery image reveals.",
    route: "/games/who-am-i",
    image: "/games/stadium-atmosphere.jpg",
    imageAlt: "Floodlit football stadium atmosphere",
    Icon: SearchUserIcon,
    accent: "gold",
    difficulties: ["Easy", "Medium", "Hard"],
    stats: [
      { Icon: HashIcon, label: "5 per round" },
      { Icon: LayersIcon, label: "3 levels" },
      { Icon: ClockIcon, label: "~3 min" },
    ],
  },
  {
    id: "mcq",
    title: "FIFA World Cup Quiz",
    description: "History, records, and legendary finals.",
    route: "/games/mcq",
    image: "/games/trophy-moment.jpg",
    imageAlt: "Football trophy celebration moment",
    Icon: TrophyIcon,
    accent: "navy",
    difficulties: ["Easy", "Medium", "Hard"],
    stats: [
      { Icon: HashIcon, label: "60+ questions" },
      { Icon: LayersIcon, label: "3 levels" },
      { Icon: ClockIcon, label: "~5 min" },
    ],
  },
  {
    id: "quotes",
    title: "Who Said It?",
    description: "Match iconic quotes to football legends.",
    route: "/games/quotes",
    image: "/games/quotes-atmosphere.jpg",
    imageAlt: "Football stadium crowd atmosphere",
    Icon: QuoteIcon,
    accent: "gold",
    difficulties: ["Easy", "Medium", "Hard"],
    stats: [
      { Icon: HashIcon, label: "30 quotes" },
      { Icon: LayersIcon, label: "3 levels" },
      { Icon: ClockIcon, label: "~4 min" },
    ],
  },
];

function GameCard({ game, onPlay }) {
  const { Icon } = game;

  return (
    <article className="gh-card">
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

        <div className="gh-card__pills" aria-label="Difficulty levels">
          {game.difficulties.map((level) => (
            <span key={level} className={`gh-pill gh-pill--${level.toLowerCase()}`}>
              {level}
            </span>
          ))}
        </div>

        <ul className="gh-card__stats">
          {game.stats.map(({ Icon: StatIcon, label }) => (
            <li key={label}>
              <StatIcon />
              <span>{label}</span>
            </li>
          ))}
        </ul>

        <button type="button" className="gh-card__cta" onClick={() => onPlay(game.route)}>
          <PlayIcon />
          Play Now
        </button>
      </div>
    </article>
  );
}

export default function GameSelectionPage() {
  const navigate = useNavigate();

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
            <p>Three premium World Cup mini-games. Pick your challenge and play.</p>
          </div>
          <dl className="gh-hero__metrics">
            <div>
              <dt>Games</dt>
              <dd>3</dd>
            </div>
            <div>
              <dt>Questions</dt>
              <dd>90+</dd>
            </div>
            <div>
              <dt>Modes</dt>
              <dd>Easy · Hard</dd>
            </div>
          </dl>
        </div>
      </header>

      <main className="gh-main">
        <header className="gh-main__head">
          <h2>Choose Your Challenge</h2>
          <p>Score tracking, difficulty modes, and polished fan experiences.</p>
        </header>

        <div className="gh-grid">
          {GAMES.map((game) => (
            <GameCard key={game.id} game={game} onPlay={navigate} />
          ))}
        </div>
      </main>
    </div>
  );
}
