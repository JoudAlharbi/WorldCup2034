import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TeamSlot from "./TeamSlot";
import {
  formatLongDate,
  formatTime,
  getStadiumPath,
  pad,
  getCountdown,
} from "./matchUtils";

function FeaturedMatch({ match }) {
  const target = new Date(match.date).getTime();
  const [time, setTime] = useState(() => getCountdown(target));

  useEffect(() => {
    const tick = () => setTime(getCountdown(target));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const stadiumPath = getStadiumPath(match);
  const bg = match.stadiumImage;

  return (
    <div className="fm">
      <div
        className="fm__bg"
        style={bg ? { backgroundImage: `url(${bg})` } : undefined}
      />
      <div className="fm__overlay" />
      <div className="fm__content">
        <span className="fm__badge">Next Match · {match.stage}</span>

        <div className="fm__teams">
          <TeamSlot team={match.teamA} size="lg" />
          <span className="fm-vs">VS</span>
          <TeamSlot team={match.teamB} size="lg" />
        </div>

        <div className="fm__countdown" aria-label="Time until kickoff">
          {[
            { label: "Days", value: time.days },
            { label: "Hrs", value: pad(time.hours) },
            { label: "Min", value: pad(time.minutes) },
            { label: "Sec", value: pad(time.seconds) },
          ].map((u) => (
            <div className="fm-unit" key={u.label}>
              <span className="fm-unit__num">{u.value}</span>
              <span className="fm-unit__lbl">{u.label}</span>
            </div>
          ))}
        </div>

        <div className="fm__meta">
          <span className="fm__city">{match.city}</span>
          <span className="fm__dot" />
          <span>{formatLongDate(match.date)} · {formatTime(match.date)}</span>
          <span className="fm__dot" />
          <span>{match.stadium}</span>
        </div>

        <div className="fm__actions">
          {stadiumPath && (
            <Link className="fm__cta fm__cta--outline" to={stadiumPath}>
              View Stadium
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default FeaturedMatch;
