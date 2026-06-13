const { buildNewsFeed } = require("../api/wc2034-news");

async function testParsers() {
  const {
    fetchSaudi2034News,
    fetchWca34News,
    fetchFifaNews,
  } = require("../api/lib/wc2034NewsSources");

  const [saudi, wca, fifa] = await Promise.allSettled([
    fetchSaudi2034News(),
    fetchWca34News(),
    fetchFifaNews(),
  ]);

  console.log("Saudi2034", saudi.status, saudi.value?.length || saudi.reason?.message);
  console.log("WCA34", wca.status, wca.value?.length || wca.reason?.message);
  console.log("FIFA", fifa.status, fifa.value?.length || fifa.reason?.message);

  if (saudi.status === "fulfilled") {
    console.log("Sample Saudi:", saudi.value[0]?.title?.slice(0, 80));
  }
  if (wca.status === "fulfilled") {
    console.log("Sample WCA:", wca.value[0]?.title?.slice(0, 80));
    console.log("WCA titles:", wca.value.map((a) => a.title.slice(0, 50)));
  }
  if (fifa.status === "fulfilled") {
    console.log("Sample FIFA:", fifa.value[0]?.title?.slice(0, 80));
  }
}

testParsers().catch(console.error);
