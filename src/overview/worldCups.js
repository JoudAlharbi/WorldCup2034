import React from "react";
import "./worldcups.css";

const worldCups = [
  { year: 2022, host: "Qatar", image: `${process.env.PUBLIC_URL}/overview/Qatar.jpg` },
  { year: 2026, host: "USA, Canada, Mexico", image: `${process.env.PUBLIC_URL}/overview/canada.jpg` },
  { year: 2030, host: "Morocco, Argentina, Spain", image: `${process.env.PUBLIC_URL}/overview/moroco.jpg` },
  { year: 2034, host: "Saudi Arabia", image: `${process.env.PUBLIC_URL}/overview/saudi1.jpg` },
];

const WorldCupTimeline = () => {
  const lastIndex = worldCups.length - 1;

  return (
    <section className="tl">
      <div className="tl__head">
        <h2 className="tl__title">Road to FIFA World Cup 2034</h2>
        <p className="tl__subtitle">From Qatar 2022 to Saudi Arabia 2034</p>
      </div>

      <div className="tl__events">
        {worldCups.map((cup, index) => {
          const isFuture = cup.year === 2034;
          return (
            <article className={`tl-event${isFuture ? " tl-event--future" : ""}`} key={index}>
              <div className="tl-card">
                {isFuture && <span className="tl-badge">Future Host</span>}
                <div className="tl-card__media">
                  <img src={cup.image} alt={`World Cup ${cup.year}`} loading="lazy" />
                </div>
                <div className="tl-card__body">
                  <p className="tl-card__host">{cup.host}</p>
                </div>
              </div>

              <div className="tl-node-wrap">
                {index < lastIndex && (
                  <span className="tl-line">
                    <span className="tl-line__fill" style={{ animationDelay: `${index * 0.3}s` }} />
                  </span>
                )}
                <span className="tl-node" />
                <span className="tl-year">{cup.year}</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default WorldCupTimeline;
