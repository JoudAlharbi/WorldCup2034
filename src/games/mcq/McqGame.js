import React, { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getThemeClass } from "../difficultyConfig";
import { recordGameResult } from "../progression";
import "../difficultyThemes.css";
import "../gameShell.css";
import { DIFFICULTY_LABELS, formatTime, VALID_DIFFICULTIES } from "../shared/quizUtils";
import { buildMcqRound, getMcqMechanics, getMcqPoolSize, MCQ_CATEGORIES } from "./mcqQuestions";

const QUESTIONS_PER_ROUND = 10;

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

export default function McqGame() {
  const { difficulty } = useParams();
  const slug = (difficulty || "").toLowerCase();
  const mechanics = useMemo(() => getMcqMechanics(slug), [slug]);
  const themeClass = getThemeClass(slug);

  const [roundKey, setRoundKey] = useState(0);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [questionTimeLeft, setQuestionTimeLeft] = useState(null);
  const [recorded, setRecorded] = useState(false);

  const questions = useMemo(() => {
    if (!VALID_DIFFICULTIES.includes(slug)) return [];
    return buildMcqRound(slug, QUESTIONS_PER_ROUND);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, roundKey]);

  const current = questions[state.index];
  const score = state.answers.filter((a) => a.correct).length;
  const accuracy = state.answers.length
    ? Math.round((score / state.answers.length) * 100)
    : 0;
  const progress = questions.length
    ? Math.round((Math.min(state.index + (state.done ? 0 : 1), questions.length) / questions.length) * 100)
    : 0;

  const advanceOrSubmitWrong = useCallback(() => {
    if (!current || state.showFeedback || state.done) return;
    dispatch({ type: "SUBMIT", choice: null, correct: false });
  }, [current, state.showFeedback, state.done]);

  useEffect(() => {
    if (state.done) return undefined;
    const id = setInterval(() => {
      dispatch({ type: "TICK", seconds: Math.floor((Date.now() - state.startTime) / 1000) });
    }, 1000);
    return () => clearInterval(id);
  }, [state.startTime, state.done]);

  useEffect(() => {
    if (!state.showFeedback) return undefined;
    const id = setTimeout(
      () => dispatch({ type: "NEXT", total: questions.length }),
      mechanics.feedbackMs
    );
    return () => clearTimeout(id);
  }, [state.showFeedback, questions.length, mechanics.feedbackMs]);

  useEffect(() => {
    if (state.done || state.showFeedback || !current || !mechanics.questionTimer) {
      setQuestionTimeLeft(null);
      return undefined;
    }
    setQuestionTimeLeft(mechanics.questionTimer);
    const id = setInterval(() => {
      setQuestionTimeLeft((t) => {
        if (t <= 1) {
          advanceOrSubmitWrong();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [state.index, state.done, state.showFeedback, current, mechanics.questionTimer, advanceOrSubmitWrong]);

  useEffect(() => {
    if (state.done && !recorded && questions.length > 0) {
      recordGameResult("mcq", slug, {
        score,
        total: questions.length,
        accuracy: Math.round((score / questions.length) * 100),
      });
      setRecorded(true);
    }
  }, [state.done, recorded, score, questions.length, slug]);

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
      correct: state.selected === current.answer,
    });
  }, [state.selected, state.showFeedback, current]);

  const restart = () => {
    setRecorded(false);
    setRoundKey((k) => k + 1);
    dispatch({ type: "RESET" });
  };

  if (!VALID_DIFFICULTIES.includes(slug)) {
    return <Navigate to="/play-zone" replace />;
  }

  if (questions.length === 0) {
    return (
      <div className={`gs ${themeClass}`}>
        <div className="gs__shell">
          <p>Not enough questions for this difficulty. Please try another level.</p>
          <Link to="/play-zone" className="gs__btn gs__btn--secondary">Back</Link>
        </div>
      </div>
    );
  }

  if (state.done) {
    return (
      <div className={`gs gs--complete ${themeClass}`}>
        <div className="gs__complete-card">
          <span className="gs__tag">{DIFFICULTY_LABELS[slug]} · Quiz Complete</span>
          <h2>FIFA World Cup Quiz</h2>
          <p className="gs__complete-score">
            {score}<span>/{questions.length}</span>
          </p>
          <p style={{ color: "#6b7280", marginBottom: 8 }}>
            Accuracy: {Math.round((score / questions.length) * 100)}% · Time: {formatTime(state.elapsed)}
          </p>
          <p style={{ fontSize: 14, color: "#06154a", marginBottom: 28 }}>
            {score === questions.length
              ? "Perfect score — you are a true World Cup expert!"
              : score >= questions.length * 0.7
                ? "Strong performance. Keep studying those finals and records!"
                : "Good effort — replay to sharpen your FIFA knowledge."}
          </p>
          <div className="gs__actions">
            <button type="button" className="gs__btn gs__btn--primary" onClick={restart}>
              Play Again
            </button>
            <Link to="/play-zone" className="gs__btn gs__btn--secondary">
              Change Difficulty
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`gs ${themeClass}`}>
      <div className="gs__shell">
        <div className="gs__topbar">
          <div className="gs__brand">
            <h1>FIFA World Cup Quiz</h1>
            <p>Test your knowledge across history, records, hosts, stadiums, and legendary finals.</p>
            <span className="gs__tag">{DIFFICULTY_LABELS[slug]} · {MCQ_CATEGORIES[current.category]}</span>
          </div>
          <Link to="/play-zone" className="gs__btn gs__btn--secondary" style={{ flex: "none", minWidth: "auto" }}>
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
            <span>{mechanics.questionTimer ? "Question Timer" : "Elapsed"}</span>
            <strong>
              {mechanics.questionTimer && questionTimeLeft != null
                ? `${questionTimeLeft}s`
                : formatTime(state.elapsed)}
            </strong>
          </div>
        </div>

        <div className="gs__progress">
          <div className="gs__progress-head">
            <span>Question {state.index + 1} of {questions.length}</span>
            <span>{progress}%</span>
          </div>
          <div className="gs__progress-track">
            <div className="gs__progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="gs__card">
          <h2 style={{ margin: "0 0 8px", fontSize: 20, color: "#06154a", textAlign: "left" }}>
            {current.question}
          </h2>
          <p style={{ margin: "0 0 4px", fontSize: 13, color: "#6b7280", textAlign: "left" }}>
            {slug === "hard" ? "Select from 6 options" : "Select the correct answer"}
          </p>

          <div className={`gs__options${slug === "hard" ? " gs__options--dense" : ""}`}>
            {current.options.map((option) => {
              let className = "gs__option";
              if (state.selected === option) className += " is-selected";
              if (state.showFeedback) {
                if (option === current.answer) className += " is-correct";
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

          {state.showFeedback && mechanics.showExplain && (
            <div className="gs__explain">
              <strong>{state.selected === current.answer ? "Correct!" : "Not quite."}</strong>
              {" "}{current.explanation}
            </div>
          )}

          <div className="gs__actions">
            <button
              type="button"
              className="gs__btn gs__btn--primary"
              disabled={!state.selected || state.showFeedback}
              onClick={handleSubmit}
            >
              {state.showFeedback ? "Next question…" : "Submit Answer"}
            </button>
          </div>
        </div>

        <p style={{ marginTop: 20, fontSize: 12, color: "#9ca3af", textAlign: "center" }}>
          Question bank: {getMcqPoolSize(slug)} exclusive {slug} questions
        </p>
      </div>
    </div>
  );
}
