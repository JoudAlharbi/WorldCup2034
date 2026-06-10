export function shuffle(items) {
  const list = [...items];
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

export function pickDistractors(correct, pool, count = 3) {
  const candidates = pool.filter((name) => name !== correct);
  return shuffle(candidates).slice(0, count);
}

export function buildQuizRound(questions, difficulty, count = 10) {
  const pool = questions.filter((q) => q.difficulty === difficulty);
  const selected = shuffle(pool).slice(0, Math.min(count, pool.length));
  const namePool = [...new Set(questions.map((q) => q.answer))];

  return selected.map((q) => ({
    ...q,
    options: shuffle([q.answer, ...pickDistractors(q.answer, namePool.length > 4 ? namePool : q.options.filter((o) => o !== q.answer))]),
  }));
}

export const VALID_DIFFICULTIES = ["easy", "medium", "hard"];

export const DIFFICULTY_LABELS = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}
