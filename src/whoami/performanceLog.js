const SLOW_IMAGE_SWAP_MS = 100;
const SLOW_QUESTION_MS = 150;

export function logPerf(label, durationMs, meta = {}) {
  if (process.env.NODE_ENV === "development") {
    const slow =
      (label === "imageSwap" && durationMs > SLOW_IMAGE_SWAP_MS) ||
      (label === "questionTransition" && durationMs > SLOW_QUESTION_MS);
    const prefix = slow ? "[WhoAmI SLOW]" : "[WhoAmI perf]";
    console.log(`${prefix} ${label}: ${durationMs.toFixed(1)}ms`, meta);
  }
}

export function measureSync(label, fn) {
  const start = performance.now();
  const result = fn();
  logPerf(label, performance.now() - start);
  return result;
}
