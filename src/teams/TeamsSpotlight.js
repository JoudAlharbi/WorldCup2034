import React, { useCallback, useEffect, useRef, useState } from "react";
import "./teamsSpotlight.css";

const FEATURED_NATIONS = [
  { name: "Saudi Arabia", image: "/teams/saff-logo.png" },
  { name: "France", image: "/teams/fff-logo.png" },
  { name: "Portugal", image: "/teams/fpf-logo.png" },
  { name: "Argentina", image: "/teams/afa-logo.png" },
  { name: "Brazil", image: "/teams/cbf-logo.png" },
  { name: "England", image: "/teams/england-logo.png" },
  { name: "Italy", image: "/teams/italy-logo.png" },
  { name: "Spain", image: "/teams/spain-logo.png" },
];

const SCROLL_STEP = 244;

function TeamsSpotlight() {
  const trackRef = useRef(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollPrev(el.scrollLeft > 4);
    setCanScrollNext(el.scrollLeft < maxScroll - 4);
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [updateScrollState]);

  const scroll = (direction) => {
    trackRef.current?.scrollBy({ left: direction * SCROLL_STEP, behavior: "smooth" });
  };

  return (
    <section className="tsp" id="teams-section" aria-labelledby="tsp-title">
      <div className="tsp__inner">
        <header className="tsp__header">
          <h2 className="tsp__title" id="tsp-title">
            National Teams Spotlight
          </h2>
          <p className="tsp__subtitle">
            Official qualification for the FIFA World Cup 2034 has not yet been completed.
            The teams displayed below are featured football nations and do not represent the
            final list of qualified participants.
          </p>
        </header>

        <div className="tsp__notice" role="note">
          <span className="tsp__notice-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 15h-2v-2h2zm0-4h-2V7h2z" />
            </svg>
          </span>
          <p>
            Qualification in progress — Official participating teams will be announced after
            the qualification stages conclude.
          </p>
        </div>

        <div className="tsp__carousel">
          <button
            type="button"
            className="tsp__nav tsp__nav--prev"
            onClick={() => scroll(-1)}
            disabled={!canScrollPrev}
            aria-label="Previous nations"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>

          <div
            className="tsp__track"
            ref={trackRef}
            onScroll={updateScrollState}
          >
            {FEATURED_NATIONS.map((nation) => (
              <article className="tsp__card" key={nation.name}>
                <div className="tsp__logo-wrap">
                  <img
                    src={process.env.PUBLIC_URL + nation.image}
                    alt={`${nation.name} national team emblem`}
                    className="tsp__logo"
                    loading="lazy"
                  />
                </div>
                <h3 className="tsp__name">{nation.name}</h3>
                <span className="tsp__badge">Featured Nation</span>
              </article>
            ))}
          </div>

          <button
            type="button"
            className="tsp__nav tsp__nav--next"
            onClick={() => scroll(1)}
            disabled={!canScrollNext}
            aria-label="Next nations"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z" />
            </svg>
          </button>
        </div>

        <p className="tsp__footnote">
          Featured nations are shown for illustrative purposes only. The official FIFA World
          Cup 2034 participant list will be published by FIFA following the completion of
          all qualification processes.
        </p>
      </div>
    </section>
  );
}

export default TeamsSpotlight;
