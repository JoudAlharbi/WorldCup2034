const STORAGE_KEY = "fifa-fan-games-progress";

const ACHIEVEMENTS = [
  { id: "easy-complete", icon: "🏅", label: "Complete Easy", check: (p) => p.completions.easy > 0 },
  { id: "medium-complete", icon: "🥈", label: "Complete Medium", check: (p) => p.completions.medium > 0 },
  { id: "hard-complete", icon: "🥇", label: "Complete Hard", check: (p) => p.completions.hard > 0 },
  { id: "world-cup-master", icon: "👑", label: "World Cup Master", check: (p) => p.hardModeCompletions >= 3 },
];

const DEFAULT_STATE = {
  gamesPlayed: 0,
  totalCorrect: 0,
  totalQuestions: 0,
  bestAccuracy: 0,
  hardModeCompletions: 0,
  completions: { easy: 0, medium: 0, hard: 0 },
  bestScores: {},
};

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATE };
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

function save(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function getProgression() {
  return load();
}

export function recordGameResult(gameId, difficulty, { score, total, accuracy }) {
  const state = load();
  state.gamesPlayed += 1;
  state.totalCorrect += score;
  state.totalQuestions += total;
  state.bestAccuracy = Math.max(state.bestAccuracy, accuracy);
  state.completions[difficulty] = (state.completions[difficulty] || 0) + 1;

  if (difficulty === "hard") {
    state.hardModeCompletions += 1;
  }

  const key = `${gameId}:${difficulty}`;
  state.bestScores[key] = Math.max(state.bestScores[key] || 0, score);

  save(state);
  return state;
}

export function getAchievements() {
  const state = load();
  return ACHIEVEMENTS.map((a) => ({
    ...a,
    unlocked: a.check(state),
  }));
}

export function getProgressSummary() {
  const state = load();
  const accuracy = state.totalQuestions
    ? Math.round((state.totalCorrect / state.totalQuestions) * 100)
    : 0;
  return {
    gamesPlayed: state.gamesPlayed,
    accuracy,
    bestAccuracy: state.bestAccuracy,
    hardCompletions: state.hardModeCompletions,
  };
}
