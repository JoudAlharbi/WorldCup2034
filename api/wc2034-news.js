const {
  dedupeArticles,
  isRelevantArticle,
  sortArticles,
} = require("./lib/wc2034NewsUtils");
const {
  fetchFifaNews,
  fetchSaudi2034News,
  fetchWca34News,
} = require("./lib/wc2034NewsSources");
const fallbackArticles = require("./lib/wc2034FallbackNews");

async function buildNewsFeed(limit = 5) {
  const sourceResults = await Promise.allSettled([
    fetchSaudi2034News(),
    fetchWca34News(),
    fetchFifaNews(),
  ]);

  const liveArticles = sourceResults.flatMap((result) =>
    result.status === "fulfilled" ? result.value : []
  );

  const merged = dedupeArticles(
    sortArticles(liveArticles.filter(isRelevantArticle))
  );

  if (merged.length >= limit) {
    return {
      articles: merged.slice(0, limit),
      sourcesUsed: ["saudi2034", "wca34", "fifa"],
      fallback: false,
    };
  }

  const combined = dedupeArticles(
    sortArticles([...merged, ...fallbackArticles.filter(isRelevantArticle)])
  );

  return {
    articles: combined.slice(0, limit),
    sourcesUsed: sourceResults
      .map((result, index) =>
        result.status === "fulfilled" ? ["saudi2034", "wca34", "fifa"][index] : null
      )
      .filter(Boolean),
    fallback: merged.length < limit,
  };
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=900, stale-while-revalidate=1800");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  const limit = Math.min(Number(req.query?.limit) || 5, 12);

  try {
    const payload = await buildNewsFeed(limit);
    res.status(200).json({
      articles: payload.articles,
      meta: {
        count: payload.articles.length,
        sourcesUsed: payload.sourcesUsed,
        fallback: payload.fallback,
        updatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    res.status(200).json({
      articles: fallbackArticles.slice(0, limit),
      meta: {
        count: Math.min(limit, fallbackArticles.length),
        sourcesUsed: [],
        fallback: true,
        updatedAt: new Date().toISOString(),
        error: error.message,
      },
    });
  }
};
