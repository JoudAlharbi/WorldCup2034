// import React from 'react';
import React, { useState } from 'react';import './TeamsAndMatches.css';
// import { Hero } from './PlayZone';
import Hero from './components/Hero';
import MatchesComingSoon from './matches/MatchesComingSoon';
import TeamsSpotlight from './teams/TeamsSpotlight';
import LiveNewsFeed from './news/LiveNewsFeed';


function scrollPlayers(amount) {
  const container = document.getElementById("players-scroll");
  if (container) {
    container.scrollBy({ left: amount, behavior: "smooth" });
  }
}

function TeamsAndMatches() {
  
const [selectedPlayer, setSelectedPlayer] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);
const handleViewInfo = (player) => {
  setSelectedPlayer(player);
  setIsModalOpen(true);
};

const closeModal = () => {
  setIsModalOpen(false);
};

  return (
    <div>
      {/* Hero Section */}
      <Hero
        headline="FIFA World Cup 2034 Matches"
        sub="The official schedule is on its way — explore host cities and stadiums while you wait."
        background={process.env.PUBLIC_URL + '/team-background.png'}
      />

      <MatchesComingSoon />

      <TeamsSpotlight />

      <LiveNewsFeed />

  {/* Team Players Section */}
  <section className="players-section" style={{ backgroundColor: "#f3f4f6", padding: "3rem 1rem", textAlign: "center" }}>
  <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1.5rem" }}>
    Team Players
  </h2>

  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1.5rem" }}>
    <button
      onClick={() => scrollPlayers(-760)} // scroll left
      style={{
        fontSize: "2rem",
        background: "none",
        border: "none",
        cursor: "pointer"
      }}
      aria-label="Previous"
    >
      &#8249;
    </button>

    {/* Moved id here */}
    <div
      id="players-scroll"
      style={{
        overflow: "hidden",
        width: "790px"
      }}
    >
      {/* Scrollable flex content */}
      <div style={{
        display: "flex",
        gap: "1.5rem",
        scrollBehavior: "smooth",
        width: "max-content"
      }}>
        {[
  {
    name: "Saad Almousa",
    country: "Saudi Arabia",
    image: "/team-players/saad-almousa.png",
    bio: "A rising Saudi defender known for his agility and defensive awareness."
  },
  {
    name: "Cristiano Ronaldo",
    country: "Portugal",
    image: "/team-players/cristiano-ronaldo.png",
    bio: "Legendary Portuguese forward, famous for his goal-scoring records and athleticism."
  },
  {
    name: "Lionel Messi",
    country: "Argentina",
    image: "/team-players/lionel-messi.png",
    bio: "Argentinian playmaker celebrated for his dribbling, vision, and creative passing."
  },
  {
    name: "Karim Benzema",
    country: "France",
    image: "/team-players/karim-benzema.png",
    bio: "Veteran French striker with clinical finishing and strong link-up play."
  },
  {
    name: "Neymar Jr",
    country: "Brazil",
    image: "/team-players/neymar-jr.png",
    bio: "Brazilian star renowned for flair, trickery, and match-winning performances."
  },
  {
    name: "Jude Bellingham",
    country: "England",
    image: "/team-players/jude-bellingham.png",
    bio: "Young English midfielder known for his leadership and box-to-box dynamism."
  },
  {
    name: "Salem Aldawsari",
    country: "Saudi Arabia",
    image: "/team-players/salem-aldawsari.png",
    bio: "Saudi winger recognized for pace, footwork, and crucial goals in key matches."
  },
  {
    name: "Bruno Fernandes",
    country: "Portugal",
    image: "/team-players/bruno-fernandes.png",
    bio: "Midfield maestro from Portugal, excels in long-range passing and penalties."
  },
  {
    name: "Rodrigo De Paul",
    country: "Argentina",
    image: "/team-players/rodrigo-de-paul.png",
    bio: "Hard-working Argentine midfielder who supports both defense and attack efficiently."
  },
  {
    name: "Kylian Mbappe",
    country: "France",
    image: "/team-players/kylian-mbappe.png",
    bio: "World-class forward known for explosive speed, finishing, and big-game impact."
  },
  {
    name: "Vinicius Junior",
    country: "Brazil",
    image: "/team-players/vinicius-junior.png",
    bio: "Brazilian winger famous for fast breaks, dribbling, and flair on the wing."
  },
  {
    name: "Harry Kane",
    country: "England",
    image: "/team-players/harry-kane.png",
    bio: "Top English striker, recognized for precise finishing and leadership up front."
  },
  {
    name: "Nawaf Alabed",
    country: "Saudi Arabia",
    image: "/team-players/nawaf-alabed.png",
    bio: "Experienced Saudi midfielder known for creativity and calmness under pressure."
  }
    ].map((player, index) => (
      <div
        key={index}
        className="player-card"
        style={{
          backgroundColor: "#fff",
          borderRadius: "0.5rem",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          overflow: "hidden",
          width: "240px",
          height: "320px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
            <img
              src={process.env.PUBLIC_URL + player.image}
              alt={player.name}
              style={{ width: "100%", height: "260px", objectFit: "cover" }}
            />
            <div style={{ padding: "0.5rem", textAlign: "center" }}>
            <h4 style={{ fontWeight: "600", fontSize: "1rem", margin: 0 }}>{player.name}</h4>
            <p style={{ fontSize: "0.875rem", margin: "0.25rem 0", color: "#666" }}>{player.country}</p>
            <p
            onClick={() => handleViewInfo(player)}
            style={{ fontSize: "0.8rem", color: "#007BFF", marginTop: "0.25rem", cursor: "pointer", textDecoration: "underline" }}
            >
            View information
            </p>
            </div>

          </div>
        ))}
      </div>
    </div>

    <button
      onClick={() => scrollPlayers(760)} // scroll right
      style={{
        fontSize: "2rem",
        background: "none",
        border: "none",
        cursor: "pointer"
      }}
      aria-label="Next"
    >
      &#8250;
    </button>
  </div>
</section>


{isModalOpen && selectedPlayer && (
  <div className="modal-overlay">
    <div className="modal-content">
      <button onClick={closeModal} className="modal-close">×</button>
      <img
        src={process.env.PUBLIC_URL + selectedPlayer.image}
        alt={selectedPlayer.name}
        style={{ width: "100%", borderRadius: "8px" }}
      />
      <h2 style={{ marginTop: "1rem" }}>{selectedPlayer.name}</h2>
      <p>{selectedPlayer.country}</p>
      <p>{selectedPlayer.bio}</p>
    </div>
  </div>
)}
    </div>
  );
}


export default TeamsAndMatches;