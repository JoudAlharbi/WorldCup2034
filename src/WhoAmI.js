import React, { memo, useCallback, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createGameSession } from "./whoami/gameSession";
import { getWhoAmIMechanics } from "./whoami/questionEngine";
import {
  DIFFICULTY_LABELS,
  LEGACY_DIFFICULTY_MAP,
  REVEAL_LABELS,
} from "./whoami/playerPool";
import { getThemeClass } from "./games/difficultyConfig";
import { recordGameResult } from "./games/progression";
import { logPerf } from "./whoami/performanceLog";
import "./games/difficultyThemes.css";
import "./whoami/whoAmI.css";

const VALID_DIFFICULTIES = ["easy", "medium", "hard"];

function getDifficultyFromParam(leagueName) {
  const raw = decodeURIComponent(leagueName || "").toLowerCase().trim();
  return LEGACY_DIFFICULTY_MAP[raw] || raw;
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

const ClockIcon = memo(() => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 11h5v-2h-4V7h-2v6z" />
  </svg>
));

const initialGameState = {
  index: 0,
  selected: null,
  answers: [],
  feedback: null,
  startTime: Date.now(),
  currentTime: 0,
  completionTime: null,
};

function gameReducer(state, action) {
  switch (action.type) {
    case "RESET":
      return { ...initialGameState, startTime: Date.now() };
    case "SELECT":
      return { ...state, selected: action.option };
    case "SUBMIT":
      return {
        ...state,
        index: state.index + 1,
        answers: [...state.answers, { selected: action.choice, status: action.status }],
        selected: null,
        feedback: null,
      };
    case "TICK":
      return { ...state, currentTime: action.seconds };
    case "COMPLETE":
      return { ...state, completionTime: action.seconds };
    default:
      return state;
  }
}

const LoadingScreen = memo(({ progress, label }) => (
  <div className="wai wai--loading">
    <div className="wai__loading-card">
      <span className="wai__loading-badge">Who Am I?</span>
      <h2>Preparing your challenge</h2>
      <p>{label}</p>
      <div className="wai__loading-track">
        <div className="wai__loading-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  </div>
));

export default function WhoAmI() {
  const { leagueName } = useParams();
  const difficulty = useMemo(() => getDifficultyFromParam(leagueName), [leagueName]);
  const difficultyLabel = DIFFICULTY_LABELS[difficulty] || difficulty;
  const mechanics = useMemo(() => getWhoAmIMechanics(difficulty), [difficulty]);
  const themeClass = getThemeClass(difficulty);

  const [session, setSession] = useState({ status: "idle", questions: [] });
  const [game, dispatch] = useReducer(gameReducer, initialGameState);
  const [hintsRevealed, setHintsRevealed] = useState(0);
  const [loadProgress, setLoadProgress] = useState(0);
  const [flashFeedback, setFlashFeedback] = useState(null);
  const [questionTimeLeft, setQuestionTimeLeft] = useState(null);
  const [recorded, setRecorded] = useState(false);

  const imgRef = useRef(null);
  const labelRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  const { index, selected, answers, currentTime, completionTime } = game;
  const questions = session.questions;
  const total = questions.length;
  const current = questions[index];
  const isBooting = session.status === "booting";
  const isReady = session.status === "ready";
  const isComplete = isReady && index >= total && total > 0;

  const correctCount = useMemo(
    () => answers.filter((a) => a.status === "correct").length,
    [answers]
  );
  const currentScore = useMemo(() => {
    let score = correctCount * 100;
    answers.forEach((a) => {
      if (a.status === "wrong") score -= mechanics.wrongPenalty;
    });
    return Math.max(0, score);
  }, [answers, correctCount, mechanics.wrongPenalty]);
  const remaining = Math.max(total - index, 0);
  const globalRank = Math.max(1, 371 - correctCount);
  const progressPct = total ? (answers.length / total) * 100 : 0;
  const accuracy = total ? Math.round((correctCount / total) * 100) : 0;

  const swapImage = useCallback((src, label) => {
    const img = imgRef.current;
    if (!img || !src) return;
    const t0 = performance.now();
    img.classList.add("wai__player-img--fade");
    img.src = src;
    if (labelRef.current && label) labelRef.current.textContent = label;
    requestAnimationFrame(() => {
      img.classList.remove("wai__player-img--fade");
      logPerf("imageSwap", performance.now() - t0);
    });
  }, []);

  const bootGame = useCallback(async (level) => {
    setSession({ status: "booting", questions: [], error: null });
    setLoadProgress(0);
    dispatch({ type: "RESET" });
    setHintsRevealed(0);
    setFlashFeedback(null);
    startTimeRef.current = Date.now();

    try {
      const prepared = await createGameSession(level, setLoadProgress);
      setSession({ status: "ready", questions: prepared, error: null });
    } catch (err) {
      setSession({
        status: "error",
        questions: [],
        error: err?.message || "Unable to load player images",
      });
    }
  }, []);

  useEffect(() => {
    if (!VALID_DIFFICULTIES.includes(difficulty)) {
      setSession({ status: "idle", questions: [] });
      return undefined;
    }
    let active = true;
    bootGame(difficulty).then(() => {
      if (!active) return;
    });
    return () => {
      active = false;
    };
  }, [difficulty, bootGame]);

  useLayoutEffect(() => {
    if (!isReady || isComplete || !current) return;
    swapImage(current.cachedSrc, REVEAL_LABELS[current.revealType] || "Player Reveal");
  }, [index, isReady, isComplete, current, swapImage]);

  useEffect(() => {
    if (!isReady || isComplete) return undefined;
    const timer = setInterval(() => {
      dispatch({
        type: "TICK",
        seconds: Math.floor((Date.now() - startTimeRef.current) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isReady, isComplete]);

  const handleTimeout = useCallback(() => {
    if (!current) return;
    dispatch({ type: "SUBMIT", status: "wrong", choice: null });
    setHintsRevealed(0);
    setFlashFeedback({ status: "wrong", answer: current.answer, selected: null });
    setTimeout(() => setFlashFeedback(null), 120);
  }, [current]);

  useEffect(() => {
    if (!isReady || isComplete || !current || !mechanics.questionTimer) {
      setQuestionTimeLeft(null);
      return undefined;
    }
    setQuestionTimeLeft(mechanics.questionTimer);
    const id = setInterval(() => {
      setQuestionTimeLeft((t) => {
        if (t <= 1) {
          handleTimeout();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [index, isReady, isComplete, current, mechanics.questionTimer, handleTimeout]);

  useEffect(() => {
    if (isComplete && !recorded && total > 0) {
      recordGameResult("who-am-i", difficulty, {
        score: correctCount,
        total,
        accuracy,
      });
      setRecorded(true);
    }
  }, [isComplete, recorded, correctCount, total, accuracy, difficulty]);

  useEffect(() => {
    if (isComplete && completionTime === null) {
      dispatch({
        type: "COMPLETE",
        seconds: Math.floor((Date.now() - startTimeRef.current) / 1000),
      });
    }
  }, [isComplete, completionTime]);

  const handleSubmit = useCallback(() => {
    if (!current || selected == null) return;
    const t0 = performance.now();
    const status = selected === current.answer ? "correct" : "wrong";
    setFlashFeedback({ status, answer: current.answer, selected });

    dispatch({ type: "SUBMIT", status, choice: selected });
    setHintsRevealed(0);
    logPerf("questionTransition", performance.now() - t0);
    setTimeout(() => setFlashFeedback(null), 120);
  }, [current, selected]);

  const handleSkip = useCallback(() => {
    if (!current) return;
    const t0 = performance.now();
    dispatch({ type: "SUBMIT", status: "skipped", choice: null });
    setHintsRevealed(0);
    logPerf("questionTransition", performance.now() - t0);
  }, [current]);

  const handlePlayAgain = useCallback(() => {
    setRecorded(false);
    bootGame(difficulty);
  }, [bootGame, difficulty]);

  const handleRevealHint = useCallback(() => {
    if (mechanics.hintLimit === 0) return;
    setHintsRevealed((count) => Math.min(count + 1, mechanics.hintLimit));
  }, [mechanics.hintLimit]);

  const getOptionClass = useCallback(
    (option) => {
      const classes = ["wai__option"];
      if (selected === option) classes.push("is-selected");
      if (flashFeedback && current) {
        if (option === current.answer) classes.push("is-correct");
        else if (flashFeedback.selected === option && flashFeedback.status === "wrong") {
          classes.push("is-wrong");
        }
      }
      return classes.join(" ");
    },
    [selected, flashFeedback, current]
  );

  if (!VALID_DIFFICULTIES.includes(difficulty)) {
    return (
      <div className="wai">
        <div className="wai__empty">
          <p>Select a valid difficulty level to begin.</p>
          <Link to="/play-zone">Choose Difficulty</Link>
        </div>
      </div>
    );
  }

  if (session.status === "error") {
    return (
      <div className="wai">
        <div className="wai__empty">
          <p>{session.error || "Real player photos could not be loaded."}</p>
          <p style={{ fontSize: 14, color: "#6b7280", marginTop: 8 }}>
            Run <code>npm run whoami:download</code> and <code>npm run whoami:assets</code> to build the image dataset.
          </p>
          <Link to="/play-zone">Choose Difficulty</Link>
        </div>
      </div>
    );
  }

  if (isBooting) {
    return (
      <LoadingScreen
        progress={loadProgress}
        label={`Preloading ${difficultyLabel} portraits…`}
      />
    );
  }

  if (isComplete) {
    return (
      <div className={`wai wai--complete ${themeClass}`}>
        <div className="wai__complete-card">
          <span className="wai__complete-badge">Challenge Complete</span>
          <h2>Great effort!</h2>
          <div className="wai__final-score">
            {correctCount} <span>/ {total}</span>
          </div>
          <p className="wai__accuracy">{accuracy}% Accuracy</p>
          <p className="wai__complete-time">
            Completed in {formatTime(completionTime ?? currentTime)}
          </p>
          <div className="wai__complete-rank">
            Global Rank <strong>#{Math.max(1, 371 - correctCount)}</strong>
          </div>
          <div className="wai__complete-actions">
            <button type="button" className="wai__btn wai__btn--primary" onClick={handlePlayAgain}>
              Play Again
            </button>
            <Link to="/play-zone" className="wai__btn wai__btn--secondary">
              Return to Games
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!current) return null;

  return (
    <div className={`wai ${themeClass}`}>
      <div className="wai__shell">
        <header className="wai__topbar">
          <div className="wai__brand">
            <h1>Who Am I?</h1>
            <p>Guess the football player from the revealed image.</p>
            <span className="wai__league-tag">{difficultyLabel}</span>
          </div>
          <div className="wai__rank">
            <span>Global Rank</span>
            <strong>#{globalRank}</strong>
          </div>
        </header>

        <div className="wai__stats">
          <div className="wai__stat">
            <span>Current Score</span>
            <strong>{currentScore}</strong>
          </div>
          <div className="wai__stat">
            <span>Correct Answers</span>
            <strong>{correctCount}</strong>
          </div>
          <div className="wai__stat">
            <span>Remaining Questions</span>
            <strong>{remaining}</strong>
          </div>
        </div>

        <div className="wai__progress">
          <div className="wai__progress-head">
            <span className="wai__progress-label">
              Progress {index + 1} / {total}
            </span>
          </div>
          <div className="wai__progress-track">
            <div className="wai__progress-fill" style={{ width: `${progressPct}%` }} />
          </div>
        </div>

        <div className="wai__game-card">
          <div className="wai__image-col">
            <div className="wai__image-card">
              <img
                ref={imgRef}
                className="wai__player-img"
                src={current.cachedSrc}
                alt="Mystery football player reveal"
                decoding="sync"
                loading="eager"
                draggable={false}
              />
              <span className="wai__image-label" ref={labelRef}>
                {REVEAL_LABELS[current.revealType] || "Player Reveal"}
              </span>
            </div>
          </div>

          <div className="wai__quiz-col">
            <div className="wai__quiz-meta">
              <span className="wai__question-num">
                Question {index + 1} of {total}
              </span>
              <span className="wai__timer">
                <ClockIcon />
                {mechanics.questionTimer && questionTimeLeft != null
                  ? `${questionTimeLeft}s`
                  : formatTime(currentTime)}
              </span>
            </div>

            {mechanics.hintLimit > 0 ? (
              <div className="wai__hints">
                <button
                  type="button"
                  className="wai__hint-btn"
                  onClick={handleRevealHint}
                  disabled={hintsRevealed >= mechanics.hintLimit}
                >
                  Reveal Hint ({hintsRevealed}/{mechanics.hintLimit})
                </button>
                {hintsRevealed > 0 && (
                  <ul className="wai__hint-list">
                    {hintsRevealed >= 1 && (
                      <li>
                        <span>National team</span> {current.hints.nationality}
                      </li>
                    )}
                    {hintsRevealed >= 2 && (
                      <li>
                        <span>Club</span> {current.hints.club}
                      </li>
                    )}
                    {hintsRevealed >= 3 && mechanics.hintLimit >= 3 && (
                      <li>
                        <span>Position</span> {current.hints.position}
                      </li>
                    )}
                  </ul>
                )}
              </div>
            ) : (
              <p className="wai__no-hints">
                {difficulty === "hard" && current?.hints?.era
                  ? `Expert mode — ${current.hints.era}. No hints.`
                  : "Hints disabled on Hard mode"}
              </p>
            )}

            <div className="wai__options">
              {current.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={getOptionClass(option)}
                  onClick={() => dispatch({ type: "SELECT", option })}
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="wai__actions">
              <button type="button" className="wai__btn wai__btn--secondary" onClick={handleSkip}>
                Skip Question
              </button>
              <button
                type="button"
                className="wai__btn wai__btn--primary"
                onClick={handleSubmit}
                disabled={selected == null}
              >
                Submit Answer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
