/**
 * Generates tier-specific reveal WebP assets.
 * Source: public/assets/games/players/{tier}/{id}/source.jpg
 * Output: public/assets/games/players/{tier}/{id}/{reveal}.webp
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const MANIFEST = require("./playerImageManifest.json");

const ROOT = path.join(__dirname, "..", "public", "assets", "games", "players");
const W = 420;
const H = 525;
const MAX_BYTES = 400 * 1024;
const MIN_SOURCE = 11000;

const TIER_REVEALS = {
  easy: ["face-full", "clear-portrait", "celebration", "jersey-reveal"],
  medium: ["action-shot", "side-profile", "partial-face", "silhouette"],
  hard: ["silhouette-dark", "eye-reveal", "boots-crop", "extreme-crop", "vintage"],
};

async function writeWebp(buildPipeline) {
  let quality = 82;
  let output = await buildPipeline(quality);
  while (output.length > MAX_BYTES && quality > 48) {
    quality -= 6;
    output = await buildPipeline(quality);
  }
  return output;
}

async function baseBuffer(sourceBuffer) {
  return sharp(sourceBuffer).rotate().resize(W, H, { fit: "cover", position: "centre" }).toBuffer();
}

const GENERATORS = {
  "face-full": (buf) =>
    sharp(buf).extract({ left: Math.floor(W * 0.08), top: 0, width: Math.floor(W * 0.84), height: Math.floor(H * 0.55) }).resize(W, H, { fit: "cover" }),
  "clear-portrait": (buf) =>
    sharp(buf).extract({ left: Math.floor(W * 0.15), top: Math.floor(H * 0.02), width: Math.floor(W * 0.7), height: Math.floor(H * 0.5) }).resize(W, H, { fit: "cover" }),
  celebration: (buf) =>
    sharp(buf).modulate({ brightness: 1.05 }).resize(Math.floor(W * 1.08), Math.floor(H * 1.08), { fit: "cover" }).extract({ left: Math.floor(W * 0.04), top: 0, width: W, height: H }),
  "jersey-reveal": (buf) =>
    sharp(buf).extract({ left: Math.floor(W * 0.1), top: Math.floor(H * 0.35), width: Math.floor(W * 0.8), height: Math.floor(H * 0.55) }).resize(W, H, { fit: "cover" }),

  "action-shot": (buf) =>
    sharp(buf).extract({ left: 0, top: Math.floor(H * 0.25), width: W, height: Math.floor(H * 0.75) }).resize(W, H, { fit: "cover" }),
  "side-profile": (buf) =>
    sharp(buf).extract({ left: Math.floor(W * 0.55), top: Math.floor(H * 0.05), width: Math.floor(W * 0.4), height: Math.floor(H * 0.45) }).resize(W, H, { fit: "cover" }),
  "partial-face": (buf) =>
    sharp(buf).extract({ left: Math.floor(W * 0.28), top: Math.floor(H * 0.08), width: Math.floor(W * 0.44), height: Math.floor(H * 0.28) }).resize(W, H, { fit: "cover" }),
  silhouette: (buf) =>
    sharp(buf).grayscale().modulate({ brightness: 0.55, saturation: 0 }).linear(1.1, -20),

  "silhouette-dark": (buf) =>
    sharp(buf).grayscale().modulate({ brightness: 0.22, saturation: 0 }).linear(1.3, -30),
  "eye-reveal": (buf) =>
    sharp(buf)
      .extract({ left: Math.floor(W * 0.25), top: Math.floor(H * 0.04), width: Math.floor(W * 0.5), height: Math.floor(H * 0.2) })
      .resize(W, H, { fit: "cover" })
      .sharpen({ sigma: 1 }),
  "boots-crop": (buf) =>
    sharp(buf)
      .extract({ left: Math.floor(W * 0.1), top: Math.floor(H * 0.72), width: Math.floor(W * 0.8), height: Math.floor(H * 0.28) })
      .resize(W, H, { fit: "cover" }),
  "extreme-crop": (buf) =>
    sharp(buf)
      .extract({ left: Math.floor(W * 0.35), top: Math.floor(H * 0.38), width: Math.floor(W * 0.3), height: Math.floor(H * 0.3) })
      .resize(W, H, { fit: "cover" })
      .modulate({ brightness: 0.85 }),
  vintage: (buf) =>
    sharp(buf).grayscale().modulate({ brightness: 0.7 }).tint({ r: 80, g: 70, b: 60 }).blur(0.6),
};

async function generatePlayer(player) {
  const sourcePath = path.join(ROOT, player.tier, player.id, "source.jpg");
  if (!fs.existsSync(sourcePath) || fs.statSync(sourcePath).size < MIN_SOURCE) {
    return { ok: false, reason: "missing source" };
  }

  const sourceBuffer = fs.readFileSync(sourcePath);
  const base = await baseBuffer(sourceBuffer);
  const reveals = TIER_REVEALS[player.tier] || TIER_REVEALS.easy;
  const outDir = path.join(ROOT, player.tier, player.id);

  for (const revealId of reveals) {
    const gen = GENERATORS[revealId];
    if (!gen) continue;
    const output = await writeWebp((quality) =>
      gen(base).webp({ quality, effort: 4 }).toBuffer()
    );
    fs.writeFileSync(path.join(outDir, `${revealId}.webp`), output);
  }

  return { ok: true };
}

async function main() {
  const ready = { easy: [], medium: [], hard: [] };
  const skipped = [];

  for (const player of MANIFEST) {
    process.stdout.write(`${player.tier}/${player.id}... `);
    try {
      const result = await generatePlayer(player);
      if (result.ok) {
        console.log("ok");
        ready[player.tier].push(player.id);
      } else {
        console.log(`SKIP (${result.reason})`);
        skipped.push(`${player.tier}/${player.id}`);
      }
    } catch (err) {
      console.log(`ERROR (${err.message})`);
      skipped.push(`${player.tier}/${player.id}`);
    }
  }

  const registry = {
    generatedAt: new Date().toISOString(),
    ready,
    skipped,
    revealsByTier: TIER_REVEALS,
  };

  fs.writeFileSync(path.join(ROOT, "registry.json"), JSON.stringify(registry, null, 2));
  console.log(`\nEasy: ${ready.easy.length} | Medium: ${ready.medium.length} | Hard: ${ready.hard.length}`);
  if (skipped.length) console.log(`Skipped: ${skipped.join(", ")}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
