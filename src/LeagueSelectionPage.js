import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero, LeagueCard } from './PlayZone';

export default function LeagueSelectionPage() {
  const navigate = useNavigate();
  const leagues = [
    { name: "Argentine league", folder: "Argentine_league", flag: "/Argentine_league.png" },
    { name: "Italian League", folder: "Italian-League", flag: "/Italian-League.png" },
    { name: "Saudi League", folder: "Saudi-League", flag: "/Saudi-League.png" },
  ];

  const handlePlay = (leagueName) => {
    navigate(`/quiz/${leagueName}`);
  };

  const scrollToLeagues = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      <Hero headline="Guess the football player " sub="Pick a challenge" background={process.env.PUBLIC_URL + "/whoami.png"} 
       buttonLabel="Let's Go!"      
       onClick={scrollToLeagues}
       />
      
      <section className="leagues">
        <div className="league-grid">
          {leagues.map((league, i) => (
            <LeagueCard
              key={i}
              league={league.name}
              flag={league.flag}
              onClick={handlePlay}
            />
          ))}
          
        </div>
        
      </section>
    </div>
  );
}