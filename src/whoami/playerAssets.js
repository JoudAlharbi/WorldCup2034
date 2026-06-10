const REGISTRY_URL = `${process.env.PUBLIC_URL}/assets/games/players/registry.json`;

let cachedReadyIds = null;

export async function fetchReadyPlayerIds() {
  if (cachedReadyIds) return cachedReadyIds;

  const response = await fetch(REGISTRY_URL, { cache: "no-cache" });
  if (!response.ok) {
    throw new Error("Player image registry unavailable");
  }

  const data = await response.json();
  cachedReadyIds = new Set(Array.isArray(data.ready) ? data.ready : []);
  return cachedReadyIds;
}

export function filterPoolByReady(pool, readyIds) {
  return pool.filter((player) => readyIds.has(player.id));
}

export function clearAssetRegistryCache() {
  cachedReadyIds = null;
}
