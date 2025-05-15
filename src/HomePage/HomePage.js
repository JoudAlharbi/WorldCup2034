import React, { useState, useEffect } from "react";
import "./HomePage.css";
import FifaNews from "./FifaNews";

function HomePage() {
  const [timeLeft, setTimeLeft] = useState({ months: 0, days: 0, hours: 0 });

  useEffect(() => {
    const targetDate = new Date("January 1, 2034 00:00:00");
    const updateCountdown = () => {
      const now = new Date();
      const total = targetDate - now;
      const totalHours = Math.floor(total / 1000 / 60 / 60);
      const totalDays = Math.floor(totalHours / 24);
      const totalMonths = Math.floor(totalDays / 30);
      setTimeLeft({
        months: totalMonths,
        days: totalDays % 30,
        hours: totalHours % 24,
      });
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="homepage">
      <section className="hero-section">
        <video autoPlay muted loop className="hero-video">
          <source
            src="https://fifa34wc.oss-me-central-1.aliyuncs.com/wp-content/uploads/2024/08/Homepage-27-with-ribbons-9x16-1.mp4"
            type="video/mp4"
          />
        </video>
        <div className="scroll-down">
          <span>Scroll Down</span>
          <a href="#countdown">
            <div className="arrow"></div>
          </a>
        </div>
      </section>

      <div className="countdown-wrapper">
        <div id="countdown" className="card countdown-card">
          <h2>Countdown</h2>
          <p>to 2034 FIFA World Cup</p>
          <div className="countdown-boxes">
            <div className="box">
              <h3>{timeLeft.months}</h3>
              <p>MONTHS</p>
            </div>
            <div className="box">
              <h3>{timeLeft.days}</h3>
              <p>DAYS</p>
            </div>
            <div className="box">
              <h3>{timeLeft.hours}</h3>
              <p>HOURS</p>
            </div>
          </div>
        </div>
        <div className="countdown-banner-overlay">
          <img
            src={`${process.env.PUBLIC_URL}/HomePage/purple.png`}
            alt="Banner"
          />
        </div>
      </div>

      <div className="card intro-card">
        <div className="intro-text">
          <h2>FIFA World Cup 2034</h2>
          <p>
            Saudi Arabia will proudly host the FIFA World Cup 2034, welcoming
            the world to experience its rich culture, modern stadiums, and
            vibrant cities. As the most anticipated football event globally, the
            tournament brings together nations to compete in thrilling matches
            while celebrating unity, passion, and the spirit of the game.
          </p>
        </div>
        <div className="intro-image">
          <img
            src={`${process.env.PUBLIC_URL}/HomePage/2.jpeg`}
            alt="FIFA 2034"
          />
        </div>
      </div>


             <FifaNews />


      <div id="map" className="card map-card">
        <h2 className="map-title">FIFA World Cup 2034 Hosting Cities</h2>
        <img
          src={`${process.env.PUBLIC_URL}/HomePage/3.jpg`}
          alt="Map"
          className="map-img"
        />
      </div>

      <div className="card sustainability-card">
        <div className="sustainability-top">
          <img
            src={`${process.env.PUBLIC_URL}/HomePage/sustainability.jpeg`}
            alt="Sustainable Stadium"
            className="sustainability-img"
          />
          <div className="sustainability-text">
            <h1>
              Fully Sustainable <br /> biodegradable stadiums
            </h1>
            <a
              href="https://www.archdaily.com/999661/sustainable-stadiums-saving-energy-and-water-in-large-sports-venues"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read More
            </a>
          </div>
        </div>
        <div className="sustain-subcards">
          <div className="subcard">
            <h3>Eco-friendly construction using recyclable materials</h3>
            <p>
              Saudi Arabia introduces world-class stadiums built with
              biodegradable materials, reducing carbon footprint and setting new
              standards for sustainable sports infrastructure.
            </p>
            <a
              href="https://www.fifa.com/about-fifa/news/fifa-and-qatar-sustainability-infrastructure"
              className="btn-link"
            >
              Read More
            </a>
          </div>
          <div className="subcard">
            <h3>Green energy and water-saving tech in every venue</h3>
            <p>
              From solar-powered lighting to advanced water recycling systems,
              each stadium is equipped with sustainable solutions that
              prioritize environmental conservation throughout the tournament.
            </p>
            <a
              href="https://www.archdaily.com/999661/sustainable-stadiums-saving-energy-and-water-in-large-sports-venues"
              className="btn-link"
            >
              Read More
            </a>
          </div>
        </div>
      </div>

      <div id="tickets" className="ticket-full-width">
        <img
          src={`${process.env.PUBLIC_URL}/HomePage/4.jpg`}
          alt="Tickets"
          className="ticket-img-full"
        />
        <div className="ticket-overlay-full"></div>
        <div className="ticket-content-full">
          <h2>Buy Your Ticket Now!</h2>
          <a
            href="https://saudi2034.com.sa/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="btn-filled">Buy</button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
