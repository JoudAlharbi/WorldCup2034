import React from "react";

const worldCups = [
  { year: 2022, host: "Qatar", image: `${process.env.PUBLIC_URL}/overview/Qatar.jpg` },
  { year: 2026, host: "USA, Canada, Mexico", image: `${process.env.PUBLIC_URL}/overview/canada.jpg` },
  { year: 2030, host: "Morocco, Argentina, Spain", image: `${process.env.PUBLIC_URL}/overview/moroco.jpg` },
  { year: 2034, host: "Saudi Arabia", image: `${process.env.PUBLIC_URL}/overview/saudi1.jpg` },
];

const WorldCupTimeline = () => {
  return (
    <div style={{ padding: "4rem 2rem", backgroundColor: "#f4f4f4" }}>
      <h2 style={{ textAlign: "center", fontSize: "2rem", fontWeight: "700", marginBottom: "2.5rem" }}>
        World Cup Timeline
      </h2>

      <div style={{ display: "flex", overflowX: "auto", gap: "2rem", paddingBottom: "1rem" }}>
        {worldCups.map((cup, index) => (
          <div
            key={index}
            style={{
              minWidth: "340px",
              maxWidth: "340px",
              backgroundColor: "#fff",
              borderRadius: "1rem",
              overflow: "hidden",
              boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
              flexShrink: 0,
            }}
          >
            <div style={{ height: "300px" }}>
              <img
                src={cup.image}
                alt={`World Cup ${cup.year}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ padding: "1.5rem", textAlign: "center" }}>
              <h3 style={{ fontSize: "1.5rem", margin: 0, fontWeight: "600" }}>{cup.year}</h3>
              <p style={{ fontSize: "1rem", color: "#555", marginTop: "0.5rem" }}>
                Hosted in {cup.host}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorldCupTimeline;
