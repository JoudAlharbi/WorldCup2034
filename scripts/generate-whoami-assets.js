/**
 * Generates reveal WebP assets from real player photos.
 * Source: public/assets/games/players/{id}.jpg
 * Output: public/assets/games/players/{id}/{reveal}.webp
 * Run: npm run whoami:assets
 * NEVER generates placeholder graphics — skips players without a valid photo.
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const MANIFEST = require("./playerImageManifest.json");

const SOURCE_DIR = path.join(__dirname, "..", "public", "assets", "games", "players");
const TARGET_WIDTH = 420;
const TARGET_HEIGHT = 525;
const MAX_BYTES = 400 * 1024;
const MIN_SOURCE_BYTES = 15000;

const REVEALS = [
  { id: "eye-reveal", generate: generateEyeReveal },
  { id: "face-crop", generate: generateFaceCrop },
  { id: "silhouette", generate: generateSilhouette },
  { id: "jersey-reveal", generate: generateJerseyReveal },
  { id: "celebration", generate: generateCelebration },
];

async function writeWebp(sharpInstance, dest) {
  let quality = 82;
  let output = await sharpInstance.webp({ quality, effort: 4 }).toBuffer();
  while (output.length > MAX_BYTES && quality > 50) {
    quality -= 6;
    output = await sharpInstance.clone().webp({ quality, effort: 4 }).toBuffer();
  }
  fs.writeFileSync(dest, output);
  return output.length;
}

function basePipeline(sourceBuffer) {
  return sharp(sourceBuffer)
    .rotate()
    .resize(TARGET_WIDTH, TARGET_HEIGHT, { fit: "cover", position: "centre" });
}

async function generateEyeReveal(baseBuffer) {
  const w = TARGET_WIDTH;
  const h = TARGET_HEIGHT;
  return sharp(baseBuffer).extract({
    left: Math.floor(w * 0.22),
    top: 0,
    width: Math.floor(w * 0.56),
    height: Math.max(1, Math.floor(h * 0.32)),
  }).resize(w, h, { fit: "cover" });
}

async function generateFaceCrop(baseBuffer) {
  const w = TARGET_WIDTH;
  const h = TARGET_HEIGHT;
  return sharp(baseBuffer).extract({
    left: Math.floor(w * 0.12),
    top: Math.floor(h * 0.05),
    width: Math.floor(w * 0.76),
    height: Math.max(1, Math.floor(h * 0.48)),
  }).resize(w, h, { fit: "cover" });
}

async function generateSilhouette(baseBuffer) {
  return sharp(baseBuffer).grayscale().modulate({ brightness: 0.35, saturation: 0 }).linear(1.15, -10);
}

async function generateJerseyReveal(baseBuffer) {
  const w = TARGET_WIDTH;
  const h = TARGET_HEIGHT;
  return sharp(baseBuffer).extract({
    left: Math.floor(w * 0.08),
    top: Math.floor(h * 0.42),
    width: Math.floor(w * 0.84),
    height: Math.max(1, Math.floor(h * 0.58)),
  }).resize(w, h, { fit: "cover" });
}

async function generateCelebration(baseBuffer) {
  const w = TARGET_WIDTH;
  const h = TARGET_HEIGHT;
  const celebSize = Math.floor(w * 1.12);
  const celebBuffer = await sharp(baseBuffer)
    .resize(celebSize, Math.floor(h * 1.12), { fit: "cover" })
    .toBuffer();
  const celebMeta = await sharp(celebBuffer).metadata();
  const left = Math.max(0, Math.floor((celebMeta.width - w) / 2));
  const top = Math.max(0, Math.floor((celebMeta.height - h) / 2));
  return sharp(celebBuffer).extract({
    left,
    top,
    width: Math.min(w, celebMeta.width - left),
    height: Math.min(h, celebMeta.height - top),
  }).resize(w, h, { fit: "cover" });
}

async function generatePlayer(player) {
  const sourcePath = path.join(SOURCE_DIR, `${player.id}.jpg`);
  if (!fs.existsSync(sourcePath) || fs.statSync(sourcePath).size < MIN_SOURCE_BYTES) {
    return { ok: false, reason: "missing source photo" };
  }

  const sourceBuffer = await fs.promises.readFile(sourcePath);
  const baseBuffer = await basePipeline(sourceBuffer).toBuffer();
  const outDir = path.join(SOURCE_DIR, player.id);
  fs.mkdirSync(outDir, { recursive: true });

  for (const reveal of REVEALS) {
    const pipeline = await reveal.generate(baseBuffer);
    await writeWebp(pipeline, path.join(outDir, `${reveal.id}.webp`));
  }

  return { ok: true };
}

async function main() {
  const ready = [];
  const skipped = [];

  for (const player of MANIFEST) {
    process.stdout.write(`${player.id}... `);
    try {
      const result = await generatePlayer(player);
      if (result.ok) {
        console.log("ok");
        ready.push(player.id);
      } else {
        console.log(`SKIP (${result.reason})`);
        skipped.push(player.id);
      }
    } catch (err) {
      console.log(`ERROR (${err.message})`);
      skipped.push(player.id);
    }
  }

  const registry = {
    generatedAt: new Date().toISOString(),
    ready,
    skipped,
    reveals: REVEALS.map((r) => r.id),
  };
  fs.writeFileSync(
    path.join(SOURCE_DIR, "registry.json"),
    JSON.stringify(registry, null, 2)
  );

  console.log(`\nReady: ${ready.length}/${MANIFEST.length}`);
  if (skipped.length) console.log(`Skipped: ${skipped.join(", ")}`);
  console.log("Registry written to public/assets/games/players/registry.json");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
