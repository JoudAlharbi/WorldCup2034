import React from "react";

const futurePlans = [
  {
    id: 1,
    title: "The future of sports in\nSaudi Arabia",
    image: `${process.env.PUBLIC_URL}/overview/future01.jpg`
  },
  {
    id: 2,
    title: "Saudi’s\nPreparations",
    image: `${process.env.PUBLIC_URL}/overview/future02.jpg`
  }
];

const Future = () => {
  return (
    <div style={{ padding: "3rem 1rem", backgroundColor: "#f4f4f4" }}>
      <h2 style={{ textAlign: "center", fontSize: "1.75rem", fontWeight: "600", marginBottom: "1.5rem" }}>
        Why Saudi as Hosting Country?
      </h2>
      <p style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 2.5rem", color: "#555", fontSize: "1rem" }}>
        The World Cup is an international soccer tournament contested by senior men’s national teams from various countries. 
        It is one of the most popular international sporting events.
      </p>

      <div style={{ display: "flex", overflowX: "auto", gap: "1.5rem", paddingBottom: "1rem", justifyContent: "center" }}>
        {futurePlans.map((plan, index) => (
          <div
            key={index}
            style={{
              minWidth: "300px",
              backgroundColor: "#e0e0e0",
              borderRadius: "0.5rem",
              overflow: "hidden",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              flexShrink: 0
            }}
          >
            <div style={{ height: "340px", backgroundColor: "#ccc" }}>
              <img
                src={plan.image}
                alt={plan.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }}
              />
            </div>
            <div style={{ padding: "1rem", textAlign: "center" }}>
              <h3
                style={{
                  fontSize: "1.25rem",
                  margin: 0,
                  whiteSpace: "pre-line" // ✅ Allows \n to create a line break
                }}
              >
                {plan.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Future;
