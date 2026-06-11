export const REVEALS_BY_TIER = {
  easy: ["face-full", "clear-portrait", "celebration", "jersey-reveal"],
  medium: ["action-shot", "side-profile", "partial-face", "silhouette"],
  hard: ["silhouette-dark", "eye-reveal", "boots-crop", "extreme-crop", "vintage"],
};

export const REVEAL_LABELS = {
  "face-full": "Full Face Reveal",
  "clear-portrait": "Clear Portrait",
  celebration: "Celebration Moment",
  "jersey-reveal": "Jersey Reveal",
  "action-shot": "Action Shot",
  "side-profile": "Side Profile",
  "partial-face": "Partial Face",
  silhouette: "Silhouette",
  "silhouette-dark": "Dark Silhouette",
  "eye-reveal": "Eye Reveal",
  "boots-crop": "Boots Only",
  "extreme-crop": "Extreme Crop",
  vintage: "Vintage Photo",
};

const ASSET_ROOT = `${process.env.PUBLIC_URL}/assets/games/players`;

export function localPlayerPhoto(tier, playerId) {
  return `${ASSET_ROOT}/${tier}/${playerId}/source.jpg`;
}

/** Tier-scoped reveal asset — each difficulty uses a separate image pool. */
export function localRevealImage(tier, playerId, revealType) {
  return `${ASSET_ROOT}/${tier}/${playerId}/${revealType}.webp`;
}

export function getRevealTypesForTier(tier) {
  return REVEALS_BY_TIER[tier] || REVEALS_BY_TIER.easy;
}

const EASY_PLAYERS = [
  { id: "messi", name: "Lionel Messi", nationality: "Argentina", club: "Inter Miami", position: "Forward", difficulty: "easy" },
  { id: "ronaldo", name: "Cristiano Ronaldo", nationality: "Portugal", club: "Al Nassr", position: "Forward", difficulty: "easy" },
  { id: "mbappe", name: "Kylian Mbappé", nationality: "France", club: "Real Madrid", position: "Forward", difficulty: "easy" },
  { id: "neymar", name: "Neymar Jr.", nationality: "Brazil", club: "Al Hilal", position: "Forward", difficulty: "easy" },
  { id: "salah", name: "Mohamed Salah", nationality: "Egypt", club: "Liverpool", position: "Forward", difficulty: "easy" },
  { id: "haaland", name: "Erling Haaland", nationality: "Norway", club: "Manchester City", position: "Forward", difficulty: "easy" },
  { id: "vinicius", name: "Vinícius Júnior", nationality: "Brazil", club: "Real Madrid", position: "Forward", difficulty: "easy" },
];

const MEDIUM_PLAYERS = [
  { id: "rodri", name: "Rodri", nationality: "Spain", club: "Manchester City", position: "Midfielder", difficulty: "medium" },
  { id: "barella", name: "Nicolò Barella", nationality: "Italy", club: "Inter Milan", position: "Midfielder", difficulty: "medium" },
  { id: "valverde", name: "Federico Valverde", nationality: "Uruguay", club: "Real Madrid", position: "Midfielder", difficulty: "medium" },
  { id: "musiala", name: "Jamal Musiala", nationality: "Germany", club: "Bayern Munich", position: "Midfielder", difficulty: "medium" },
  { id: "kim", name: "Kim Min-jae", nationality: "South Korea", club: "Bayern Munich", position: "Defender", difficulty: "medium" },
  { id: "bruno-guimaraes", name: "Bruno Guimarães", nationality: "Brazil", club: "Newcastle United", position: "Midfielder", difficulty: "medium" },
  { id: "kubo", name: "Takefusa Kubo", nationality: "Japan", club: "Real Sociedad", position: "Forward", difficulty: "medium" },
  { id: "dilorenzo", name: "Giovanni Di Lorenzo", nationality: "Italy", club: "Napoli", position: "Defender", difficulty: "medium" },
];

const HARD_PLAYERS = [
  { id: "burruchaga", name: "Jorge Burruchaga", nationality: "Argentina", club: "Retired", position: "Midfielder", difficulty: "hard", era: "1986 World Cup" },
  { id: "grosso", name: "Fabio Grosso", nationality: "Italy", club: "Retired", position: "Defender", difficulty: "hard", era: "2006 World Cup" },
  { id: "klose", name: "Miroslav Klose", nationality: "Germany", club: "Retired", position: "Forward", difficulty: "hard", era: "World Cup record holder" },
  { id: "suker", name: "Davor Šuker", nationality: "Croatia", club: "Retired", position: "Forward", difficulty: "hard", era: "1998 Golden Boot" },
  { id: "carlos-alberto", name: "Carlos Alberto", nationality: "Brazil", club: "Retired", position: "Defender", difficulty: "hard", era: "1970 World Cup captain" },
  { id: "bebeto", name: "Bebeto", nationality: "Brazil", club: "Retired", position: "Forward", difficulty: "hard", era: "1994 World Cup" },
  { id: "matthaus", name: "Lothar Matthäus", nationality: "Germany", club: "Retired", position: "Midfielder", difficulty: "hard", era: "1990 World Cup winner" },
  { id: "cafu", name: "Cafu", nationality: "Brazil", club: "Retired", position: "Defender", difficulty: "hard", era: "2002 World Cup captain" },
  { id: "stoichkov", name: "Hristo Stoichkov", nationality: "Bulgaria", club: "Retired", position: "Forward", difficulty: "hard", era: "1994 World Cup" },
];

export const PLAYER_POOL = [...EASY_PLAYERS, ...MEDIUM_PLAYERS, ...HARD_PLAYERS];

export const DIFFICULTY_LABELS = {
  easy: "Easy — Global Superstars",
  medium: "Medium — Elite Internationals",
  hard: "Hard — World Cup Legends",
};

export const LEGACY_DIFFICULTY_MAP = {
  "argentine league": "easy",
  "italian league": "medium",
  "saudi league": "hard",
};

export const QUESTIONS_PER_ROUND = 5;
