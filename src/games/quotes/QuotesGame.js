import React, { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import "../gameShell.css";
import { DIFFICULTY_LABELS, formatTime, VALID_DIFFICULTIES } from "../shared/quizUtils";
import { buildQuotesRound } from "./quotesData";

const QUESTIONS_PER_ROUND = 8;
const FEEDBACK_MS = 1600;

const initialState = {
  index: 0,
  selected: null,
  answers: [],
  showFeedback: false,
  startTime: Date.now(),
  elapsed: 0,
  done: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SELECT":
      return { ...state, selected: action.value };
    case "SUBMIT":
      return {
        ...state,
        answers: [...state.answers, { choice: action.choice, correct: action.correct }],
        showFeedback: true,
      };
    case "NEXT":
      if (state.index + 1 >= action.total) {
        return { ...state, index: state.index + 1, showFeedback: false, selected: null, done: true };
      }
      return { ...state, index: state.index + 1, selected: null, showFeedback: false };
    case "TICK":
      return { ...state, elapsed: action.seconds };
    case "RESET":
      return { ...initialState, startTime: Date.now() };
    default:
      return state;
  }
}

export default function QuotesGame() {
  const { difficulty } = useParams();
  const slug = (difficulty || "").toLowerCase();

  const [roundKey, setRoundKey] = useState(0);
  const [state, dispatch] = useReducer(reducer, initialState);

  const questions = useMemo(
    () => (VALID_DIFFICULTIES.includes(slug) ? buildQuotesRound(slug, QUESTIONS_PER_ROUND) : []),
    [slug, roundKey]
  );

  const current = questions[state.index];
  const score = state.answers.filter((a) => a.correct).length;
  const accuracy = state.answers.length
    ? Math.round((score / state.answers.length) * 100)
    : 0;
  const progress = questions.length
    ? Math.round((Math.min(state.index + (state.done ? 0 : 1), questions.length) / questions.length) * 100)
    : 0;

  useEffect(() => {
    if (state.done) return undefined;
    const id = setInterval(() => {
      dispatch({ type: "TICK", seconds: Math.floor((Date.now() - state.startTime) / 1000) });
    }, 1000);
    return () => clearInterval(id);
  }, [state.startTime, state.done]);

  useEffect(() => {
    if (!state.showFeedback) return undefined;
    const id = setTimeout(() => dispatch({ type: "NEXT", total: questions.length }), FEEDBACK_MS);
    return () => clearTimeout(id);
  }, [state.showFeedback, questions.length]);

  const handleSelect = useCallback(
    (option) => {
      if (state.showFeedback || state.done || !current) return;
      dispatch({ type: "SELECT", value: option });
    },
    [state.showFeedback, state.done, current]
  );

  const handleSubmit = useCallback(() => {
    if (!state.selected || state.showFeedback || !current) return;
    dispatch({
      type: "SUBMIT",
      choice: state.selected,
      correct: state.selected === current.speaker,
    });
  }, [state.selected, state.showFeedback, current]);

  const restart = () => {
    setRoundKey((k) => k + 1);
    dispatch({ type: "RESET" });
  };

  if (!VALID_DIFFICULTIES.includes(slug)) {
    return <Navigate to="/games/quotes" replace />;
  }

  if (questions.length === 0) {
    return (
      <div className="gs">
        <div className="gs__shell">
          <p>Not enough quotes for this difficulty.</p>
          <Link to="/games/quotes" className="gs__btn gs__btn--secondary">Back</Link>
        </div>
      </div>
    );
  }

  if (state.done) {
    return (
      <div className="gs gs--complete">
        <div className="gs__complete-card">
          <span className="gs__tag">{DIFFICULTY_LABELS[slug]} · Challenge Complete</span>
          <h2>Who Said It?</h2>
          <p className="gs__complete-score">
            {score}<span>/{questions.length}</span>
          </p>
          <p style={{ color: "#6b7280", marginBottom: 8 }}>
            Accuracy: {Math.round((score / questions.length) * 100)}% · Time: {formatTime(state.elapsed)}
          </p>
          <p style={{ fontSize: 14, color: "#06154a", marginBottom: 28 }}>
            {score === questions.length
              ? "Flawless — you know your football icons inside out."
              : score >= questions.length * 0.7
                ? "Impressive quote knowledge. One more round?"
                : "Keep playing — these legends have plenty more to say."}
          </p>
          <div className="gs__actions">
            <button type="button" className="gs__btn gs__btn--primary" onClick={restart}>
              Play Again
            </button>
            <Link to="/games/quotes" className="gs__btn gs__btn--secondary">
              Change Difficulty
            </Link>
            <Link to="/play-zone" className="gs__btn gs__btn--secondary">
              All Games
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="gs">
      <div className="gs__shell">
        <div className="gs__topbar">
          <div className="gs__brand">
            <h1>Who Said It?</h1>
            <p>Read the quote and identify which football legend or manager said it.</p>
            <span className="gs__tag">{DIFFICULTY_LABELS[slug]}</span>
          </div>
          <Link to="/games/quotes" className="gs__btn gs__btn--secondary" style={{ flex: "none", minWidth: "auto" }}>
            Exit
          </Link>
        </div>

        <div className="gs__stats">
          <div className="gs__stat">
            <span>Score</span>
            <strong>{score}</strong>
          </div>
          <div className="gs__stat">
            <span>Accuracy</span>
            <strong>{accuracy}%</strong>
          </div>
          <div className="gs__stat">
            <span>Timer</span>
            <strong>{formatTime(state.elapsed)}</strong>
          </div>
        </div>

        <div className="gs__progress">
          <div className="gs__progress-head">
            <span>Quote {state.index + 1} of {questions.length}</span>
            <span>{progress}%</span>
          </div>
          <div className="gs__progress-track">
            <div className="gs__progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="gs__card">
          <blockquote
            style={{
              margin: "0 0 24px",
              padding: "20px 24px",
              borderLeft: "4px solid #d4af37",
              background: "rgba(6, 21, 74, 0.04)",
              borderRadius: "0 12px 12px 0",
              fontSize: "clamp(17px, 3vw, 20px)",
              lineHeight: 1.65,
              fontStyle: "italic",
              color: "#06154a",
              textAlign: "left",
            }}
          >
            &ldquo;{current.quote}&rdquo;
          </blockquote>

          <p style={{ margin: "0 0 12px", fontSize: 13, color: "#6b7280", textAlign: "left" }}>
            Who said this?
          </p>

          <div className="gs__options">
            {current.options.map((option) => {
              let className = "gs__option";
              if (state.selected === option) className += " is-selected";
              if (state.showFeedback) {
                if (option === current.speaker) className += " is-correct";
                else if (option === state.selected) className += " is-wrong";
              }
              return (
                <button
                  type="button"
                  key={option}
                  className={className}
                  disabled={state.showFeedback}
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {state.showFeedback && (
            <div className="gs__explain">
              <strong>{state.selected === current.speaker ? "Correct!" : `It was ${current.speaker}.`}</strong>
            </div>
          )}

          <div className="gs__actions">
            <button
              type="button"
              className="gs__btn gs__btn--primary"
              disabled={!state.selected || state.showFeedback}
              onClick={handleSubmit}
            >
              {state.showFeedback ? "Next quote…" : "Submit Answer"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
