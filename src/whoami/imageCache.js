import { REVEAL_TYPES, localRevealImage } from "./playerPool";
import { fetchReadyPlayerIds } from "./playerAssets";
import { logPerf } from "./performanceLog";

/** @type {Map<string, HTMLImageElement>} */
const imageObjects = new Map();

/** @type {Map<string, string>} */
const srcByKey = new Map();

/** @type {Set<string>} */
const failedKeys = new Set();

function cacheKey(playerId, revealType) {
  return `${playerId}:${revealType}`;
}

function loadImageElement(src) {
  if (imageObjects.has(src)) {
    const cached = imageObjects.get(src);
    return Promise.resolve(cached);
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

export function preloadRevealAsset(playerId, revealType) {
  const src = localRevealImage(playerId, revealType);
  const key = cacheKey(playerId, revealType);

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
      logPerf("preloadReveal", performance.now() - start, { playerId, revealType });
      return img.src;
    })
    .catch((err) => {
      failedKeys.add(key);
      throw err;
    });
}

export async function preloadPlayerReveals(playerIds, onProgress) {
  const tasks = [];
  playerIds.forEach((id) => {
    REVEAL_TYPES.forEach((revealType) => {
      tasks.push({ id, revealType });
    });
  });

  let done = 0;
  const results = await Promise.allSettled(
    tasks.map(async ({ id, revealType }) => {
      try {
        await preloadRevealAsset(id, revealType);
      } finally {
        done += 1;
        if (onProgress) onProgress(Math.round((done / tasks.length) * 100));
      }
    })
  );

  const failed = results.filter((r) => r.status === "rejected").length;
  if (failed > 0) {
    logPerf("preloadPlayerReveals", 0, { failed, total: tasks.length });
  }
}

export async function preloadReadyPool(onProgress) {
  const start = performance.now();
  const readyIds = await fetchReadyPlayerIds();
  const ids = [...readyIds];
  await preloadPlayerReveals(ids, onProgress);
  logPerf("preloadReadyPool", performance.now() - start, { players: ids.length });
  return readyIds;
}

export function getCachedRevealSrc(playerId, revealType) {
  const key = cacheKey(playerId, revealType);
  if (failedKeys.has(key)) return null;
  return srcByKey.get(key) || null;
}

export function bindQuestionImages(questions) {
  return questions
    .map((q) => {
      const cachedSrc = getCachedRevealSrc(q.player.id, q.revealType);
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
