export const KNOCKOUT_STAGES = [
  "Round of 32",
  "Round of 16",
  "Quarter Finals",
  "Semi Finals",
  "Final",
];

export const isTeamDetermined = (team) =>
  Boolean(team && team.determined !== false && team.code);

export const isKnockoutMatch = (match) => KNOCKOUT_STAGES.includes(match.stage);

export const hasUndeterminedTeams = (match) =>
  !isTeamDetermined(match.teamA) || !isTeamDetermined(match.teamB);

export const cityToSlug = (city) => city.toLowerCase().replace(/\s+/g, "-");

export const getStadiumPath = (match) => {
  if (match.citySlug == null || match.stadiumId == null) return null;
  return `/stadiums/${match.citySlug}/${match.stadiumId}`;
};

export const formatDate = (iso) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
};

export const formatTime = (iso) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
};

export const formatLongDate = (iso) =>
  new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));

export const pad = (n) => String(n).padStart(2, "0");

export function getCountdown(targetMs, now = Date.now()) {
  const total = targetMs - now;
  if (total <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }
  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
    done: false,
  };
}

export const groupMatchesByStage = (matches, stages) =>
  stages.reduce((acc, stage) => {
    acc[stage] = matches
      .filter((m) => m.stage === stage)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    return acc;
  }, {});
