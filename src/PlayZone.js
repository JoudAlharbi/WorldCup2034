import React from 'react';
import './PlayZone.css';


function Hero({ headline, sub, buttonLabel, background, onClick }) {
  const heroStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <section className="hero" style={heroStyle}>
      <div className="overlay">
        <h1>{headline}</h1>
        <p>{sub}</p>
        {buttonLabel && <button className="cta-button" onClick={onClick}>{buttonLabel}</button>}
      </div>
    </section>
  );
}

function LeagueCard({ league, flag, onClick }) {
  return (
    <div className="league-card">
      <img src={process.env.PUBLIC_URL + flag} alt={`${league} Flag`} />
      <h4>{league}</h4>
      <button className="play" onClick={() => onClick(league)}>PLAY</button>
    </div>
  );
}

export {Hero, LeagueCard };