import React from "react";
import { useParams, Link } from "react-router-dom";

const cityDescriptions = {
  riyadh: "Riyadh, the capital of Saudi Arabia, is a vibrant metropolis blending modernity with rich traditions. It's the political, economic, and cultural center of the Kingdom, and a perfect host for major global events like FIFA World Cup 2034.",
  jeddah: "Jeddah, the gateway to Mecca, stands proudly by the Red Sea. Known for its cosmopolitan vibe, historical significance, and stunning waterfront, Jeddah promises an unforgettable World Cup experience.",
  abha: "Abha, nestled in the Asir mountains, offers a cooler climate and breathtaking landscapes. Its unique culture and natural beauty make it an exciting host city.",
  "al khobar": "Al Khobar, located on the Arabian Gulf coast, is a bustling modern city with beautiful corniches, malls, and vibrant community life. It’s a rising sports destination.",
  neom: "Neom represents the future of Saudi Arabia — a futuristic city blending innovation, nature, and cutting-edge technology. A bold and visionary setting for World Cup events.",
};

const stadiumsData = {
  riyadh: [
    { name: "King Salman International Stadium", location: "Al Naseem, Riyadh", image: `${process.env.PUBLIC_URL}/stadiums/kingsalman.png` },
    { name: "PRINCE FAISAL BIN FAHAD SPORTS CITY STADIUM", location: "Diriyah, Riyadh", image: `${process.env.PUBLIC_URL}/stadiums/faisal.png` },
    { name: "NEW MURABBA STADIUM", location: "Al Naseem, Riyadh", image: `${process.env.PUBLIC_URL}/stadiums/murabba.png` },
    { name: "KING FAHAD SPORTS CITY STADIUM", location: "Al Naseem, Riyadh", image: `${process.env.PUBLIC_URL}/stadiums/fahad.png` },
    { name: "KING SAUD UNIVERSITY STADIUM", location: "Al Naseem, Riyadh", image: `${process.env.PUBLIC_URL}/stadiums/saud.png` },
    { name: "QIDDIYA LARGE FESTIVAL GROUNDS", location: "Al Naseem, Riyadh", image: `${process.env.PUBLIC_URL}/stadiums/qid.png` },
  ],
  jeddah: [
    { name: "KING ABDULLAH ECONOMIC CITY STADIUM", location: "King Abdulaziz Rd, Jeddah", image: `${process.env.PUBLIC_URL}/stadiums/abdullah.png` },
    { name: "QIDDIYA COAST STADIUM", location: "Jeddah", image: `${process.env.PUBLIC_URL}/stadiums/qid_jed.png` },
    { name: "KING ABDULLAH SPORTS CITY STADIUM", location: "Jeddah", image: `${process.env.PUBLIC_URL}/stadiums/abdullah2.png` },
    { name: "JEDDAH CENTRAL DEVELOPMENT STADIUM", location: "Jeddah", image: `${process.env.PUBLIC_URL}/stadiums/jed_central.png` },
  ],
  abha: [
    { name: "KING KHALID UNIVERSITY STADIUM", location: "Abha", image: `${process.env.PUBLIC_URL}/stadiums/khalid_abha.png` },
    { name: "AL DHABAB PARK", location: "Abha", image: `${process.env.PUBLIC_URL}/stadiums/dhabab_abha.png` },
  ],
  "al khobar": [
    { name: "KING FAHAD PARK", location: "Al Khobar", image: `${process.env.PUBLIC_URL}/stadiums/alkhobar_fahad.png` },
    { name: "ARAMCO STADIUM", location: "Al Khobar", image: `${process.env.PUBLIC_URL}/stadiums/aramco_kh.png` },
  ],
  neom: [
    { name: "Marina Step", location: "Neom City", image: `${process.env.PUBLIC_URL}/stadiums/marina.png` },
    { name: "NEOM STADIUM", location: "Neom City", image: `${process.env.PUBLIC_URL}/stadiums/neomStad.png` },
  ],
};

const CityStadiums = () => {
  const { cityName } = useParams();
  const normalizedCityName = cityName.toLowerCase().replace(/-/g, " ");
  const stadiums = stadiumsData[normalizedCityName] || [];
  const description = cityDescriptions[normalizedCityName];

  return (
    <div style={{ backgroundColor: "#f3f4f6", minHeight: "100vh", paddingTop: "7rem", paddingBottom: "3rem", paddingLeft: "1.5rem", paddingRight: "1.5rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {description && (
        <div style={{ maxWidth: "64rem", backgroundColor: "#fff", borderRadius: "1rem", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", padding: "2rem", marginBottom: "3rem", textAlign: "center" }}>
          <h2 style={{ fontSize: "1.75rem", fontWeight: "bold", marginBottom: "1rem", textTransform: "capitalize" }}>{normalizedCityName}</h2>
          <p style={{ fontSize: "1.125rem", color: "#374151" }}>{description}</p>
        </div>
      )}

      {stadiums.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "1.25rem", color: "#6b7280" }}>No stadiums found for this city.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2.5rem", width: "100%", maxWidth: "1200px" }}>
          {stadiums.map((stadium, index) => (
            <div key={index} style={{ backgroundColor: "#fff", borderRadius: "0.75rem", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", overflow: "hidden", height: "350px", display: "flex", flexDirection: "column", transition: "transform 0.3s", cursor: "pointer" }}>
              <img src={stadium.image} alt={stadium.name} style={{ width: "100%", height: "160px", objectFit: "cover" }} />
              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", padding: "1rem" }}>
                <div style={{ textAlign: "center" }}>
                  <h3 style={{ fontWeight: "bold", fontSize: "1.125rem" }}>{stadium.name}</h3>
                  <p style={{ marginTop: "0.5rem", color: "#6b7280", fontSize: "0.875rem" }}><span role="img" aria-label="location">📍</span> {stadium.location}</p>
                </div>
                <Link to={`/stadiums/${normalizedCityName}/${index}`} style={{ marginTop: "1rem", backgroundColor: "#9747FF", color: "white", padding: "0.5rem 1rem", borderRadius: "0.375rem", fontSize: "0.875rem", textDecoration: "none" }}>
                  More Info
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CityStadiums;
