// Service layer for FIFA World Cup 2034 match fixtures.
//
// Every fixture is UPCOMING with no scores. Knockout rounds use `determined: false`
// on teams — the UI renders "To Be Determined" badges instead of placeholder names.

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

const IMG = (file) => `${process.env.PUBLIC_URL}/stadiums/${file}`;

const UNDETERMINED = { determined: false };

const MOCK_MATCHES = [
  // ── Group Stage (confirmed pairings) ──
  {
    id: 1,
    stage: "Group Stage",
    status: "Upcoming",
    date: "2034-06-12T19:00:00",
    teamA: { determined: true, name: "Saudi Arabia", code: "sa" },
    teamB: { determined: true, name: "Portugal", code: "pt" },
    city: "Riyadh",
    stadium: "King Salman International Stadium",
    citySlug: "riyadh",
    stadiumId: 0,
    stadiumImage: IMG("kingsalman.png"),
  },
  {
    id: 2,
    stage: "Group Stage",
    status: "Upcoming",
    date: "2034-06-13T16:00:00",
    teamA: { determined: true, name: "France", code: "fr" },
    teamB: { determined: true, name: "Brazil", code: "br" },
    city: "Jeddah",
    stadium: "King Abdullah Sports City Stadium",
    citySlug: "jeddah",
    stadiumId: 2,
    stadiumImage: IMG("abdullah2.png"),
  },
  {
    id: 3,
    stage: "Group Stage",
    status: "Upcoming",
    date: "2034-06-14T19:00:00",
    teamA: { determined: true, name: "Argentina", code: "ar" },
    teamB: { determined: true, name: "Germany", code: "de" },
    city: "Neom",
    stadium: "NEOM Stadium",
    citySlug: "neom",
    stadiumId: 1,
    stadiumImage: IMG("neomStad.png"),
  },
  {
    id: 4,
    stage: "Group Stage",
    status: "Upcoming",
    date: "2034-06-15T19:00:00",
    teamA: { determined: true, name: "Spain", code: "es" },
    teamB: { determined: true, name: "Morocco", code: "ma" },
    city: "Abha",
    stadium: "King Khalid University Stadium",
    citySlug: "abha",
    stadiumId: 0,
    stadiumImage: IMG("khalid_abha.png"),
  },
  {
    id: 5,
    stage: "Group Stage",
    status: "Upcoming",
    date: "2034-06-16T16:00:00",
    teamA: { determined: true, name: "England", code: "gb-eng" },
    teamB: { determined: true, name: "Netherlands", code: "nl" },
    city: "Al Khobar",
    stadium: "Aramco Stadium",
    citySlug: "al-khobar",
    stadiumId: 1,
    stadiumImage: IMG("aramco_kh.png"),
  },
  {
    id: 6,
    stage: "Group Stage",
    status: "Upcoming",
    date: "2034-06-17T19:00:00",
    teamA: { determined: true, name: "Italy", code: "it" },
    teamB: { determined: true, name: "Croatia", code: "hr" },
    city: "Jeddah",
    stadium: "Jeddah Central Stadium",
    citySlug: "jeddah",
    stadiumId: 3,
    stadiumImage: IMG("jed_central.png"),
  },

  // ── Knockout rounds (teams not yet decided) ──
  {
    id: 7,
    stage: "Round of 32",
    label: "Round of 32 · Match 1",
    status: "Upcoming",
    date: "2034-06-22T19:00:00",
    teamA: { ...UNDETERMINED },
    teamB: { ...UNDETERMINED },
    city: "Riyadh",
    stadium: "King Fahad Sports City Stadium",
    citySlug: "riyadh",
    stadiumId: 3,
    stadiumImage: IMG("fahad.png"),
  },
  {
    id: 8,
    stage: "Round of 32",
    label: "Round of 32 · Match 2",
    status: "Upcoming",
    date: "2034-06-23T19:00:00",
    teamA: { ...UNDETERMINED },
    teamB: { ...UNDETERMINED },
    city: "Jeddah",
    stadium: "Jeddah Central Stadium",
    citySlug: "jeddah",
    stadiumId: 3,
    stadiumImage: IMG("jed_central.png"),
  },
  {
    id: 9,
    stage: "Round of 32",
    label: "Round of 32 · Match 3",
    status: "Upcoming",
    date: "2034-06-24T19:00:00",
    teamA: { ...UNDETERMINED },
    teamB: { ...UNDETERMINED },
    city: "Neom",
    stadium: "NEOM Stadium",
    citySlug: "neom",
    stadiumId: 1,
    stadiumImage: IMG("neomStad.png"),
  },
  {
    id: 10,
    stage: "Round of 32",
    label: "Round of 32 · Match 4",
    status: "Upcoming",
    date: "2034-06-25T19:00:00",
    teamA: { ...UNDETERMINED },
    teamB: { ...UNDETERMINED },
    city: "Abha",
    stadium: "King Khalid University Stadium",
    citySlug: "abha",
    stadiumId: 0,
    stadiumImage: IMG("khalid_abha.png"),
  },
  {
    id: 11,
    stage: "Round of 16",
    label: "Round of 16 · Match 1",
    status: "Upcoming",
    date: "2034-06-30T19:00:00",
    teamA: { ...UNDETERMINED },
    teamB: { ...UNDETERMINED },
    city: "Riyadh",
    stadium: "King Fahad Sports City Stadium",
    citySlug: "riyadh",
    stadiumId: 3,
    stadiumImage: IMG("fahad.png"),
  },
  {
    id: 12,
    stage: "Round of 16",
    label: "Round of 16 · Match 2",
    status: "Upcoming",
    date: "2034-07-01T19:00:00",
    teamA: { ...UNDETERMINED },
    teamB: { ...UNDETERMINED },
    city: "Jeddah",
    stadium: "King Abdullah Sports City Stadium",
    citySlug: "jeddah",
    stadiumId: 2,
    stadiumImage: IMG("abdullah2.png"),
  },
  {
    id: 13,
    stage: "Quarter Finals",
    label: "Quarter Final 1",
    status: "Upcoming",
    date: "2034-07-05T19:00:00",
    teamA: { ...UNDETERMINED },
    teamB: { ...UNDETERMINED },
    city: "Neom",
    stadium: "NEOM Stadium",
    citySlug: "neom",
    stadiumId: 1,
    stadiumImage: IMG("neomStad.png"),
  },
  {
    id: 14,
    stage: "Quarter Finals",
    label: "Quarter Final 2",
    status: "Upcoming",
    date: "2034-07-06T19:00:00",
    teamA: { ...UNDETERMINED },
    teamB: { ...UNDETERMINED },
    city: "Riyadh",
    stadium: "King Salman International Stadium",
    citySlug: "riyadh",
    stadiumId: 0,
    stadiumImage: IMG("kingsalman.png"),
  },
  {
    id: 15,
    stage: "Semi Finals",
    label: "Semi Final 1",
    status: "Upcoming",
    date: "2034-07-11T19:00:00",
    teamA: { ...UNDETERMINED },
    teamB: { ...UNDETERMINED },
    city: "Riyadh",
    stadium: "King Salman International Stadium",
    citySlug: "riyadh",
    stadiumId: 0,
    stadiumImage: IMG("kingsalman.png"),
  },
  {
    id: 16,
    stage: "Semi Finals",
    label: "Semi Final 2",
    status: "Upcoming",
    date: "2034-07-12T19:00:00",
    teamA: { ...UNDETERMINED },
    teamB: { ...UNDETERMINED },
    city: "Jeddah",
    stadium: "King Abdullah Sports City Stadium",
    citySlug: "jeddah",
    stadiumId: 2,
    stadiumImage: IMG("abdullah2.png"),
  },
  {
    id: 17,
    stage: "Final",
    label: "FIFA World Cup 2034 Final",
    status: "Upcoming",
    date: "2034-07-16T19:00:00",
    teamA: { ...UNDETERMINED },
    teamB: { ...UNDETERMINED },
    city: "Riyadh",
    stadium: "King Salman International Stadium",
    citySlug: "riyadh",
    stadiumId: 0,
    stadiumImage: IMG("kingsalman.png"),
  },
];

const API_KEY = process.env.REACT_APP_FOOTBALL_API_KEY;

async function fetchFromApi() {
  throw new Error("Live API not implemented yet");
}

export async function getMatches() {
  if (API_KEY) {
    try {
      return await fetchFromApi();
    } catch {
      return MOCK_MATCHES;
    }
  }
  return new Promise((resolve) => setTimeout(() => resolve(MOCK_MATCHES), 700));
}

export function getKnockoutMatches(matches) {
  return matches.filter((m) => m.stage !== "Group Stage");
}

export function getGroupMatches(matches) {
  return matches.filter((m) => m.stage === "Group Stage");
}
