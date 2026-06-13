import { NEWS_PLACEHOLDER } from "./newsService";
import fallbackArticles from "./wc2034FallbackNews";

export { NEWS_PLACEHOLDER };

export const WC2034_NEWS_REFRESH_MS = 30 * 60 * 1000;
export const WC2034_NEWS_API = "/api/wc2034-news";

export async function fetchWc2034News(limit = 5) {
  try {
    const response = await fetch(`${WC2034_NEWS_API}?limit=${limit}`);

    if (response.ok) {
      const data = await response.json();
      const articles = Array.isArray(data.articles) ? data.articles : [];
      if (articles.length) {
        return { articles: articles.slice(0, limit), fromFallback: Boolean(data.meta?.fallback) };
      }
    }
  } catch (error) {
    console.warn("WC2034 news API unavailable, using curated fallback.", error);
  }

  return {
    articles: fallbackArticles.slice(0, limit),
    fromFallback: true,
  };
}
