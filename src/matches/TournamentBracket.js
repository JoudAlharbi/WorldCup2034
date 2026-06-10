import React from "react";
import { Link } from "react-router-dom";
import TeamSlot from "./TeamSlot";
import {
  formatDate,
  formatTime,
  getStadiumPath,
  hasUndeterminedTeams,
} from "./matchUtils";

function BracketMatch({ match, isFinal = false }) {
  const stadiumPath = getStadiumPath(match);
  const undetermined = hasUndeterminedTeams(match);

  return (
    <div className={`bk-match${isFinal ? " bk-match--final" : ""}`}>
      <div className="bk-match__head">
        <span className="bk-match__label">{match.label || match.stage}</span>
        <span className="bk-match__date">
          {formatDate(match.date)} · {formatTime(match.date)}
        </span>
      </div>

      <div className="bk-match__teams">
        <TeamSlot team={match.teamA} size="sm" align="left" />
        <span className="bk-match__vs">VS</span>
        <TeamSlot team={match.teamB} size="sm" align="right" />
      </div>

      {undetermined && (
        <p className="bk-match__note">
          Qualified teams will appear after the group stage concludes.
        </p>
      )}

      <div className="bk-match__foot">
        <span className="bk-match__venue">{match.city}</span>
        {stadiumPath && (
          <Link className="bk-match__link" to={stadiumPath}>
            Stadium
          </Link>
        )}
      </div>
    </div>
  );
}

function TournamentBracket({ matches }) {
  const rounds = [
    { key: "Round of 32", short: "R32" },
    { key: "Round of 16", short: "R16" },
    { key: "Quarter Finals", short: "QF" },
    { key: "Semi Finals", short: "SF" },
    { key: "Final", short: "Final" },
  ];

  const grouped = rounds.map((r) => ({
    ...r,
    items: matches.filter((m) => m.stage === r.key),
  }));

  return (
    <section className="bk">
      <div className="bk__head">
        <h3 className="bk__title">Tournament Bracket</h3>
        <p className="bk__subtitle">
          Knockout pathway from the Round of 32 to the FIFA World Cup 2034 Final
        </p>
      </div>

      <div className="bk__scroll">
        <div className="bk__board">
          {grouped.map((round, ri) => (
            <div className="bk__round" key={round.key}>
              <div className="bk__round-head">
                <span className="bk__round-tag">{round.short}</span>
                <span className="bk__round-name">{round.key}</span>
              </div>
              <div className="bk__round-body">
                {round.items.map((match, mi) => (
                  <div className="bk__slot" key={match.id}>
                    <BracketMatch match={match} isFinal={round.key === "Final"} />
                    {ri < rounds.length - 1 && (
                      <span className="bk__connector" aria-hidden="true" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile vertical timeline */}
      <div className="bk__timeline">
        {grouped.map((round) =>
          round.items.map((match) => (
            <div className="bk__timeline-item" key={match.id}>
              <span className="bk__timeline-node" aria-hidden="true" />
              <div className="bk__timeline-card">
                <span className="bk__timeline-stage">{round.key}</span>
                <BracketMatch match={match} isFinal={round.key === "Final"} />
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default TournamentBracket;
