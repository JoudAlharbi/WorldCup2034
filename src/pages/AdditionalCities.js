import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import "./additionalcities.css";

const additionalCities = [
  { name: "Al Baha", region: "Al Baha Province", tag: "Nature", desc: "Mountain forests and cool highland air.", image: `${process.env.PUBLIC_URL}/cities/albaha.jpg` },
  { name: "Jazan", region: "Jazan Province", tag: "Coastal", desc: "Lush tropical coastline on the Red Sea.", image: `${process.env.PUBLIC_URL}/cities/jazan.jpg` },
  { name: "Taif", region: "Makkah Province", tag: "Highlands", desc: "The City of Roses in the western highlands.", image: `${process.env.PUBLIC_URL}/cities/taif.jpg` },
  { name: "Al Madinah", region: "Madinah Province", tag: "Heritage", desc: "A historic city of deep cultural significance.", image: `${process.env.PUBLIC_URL}/cities/almadinah.jpg` },
  { name: "Al Ula", region: "Madinah Province", tag: "Heritage", desc: "Ancient Nabataean wonders and desert vistas.", image: `${process.env.PUBLIC_URL}/cities/alula.jpg` },
  { name: "Umluj", region: "Tabuk Province", tag: "Coastal", desc: "Pristine islands often called Saudi's Maldives.", image: `${process.env.PUBLIC_URL}/cities/umluj.jpg` },
  { name: "Tabuk", region: "Tabuk Province", tag: "Adventure", desc: "Gateway to the northwest and NEOM.", image: `${process.env.PUBLIC_URL}/cities/tabuk.jpeg` },
  { name: "Hail", region: "Hail Province", tag: "Heritage", desc: "Desert heritage and historic rock art.", image: `${process.env.PUBLIC_URL}/cities/hail.jpg` },
  { name: "Al Ahsa", region: "Eastern Province", tag: "Oasis", desc: "The world's largest natural oasis.", image: `${process.env.PUBLIC_URL}/cities/alahsa.jpg` },
  { name: "Buraidah", region: "Qassim Province", tag: "Culture", desc: "Heart of Saudi date-farming traditions.", image: `${process.env.PUBLIC_URL}/cities/buraidah.jpg` }
];

const LocationIcon = () => (
  <svg className="acar-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
  </svg>
);

const getVisible = (w) => (w <= 560 ? 1 : w <= 900 ? 2 : 3);

const AdditionalCities = () => {
  const L = additionalCities.length;
  const [visible, setVisible] = useState(() =>
    getVisible(typeof window !== "undefined" ? window.innerWidth : 1200)
  );
  const N = visible;

  // Clone the last N to the front and the first N to the back for an infinite loop.
  const slides = useMemo(() => {
    const front = additionalCities.slice(L - N);
    const back = additionalCities.slice(0, N);
    return [...front, ...additionalCities, ...back];
  }, [N, L]);

  const [index, setIndex] = useState(N);
  const [animate, setAnimate] = useState(true);
  const lockRef = useRef(false);
  const touchX = useRef(null);

  useEffect(() => {
    const onResize = () => {
      const v = getVisible(window.innerWidth);
      setVisible((prev) => (prev === v ? prev : v));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Reset to the first real slide (no animation) whenever the visible count changes.
  useEffect(() => {
    setAnimate(false);
    setIndex(N);
  }, [N]);

  // Re-enable the transition on the next frame after a non-animated snap/reset.
  useEffect(() => {
    if (!animate) {
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(() => setAnimate(true))
      );
      return () => cancelAnimationFrame(id);
    }
  }, [animate]);

  const next = () => {
    if (lockRef.current) return;
    lockRef.current = true;
    setAnimate(true);
    setIndex((i) => i + 1);
  };

  const prev = () => {
    if (lockRef.current) return;
    lockRef.current = true;
    setAnimate(true);
    setIndex((i) => i - 1);
  };

  const handleTransitionEnd = () => {
    lockRef.current = false;
    if (index >= L + N) {
      setAnimate(false);
      setIndex(index - L);
    } else if (index < N) {
      setAnimate(false);
      setIndex(index + L);
    }
  };

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (dx > 40) prev();
    else if (dx < -40) next();
    touchX.current = null;
  };

  const offset = (index * 100) / visible;

  return (
    <section className="acar">
      <div className="acar__head">
        <h2 className="acar__title">Explore Additional Host Cities</h2>
        <p className="acar__subtitle">
          Discover more destinations that contribute to Saudi Arabia's World Cup vision.
        </p>
      </div>

      <div className="acar__stage">
        <button className="acar__arrow acar__arrow--prev" onClick={prev} aria-label="Previous cities">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>

        <div className="acar__viewport" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <div
            className="acar__track"
            style={{
              transform: `translateX(-${offset}%)`,
              transition: animate ? "transform 0.55s cubic-bezier(0.22, 0.61, 0.36, 1)" : "none",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {slides.map((city, i) => {
              const slug = city.name.toLowerCase().replace(/\s+/g, "-");
              return (
                <div className="acar__slide" key={i} style={{ flexBasis: `${100 / visible}%` }}>
                  <article className="acar-card">
                    <div className="acar-card__media">
                      <img src={city.image} alt={city.name} loading="lazy" />
                      {city.tag && <span className="acar-card__tag">{city.tag}</span>}
                      <div className="acar-card__overlay">
                        <h3 className="acar-card__name">{city.name}</h3>
                        <span className="acar-card__region">
                          <LocationIcon />
                          {city.region}
                        </span>
                      </div>
                    </div>
                    <div className="acar-card__body">
                      <p className="acar-card__desc">{city.desc}</p>
                      <Link className="acar-cta" to={`/additionalcities/${slug}`}>
                        Explore City
                        <span className="acar-cta__arrow">→</span>
                      </Link>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>

        <button className="acar__arrow acar__arrow--next" onClick={next} aria-label="Next cities">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8.59 16.59 10 18l6-6-6-6-1.41 1.41L13.17 12z" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default AdditionalCities;
