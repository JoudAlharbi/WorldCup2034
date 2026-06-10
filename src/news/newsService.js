const API_KEY = process.env.REACT_APP_NEWSDATA_API_KEY;

export const NEWS_PLACEHOLDER = `${process.env.PUBLIC_URL}/HomePage/placeholder.svg`;
export const NEWS_REFRESH_MS = 45 * 60 * 1000;
export const NEWS_QUERY =
  '"World Cup 2034" OR "FIFA World Cup" OR "Saudi Arabia 2034" OR football OR soccer OR FIFA';

export function hasNewsApiKey() {
  return Boolean(API_KEY);
}

export function normalizeNewsItem(item) {
  return {
    title: item.title,
    description: item.description,
    url: item.link,
    image: item.image_url || null,
    source: item.source_id || "News",
    publishedAt: item.pubDate || null,
  };
}

export function formatRelativePublished(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);

  if (diffMins < 1) return "Published just now";
  if (diffMins < 60) {
    return `Published ${diffMins} minute${diffMins === 1 ? "" : "s"} ago`;
  }
  if (diffHours < 24) {
    return `Published ${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  }

  if (date.toDateString() === now.toDateString()) return "Published today";

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) return "Published yesterday";

  return `Published ${new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date)}`;
}

export async function fetchFootballNews(limit = 5) {
  if (!API_KEY) {
    throw new Error("no-key");
  }

  const url = `https://newsdata.io/api/1/latest?apikey=${API_KEY}&language=en&q=${encodeURIComponent(NEWS_QUERY)}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("bad response");
  }

  const data = await response.json();
  const results = Array.isArray(data.results) ? data.results : [];

  return results
    .map(normalizeNewsItem)
    .filter((article) => article.title)
    .slice(0, limit);
}
