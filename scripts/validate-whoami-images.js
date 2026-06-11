/**
 * Validates tier-scoped Who Am I assets.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "public", "assets", "games", "players");
const REGISTRY = path.join(ROOT, "registry.json");
const MIN_WEBP = 1200;

function loadRegistry() {
  return JSON.parse(fs.readFileSync(REGISTRY, "utf8"));
}

function validateTier(tier, ids, reveals) {
  for (const id of ids) {
    const source = path.join(ROOT, tier, id, "source.jpg");
    if (!fs.existsSync(source) || fs.statSync(source).size < 11000) {
      throw new Error(`Missing source for ${tier}/${id}`);
    }
    for (const reveal of reveals) {
      const webp = path.join(ROOT, tier, id, `${reveal}.webp`);
      if (!fs.existsSync(webp) || fs.statSync(webp).size < MIN_WEBP) {
        throw new Error(`Invalid ${tier}/${id}/${reveal}.webp`);
      }
    }
  }
}

function main() {
  const registry = loadRegistry();
  const { revealsByTier, ready } = registry;

  ["easy", "medium", "hard"].forEach((tier) => {
    validateTier(tier, ready[tier] || [], revealsByTier[tier] || []);
    console.log(`${tier}: ${(ready[tier] || []).length} players validated`);
  });

  if ((ready.easy || []).length < 5) throw new Error("Need at least 5 easy players");
  if ((ready.medium || []).length < 5) throw new Error("Need at least 5 medium players");
  if ((ready.hard || []).length < 4) throw new Error("Need at least 4 hard players");

  console.log("\nAll tier pools validated — no cross-tier overlap in asset paths.");
}

main();
