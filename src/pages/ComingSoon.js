import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero } from '../PlayZone';
import '../PlayZone.css';

export default function ComingSoon({ title = 'New Game', description = 'This challenge is on its way.' }) {
  const navigate = useNavigate();

  return (
    <div>
      <Hero
        headline={`${title} — Coming Soon`}
        sub={description}
        buttonLabel="Back to Play Zone"
        background={process.env.PUBLIC_URL + '/stadium.jpg'}
        onClick={() => navigate('/play-zone')}
      />

      <section className="play-zone" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h2>We're still building {title}.</h2>
        <p style={{ maxWidth: '600px', margin: '1rem auto', color: '#555' }}>
          {description} In the meantime, try the “Who Am I?” challenge or explore the rest of
          the FIFA World Cup 2034 experience.
        </p>
        <button className="signup" onClick={() => navigate('/leagues')}>
          Play “Who Am I?”
        </button>
      </section>
    </div>
  );
}
