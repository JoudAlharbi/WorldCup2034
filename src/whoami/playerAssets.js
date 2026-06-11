const REGISTRY_URL = `${process.env.PUBLIC_URL}/assets/games/players/registry.json`;

let cachedRegistry = null;

export async function fetchPlayerRegistry() {
  if (cachedRegistry) return cachedRegistry;

  const response = await fetch(REGISTRY_URL, { cache: "no-cache" });
  if (!response.ok) {
    throw new Error("Player image registry unavailable");
  }

  cachedRegistry = await response.json();
  return cachedRegistry;
}

export async function fetchReadyPlayerIds(difficulty) {
  const registry = await fetchPlayerRegistry();
  const tierReady = registry?.ready?.[difficulty];
  if (Array.isArray(tierReady)) {
    return new Set(tierReady);
  }
  return new Set(Array.isArray(registry?.ready) ? registry.ready : []);
}

export function filterPoolByReady(pool, readyIds) {
  return pool.filter((player) => readyIds.has(player.id));
}

export function clearAssetRegistryCache() {
  cachedRegistry = null;
}
