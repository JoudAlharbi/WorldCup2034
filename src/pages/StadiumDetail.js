import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const stadiumsData = {
  riyadh: [
    {
      name: "King Salman International Stadium",
      location: "Al Naseem, Riyadh",
      image: `${process.env.PUBLIC_URL}/stadiums/kingsalman.png`,
      description:
        "King Salman International Stadium is a newly planned world-class stadium located in Riyadh. Designed to host global events, it will feature state-of-the-art facilities and cutting-edge architecture, becoming one of the Middle East's premier sporting venues.",
      ticketsLink: "#",
    },
    {
      name: "PRINCE FAISAL BIN FAHAD SPORTS CITY STADIUM",
      location: "Diriyah, Riyadh",
      image: `${process.env.PUBLIC_URL}/stadiums/faisal.png`,
      description:
        "One of Riyadh’s historical stadiums, Prince Faisal bin Fahad Stadium has witnessed major national tournaments and international qualifiers, with recent renovations to boost capacity and enhance fan experience.",
      ticketsLink: "#",
    },
    {
      name: "NEW MURABBA STADIUM",
      location: "Al Naseem, Riyadh",
      image: `${process.env.PUBLIC_URL}/stadiums/murabba.png`,
      description:
        "Part of the New Murabba project, this stadium will blend futuristic design with traditional Saudi elements, offering an immersive venue for sporting and entertainment spectacles.",
      ticketsLink: "#",
    },
    {
      name: "KING FAHAD SPORTS CITY STADIUM",
      location: "Al Naseem, Riyadh",
      image: `${process.env.PUBLIC_URL}/stadiums/fahad.png`,
      description:
        "Known for hosting major football matches and cup finals, King Fahad Stadium is a legendary Saudi sports landmark with a capacity exceeding 60,000 spectators.",
      ticketsLink: "#",
    },
    {
      name: "KING SAUD UNIVERSITY STADIUM",
      location: "Al Naseem, Riyadh",
      image: `${process.env.PUBLIC_URL}/stadiums/saud.png`,
      description:
        "Built inside King Saud University, this stadium offers an intimate viewing experience and has become a favorite venue for top-tier Saudi club matches and events.",
      ticketsLink: "#",
    },
    {
      name: "QIDDIYA LARGE FESTIVAL GROUNDS",
      location: "Al Naseem, Riyadh",
      image: `${process.env.PUBLIC_URL}/stadiums/qid.png`,
      description:
        "Part of Qiddiya’s mega-development, the Festival Grounds will host concerts, sporting events, and large public gatherings, redefining entertainment experiences in the Kingdom.",
      ticketsLink: "#",
    },
  ],
  jeddah: [
    {
      name: "KING ABDULLAH ECONOMIC CITY STADIUM",
      location: "King Abdulaziz Rd, Jeddah",
      image: `${process.env.PUBLIC_URL}/stadiums/abdullah.png`,
      description:
        "Set in the emerging King Abdullah Economic City, this modern stadium will serve as a hub for sporting excellence and innovation along Saudi’s Red Sea coast.",
      ticketsLink: "#",
    },
    {
      name: "QIDDIYA COAST STADIUM",
      location: "Jeddah",
      image: `${process.env.PUBLIC_URL}/stadiums/qid_jed.png`,
      description:
        "Qiddiya Coast Stadium brings futuristic architecture to the Red Sea shores, focusing on sustainability and advanced fan experiences through smart technology.",
      ticketsLink: "#",
    },
    {
      name: "KING ABDULLAH SPORTS CITY STADIUM",
      location: "Jeddah",
      image: `${process.env.PUBLIC_URL}/stadiums/abdullah2.png`,
      description:
        "Nicknamed the Jewel, this stunning stadium regularly hosts Pro League matches, Super Cups, and international fixtures, with a capacity of 62,000 fans.",
      ticketsLink: "#",
    },
    {
      name: "JEDDAH CENTRAL DEVELOPMENT STADIUM",
      location: "Jeddah",
      image: `${process.env.PUBLIC_URL}/stadiums/jed_central.png`,
      description:
        "Part of Jeddah’s massive regeneration plan, this new stadium will symbolize Saudi Arabia’s vision for global urban excellence and cutting-edge sports facilities.",
      ticketsLink: "#",
    },
  ],
  abha: [
    {
      name: "KING KHALID UNIVERSITY STADIUM",
      location: "Abha",
      image: `${process.env.PUBLIC_URL}/stadiums/khalid_abha.png`,
      description:
        "Serving King Khalid University and the Abha community, this stadium supports both academic tournaments and local professional football matches in the southern region.",
      ticketsLink: "#",
    },
    {
      name: "AL DHABAB PARK",
      location: "Abha",
      image: `${process.env.PUBLIC_URL}/stadiums/dhabab_abha.png`,
      description:
        "Al Dhabab Park combines scenic greenery with a modest stadium, offering a refreshing atmosphere for sports, jogging, and family activities in the cool climate of Abha.",
      ticketsLink: "#",
    },
  ],
  "al khobar": [
    {
      name: "KING FAHAD PARK",
      location: "Al Khobar",
      image: `${process.env.PUBLIC_URL}/stadiums/alkhobar_fahad.png`,
      description:
        "King Fahad Park is one of Al Khobar’s largest green spaces, housing a multi-use stadium that hosts local football games, festivals, and sports exhibitions.",
      ticketsLink: "#",
    },
    {
      name: "ARAMCO STADIUM",
      location: "Al Khobar",
      image: `${process.env.PUBLIC_URL}/stadiums/aramco_kh.png`,
      description:
        "Managed by Saudi Aramco, this private stadium serves company sports leagues and local community activities, combining professional-grade turf with recreational amenities.",
      ticketsLink: "#",
    },
  ],
  neom: [
    {
      name: "Marina Step",
      location: "Neom City",
      image: `${process.env.PUBLIC_URL}/stadiums/marina.png`,
      description:
        "Marina Step is an ultra-modern waterside stadium designed for aquatic sports, beach events, and entertainment extravaganzas, located in Saudi Arabia’s futuristic Neom project.",
      ticketsLink: "#",
    },
    {
      name: "NEOM STADIUM",
      location: "Neom City",
      image: `${process.env.PUBLIC_URL}/stadiums/neomStad.png`,
      description:
        "Set against Neom’s breathtaking desert and coastal landscapes, Neom Stadium promises to become a marvel of sustainable architecture and high-tech entertainment.",
      ticketsLink: "#",
    },
  ],
};

const StadiumDetail = () => {
  const { cityName, stadiumId } = useParams();
  const navigate = useNavigate();

  const normalizedCityName = cityName.toLowerCase().replace(/-/g, " ");
  const stadiums = stadiumsData[normalizedCityName] || [];
  const stadium = stadiums[stadiumId];

  if (!stadium) {
    return (
      <div style={{ textAlign: "center", marginTop: "5rem", fontSize: "1.5rem" }}>
        Stadium not found.
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#e5e7eb",
        minHeight: "100vh",
        padding: "4rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Stadium Card */}
      <div
        style={{
          width: "100%",
          maxWidth: "80rem",
          backgroundColor: "#fff",
          borderRadius: "0.75rem",
          boxShadow: "0 0 12px rgba(0,0,0,0.1)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {/* Image */}
        <div style={{ flex: 1 }}>
          <img
            src={stadium.image}
            alt={stadium.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>

        {/* Text */}
        <div
          style={{
            flex: 1,
            padding: "2.5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "1.5rem",
          }}
        >
          <h2 style={{ fontSize: "2rem", fontWeight: "bold" }}>{stadium.name}</h2>
          <p style={{ fontSize: "1rem", color: "#333", lineHeight: "1.7" }}>
            {stadium.description}
          </p>
          <p style={{ fontSize: "1rem", color: "#555" }}><span role="img" aria-label="location">📍</span> {stadium.location}</p>
          <a
            href={stadium.ticketsLink}
            style={{
              color: "#000",
              fontSize: "1rem",
              textDecoration: "underline",
              marginTop: "0.5rem",
            }}
          >
            Click here for tickets
          </a>
        </div>
      </div>

      {/* Back Button - below card */}
      <button
        onClick={() => navigate(-1)}
        style={{
          marginTop: "2.5rem",
          padding: "0.75rem 1.5rem",
          backgroundColor: "#9747FF",
          color: "white",
          fontSize: "1rem",
          borderRadius: "9999px",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        ← Back
      </button>
    </div>
  );
};

export default StadiumDetail;
