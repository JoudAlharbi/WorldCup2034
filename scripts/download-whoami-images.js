/**
 * One-time script: download Who Am I player portraits to public/whoami/players/
 * Run: node scripts/download-whoami-images.js
 */
const fs = require("fs");
const path = require("path");
const https = require("https");

const PLAYERS = [
  { id: "messi", file: "Lionel-Messi-Argentina-2022-FIFA-World-Cup_(cropped).jpg" },
  { id: "ronaldo", file: "Cristiano_Ronaldo_2018.jpg" },
  { id: "neymar", file: "Neymar_Jr._with_Al_Hilal,_3_October_2023_(cropped).jpg" },
  { id: "mbappe", file: "Kylian_Mbappé_(cropped).jpg" },
  { id: "benzema", file: "Karim_Benzema_2022.jpg" },
  { id: "modric", file: "Luka_Modric_2018.jpg" },
  { id: "ibrahimovic", file: "Zlatan_Ibrahimović_2016.jpg" },
  { id: "neuer", file: "Manuel_Neuer_2018.jpg" },
  { id: "haaland", file: "Erling_Haaland_2023_(cropped).jpg" },
  { id: "kane", file: "Harry_Kane_2018.jpg" },
  { id: "salah", file: "Mohamed_Salah_2018.jpg" },
  { id: "debruyne", file: "Kevin_De_Bruyne_20180709132505.jpg" },
  { id: "lewandowski", file: "Robert_Lewandowski_2018.jpg" },
  { id: "vinicius", file: "Vinicius_Jr_2022.jpg" },
  { id: "rodri", file: "Rodri_2023_(cropped).jpg" },
  { id: "bruno", file: "Bruno_Fernandes_2021.jpg" },
  { id: "son", file: "Son_Heung-min_2018.jpg" },
  { id: "vandijk", file: "Virgil_van_Dijk_2019.jpg" },
  { id: "griezmann", file: "Antoine_Griezmann_2018.jpg" },
  { id: "saka", file: "Bukayo_Saka_2021.jpg" },
  { id: "rice", file: "Declan_Rice_2023.jpg" },
  { id: "bellingham", file: "Jude_Bellingham_2023.jpg" },
  { id: "pedri", file: "Pedri_2021.jpg" },
  { id: "yamal", file: "Lamine_Yamal_2024.jpg" },
  { id: "foden", file: "Phil_Foden_2021.jpg" },
  { id: "osimhen", file: "Victor_Osimhen_2023.jpg" },
  { id: "bernardo", file: "Bernardo_Silva_2018.jpg" },
  { id: "musiala", file: "Jamal_Musiala_2022.jpg" },
  { id: "wirtz", file: "Florian_Wirtz_2023.jpg" },
  { id: "leao", file: "Rafael_Leão_2022.jpg" },
  { id: "davies", file: "Alphonso_Davies_2019.jpg" },
];

const OUT_DIR = path.join(__dirname, "..", "public", "whoami", "players");

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, { headers: { "User-Agent": "FIFA-Fan-App/1.0" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          file.close();
          fs.unlink(dest, () => {});
          download(res.headers.location, dest).then(resolve).catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          file.close();
          fs.unlink(dest, () => {});
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        res.pipe(file);
        file.on("finish", () => file.close(resolve));
      })
      .on("error", reject);
  });
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const player of PLAYERS) {
    const dest = path.join(OUT_DIR, `${player.id}.jpg`);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 10000) {
      console.log(`Skip ${player.id} (exists)`);
      continue;
    }
    const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(player.file)}?width=480`;
    process.stdout.write(`Downloading ${player.id}... `);
    try {
      await download(url, dest);
      console.log("ok");
    } catch (err) {
      console.log(`failed (${err.message})`);
    }
    await sleep(1500);
  }
}

main();
