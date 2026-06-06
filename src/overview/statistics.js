import React from "react";
import "./statistics.css";

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
    <section className="stats">
      <div className="stats__head">
        <h2 className="stats__title">2034 World Cup by the Numbers</h2>
        <p className="stats__subtitle">
          Key statistics and milestones for Saudi Arabia's FIFA World Cup 2034
        </p>
      </div>

      <div className="stats__grid">
        {statsData.map((item, index) => (
          <article className="stat-card" key={index}>
            <div className="stat-card__media">
              <img src={item.image} alt={item.label} loading="lazy" />
            </div>
            <div className="stat-card__body">
              <h3 className="stat-card__number">{item.number}</h3>
              <p className="stat-card__label">{item.label}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Statistics;
