// src/GameSelectionPage.js
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero, LeagueCard } from './PlayZone';
import './PlayZone.css'; 

function GameCard({ title, description, imgSrc, route }) {
  const navigate = useNavigate();
  return (
    <div className="game-card">
      <img src={process.env.PUBLIC_URL + "/" + imgSrc} alt={title} />
      <div className="game-info">
        <h4>{title}</h4>
        <p>{description}</p>
        <button className="signup" onClick={() => navigate(route)}>PLAY</button>
      </div>
    </div>
  );
}

export default function GameSelectionPage() {
  const playZoneRef = useRef(null);

  const scrollToPlayZone = () => {
    if (playZoneRef.current) {
      playZoneRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Hero
        headline="Can you call yourself a real football fan?"
        sub="Find out now!"
        buttonLabel="Let's Go!"
        background={process.env.PUBLIC_URL + "/stadium.jpg"}
        onClick={scrollToPlayZone}
      />

      <section className="play-zone" ref={playZoneRef}>
        <div className="game-grid">
          <GameCard title="Who Am I ?" description="Can you guess the player from their club badges?" imgSrc="whoami.png" route="/leagues" />
          <GameCard title="MCQ" description="Match the cards, progress through FIFA moments" imgSrc="mcq.png" route="/mcq" />
          <GameCard title="Who said it" description="Guess the football legend" imgSrc="whosaidit.png" route="/quotes" />
        </div>
      </section>
    </div>
  );
}