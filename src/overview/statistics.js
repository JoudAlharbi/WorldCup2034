import React from "react";

const statsData = [
  {
    number: "75%",
    label: "sustainable stadiums",
    image: `${process.env.PUBLIC_URL}/overview/sustainablestadiums.jpg`
  },
  {
    number: "+320",
    label: "players and workers",
    image: `${process.env.PUBLIC_URL}/overview/playersandworkers.jpg`
  },
  {
    number: "+1200",
    label: "days and months of work and effort",
    image: `${process.env.PUBLIC_URL}/overview/workandeffort.jpg`
  },
  {
    number: "+12",
    label: "green spaces",
    image: `${process.env.PUBLIC_URL}/overview/greenspaces.jpg`
  },
  {
    number: "+35",
    label: "teams playing",
    image: `${process.env.PUBLIC_URL}/overview/teamsplaying.jpg`
  },
  {
    number: "+17",
    label: "tourists and visitors",
    image: `${process.env.PUBLIC_URL}/overview/touristsndvisitors.jpg`
  },
  {
    number: ">35,000",
    label: "workers and volunteers",
    image: `${process.env.PUBLIC_URL}/overview/workersandvolunteers.jpg`
  }
];

const Statistics = () => {
  return (
    <div style={{ padding: "3rem 1rem", backgroundColor: "#f4f4f4" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem"
        }}
      >
        {statsData.map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#e0e0e0",
              borderRadius: "0.75rem",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column"
            }}
          >
            {/* Image section that fills remaining space */}
            <div style={{ flexGrow: 1 }}>
              <img
                src={item.image}
                alt={item.label}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block"
                }}
              />
            </div>

            {/* Fixed-height gray box */}
            <div
              style={{
                height: "120px",
                padding: "1rem",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{item.number}</h3>
              <p style={{ fontSize: "0.9rem", color: "#555" }}>{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
