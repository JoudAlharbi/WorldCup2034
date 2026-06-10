import React from "react";
import { getFlagUrl } from "./matchesService";
import { isTeamDetermined } from "./matchUtils";

const FifaPlaceholder = ({ size = "md" }) => (
  <span className={`mc-ph mc-ph--${size}`} aria-hidden="true">
    <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="32" rx="4" fill="#eef1fb" />
      <circle cx="24" cy="14" r="7" stroke="#1b2559" strokeWidth="1.5" fill="none" opacity="0.35" />
      <path
        d="M24 9l1.8 3.6 4 .6-2.9 2.8.7 4L24 18.5l-3.6 1.9.7-4-2.9-2.8 4-.6z"
        fill="#d4af37"
        opacity="0.55"
      />
      <rect x="8" y="26" width="32" height="2" rx="1" fill="#1b2559" opacity="0.12" />
    </svg>
  </span>
);

function TeamSlot({ team, size = "md", align = "center" }) {
  const determined = isTeamDetermined(team);

  return (
    <div className={`mc-team mc-team--${align}`}>
      {determined ? (
        <img
          className={`mc-flag mc-flag--${size}`}
          src={getFlagUrl(team.code, size === "lg" ? 160 : 80)}
          alt={team.name}
          loading="lazy"
        />
      ) : (
        <FifaPlaceholder size={size} />
      )}
      {determined ? (
        <span className="mc-team__name">{team.name}</span>
      ) : (
        <span className="mc-tbd">To Be Determined</span>
      )}
    </div>
  );
}

export default TeamSlot;
