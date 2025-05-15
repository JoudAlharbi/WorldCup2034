import React, { useState } from "react";
import { Link } from "react-router-dom";

const additionalCities = [
  { name: "Al Baha", image: `${process.env.PUBLIC_URL}/cities/albaha.jpg` },
  { name: "Jazan", image: `${process.env.PUBLIC_URL}/cities/jazan.jpg` },
  { name: "Taif", image: `${process.env.PUBLIC_URL}/cities/taif.jpg` },
  { name: "Al Madinah", image: `${process.env.PUBLIC_URL}/cities/almadinah.jpg` },
  { name: "Al Ula", image: `${process.env.PUBLIC_URL}/cities/alula.jpg` },
  { name: "Umluj", image: `${process.env.PUBLIC_URL}/cities/umluj.jpg` },
  { name: "Tabuk", image: `${process.env.PUBLIC_URL}/cities/tabuk.jpeg` },
  { name: "Hail", image: `${process.env.PUBLIC_URL}/cities/hail.jpg` },
  { name: "Al Ahsa", image: `${process.env.PUBLIC_URL}/cities/alahsa.jpg` },
  { name: "Buraidah", image: `${process.env.PUBLIC_URL}/cities/buraidah.jpg` }
]


const AdditionalCities = () => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCities = additionalCities.slice(startIndex, startIndex + 3);

  const handleNext = () => {
    if (startIndex + 3 >= additionalCities.length) {
      setStartIndex(0);
    } else {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex === 0) {
      setStartIndex(additionalCities.length - 3);
    } else {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div style={{ backgroundColor: "#f3f4f6", padding: "3rem 1rem", textAlign: "center" }}>
      <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1.5rem" }}>
        Explore Additional Host Cities!
      </h2>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1.5rem" }}>
        <button
          onClick={handlePrev}
          style={{
            fontSize: "2rem",
            padding: "0 0.5rem",
            background: "none",
            border: "none",
            cursor: "pointer"
          }}
          aria-label="Previous"
        >
          &#8249;
        </button>

        {visibleCities.map((city, index) => (
          <Link
            key={index}
            to={`/additionalcities/${city.name.toLowerCase().replace(/\s+/g, "-")}`}
            style={{
              backgroundColor: "#fff",
              borderRadius: "0.5rem",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              overflow: "hidden",
              width: "240px",
              height: "240px",
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <img
              src={city.image}
              alt={city.name}
              style={{ width: "100%", height: "176px", objectFit: "cover" }}
            />
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                paddingBottom: "1rem",
                fontWeight: "500",
                fontSize: "1.125rem"
              }}
            >
              {city.name}
            </div>
          </Link>
        ))}

        <button
          onClick={handleNext}
          style={{
            fontSize: "2rem",
            padding: "0 0.5rem",
            background: "none",
            border: "none",
            cursor: "pointer"
          }}
          aria-label="Next"
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default AdditionalCities;
