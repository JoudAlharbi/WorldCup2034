import React from "react";
import { Link } from "react-router-dom";
import TeamSlot from "./TeamSlot";
import MatchCountdown from "./MatchCountdown";
import {
  formatDate,
  formatTime,
  getStadiumPath,
  hasUndeterminedTeams,
  isKnockoutMatch,
} from "./matchUtils";

function MatchCard({ match, variant = "grid" }) {
  const stadiumPath = getStadiumPath(match);
  const showKnockoutNote = isKnockoutMatch(match) && hasUndeterminedTeams(match);

  return (
    <article className={`mc mc--${variant}`}>
      <div className="mc__media">
        <img
          className="mc__stadium-img"
          src={match.stadiumImage}
          alt={match.stadium}
          loading="lazy"
        />
        <span className="mc__city-badge">{match.city}</span>
      </div>

      <div className="mc__body">
        <div className="mc__top">
          <span className="mc-stage">{match.label || match.stage}</span>
          <span className="mc-status mc-status--upcoming">Upcoming</span>
        </div>

        <div className="mc__teams">
          <TeamSlot team={match.teamA} />
          <div className="mc-center">
            <span className="mc-vs">VS</span>
          </div>
          <TeamSlot team={match.teamB} />
        </div>

        {showKnockoutNote && (
          <p className="mc__knockout-note">
            Qualified teams will appear after the group stage concludes.
          </p>
        )}

        <MatchCountdown date={match.date} compact />

        <div className="mc__info">
          <div className="mc-info-row">
            <svg className="mc-ico" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 11h5v5H7zM19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 16H5V9h14z" />
            </svg>
            <span>
              {formatDate(match.date)} · {formatTime(match.date)}
            </span>
          </div>
          <div className="mc-info-row">
            <svg className="mc-ico" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
            </svg>
            <span>{match.stadium}</span>
          </div>
        </div>

        {stadiumPath && (
          <Link className="mc__cta" to={stadiumPath}>
            View Stadium <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </article>
  );
}

export default MatchCard;
