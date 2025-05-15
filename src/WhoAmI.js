import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Hero } from './PlayZone';
import './PlayZone.css';

const leagueQuestions = {
  'Argentine league': [
    { image: '/players/Argentine_league/AngelDiMaria.jpg', options: ['Di Maria', 'Messi', 'Nicolas'], answer: 'Di Maria' },
    { image: '/players/Argentine_league/Maradona.jpg', options: ['Maradona', 'Messi', 'Aguero'], answer: 'Maradona' },
    { image: '/players/Argentine_league/messi.jpg', options: ['Messi', 'Di Maria', 'Aguero'], answer: 'Messi' },
    { image: '/players/Argentine_league/Nicolas.jpg', options: ['Nicolas', 'Aguero', 'Messi'], answer: 'Nicolas' },
    { image: '/players/Argentine_league/SergioAguero.jpg', options: ['Aguero', 'Maradona', 'Di Maria'], answer: 'Aguero' },
  ],
  'Italian League': [
    { image: '/players/Italian-League/DanieleDeRossi.jpg', options: ['De Rossi', 'Buffon', 'Brighi'], answer: 'De Rossi' },
    { image: '/players/Italian-League/GianluigiBuffon.jpg', options: ['Buffon', 'Maldini', 'Totti'], answer: 'Buffon' },
    { image: '/players/Italian-League/MatteoBrighi.jpg', options: ['Brighi', 'Buffon', 'Maldini'], answer: 'Brighi' },
    { image: '/players/Italian-League/PaoloMaldini.jpg', options: ['Maldini', 'Brighi', 'Totti'], answer: 'Maldini' },
    { image: '/players/Italian-League/FrancescoTotti.jpg', options: ['Totti', 'Buffon', 'De Rossi'], answer: 'Totti' },
  ],
  'Saudi League': [
    { image: '/players/Saudi-League/AliAl-Bulaihi.jpg', options: ['Ali Al-Bulaihi', 'Al-Owais', 'Al-Dawsari'], answer: 'Ali Al-Bulaihi' },
    { image: '/players/Saudi-League/MuhammadAlOwais.jpg', options: ['Al-Owais', 'Al-Faraj', 'Al-Hamdan'], answer: 'Al-Owais' },
    { image: '/players/Saudi-League/SalemAl-Dosari.jpg', options: ['Al-Dawsari', 'Al-Owais', 'Al-Faraj'], answer: 'Al-Dawsari' },
    { image: '/players/Saudi-League/SalmanAl-Faraj.jpg', options: ['Al-Faraj', 'Al-Dawsari', 'Al-Hamdan'], answer: 'Al-Faraj' },
    { image: '/players/Saudi-League/AbdullahAl-Hamdan.jpg', options: ['Al-Hamdan', 'Al-Faraj', 'Al-Owais'], answer: 'Al-Hamdan' },
  ],
};

function Scoreboard({ answers, total, currentTime, completionTime }) {
  const correct = answers.filter(ans => ans.status === 'correct').length;

  return (
    <section className="scoreboard">
      <div className="level-section">
        <div className="progress-side">
          <span className="progress-label">Your progress</span>
          <div className="progress-bar">
            {Array.from({ length: total }).map((_, i) => {
              const status = answers[i]?.status || 'pending';
              return <div key={i} className={`progress-segment ${status}`}></div>;
            })}
          </div>
        </div>
        <div className="time-center">
          <p className="completion-time">
            {completionTime !== null
              ? `Time: ${completionTime} seconds`
              : `Elapsed Time: ${currentTime} seconds`}
          </p>
          {correct === total && <p className="badge">🏆 Pro Level Unlocked!</p>}
        </div>
        <div className="rank-card">
          <span>Global Rank</span>
          <strong>#{Math.max(1, 371 - correct)}</strong>
        </div>
      </div>
    </section>
  );
}

export default function WhoAmI() {
  const { leagueName } = useParams();
  const decodedLeague = decodeURIComponent(leagueName);
  const league = decodedLeague;
  const questions = leagueQuestions[decodedLeague] || [];

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startTime, setStartTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [completionTime, setCompletionTime] = useState(null);

  const quizRef = useRef(null);
  const current = questions[index];

  useEffect(() => {
    const now = Date.now();
    setStartTime(now);

    const timer = setInterval(() => {
      setCurrentTime(Math.floor((Date.now() - now) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (index >= questions.length && startTime) {
      const endTime = Date.now();
      setCompletionTime(Math.floor((endTime - startTime) / 1000));
    }
  }, [index, startTime, questions.length]);

  useEffect(() => {
    if (!current) return;
    setLoading(true);
    const img = new Image();
    img.src = process.env.PUBLIC_URL + current.image;
    img.onload = () => setLoading(false);
  }, [current]);

  const handleSubmit = () => {
    if (!current) return;
    const status = selected == null ? 'skipped' : (selected === current.answer ? 'correct' : 'wrong');
    setAnswers(prev => [...prev, { selected, status }]);
    setSelected(null);
    setIndex(prev => prev + 1);
  };

  const handleSkip = () => {
    setAnswers(prev => [...prev, { selected: null, status: 'skipped' }]);
    setSelected(null);
    setIndex(prev => prev + 1);
  };

  const scrollToQuiz = () => {
    if (quizRef.current) quizRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  if (index >= questions.length) {
    return (
      <div>
        <Hero
          headline={`Guess the ${league} Player`}
          sub=""
          buttonLabel="Start now!"
          background={process.env.PUBLIC_URL + "/whoami.png"}
        />
        <section className="quiz-end">
          <h2>🎉 Quiz Complete!</h2>
          <p>Score: {answers.filter(a => a.status === 'correct').length} / {questions.length}</p>
        </section>
        <Scoreboard answers={answers} total={questions.length} currentTime={currentTime} completionTime={completionTime} />
      </div>
    );
  }

  if (loading || !current) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      <Hero
        headline={`Guess the ${league} Player`}
        sub=""
        buttonLabel="Start now!"
        background={process.env.PUBLIC_URL + "/whoami.png"}
        onClick={scrollToQuiz}
      />

      <section className="question-section custom-quiz-style" ref={quizRef}>
        <h3 className="question-title" style={{ textAlign: 'center' }}>Question {index + 1}</h3>
        <div className="question-content">
          <div className="question-left">
            <h2>Guess Who Am I</h2>
            <p>Guess the player from the visible part of their face.</p>
            {current.options.map((opt, i) => (
              <button
                key={i}
                className={`option-button ${selected === opt ? 'selected' : ''}`}
                onClick={() => setSelected(opt)}
              >
                {opt}
              </button>
            ))}
            <div className="action-buttons">
              <button className="skip" onClick={handleSkip}>Skip</button>
              <button className="submit" onClick={handleSubmit}>Submit</button>
            </div>
          </div>
          <div className="question-right">
            <div className="image-placeholder">
              <img src={process.env.PUBLIC_URL + current.image} alt="quiz" />
            </div>
          </div>
        </div>
      </section>

      <Scoreboard answers={answers} total={questions.length} currentTime={currentTime} completionTime={completionTime} />
    </div>
  );
}
