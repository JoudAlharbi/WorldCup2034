import React from "react";
import HostCities from "./HostCities";
import AdditionalCities from "./AdditionalCities";

const CitiesPage = () => {
  return (
    <div>
      {/* Hero / landing section */}
      <div
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/stadiums/main.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          height: "100vh",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "black",
            opacity: 0.5,
            zIndex: 0,
          }}
        ></div>

        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            padding: "0 4rem",
          }}
        >
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", maxWidth: "600px" }}>
            Discover the official host cities of FIFA World Cup 2034!
          </h1>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "1.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <a href="#cities">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{ color: "white", animation: "bounce 1s infinite" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
          <p style={{ fontSize: "0.875rem", marginTop: "0.5rem", color: "white" }}>scroll down</p>
        </div>
      </div>

      {/* Host Cities */}
      <section id="cities">
        <HostCities />
      </section>

      {/* Additional Cities */}
      <section id="additional-cities" style={{ backgroundColor: "white", padding: "5rem 0" }}>
        <AdditionalCities />
      </section>
    </div>
  );
};

export default CitiesPage;
