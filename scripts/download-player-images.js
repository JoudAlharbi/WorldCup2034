/**
 * Download real player portraits via Wikipedia REST API + legacy fallbacks.
 * Output: public/assets/games/players/{id}.jpg
 * Run: npm run whoami:download
 */
const fs = require("fs");
const path = require("path");
const https = require("https");

const MANIFEST = require("./playerImageManifest.json");
const OUT_DIR = path.join(__dirname, "..", "public", "assets", "games", "players");
const LEGACY_DIR = path.join(__dirname, "..", "public", "whoami", "players");
const MIN_BYTES = 12000;
const TARGET_WIDTH = 640;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "FIFA-Fan-App/1.0 (educational demo)" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          fetchJson(res.headers.location).then(resolve).catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}`));
          return;
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => {
          try {
            resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")));
          } catch (err) {
            reject(err);
          }
        });
      })
      .on("error", reject);
  });
}

function downloadBuffer(url, attempt = 1) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "FIFA-Fan-App/1.0 (educational demo)" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          downloadBuffer(res.headers.location, attempt).then(resolve).catch(reject);
          return;
        }
        if (res.statusCode === 429 && attempt < 4) {
          sleep(2000 * attempt).then(() => downloadBuffer(url, attempt + 1).then(resolve).catch(reject));
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}`));
          return;
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks)));
      })
      .on("error", reject);
  });
}

function upscaleWikiThumb(thumbUrl) {
  if (!thumbUrl) return null;
  return thumbUrl.replace(/\/(\d+)px-/, `/${TARGET_WIDTH}px-`);
}

async function fetchWikipediaPortrait(wikiTitle) {
  const api = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiTitle)}`;
  const data = await fetchJson(api);
  const url = data.originalimage?.source || upscaleWikiThumb(data.thumbnail?.source);
  if (!url) throw new Error("No portrait on Wikipedia page");
  return url;
}

function copyLegacyIfValid(player, dest) {
  const legacy = path.join(LEGACY_DIR, `${player.id}.jpg`);
  if (fs.existsSync(legacy) && fs.statSync(legacy).size >= MIN_BYTES) {
    fs.copyFileSync(legacy, dest);
    return true;
  }
  return false;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  let ok = 0;
  const failed = [];

  for (const player of MANIFEST) {
    const dest = path.join(OUT_DIR, `${player.id}.jpg`);

    if (fs.existsSync(dest) && fs.statSync(dest).size >= MIN_BYTES) {
      console.log(`Skip ${player.id} (exists)`);
      ok += 1;
      continue;
    }

    process.stdout.write(`${player.id}... `);
    try {
      if (copyLegacyIfValid(player, dest)) {
        console.log("legacy");
        ok += 1;
        continue;
      }

      let portraitUrl = player.directUrl || null;
      if (!portraitUrl) {
        portraitUrl = await fetchWikipediaPortrait(player.wikiTitle);
      }

      await sleep(player.directUrl ? 2500 : 1200);
      const buffer = await downloadBuffer(portraitUrl);

      if (buffer.length < MIN_BYTES) {
        throw new Error(`File too small (${buffer.length} bytes)`);
      }

      fs.writeFileSync(dest, buffer);
      console.log("ok");
      ok += 1;
    } catch (err) {
      console.log(`FAILED (${err.message})`);
      failed.push(player.id);
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
    }
  }

  console.log(`\nDownloaded/verified: ${ok}/${MANIFEST.length}`);
  if (failed.length) console.log(`Failed: ${failed.join(", ")}`);
  if (failed.length) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
