import { getRevealTypesForTier, localRevealImage } from "./playerPool";
import { fetchPlayerRegistry } from "./playerAssets";
import { logPerf } from "./performanceLog";

/** @type {Map<string, HTMLImageElement>} */
const imageObjects = new Map();

/** @type {Map<string, string>} */
const srcByKey = new Map();

/** @type {Set<string>} */
const failedKeys = new Set();

function cacheKey(tier, playerId, revealType) {
  return `${tier}:${playerId}:${revealType}`;
}

function loadImageElement(src) {
  if (imageObjects.has(src)) {
    return Promise.resolve(imageObjects.get(src));
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "sync";
    img.onload = () => {
      if (img.naturalWidth < 40 || img.naturalHeight < 40) {
        reject(new Error("Image too small or invalid"));
        return;
      }
      imageObjects.set(src, img);
      resolve(img);
    };
    img.onerror = () => reject(new Error(`Failed to load ${src}`));
    img.src = src;
  });
}

export function preloadRevealAsset(tier, playerId, revealType) {
  const src = localRevealImage(tier, playerId, revealType);
  const key = cacheKey(tier, playerId, revealType);

  if (failedKeys.has(key)) {
    return Promise.reject(new Error(`Previously failed: ${key}`));
  }

  if (srcByKey.has(key)) {
    return Promise.resolve(srcByKey.get(key));
  }

  const start = performance.now();
  return loadImageElement(src)
    .then((img) => {
      srcByKey.set(key, img.src);
      logPerf("preloadReveal", performance.now() - start, { tier, playerId, revealType });
      return img.src;
    })
    .catch((err) => {
      failedKeys.add(key);
      throw err;
    });
}

export async function preloadTierAssets(tier, playerIds, onProgress) {
  const revealTypes = getRevealTypesForTier(tier);
  const tasks = [];
  playerIds.forEach((id) => {
    revealTypes.forEach((revealType) => {
      tasks.push({ id, revealType });
    });
  });

  let done = 0;
  await Promise.allSettled(
    tasks.map(async ({ id, revealType }) => {
      try {
        await preloadRevealAsset(tier, id, revealType);
      } finally {
        done += 1;
        if (onProgress) onProgress(Math.round((done / tasks.length) * 100));
      }
    })
  );
}

export async function preloadForDifficulty(difficulty, onProgress) {
  const start = performance.now();
  const registry = await fetchPlayerRegistry();
  const ids = registry?.ready?.[difficulty] || [];
  await preloadTierAssets(difficulty, ids, onProgress);
  logPerf("preloadForDifficulty", performance.now() - start, { difficulty, players: ids.length });
  return ids;
}

export function getCachedRevealSrc(tier, playerId, revealType) {
  const key = cacheKey(tier, playerId, revealType);
  if (failedKeys.has(key)) return null;
  return srcByKey.get(key) || null;
}

export function bindQuestionImages(questions) {
  return questions
    .map((q) => {
      const cachedSrc = getCachedRevealSrc(q.tier || q.player.difficulty, q.player.id, q.revealType);
      if (!cachedSrc) return null;
      return { ...q, cachedSrc };
    })
    .filter(Boolean);
}

export function clearImageCache() {
  imageObjects.clear();
  srcByKey.clear();
  failedKeys.clear();
}
