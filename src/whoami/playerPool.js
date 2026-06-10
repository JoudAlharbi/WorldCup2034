export const REVEAL_TYPES = [
  "eye-reveal",
  "face-crop",
  "silhouette",
  "jersey-reveal",
  "celebration",
];

export const REVEAL_LABELS = {
  "eye-reveal": "Eye Reveal",
  "face-crop": "Face Crop",
  silhouette: "Silhouette",
  "jersey-reveal": "Jersey Reveal",
  celebration: "Celebration",
};

const ASSET_ROOT = `${process.env.PUBLIC_URL}/assets/games/players`;

/** Source portrait stored locally. */
export function localPlayerPhoto(playerId) {
  return `${ASSET_ROOT}/${playerId}.jpg`;
}

/** Optimized reveal WebP — generated from real photos only. */
export function localRevealImage(playerId, revealType) {
  return `${ASSET_ROOT}/${playerId}/${revealType}.webp`;
}

const RAW_PLAYERS = [
  { id: "messi", name: "Lionel Messi", nationality: "Argentina", club: "Inter Miami", position: "Forward", difficulty: "easy" },
  { id: "ronaldo", name: "Cristiano Ronaldo", nationality: "Portugal", club: "Al Nassr", position: "Forward", difficulty: "easy" },
  { id: "mbappe", name: "Kylian Mbappé", nationality: "France", club: "Real Madrid", position: "Forward", difficulty: "easy" },
  { id: "neymar", name: "Neymar Jr.", nationality: "Brazil", club: "Al Hilal", position: "Forward", difficulty: "easy" },
  { id: "salah", name: "Mohamed Salah", nationality: "Egypt", club: "Liverpool", position: "Forward", difficulty: "easy" },
  { id: "haaland", name: "Erling Haaland", nationality: "Norway", club: "Manchester City", position: "Forward", difficulty: "easy" },
  { id: "rodri", name: "Rodri", nationality: "Spain", club: "Manchester City", position: "Midfielder", difficulty: "medium" },
  { id: "bernardo", name: "Bernardo Silva", nationality: "Portugal", club: "Manchester City", position: "Midfielder", difficulty: "medium" },
  { id: "lautaro", name: "Lautaro Martínez", nationality: "Argentina", club: "Inter Milan", position: "Forward", difficulty: "medium" },
  { id: "son", name: "Son Heung-min", nationality: "South Korea", club: "Tottenham Hotspur", position: "Forward", difficulty: "medium" },
  { id: "debruyne", name: "Kevin De Bruyne", nationality: "Belgium", club: "Manchester City", position: "Midfielder", difficulty: "medium" },
  { id: "modric", name: "Luka Modrić", nationality: "Croatia", club: "Real Madrid", position: "Midfielder", difficulty: "medium" },
  { id: "lewandowski", name: "Robert Lewandowski", nationality: "Poland", club: "Barcelona", position: "Forward", difficulty: "medium" },
  { id: "bellingham", name: "Jude Bellingham", nationality: "England", club: "Real Madrid", position: "Midfielder", difficulty: "hard" },
  { id: "pedri", name: "Pedri", nationality: "Spain", club: "Barcelona", position: "Midfielder", difficulty: "hard" },
  { id: "yamal", name: "Lamine Yamal", nationality: "Spain", club: "Barcelona", position: "Forward", difficulty: "hard" },
  { id: "musiala", name: "Jamal Musiala", nationality: "Germany", club: "Bayern Munich", position: "Midfielder", difficulty: "hard" },
  { id: "wirtz", name: "Florian Wirtz", nationality: "Germany", club: "Bayer Leverkusen", position: "Midfielder", difficulty: "hard" },
  { id: "osimhen", name: "Victor Osimhen", nationality: "Nigeria", club: "Galatasaray", position: "Forward", difficulty: "hard" },
  { id: "leao", name: "Rafael Leão", nationality: "Portugal", club: "AC Milan", position: "Forward", difficulty: "hard" },
  { id: "davies", name: "Alphonso Davies", nationality: "Canada", club: "Bayern Munich", position: "Defender", difficulty: "hard" },
  { id: "foden", name: "Phil Foden", nationality: "England", club: "Manchester City", position: "Midfielder", difficulty: "hard" },
  { id: "kane", name: "Harry Kane", nationality: "England", club: "Bayern Munich", position: "Forward", difficulty: "hard" },
  { id: "vinicius", name: "Vinícius Júnior", nationality: "Brazil", club: "Real Madrid", position: "Forward", difficulty: "hard" },
  { id: "ibrahimovic", name: "Zlatan Ibrahimović", nationality: "Sweden", club: "Retired", position: "Forward", difficulty: "hard" },
  { id: "benzema", name: "Karim Benzema", nationality: "France", club: "Al Ittihad", position: "Forward", difficulty: "hard" },
  { id: "neuer", name: "Manuel Neuer", nationality: "Germany", club: "Bayern Munich", position: "Goalkeeper", difficulty: "hard" },
  { id: "griezmann", name: "Antoine Griezmann", nationality: "France", club: "Atlético Madrid", position: "Forward", difficulty: "hard" },
  { id: "rice", name: "Declan Rice", nationality: "England", club: "Arsenal", position: "Midfielder", difficulty: "hard" },
  { id: "saka", name: "Bukayo Saka", nationality: "England", club: "Arsenal", position: "Forward", difficulty: "hard" },
];

export const PLAYER_POOL = RAW_PLAYERS;

export const DIFFICULTY_LABELS = {
  easy: "Easy — Global Superstars",
  medium: "Medium — Top International Players",
  hard: "Hard — Rising Stars & Tough Calls",
};

export const LEGACY_DIFFICULTY_MAP = {
  "argentine league": "easy",
  "italian league": "medium",
  "saudi league": "hard",
};

export const QUESTIONS_PER_ROUND = 5;
