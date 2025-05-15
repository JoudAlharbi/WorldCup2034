import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const newsData = [
  {
    id: '1',
    title: "FIFA World Cup 2034 Hosted in Saudi!",
    image: "/news/saudi-team.png",
    category: "General",
    content: `Saudi Arabia will host the FIFA World Cup in 2034, marking a historic moment for the region. The decision was met with celebration across the Kingdom, as the country continues to establish itself as a global hub for major sporting events.

The tournament will span across 11 modern stadiums, designed with sustainability in mind. Saudi officials have pledged a fan-centric experience with advanced transportation, entertainment, and cultural programs that showcase the Kingdom’s heritage.

This event is expected to bring millions of visitors and significantly boost the national economy.`
  },
  {
    id: '2',
    title: "Guess who broke his leg in today’s match?",
    image: "/news/injury.jpg",
    category: "Players",
    content: `In a shocking turn of events, Portugal's star striker sustained a serious leg injury during today's intense match against Germany. Medics rushed to the field as the player went down following a collision near the penalty box.

He was immediately taken off the field and later transported to a nearby hospital for further evaluation. Early reports suggest a potential fracture that could sideline him for the remainder of the tournament.

This injury has raised concerns about Portugal's chances moving forward, as the player was a key figure in their strategy. Messages of support have poured in from fans around the world.`
  },
  {
    id: '3',
    title: "Join us for a fire concert mid-game for full boost!",
    image: "/news/concert.png",
    category: "Music",
    content: `To spice things up between halves, FIFA has arranged a spectacular mid-game concert during the semi-finals. Featuring global pop sensations and local artists, the concert will be held right inside the stadium with a vibrant stage setup and cutting-edge sound and lighting systems.

This musical intermission aims to elevate the energy of the fans and provide entertainment beyond the pitch. Interactive LED wristbands and fireworks will add to the ambiance, promising an electrifying halftime experience.

Attendees are advised to arrive early to enjoy pre-show events and exclusive merchandise giveaways.`
  },
  {
    id: '4',
    title: "We’re selling tickets half price tomorrow morning!",
    image: "/news/tickets.png",
    category: "General",
    content: `Great news for fans! FIFA 2034 organizers have announced a one-day flash sale for match tickets, offering up to 50% discounts on selected games. This initiative aims to make the tournament more accessible to local and international fans.

The sale starts tomorrow at 9 AM via the official FIFA ticketing website. Fans are encouraged to act quickly as demand is expected to be high.`
  }
];

function NewsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const newsItem = newsData.find(item => item.id === id);

  if (!newsItem) return <h2 style={{ padding: "2rem", textAlign: "center" }}>News Not Found</h2>;

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <div style={{
        width: "100%",
        height: newsItem.id === '2' || newsItem.id === '3' ? "300px" : "400px",
        overflow: "hidden",
        borderRadius: "12px",
        marginBottom: "1.5rem"
      }}>
        <img
          src={process.env.PUBLIC_URL + newsItem.image}
          alt={newsItem.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: newsItem.id === '2' || newsItem.id === '3' ? "contain" : "cover",
            display: "block"
          }}
        />
      </div>

      <h1 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>{newsItem.title}</h1>
      <p style={{ color: "#777", fontSize: "0.9rem", marginBottom: "1rem" }}>{newsItem.category}</p>
      <p style={{ fontSize: "1.1rem", lineHeight: "1.8", whiteSpace: "pre-line" }}>{newsItem.content}</p>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: "0.6rem 1.5rem",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "1rem"
          }}
        >
          ← Back to News
        </button>
      </div>
    </div>
  );
}

export default NewsDetails;
