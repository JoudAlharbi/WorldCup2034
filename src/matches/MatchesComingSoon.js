import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./matchesComingSoon.css";

const TARGET_DATE = new Date("2034-01-01T00:00:00");
const EMPTY = { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };

function getTimeRemaining(target, now) {
  if (target <= now) return EMPTY;
  let years = target.getFullYear() - now.getFullYear();
  let months = target.getMonth() - now.getMonth();
  let days = target.getDate() - now.getDate();
  let hours = target.getHours() - now.getHours();
  let minutes = target.getMinutes() - now.getMinutes();
  let seconds = target.getSeconds() - now.getSeconds();
  if (seconds < 0) { seconds += 60; minutes -= 1; }
  if (minutes < 0) { minutes += 60; hours -= 1; }
  if (hours < 0) { hours += 24; days -= 1; }
  if (days < 0) {
    days += new Date(target.getFullYear(), target.getMonth(), 0).getDate();
    months -= 1;
  }
  if (months < 0) { months += 12; years -= 1; }
  return { years, months, days, hours, minutes, seconds };
}

const pad = (n) => String(n).padStart(2, "0");

const FEATURES = [
  {
    icon: "calendar",
    title: "Match schedule coming soon",
    desc: "Official kick-off times and venues will be published ahead of the tournament.",
  },
  {
    icon: "stadium",
    title: "Group stage fixtures coming soon",
    desc: "Full group-stage pairings will be confirmed after the final draw.",
  },
  {
    icon: "trophy",
    title: "Knockout stage bracket coming soon",
    desc: "The road to the Final will be revealed as the tournament progresses.",
  },
  {
    icon: "countdown",
    title: "Live match updates",
    desc: "Real-time scores and status will be available during the tournament.",
  },
];

const Icon = ({ type }) => {
  const icons = {
    calendar: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 11h5v5H7zM19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 16H5V9h14z" />
      </svg>
    ),
    stadium: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
      </svg>
    ),
    trophy: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 5h-2V3H7v2H5a2 2 0 0 0-2 2v1a4 4 0 0 0 4 4 4 4 0 0 0 3-1.46V11H8v2h8v-2h-2V10.54A4 4 0 0 0 19 12a4 4 0 0 0 4-4V7a2 2 0 0 0-2-2zM5 10a2 2 0 0 1-2-2V7h2v3zm16-2a2 2 0 0 1-2 2V7h2v1zM12 16.5c-1.5 1.26-3 2-4 2.5V21h8v-2c-1-.5-2.5-1.24-4-2.5z" />
      </svg>
    ),
    countdown: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 11h5v-2h-4V7h-2v6z" />
      </svg>
    ),
  };
  return <span className="mcs-icon">{icons[type]}</span>;
};

function MatchesComingSoon() {
  const [time, setTime] = useState(() => getTimeRemaining(TARGET_DATE, new Date()));

  useEffect(() => {
    const tick = () => setTime(getTimeRemaining(TARGET_DATE, new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="mcs" id="matches-section">
      <div className="mcs__inner">
        <header className="mcs__hero">
          <span className="mcs__eyebrow">Official Pre-Launch</span>
          <h2 className="mcs__title">FIFA World Cup 2034 Matches</h2>
          <p className="mcs__subtitle">
            The official match schedule and tournament fixtures will be announced closer to the event.
          </p>
        </header>

        <div className="mcs__countdown-section">
          <p className="mcs__section-label">Countdown to Kick-Off</p>
          <div className="mcs__countdown-wrap">
            <div className="mcs__countdown" aria-label="Countdown to FIFA World Cup 2034">
              {[
                { label: "Years", value: time.years },
                { label: "Months", value: time.months },
                { label: "Days", value: time.days },
                { label: "Hours", value: pad(time.hours) },
                { label: "Minutes", value: pad(time.minutes) },
                { label: "Seconds", value: pad(time.seconds) },
              ].map((u) => (
                <div className="mcs__unit" key={u.label}>
                  <span className="mcs__unit-num">{u.value}</span>
                  <span className="mcs__unit-lbl">{u.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mcs__info-section">
          <p className="mcs__section-label">What&apos;s Coming</p>
          <div className="mcs__card-grid">
            {FEATURES.map((f) => (
              <div className="mcs__feature" key={f.title}>
                <Icon type={f.icon} />
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mcs__actions">
          <Link className="mcs__btn mcs__btn--primary" to="/stadiums/riyadh">
            Explore Host Stadiums
          </Link>
          <Link className="mcs__btn mcs__btn--ghost" to="/cities">
            View Host Cities
          </Link>
        </div>

        <p className="mcs__note">
          Match schedules shown on fan websites are unofficial and subject to change.
        </p>
      </div>
    </section>
  );
}

export default MatchesComingSoon;
