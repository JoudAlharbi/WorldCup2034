// // src/components/Hero.js

import React from 'react';
import './Hero.css';
import ScrollDownButton from './ScrollDownButton.js';


function Hero({ headline, sub, buttonLabel, background, onClick }) {
  const heroStyle = {
    backgroundImage: `url(${background})`,
  };

  return (
    <section className="hero" style={heroStyle}>
      <div className="hero-overlay"></div>

      <div className="hero-content-left">
        <h1>{headline}</h1>
        {sub && <p>{sub}</p>}
        {buttonLabel && (
          <button className="cta-button" onClick={onClick}>
            {buttonLabel}
          </button>
        )}
      </div>

      {/* Scroll Down Button */}
      <ScrollDownButton targetId="matches-section" />
    </section>
  );
}

export default Hero;
