import React, { useEffect, useState } from "react";
import { getCountdown, pad } from "./matchUtils";

function MatchCountdown({ date, compact = false }) {
  const target = new Date(date).getTime();
  const [time, setTime] = useState(() => getCountdown(target));

  useEffect(() => {
    const tick = () => setTime(getCountdown(target));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  if (time.done) return null;

  if (compact) {
    return (
      <div className="mc-countdown mc-countdown--compact" aria-label="Time until kickoff">
        <span className="mc-countdown__label">Kick-off in</span>
        <span className="mc-countdown__value">
          {time.days}d {pad(time.hours)}h {pad(time.minutes)}m
        </span>
      </div>
    );
  }

  return (
    <div className="mc-countdown" aria-label="Time until kickoff">
      {[
        { label: "Days", value: time.days },
        { label: "Hrs", value: pad(time.hours) },
        { label: "Min", value: pad(time.minutes) },
        { label: "Sec", value: pad(time.seconds) },
      ].map((u) => (
        <div className="mc-countdown__unit" key={u.label}>
          <span className="mc-countdown__num">{u.value}</span>
          <span className="mc-countdown__lbl">{u.label}</span>
        </div>
      ))}
    </div>
  );
}

export default MatchCountdown;
