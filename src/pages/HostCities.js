import React from "react";
import { Link } from "react-router-dom";
import "./hostcities.css";

const cities = [
  { name: "Riyadh", region: "Riyadh Province", stadiums: 6, image: `${process.env.PUBLIC_URL}/cities/riyadh.jpg` },
  { name: "Jeddah", region: "Makkah Province", stadiums: 4, image: `${process.env.PUBLIC_URL}/cities/jeddah.jpg` },
  { name: "Abha", region: "Asir Province", stadiums: 2, image: `${process.env.PUBLIC_URL}/cities/abha.jpg` },
  { name: "Al Khobar", region: "Eastern Province", stadiums: 2, image: `${process.env.PUBLIC_URL}/cities/alkhobar.jpg` },
  { name: "Neom", region: "Tabuk Province", stadiums: 2, image: `${process.env.PUBLIC_URL}/cities/neom.jpg` },
];

const LocationIcon = () => (
  <svg className="city-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
  </svg>
);

const HostCities = () => {
  return (
    <section className="cities">
      <div className="cities__head">
        <h2 className="cities__title">Official Host Cities</h2>
        <p className="cities__subtitle">
          Discover the cities that will welcome the world in FIFA World Cup 2034
        </p>
      </div>

      <div className="cities__grid">
        {cities.map((city, index) => {
          const slug = city.name.toLowerCase().replace(/\s+/g, "-");
          return (
            <article className="city-card" key={index}>
              <div className="city-card__media">
                <img src={city.image} alt={city.name} loading="lazy" />
                <div className="city-card__overlay">
                  <h3 className="city-card__name">{city.name}</h3>
                  <div className="city-card__meta">
                    <span className="city-card__region">
                      <LocationIcon />
                      {city.region}
                    </span>
                    {city.stadiums ? (
                      <span className="city-card__stadiums">
                        <span className="city-card__dot" />
                        {city.stadiums} stadiums
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="city-card__body">
                <Link className="city-cta" to={`/stadiums/${slug}`}>
                  Explore City
                  <span className="city-cta__arrow">→</span>
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default HostCities;
