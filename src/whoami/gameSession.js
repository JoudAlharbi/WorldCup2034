import { bindQuestionImages, preloadReadyPool } from "./imageCache";
import { fetchReadyPlayerIds } from "./playerAssets";
import { logPerf } from "./performanceLog";
import { buildQuestionSet } from "./questionEngine";

/**
 * Boot a game session: load registry, build questions from verified players only,
 * preload real photo assets into memory.
 */
export async function createGameSession(difficulty, onProgress) {
  const start = performance.now();

  onProgress?.(5);
  const readyIds = await fetchReadyPlayerIds();
  onProgress?.(10);

  if (readyIds.size === 0) {
    throw new Error("No players with real images are available");
  }

  let questions = buildQuestionSet(difficulty, readyIds);
  if (questions.length === 0) {
    throw new Error("Not enough players with images for this difficulty");
  }

  onProgress?.(15);
  await preloadReadyPool((pct) => {
    onProgress?.(15 + Math.round(pct * 0.85));
  });

  let bound = bindQuestionImages(questions);

  if (bound.length < questions.length) {
    const usedIds = new Set(bound.map((q) => q.player.id));
    const remaining = buildQuestionSet(difficulty, readyIds, 8).filter(
      (q) => !usedIds.has(q.player.id)
    );
    questions = [...bound, ...bindQuestionImages(remaining)].slice(0, 5);
    bound = questions;
  }

  if (bound.length === 0) {
    throw new Error("Could not load real player images for this round");
  }

  logPerf("createGameSession", performance.now() - start, {
    difficulty,
    questions: bound.length,
    readyPlayers: readyIds.size,
  });

  return bound;
}
