import React, { useCallback, useEffect, useState } from "react";
import {
  NEWS_PLACEHOLDER,
  NEWS_REFRESH_MS,
  fetchFootballNews,
  formatRelativePublished,
  hasNewsApiKey,
} from "./newsService";
import "./liveNewsFeed.css";

const onImgError = (event) => {
  if (event.target.src !== NEWS_PLACEHOLDER) {
    event.target.src = NEWS_PLACEHOLDER;
  }
};

function LiveNewsFeed() {
  const [articles, setArticles] = useState([]);
  const [status, setStatus] = useState(hasNewsApiKey() ? "loading" : "no-key");

  const loadNews = useCallback((silent = false) => {
    if (!hasNewsApiKey()) {
      setStatus("no-key");
      return;
    }

    if (!silent) {
      setStatus((prev) => (prev === "ready" ? prev : "loading"));
    }

    fetchFootballNews(5)
      .then((list) => {
        setArticles(list);
        setStatus(list.length ? "ready" : "empty");
      })
      .catch((err) => {
        console.error("News fetch error:", err);
        if (err.message === "no-key") {
          setStatus("no-key");
        } else {
          setStatus((prev) => (prev === "ready" ? prev : "error"));
        }
      });
  }, []);

  useEffect(() => {
    loadNews();
    const intervalId = setInterval(() => loadNews(true), NEWS_REFRESH_MS);
    return () => clearInterval(intervalId);
  }, [loadNews]);

  const featured = articles[0];
  const secondary = articles.slice(1);

  return (
    <section className="lnf" id="news-section" aria-labelledby="lnf-title">
      <div className="lnf__inner">
        <header className="lnf__header">
          <span className="lnf__badge">
            <span className="lnf__badge-dot" aria-hidden="true" />
            Live Football News
          </span>
          <h2 className="lnf__title" id="lnf-title">
            News Feed
          </h2>
          <p className="lnf__subtitle">
            Automatically updated headlines from across the world of football and FIFA.
          </p>
        </header>

        {status === "loading" && (
          <div className="lnf__grid" aria-hidden="true">
            <div className="lnf-card lnf-card--featured lnf-skel-card">
              <div className="lnf-skel lnf-skel--media" />
              <div className="lnf-card__body">
                <div className="lnf-skel lnf-skel--line short" />
                <div className="lnf-skel lnf-skel--line lg" />
                <div className="lnf-skel lnf-skel--line" />
                <div className="lnf-skel lnf-skel--line" />
              </div>
            </div>
            <div className="lnf__side">
              {[0, 1, 2, 3].map((index) => (
                <div className="lnf-card lnf-card--mini lnf-skel-card" key={index}>
                  <div className="lnf-skel lnf-skel--thumb" />
                  <div className="lnf-card__body">
                    <div className="lnf-skel lnf-skel--line short" />
                    <div className="lnf-skel lnf-skel--line" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {(status === "no-key" || status === "empty") && (
          <div className="lnf-state">
            <p>Latest football news will appear here automatically.</p>
          </div>
        )}

        {status === "error" && (
          <div className="lnf-state">
            <p>Latest football news will appear here automatically.</p>
            <button type="button" className="lnf-btn" onClick={() => loadNews()}>
              Try Again
            </button>
          </div>
        )}

        {status === "ready" && (
          <div className="lnf__grid">
            {featured && (
              <article className="lnf-card lnf-card--featured">
                <div className="lnf-card__media">
                  <img
                    src={featured.image || NEWS_PLACEHOLDER}
                    alt={featured.title}
                    onError={onImgError}
                    loading="lazy"
                  />
                </div>
                <div className="lnf-card__body">
                  <div className="lnf-card__meta">
                    <span className="lnf-source">{featured.source}</span>
                    {formatRelativePublished(featured.publishedAt) && (
                      <time className="lnf-time" dateTime={featured.publishedAt}>
                        {formatRelativePublished(featured.publishedAt)}
                      </time>
                    )}
                  </div>
                  <h3 className="lnf-card__headline lnf-clamp-2">{featured.title}</h3>
                  <p className="lnf-card__summary lnf-clamp-3">
                    {featured.description || "Read the full story for more details."}
                  </p>
                  {featured.url && (
                    <a
                      className="lnf-btn"
                      href={featured.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read More
                    </a>
                  )}
                </div>
              </article>
            )}

            <div className="lnf__side">
              {secondary.map((item) => (
                <article className="lnf-card lnf-card--mini" key={item.url || item.title}>
                  <div className="lnf-card__media">
                    <img
                      src={item.image || NEWS_PLACEHOLDER}
                      alt={item.title}
                      onError={onImgError}
                      loading="lazy"
                    />
                  </div>
                  <div className="lnf-card__body">
                    <div className="lnf-card__meta">
                      <span className="lnf-source">{item.source}</span>
                      {formatRelativePublished(item.publishedAt) && (
                        <time className="lnf-time" dateTime={item.publishedAt}>
                          {formatRelativePublished(item.publishedAt)}
                        </time>
                      )}
                    </div>
                    <h4 className="lnf-card__headline lnf-clamp-2">{item.title}</h4>
                    <p className="lnf-card__summary lnf-clamp-2">
                      {item.description || ""}
                    </p>
                    {item.url && (
                      <a
                        className="lnf-link"
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Read More
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default LiveNewsFeed;
