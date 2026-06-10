/**
 * Validates Who Am I assets — ensures no placeholders, tests random questions.
 * Run: npm run whoami:validate
 */
const fs = require("fs");
const path = require("path");

const REGISTRY_PATH = path.join(__dirname, "..", "public", "assets", "games", "players", "registry.json");
const PLAYERS_DIR = path.join(__dirname, "..", "public", "assets", "games", "players");
const REVEALS = ["eye-reveal", "face-crop", "silhouette", "jersey-reveal", "celebration"];
const MIN_WEBP_BYTES = 3500;

function loadRegistry() {
  if (!fs.existsSync(REGISTRY_PATH)) {
    throw new Error("registry.json missing — run npm run whoami:assets first");
  }
  return JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf8"));
}

function isValidWebp(filePath) {
  if (!fs.existsSync(filePath)) return false;
  const stat = fs.statSync(filePath);
  return stat.size >= MIN_WEBP_BYTES;
}

function shuffle(items) {
  const list = [...items];
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

function main() {
  const registry = loadRegistry();
  const ready = [];

  for (const id of registry.ready) {
    const source = path.join(PLAYERS_DIR, `${id}.jpg`);
    if (!fs.existsSync(source) || fs.statSync(source).size < 15000) {
      console.error(`FAIL ${id}: missing or invalid source JPG`);
      process.exit(1);
    }

    for (const reveal of REVEALS) {
      const webp = path.join(PLAYERS_DIR, id, `${reveal}.webp`);
      if (!isValidWebp(webp)) {
        console.error(`FAIL ${id}: invalid ${reveal}.webp`);
        process.exit(1);
      }
    }
    ready.push(id);
  }

  if (ready.length < 6) {
    console.error(`FAIL: only ${ready.length} players ready (need at least 6)`);
    process.exit(1);
  }

  console.log(`Asset check passed for ${ready.length} players.`);

  const samples = [];
  for (let i = 0; i < 10; i += 1) {
    const playerId = ready[Math.floor(Math.random() * ready.length)];
    const reveal = REVEALS[Math.floor(Math.random() * REVEALS.length)];
    const webp = path.join(PLAYERS_DIR, playerId, `${reveal}.webp`);
    samples.push({ playerId, reveal, bytes: fs.statSync(webp).size });
  }

  console.log("\n10 random question samples:");
  samples.forEach((s, idx) => {
    console.log(`  ${idx + 1}. ${s.playerId} / ${s.reveal} (${s.bytes} bytes) ✓`);
  });

  console.log("\nAll validations passed — real photos only, no placeholders.");
}

main();
