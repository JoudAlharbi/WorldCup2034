import React, { useEffect, useState } from "react";
import { getFlagUrl } from "./matchesService";

function getCountdown(target, now) {
  const total = target - now;
  if (total <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds, done: false };
}

const pad = (n) => String(n).padStart(2, "0");

const formatDate = (iso) =>
  new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));

const formatTime = (iso) =>
  new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit" }).format(
    new Date(iso)
  );

function FeaturedMatch({ match }) {
  const target = new Date(match.date).getTime();
  const [time, setTime] = useState(() => getCountdown(target, Date.now()));

  useEffect(() => {
    const tick = () => setTime(getCountdown(target, Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <div className="fm">
      <div className="fm__bg" />
      <div className="fm__content">
        <span className="fm__badge">Next Match · {match.stage}</span>

        <div className="fm__teams">
          <div className="fm-team">
            {match.teamA.code ? (
              <img className="fm-flag" src={getFlagUrl(match.teamA.code, 160)} alt={match.teamA.name} />
            ) : (
              <span className="fm-flag fm-flag--tbd" aria-hidden="true">?</span>
            )}
            <span className="fm-team__name">{match.teamA.name}</span>
          </div>

          <span className="fm-vs">VS</span>

          <div className="fm-team">
            {match.teamB.code ? (
              <img className="fm-flag" src={getFlagUrl(match.teamB.code, 160)} alt={match.teamB.name} />
            ) : (
              <span className="fm-flag fm-flag--tbd" aria-hidden="true">?</span>
            )}
            <span className="fm-team__name">{match.teamB.name}</span>
          </div>
        </div>

        <div className="fm__countdown" aria-label="Time until kickoff">
          <div className="fm-unit"><span className="fm-unit__num">{time.days}</span><span className="fm-unit__lbl">Days</span></div>
          <div className="fm-unit"><span className="fm-unit__num">{pad(time.hours)}</span><span className="fm-unit__lbl">Hrs</span></div>
          <div className="fm-unit"><span className="fm-unit__num">{pad(time.minutes)}</span><span className="fm-unit__lbl">Min</span></div>
          <div className="fm-unit"><span className="fm-unit__num">{pad(time.seconds)}</span><span className="fm-unit__lbl">Sec</span></div>
        </div>

        <div className="fm__meta">
          <span>{formatDate(match.date)} · {formatTime(match.date)}</span>
          <span className="fm__dot" />
          <span>{match.stadium}, {match.city}</span>
        </div>

        <a className="fm__cta" href="https://saudi2034.com.sa/" target="_blank" rel="noopener noreferrer">
          Get Tickets
        </a>
      </div>
    </div>
  );
}

export default FeaturedMatch;
