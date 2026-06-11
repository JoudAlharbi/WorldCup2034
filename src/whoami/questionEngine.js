import { PLAYER_POOL, QUESTIONS_PER_ROUND, getRevealTypesForTier, localRevealImage } from "./playerPool";
import { filterPoolByReady } from "./playerAssets";

export function shuffle(items) {
  const list = [...items];
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

function pickDistractors(player, pool, count = 3) {
  const sameTier = pool.filter(
    (entry) => entry.id !== player.id && entry.difficulty === player.difficulty
  );
  const source = sameTier.length >= count ? sameTier : pool.filter((e) => e.id !== player.id);

  return shuffle(source)
    .slice(0, count)
    .map((entry) => entry.name);
}

function pickRevealType(difficulty) {
  const types = getRevealTypesForTier(difficulty);
  return types[Math.floor(Math.random() * types.length)];
}

export function getWhoAmIMechanics(difficulty) {
  const configs = {
    easy: { hintLimit: 3, questionTimer: null, wrongPenalty: 0 },
    medium: { hintLimit: 2, questionTimer: 30, wrongPenalty: 0 },
    hard: { hintLimit: 0, questionTimer: 15, wrongPenalty: 50 },
  };
  return configs[difficulty] || configs.easy;
}

export function buildQuestionSet(difficulty, readyIds, count = QUESTIONS_PER_ROUND) {
  const readyPool = filterPoolByReady(PLAYER_POOL, readyIds);
  const pool = readyPool.filter((player) => player.difficulty === difficulty);

  if (pool.length < Math.min(2, count)) {
    return [];
  }

  const selectedPlayers = shuffle(pool).slice(0, Math.min(count, pool.length));
  const mechanics = getWhoAmIMechanics(difficulty);

  return selectedPlayers.map((player) => {
    const revealType = pickRevealType(difficulty);
    const options = shuffle([player.name, ...pickDistractors(player, readyPool)]);

    return {
      player,
      answer: player.name,
      options,
      revealType,
      tier: difficulty,
      image: localRevealImage(difficulty, player.id, revealType),
      mechanics,
      hints: {
        nationality: player.nationality,
        club: player.club,
        position: player.position,
        era: player.era || null,
      },
    };
  });
}

export function resolveDifficulty(slug) {
  return slug.toLowerCase().trim();
}
