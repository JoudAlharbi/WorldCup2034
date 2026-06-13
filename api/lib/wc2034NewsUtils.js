const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const RELEVANCE_PATTERN =
  /\b(2034|world cup 2034|fifa world cup.? ?2034|saudi arabia.? ?2034|host(?:ing)?.*2034|bid.*2034)\b/i;

const EXCLUDE_PATTERN =
  /\b(transfer|signs for|on loan|premier league|champions league|la liga|serie a|bundesliga|women'?s premier league|king'?s cup final|afc asian cup|fifa club world cup 2023|snooker|formula 1|tennis|golf|boxing|cricket)\b/i;

function decodeHtml(value = "") {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stripTags(value = "") {
  return decodeHtml(value.replace(/<[^>]+>/g, " "));
}

function parseLooseDate(value) {
  if (!value) return null;
  const cleaned = value.replace(/\s+/g, " ").trim();
  const parsed = new Date(cleaned);
  if (!Number.isNaN(parsed.getTime())) return parsed.toISOString();

  const match = cleaned.match(/(\d{1,2})\s+([A-Za-z]+),?\s+(\d{4})/);
  if (match) {
    const attempt = new Date(`${match[2]} ${match[1]}, ${match[3]}`);
    if (!Number.isNaN(attempt.getTime())) return attempt.toISOString();
  }

  return null;
}

function absoluteUrl(base, href) {
  if (!href) return null;
  if (href.startsWith("http")) return href;
  return new URL(href, base).href;
}

function isRelevantArticle(article) {
  const text = `${article.title} ${article.description || ""}`.trim();
  if (!text || EXCLUDE_PATTERN.test(text)) return false;
  return RELEVANCE_PATTERN.test(text);
}

function isAuthorityArticle(article) {
  const text = `${article.title} ${article.description || ""}`.trim();
  if (!text || EXCLUDE_PATTERN.test(text)) return false;
  // Dedicated WC 2034 authority listing — treat items as official tournament news.
  return true;
}

async function fetchHtml(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": USER_AGENT,
      Accept: "text/html,application/xhtml+xml",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`);
  }

  return response.text();
}

function readMeta(html, property) {
  const patterns = [
    new RegExp(`property="${property}" content="([^"]+)"`, "i"),
    new RegExp(`name="${property}" content="([^"]+)"`, "i"),
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) return decodeHtml(match[1]);
  }

  return null;
}

function dedupeArticles(articles) {
  const seen = new Set();
  return articles.filter((article) => {
    const key = (article.url || article.title || "").toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function sortArticles(articles) {
  return [...articles].sort((a, b) => {
    const aTime = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const bTime = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return bTime - aTime;
  });
}

module.exports = {
  USER_AGENT,
  decodeHtml,
  stripTags,
  parseLooseDate,
  absoluteUrl,
  isRelevantArticle,
  isAuthorityArticle,
  fetchHtml,
  readMeta,
  dedupeArticles,
  sortArticles,
  EXCLUDE_PATTERN,
  RELEVANCE_PATTERN,
};
