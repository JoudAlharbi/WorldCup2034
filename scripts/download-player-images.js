/**
 * Download tier-scoped player portraits.
 * Output: public/assets/games/players/{tier}/{id}/source.jpg
 */
const fs = require("fs");
const path = require("path");
const https = require("https");

const MANIFEST = require("./playerImageManifest.json");
const ROOT = path.join(__dirname, "..", "public", "assets", "games", "players");
const LEGACY = path.join(__dirname, "..", "public", "assets", "games", "players");
const OLD_LEGACY = path.join(__dirname, "..", "public", "whoami", "players");
const MIN_BYTES = 11000;
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
        if (res.statusCode === 429 && attempt < 5) {
          sleep(3000 * attempt).then(() => downloadBuffer(url, attempt + 1).then(resolve).catch(reject));
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

async function fetchWikipediaPortrait(wikiTitle) {
  const api = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiTitle)}`;
  const data = await fetchJson(api);
  const url = data.originalimage?.source || data.thumbnail?.source?.replace(/\/(\d+)px-/, `/${TARGET_WIDTH}px-`);
  if (!url) throw new Error("No portrait on Wikipedia page");
  return url;
}

function tryCopyLegacy(player, dest) {
  const paths = [
    path.join(ROOT, player.tier, player.id, "source.jpg"),
    path.join(LEGACY, `${player.id}.jpg`),
    path.join(OLD_LEGACY, `${player.id}.jpg`),
  ];
  for (const src of paths) {
    if (fs.existsSync(src) && fs.statSync(src).size >= MIN_BYTES) {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(src, dest);
      return true;
    }
  }
  return false;
}

async function main() {
  let ok = 0;
  const failed = [];

  for (const player of MANIFEST) {
    const outDir = path.join(ROOT, player.tier, player.id);
    const dest = path.join(outDir, "source.jpg");
    fs.mkdirSync(outDir, { recursive: true });

    if (fs.existsSync(dest) && fs.statSync(dest).size >= MIN_BYTES) {
      console.log(`Skip ${player.tier}/${player.id} (exists)`);
      ok += 1;
      continue;
    }

    process.stdout.write(`${player.tier}/${player.id}... `);
    try {
      if (tryCopyLegacy(player, dest)) {
        console.log("legacy");
        ok += 1;
        continue;
      }

      const portraitUrl = player.directUrl || (await fetchWikipediaPortrait(player.wikiTitle));
      await sleep(2500);
      const buffer = await downloadBuffer(portraitUrl);

      if (buffer.length < MIN_BYTES) {
        throw new Error(`File too small (${buffer.length} bytes)`);
      }

      fs.writeFileSync(dest, buffer);
      console.log("ok");
      ok += 1;
    } catch (err) {
      console.log(`FAILED (${err.message})`);
      failed.push(`${player.tier}/${player.id}`);
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
    }
  }

  console.log(`\nDownloaded/verified: ${ok}/${MANIFEST.length}`);
  if (failed.length) console.log(`Failed: ${failed.join(", ")}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
