import React from "react";
import { Link } from "react-router-dom";

const cities = [
  { name: "Riyadh", image: `${process.env.PUBLIC_URL}/cities/riyadh.jpg` },
  { name: "Jeddah", image: `${process.env.PUBLIC_URL}/cities/jeddah.jpg` },
  { name: "Abha", image: `${process.env.PUBLIC_URL}/cities/abha.jpg` },
  { name: "Al Khobar", image: `${process.env.PUBLIC_URL}/cities/alkhobar.jpg` },
  { name: "Neom", image: `${process.env.PUBLIC_URL}/cities/neom.jpg` },
];

const HostCities = () => {
  return (
    <div style={{ backgroundColor: "#f3f4f6", padding: "3rem 1rem" }}>
      <h2 style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: "600", marginBottom: "2rem" }}>
        The official Hosting Cities
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "2rem",
          flexWrap: "wrap"
        }}
      >
        {/* Riyadh Card (Left) */}
        <Link to="/stadiums/riyadh" style={{ textDecoration: "none", color: "inherit" }}>
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "0.5rem",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
              width: "256px",
              height: "505px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <img
              src={cities[0].image}
              alt={cities[0].name}
              style={{ width: "100%", height: "440px", objectFit: "cover" }}
            />
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                paddingBottom: "1.25rem",
                fontWeight: "500",
                fontSize: "1.125rem",
              }}
            >
              {cities[0].name}
            </div>
          </div>
        </Link>

        {/* Right Side - 2x2 Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1.5rem"
          }}
        >
          {cities.slice(1).map((city, index) => (
            <Link
              key={index}
              to={`/stadiums/${city.name.toLowerCase().replace(/\s+/g, '-')}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "0.5rem",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                  width: "240px",
                  height: "240px",
                }}
              >
                <img
                  src={city.image}
                  alt={city.name}
                  style={{ width: "100%", height: "176px", objectFit: "cover" }}
                />
                <div
                  style={{
                    padding: "1rem",
                    fontWeight: "500",
                    fontSize: "1.125rem",
                    textAlign: "center",
                  }}
                >
                  {city.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HostCities;
