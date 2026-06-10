// import React from 'react';
import React, { useState } from 'react';import './TeamsAndMatches.css';
// import { Hero } from './PlayZone';
import Hero from './components/Hero';
import { Link } from 'react-router-dom';
import MatchesComingSoon from './matches/MatchesComingSoon';


function scrollTeams(amount) {
  const container = document.getElementById("teams-scroll");
  if (container) {
    container.scrollBy({ left: amount, behavior: "smooth" });
  }
}
function scrollPlayers(amount) {
  const container = document.getElementById("players-scroll");
  if (container) {
    container.scrollBy({ left: amount, behavior: "smooth" });
  }
}

function TeamsAndMatches() {
  
const [selectedPlayer, setSelectedPlayer] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedTeam, setSelectedTeam] = useState(null);

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


{/* Teams Section */}
<section className="teams-section" style={{ padding: "3rem 1rem", textAlign: "center" }}>
  <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "2rem" }}>Teams</h2>

  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1.5rem" }}>
    <button
      onClick={() => scrollTeams(-220)}
      style={{
        fontSize: "2rem",
        padding: "0 0.5rem",
        background: "none",
        border: "none",
        cursor: "pointer"
      }}
      aria-label="Previous"
    >
      &#8249;
    </button>

    <div id="teams-scroll" style={{
      display: "flex",
      gap: "1.5rem",
      overflow: "hidden",
      scrollBehavior: "smooth",
      width: "660px",
      padding: "0"
    }}>
      {[
        { name: "Saudi Arabia", image: "/teams/saff-logo.png", info: "The Saudi national team is one of Asia’s most successful football teams." },
        { name: "France", image: "/teams/fff-logo.png", info: "France is a two-time World Cup winner known for producing top-tier talent." },
        { name: "Portugal", image: "/teams/fpf-logo.png", info: "Portugal boasts legends like Cristiano Ronaldo and a strong recent record." },
        { name: "Argentina", image: "/teams/afa-logo.png", info: "Argentina, home of Messi and Maradona, is a football powerhouse." },
        { name: "Brazil", image: "/teams/cbf-logo.png", info: "Brazil has won the most World Cups in history – five!" },
        { name: "England", image: "/teams/england-logo.png", info: "England, birthplace of football, won the World Cup in 1966." },
        { name: "Italy", image: "/teams/italy-logo.png", info: "Italy is known for its strong defense and four World Cup titles." },
        { name: "Spain", image: "/teams/spain-logo.png", info: "Spain dominated world football in 2008-2012 with a golden generation." }
      ].map((team, index) => {
        const isActive = selectedTeam === index;
        return (
          <div key={index} style={{ width: "200px", textAlign: "center", cursor: "pointer" }} onClick={() => setSelectedTeam(isActive ? null : index)}>
            <img
              src={process.env.PUBLIC_URL + team.image}
              alt={team.name}
              style={{ width: "200px", height: "200px", objectFit: "contain" }}
            />
            <p style={{ marginTop: "0.75rem", fontWeight: "500" }}>{team.name}</p>
            {isActive && (
              <div style={{
                marginTop: "0.5rem",
                backgroundColor: "#f9f9f9",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                fontSize: "0.85rem",
                color: "#333"
              }}>
                {team.info}
              </div>
            )}
          </div>
        );
      })}
    </div>

    <button
      onClick={() => scrollTeams(220)}
      style={{
        fontSize: "2rem",
        padding: "0 0.5rem",
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


{/* News Feed Section */}
<section className="news-section">
  <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>News Feed</h2>
  <div style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap" }}>

    {/* Left: Main News Card */}
    <Link to="/news/1" style={{ textDecoration: "none", color: "inherit" }}>
      <div
        style={{
          backgroundColor: "#fff",
          width: "580px",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 6px 12px rgba(0,0,0,0.08)",
        }}
      >
        <img
          src={process.env.PUBLIC_URL + "/news/saudi-team.png"}
          alt="FIFA News"
          style={{ width: "100%", height: "auto", objectFit: "cover" }}
        />
        <div style={{ padding: "1.25rem" }}>
          <h3 style={{ fontWeight: "700", fontSize: "1.125rem", marginBottom: "0.5rem" }}>
            FIFA World Cup 2034 Hosted in Saudi!
          </h3>
          <p style={{ fontSize: "0.95rem", color: "#555" }}>
            The finals tournament is held every four years. In the other years there are only qualifiers (qualifying tournaments) in the six FIFA world regions. These amazing games help to decide which teams will move on.
          </p>
        </div>
      </div>
    </Link>

    {/* Right: Vertical News Cards */}
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

      {/* News 1 */}
      <Link to="/news/2" style={{ textDecoration: "none", color: "inherit" }}>
        <div
          style={{
            backgroundColor: "#fff",
            display: "flex",
            gap: "1.25rem",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 6px 12px rgba(0,0,0,0.08)",
            width: "420px",
            height: "180px",
          }}
        >
          <img
            src={process.env.PUBLIC_URL + "/news/injury.jpg"}
            alt="Injury"
            style={{ width: "190px", height: "180px", objectFit: "cover" }}
          />
          <div style={{ paddingTop: "1rem", paddingRight: "0.75rem" }}>
            <small style={{ fontSize: "0.85rem", color: "gray" }}>Players</small>
            <p style={{ fontSize: "1rem", fontWeight: "500", marginTop: "6px" }}>
              Guess who broke his leg in today’s match?
            </p>
          </div>
        </div>
      </Link>

      {/* News 2 */}
      <Link to="/news/3" style={{ textDecoration: "none", color: "inherit" }}>
        <div
          style={{
            backgroundColor: "#fff",
            display: "flex",
            gap: "1.25rem",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 6px 12px rgba(0,0,0,0.08)",
            width: "420px",
            height: "180px",
          }}
        >
          <img
            src={process.env.PUBLIC_URL + "/news/concert.png"}
            alt="Concert"
            style={{ width: "190px", height: "180px", objectFit: "cover" }}
          />
          <div style={{ paddingTop: "1rem", paddingRight: "0.75rem" }}>
            <small style={{ fontSize: "0.85rem", color: "gray" }}>Music</small>
            <p style={{ fontSize: "1rem", fontWeight: "500", marginTop: "6px" }}>
              Join us for a fire concert mid-game for full boost!
            </p>
          </div>
        </div>
      </Link>

      {/* News 3 */}
      <Link to="/news/4" style={{ textDecoration: "none", color: "inherit" }}>
        <div
          style={{
            backgroundColor: "#fff",
            display: "flex",
            gap: "1.25rem",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 6px 12px rgba(0,0,0,0.08)",
            width: "420px",
            height: "180px",
          }}
        >
          <img
            src={process.env.PUBLIC_URL + "/news/tickets.png"}
            alt="Tickets"
            style={{ width: "190px", height: "180px", objectFit: "cover" }}
          />
          <div style={{ paddingTop: "1rem", paddingRight: "0.75rem" }}>
            <small style={{ fontSize: "0.85rem", color: "gray" }}>General</small>
            <p style={{ fontSize: "1rem", fontWeight: "500", marginTop: "6px" }}>
              We’re selling tickets half price tomorrow morning!
            </p>
          </div>
        </div>
      </Link>

    </div>
  </div>
</section>

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