import React from "react";

const goalsData = [
  {
    title: "Goal 1:",
    text: "Position Saudi Arabia as a global sports destination by hosting an exceptional World Cup that reflects the Kingdom’s progress and ambition, while promoting tourism and international engagement.",
    icon: "✈️", // Plane
  },
  {
    title: "Goal 2:",
    text: "Accelerate the development of world-class infrastructure and smart cities that support sustainable transportation, advanced stadiums, and a unique fan experience aligned with Vision 2030.",
    icon: "🌍", // Globe
  },
  {
    title: "Goal 3:",
    text: "Empower youth and communities by creating job opportunities, encouraging volunteerism, and inspiring national pride through inclusive participation in organizing and celebrating the tournament.",
    icon: "👤", // Man icon
  },
];

const Goals = () => {
  return (
    <div style={{ padding: "3rem 1rem", backgroundColor: "#f9f9f9" }}>
      <h2 style={{ textAlign: "center", fontSize: "1.75rem", fontWeight: "600", marginBottom: "2rem" }}>
        Saudi's 2034 World Cup Goals
      </h2>

      <div style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
        {goalsData.map((goal, index) => (
          <div
            key={index}
            style={{
              width: "300px",
              backgroundColor: "#fff",
              padding: "1rem",
              borderRadius: "0.5rem",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              textAlign: "left",
              borderTop: "2px solid #ddd"
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                fontSize: "2.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#eee",
                borderRadius: "0.5rem",
                marginBottom: "1rem"
              }}
            >
              {goal.icon}
            </div>
            <h3 style={{ fontWeight: "600", marginBottom: "0.5rem" }}>{goal.title}</h3>
            <p style={{ fontSize: "0.9rem", color: "#555" }}>{goal.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Goals;
