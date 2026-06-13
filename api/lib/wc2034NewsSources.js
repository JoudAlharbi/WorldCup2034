const {
  absoluteUrl,
  decodeHtml,
  fetchHtml,
  isAuthorityArticle,
  isRelevantArticle,
  parseLooseDate,
  readMeta,
  stripTags,
} = require("./wc2034NewsUtils");

const SAUDI2034_LIST_URL = "https://saudi2034.com.sa/news-and-assets/";
const WCA34_LIST_URL = "https://www.wca34.gov.sa/en/media-center/news";
const FIFA_HUB_URL = "https://inside.fifa.com/tournament-organisation/world-cup-2034";
const FIFA_BASE = "https://inside.fifa.com";

function parseSaudi2034(html) {
  const articles = [];
  const blocks = html.split('<div class="news-card');

  blocks.slice(1).forEach((block) => {
    const urlMatch = block.match(/href="(https:\/\/saudi2034\.com\.sa\/news\/[^"]+)"/);
    const imageMatch = block.match(/<img src="([^"]+)"/);
    const titleMatch = block.match(/<h5[\s\S]*?<a[^>]*>\s*([\s\S]*?)<\/a>/);

    if (!urlMatch || !titleMatch) return;

    const article = {
      title: stripTags(titleMatch[1]),
      description: "",
      url: decodeHtml(urlMatch[1]),
      image: imageMatch ? decodeHtml(imageMatch[1]) : null,
      source: "Saudi 2034",
      publishedAt: null,
    };

    if (isRelevantArticle(article)) {
      articles.push(article);
    }
  });

  return articles;
}

function parseWca34(html) {
  const articles = [];
  const columns = html.split('<div class="col-xl-3 col-lg-4 col-md-6">').slice(1);

  columns.forEach((block) => {
    const urlMatch = block.match(/href="(\/en\/media-center\/news\/\d+)"/);
    const imageMatch = block.match(/<img src="(\/sites\/default\/files[^"]+)"/);
    const titleMatch = block.match(/<h4[^>]*>\s*([\s\S]*?)<\/h4>/);
    const summaryMatch = block.match(/<p class="fs-[^"]*">\s*([\s\S]*?)<\/p>/);
    const dateMatch = block.match(/<span>\s*([^<]+?\d{4}[^<]*?)<\/span>/);

    if (!urlMatch || !titleMatch) return;

    const article = {
      title: stripTags(titleMatch[1]),
      description: summaryMatch ? stripTags(summaryMatch[1]) : "",
      url: absoluteUrl(WCA34_LIST_URL, urlMatch[1]),
      image: imageMatch
        ? absoluteUrl(WCA34_LIST_URL, decodeHtml(imageMatch[1]))
        : null,
      source: "WC 2034 Authority",
      publishedAt: dateMatch ? parseLooseDate(dateMatch[1]) : null,
    };

    if (isAuthorityArticle(article)) {
      articles.push(article);
    }
  });

  return articles;
}

function parseFifaHubLinks(html) {
  const links = new Set();
  const pattern = /href="(\/media-releases\/[^"]+)"/gi;
  let match = pattern.exec(html);

  while (match) {
    if (/2034|world-cup-2034/i.test(match[1])) {
      links.add(absoluteUrl(FIFA_BASE, match[1]));
    }
    match = pattern.exec(html);
  }

  return [...links];
}

async function fetchFifaArticle(url) {
  const html = await fetchHtml(url);
  const title =
    readMeta(html, "og:title") ||
    stripTags(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || "");

  const article = {
    title: title.replace(/\s*\|\s*FIFA.*$/i, "").trim(),
    description:
      readMeta(html, "og:description") ||
      readMeta(html, "description") ||
      "",
    url,
    image: readMeta(html, "og:image"),
    source: "FIFA",
    publishedAt:
      html.match(/datetime="([^"]+)"/)?.[1] ||
      readMeta(html, "article:published_time") ||
      null,
  };

  return isRelevantArticle(article) ? article : null;
}

async function fetchSaudi2034News() {
  const html = await fetchHtml(SAUDI2034_LIST_URL);
  return parseSaudi2034(html);
}

async function fetchWca34News() {
  const html = await fetchHtml(WCA34_LIST_URL);
  return parseWca34(html);
}

async function fetchFifaNews() {
  const html = await fetchHtml(FIFA_HUB_URL);
  const links = parseFifaHubLinks(html);
  const articles = [];

  for (const link of links.slice(0, 4)) {
    try {
      const article = await fetchFifaArticle(link);
      if (article) articles.push(article);
    } catch {
      // Skip individual FIFA article failures.
    }
  }

  if (articles.length === 0 && links.length === 0) {
    const fallbackArticle = {
      title: "The road to the FIFA World Cup 2034™",
      description:
        "All 211 FIFA Member Associations appointed Saudi Arabia to stage the FIFA World Cup 2034™ following a thorough bidding process.",
      url: FIFA_HUB_URL,
      image: readMeta(html, "og:image"),
      source: "FIFA",
      publishedAt: null,
    };

    if (isRelevantArticle(fallbackArticle)) {
      articles.push(fallbackArticle);
    }
  }

  return articles;
}

module.exports = {
  fetchSaudi2034News,
  fetchWca34News,
  fetchFifaNews,
};
