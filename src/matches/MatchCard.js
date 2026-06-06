import React from "react";
import { getFlagUrl } from "./matchesService";

const formatDate = (iso) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
};

const formatTime = (iso) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
};

const Team = ({ team }) => (
  <div className="mc-team">
    {team.code ? (
      <img
        className="mc-flag"
        src={getFlagUrl(team.code, 80)}
        alt={team.name}
        loading="lazy"
      />
    ) : (
      <span className="mc-flag mc-flag--tbd" aria-hidden="true">?</span>
    )}
    <span className="mc-team__name">{team.name}</span>
  </div>
);

function MatchCard({ match }) {
  return (
    <article className="mc">
      <div className="mc__top">
        <span className="mc-stage">{match.label || match.stage}</span>
        <span className="mc-status mc-status--upcoming">Upcoming</span>
      </div>

      <div className="mc__teams">
        <Team team={match.teamA} />
        <div className="mc-center">
          <span className="mc-vs">VS</span>
        </div>
        <Team team={match.teamB} />
      </div>

      <div className="mc__info">
        <div className="mc-info-row">
          <svg className="mc-ico" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 11h5v5H7zM19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 16H5V9h14z" />
          </svg>
          <span>{formatDate(match.date)} · {formatTime(match.date)}</span>
        </div>
        <div className="mc-info-row">
          <svg className="mc-ico" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
          </svg>
          <span>{match.stadium}, {match.city}</span>
        </div>
      </div>
    </article>
  );
}

export default MatchCard;
