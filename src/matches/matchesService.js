// Service layer for FIFA World Cup 2034 match fixtures.
//
// By default this returns realistic mock data so the UI is fully functional
// without any credentials. To switch to a live football fixtures API, set
// REACT_APP_FOOTBALL_API_KEY in your .env and implement the fetch in
// `fetchFromApi` below (the function is already wired into getMatches).

export const STAGES = [
  "Group Stage",
  "Round of 32",
  "Round of 16",
  "Quarter Finals",
  "Semi Finals",
  "Final",
];

export const getFlagUrl = (code, size = 80) =>
  `https://flagcdn.com/w${size}/${code}.png`;

// FIFA World Cup 2034 has not been played yet, so every fixture is UPCOMING
// with NO scores or results. Group-stage matches use confirmed-style sample
// pairings; knockout rounds use position placeholders (e.g. "Winner Group A")
// or "TBD" because qualifiers are not yet decided.
const TBD = { name: "TBD", code: null };

const MOCK_MATCHES = [
  {
    id: 1,
    stage: "Group Stage",
    status: "Upcoming",
    date: "2034-06-12T19:00:00",
    teamA: { name: "Saudi Arabia", code: "sa" },
    teamB: { name: "Portugal", code: "pt" },
    city: "Riyadh",
    stadium: "King Salman International Stadium",
  },
  {
    id: 2,
    stage: "Group Stage",
    status: "Upcoming",
    date: "2034-06-13T16:00:00",
    teamA: { name: "France", code: "fr" },
    teamB: { name: "Brazil", code: "br" },
    city: "Jeddah",
    stadium: "King Abdullah Sports City Stadium",
  },
  {
    id: 3,
    stage: "Group Stage",
    status: "Upcoming",
    date: "2034-06-14T19:00:00",
    teamA: { name: "Argentina", code: "ar" },
    teamB: { name: "Germany", code: "de" },
    city: "Neom",
    stadium: "NEOM Stadium",
  },
  {
    id: 4,
    stage: "Group Stage",
    status: "Upcoming",
    date: "2034-06-15T19:00:00",
    teamA: { name: "Spain", code: "es" },
    teamB: { name: "Morocco", code: "ma" },
    city: "Abha",
    stadium: "King Khalid University Stadium",
  },
  {
    id: 5,
    stage: "Group Stage",
    status: "Upcoming",
    date: "2034-06-16T16:00:00",
    teamA: { name: "England", code: "gb-eng" },
    teamB: { name: "Netherlands", code: "nl" },
    city: "Al Khobar",
    stadium: "Aramco Stadium",
  },
  {
    id: 6,
    stage: "Group Stage",
    status: "Upcoming",
    date: "2034-06-17T19:00:00",
    teamA: { name: "Italy", code: "it" },
    teamB: { name: "Croatia", code: "hr" },
    city: "Jeddah",
    stadium: "Jeddah Central Stadium",
  },
  {
    id: 7,
    stage: "Round of 32",
    label: "Round of 32 · Match 1",
    status: "Upcoming",
    date: "2034-06-22T19:00:00",
    teamA: { name: "Winner Group A", code: null },
    teamB: { name: "Runner-up Group B", code: null },
    city: "Riyadh",
    stadium: "King Fahad Sports City Stadium",
  },
  {
    id: 8,
    stage: "Round of 32",
    label: "Round of 32 · Match 2",
    status: "Upcoming",
    date: "2034-06-23T19:00:00",
    teamA: { name: "Winner Group C", code: null },
    teamB: { name: "Runner-up Group D", code: null },
    city: "Jeddah",
    stadium: "Jeddah Central Stadium",
  },
  {
    id: 9,
    stage: "Round of 16",
    label: "Round of 16 · Match 1",
    status: "Upcoming",
    date: "2034-06-30T19:00:00",
    teamA: { name: "Winner Match 1", code: null },
    teamB: { name: "Winner Match 2", code: null },
    city: "Riyadh",
    stadium: "King Fahad Sports City Stadium",
  },
  {
    id: 10,
    stage: "Quarter Finals",
    label: "Quarter Final 1",
    status: "Upcoming",
    date: "2034-07-05T19:00:00",
    teamA: { ...TBD },
    teamB: { ...TBD },
    city: "Neom",
    stadium: "NEOM Stadium",
  },
  {
    id: 11,
    stage: "Semi Finals",
    label: "Semi Final 1",
    status: "Upcoming",
    date: "2034-07-11T19:00:00",
    teamA: { ...TBD },
    teamB: { ...TBD },
    city: "Riyadh",
    stadium: "King Salman International Stadium",
  },
  {
    id: 12,
    stage: "Final",
    label: "FIFA World Cup 2034 Final",
    status: "Upcoming",
    date: "2034-07-16T19:00:00",
    teamA: { ...TBD },
    teamB: { ...TBD },
    city: "Riyadh",
    stadium: "King Salman International Stadium",
  },
];

const API_KEY = process.env.REACT_APP_FOOTBALL_API_KEY;

// Placeholder for a real fixtures API (e.g. Football-Data.org / API-Football).
// Map the provider response into the same shape used across the UI.
async function fetchFromApi() {
  // Example shape — adapt to your chosen provider:
  // const res = await fetch("https://api.football-data.org/v4/competitions/WC/matches", {
  //   headers: { "X-Auth-Token": API_KEY },
  // });
  // const data = await res.json();
  // return data.matches.map(mapProviderMatch);
  throw new Error("Live API not implemented yet");
}

export async function getMatches() {
  if (API_KEY) {
    try {
      return await fetchFromApi();
    } catch (e) {
      // Fall back to mock data so the section never breaks.
      return MOCK_MATCHES;
    }
  }
  // Simulate network latency so loading skeletons are demonstrable.
  return new Promise((resolve) => setTimeout(() => resolve(MOCK_MATCHES), 700));
}
