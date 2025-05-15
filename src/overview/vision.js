import React from "react";

const Vision = () => {
  return (
    <div style={{ padding: "3rem 1rem", backgroundColor: "#f4f4f4" }}>
      <h2 style={{ textAlign: "center", fontSize: "1.75rem", fontWeight: "600", marginBottom: "2rem" }}>
        Saudi’s vision and Goal for the FIFA World Cup
      </h2>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
        {/* Image Side */}
        <div style={{ width: "400px", height: "250px", backgroundColor: "#ccc", borderRadius: "0.5rem", overflow: "hidden" }}>
          <img
            src={`${process.env.PUBLIC_URL}/overview/overview1.jpg`} 
            alt="Saudi Vision"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Text Side */}
        <div style={{ maxWidth: "400px", fontSize: "1rem", color: "#333", lineHeight: "1.6" }}>
          <p>
            The World Cup is an international soccer tournament contested by senior men’s national teams from various countries.
            It is one of the most popular international sporting competitions, with an estimated 1.5 billion fans tuning in
            to watch the 2022 final.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Vision;