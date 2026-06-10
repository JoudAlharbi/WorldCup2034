import React, { useEffect, useMemo, useState } from "react";
import { getMatches, STAGES, getKnockoutMatches, getGroupMatches } from "./matchesService";
import { isTeamDetermined } from "./matchUtils";
import MatchCard from "./MatchCard";
import FeaturedMatch from "./FeaturedMatch";
import TournamentBracket from "./TournamentBracket";
import "./matches.css";

const SkeletonCard = () => (
  <div className="mc mc--skeleton">
    <div className="sk sk--media" />
    <div className="sk sk--row" />
    <div className="sk sk--line" />
    <div className="sk sk--line short" />
  </div>
);

function MatchesSchedule() {
  const [matches, setMatches] = useState([]);
  const [status, setStatus] = useState("loading");
  const [stage, setStage] = useState("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let active = true;
    setStatus("loading");
    getMatches()
      .then((data) => {
        if (!active) return;
        setMatches(Array.isArray(data) ? data : []);
        setStatus("ready");
      })
      .catch(() => active && setStatus("error"));
    return () => {
      active = false;
    };
  }, []);

  const knockoutMatches = useMemo(() => getKnockoutMatches(matches), [matches]);

  const featured = useMemo(() => {
    return getGroupMatches(matches)
      .filter((m) => m.status === "Upcoming")
      .sort((a, b) => new Date(a.date) - new Date(b.date))[0];
  }, [matches]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return matches
      .filter((m) => (featured ? m.id !== featured.id : true))
      .filter((m) => (stage === "All" ? true : m.stage === stage))
      .filter((m) => {
        if (!q) return true;
        const teamMatch = [m.teamA, m.teamB].some(
          (t) => isTeamDetermined(t) && t.name.toLowerCase().includes(q)
        );
        return (
          teamMatch ||
          m.city.toLowerCase().includes(q) ||
          m.stadium.toLowerCase().includes(q) ||
          m.stage.toLowerCase().includes(q) ||
          (m.label && m.label.toLowerCase().includes(q))
        );
      });
  }, [matches, stage, query, featured]);

  const showBracket =
    status === "ready" &&
    knockoutMatches.length > 0 &&
    (stage === "All" || stage !== "Group Stage");

  return (
    <section className="ms">
      <div className="ms__head">
        <span className="ms__badge">Official Schedule</span>
        <h2 className="ms__title">Match Center</h2>
        <p className="ms__subtitle">
          Planned fixtures, tournament bracket, and venues for FIFA World Cup 2034
        </p>
      </div>

      {status === "loading" && (
        <>
          <div className="fm fm--skeleton">
            <div className="sk sk--featured" />
          </div>
          <div className="ms__grid">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </>
      )}

      {status === "error" && (
        <div className="ms__state">
          <h3>We couldn&apos;t load the schedule</h3>
          <p>Please refresh the page to try again.</p>
        </div>
      )}

      {status === "ready" && (
        <>
          {featured && <FeaturedMatch match={featured} />}

          {showBracket && (
            <TournamentBracket
              matches={
                stage === "All"
                  ? knockoutMatches
                  : knockoutMatches.filter((m) => m.stage === stage)
              }
            />
          )}

          <div className="ms__controls">
            <div className="ms__filters">
              {["All", ...STAGES].map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`ms-filter${stage === s ? " is-active" : ""}`}
                  onClick={() => setStage(s)}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="ms__search">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 5 1.5-1.5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.49 4.49 0 0 1 9.5 14z" />
              </svg>
              <input
                type="text"
                placeholder="Search team, city or stadium..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search matches"
              />
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="ms__grid">
              {filtered.map((m) => (
                <MatchCard key={m.id} match={m} />
              ))}
            </div>
          ) : (
            <div className="ms__state">
              <h3>No scheduled matches available.</h3>
              <p>Try a different stage or search term.</p>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default MatchesSchedule;
