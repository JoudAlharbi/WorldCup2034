import { bindQuestionImages, preloadForDifficulty } from "./imageCache";
import { fetchReadyPlayerIds } from "./playerAssets";
import { logPerf } from "./performanceLog";
import { buildQuestionSet } from "./questionEngine";

/**
 * Boot a game session for one difficulty tier only — separate player/image pools.
 */
export async function createGameSession(difficulty, onProgress) {
  const start = performance.now();

  onProgress?.(5);
  const readyIds = await fetchReadyPlayerIds(difficulty);
  onProgress?.(10);

  if (readyIds.size === 0) {
    throw new Error(`No ${difficulty} tier player images are available. Run npm run whoami:setup`);
  }

  let questions = buildQuestionSet(difficulty, readyIds);
  if (questions.length === 0) {
    throw new Error(`Not enough ${difficulty} tier players with images for this round`);
  }

  onProgress?.(15);
  await preloadForDifficulty(difficulty, (pct) => {
    onProgress?.(15 + Math.round(pct * 0.85));
  });

  let bound = bindQuestionImages(questions);

  if (bound.length < questions.length) {
    const usedIds = new Set(bound.map((q) => q.player.id));
    const extra = buildQuestionSet(difficulty, readyIds, 8).filter((q) => !usedIds.has(q.player.id));
    bound = [...bound, ...bindQuestionImages(extra)].slice(0, 5);
  }

  if (bound.length === 0) {
    throw new Error("Could not load tier-specific player images for this round");
  }

  logPerf("createGameSession", performance.now() - start, {
    difficulty,
    questions: bound.length,
    readyPlayers: readyIds.size,
  });

  return bound;
}
