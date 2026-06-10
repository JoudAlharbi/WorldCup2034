import React, { useCallback, useEffect, useState } from 'react';
import {
  NEWS_PLACEHOLDER,
  NEWS_REFRESH_MS,
  fetchFootballNews,
  formatRelativePublished,
  hasNewsApiKey,
} from '../news/newsService';
import './HomePage.css';

const onImgError = (e) => {
  if (e.target.src !== NEWS_PLACEHOLDER) e.target.src = NEWS_PLACEHOLDER;
};

function FifaNews() {
  const [articles, setArticles] = useState([]);
  const [status, setStatus] = useState(hasNewsApiKey() ? 'loading' : 'no-key');

  const loadNews = useCallback((silent = false) => {
    if (!hasNewsApiKey()) {
      setStatus('no-key');
      return;
    }
    if (!silent) {
      setStatus((prev) => (prev === 'ready' ? prev : 'loading'));
    }

    fetchFootballNews(5)
      .then((list) => {
        setArticles(list);
        setStatus(list.length ? 'ready' : 'empty');
      })
      .catch((err) => {
        console.error('News fetch error:', err);
        if (err.message === 'no-key') {
          setStatus('no-key');
        } else {
          setStatus((prev) => (prev === 'ready' ? prev : 'error'));
        }
      });
  }, []);

  useEffect(() => {
    loadNews();
    const id = setInterval(() => loadNews(true), NEWS_REFRESH_MS);
    return () => clearInterval(id);
  }, [loadNews]);

  const featured = articles[0];
  const secondary = articles.slice(1, 5);

  return (
    <section className="fn">
      <div className="fn__head">
        <h2 className="fn__title">Latest FIFA &amp; World Cup News</h2>
        <p className="fn__subtitle">Updates from around the world of football</p>
      </div>

      {status === 'loading' && (
        <div className="fn__grid" aria-hidden="true">
          <div className="fn-card fn-featured fn-skel-card">
            <div className="fn-skel fn-skel--media" />
            <div className="fn-body">
              <div className="fn-skel fn-skel--line short" />
              <div className="fn-skel fn-skel--line lg" />
              <div className="fn-skel fn-skel--line" />
              <div className="fn-skel fn-skel--line" />
            </div>
          </div>
          <div className="fn-side">
            {[0, 1, 2, 3].map((i) => (
              <div className="fn-card fn-mini fn-skel-card" key={i}>
                <div className="fn-skel fn-skel--thumb" />
                <div className="fn-body">
                  <div className="fn-skel fn-skel--line short" />
                  <div className="fn-skel fn-skel--line" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(status === 'no-key' || status === 'empty') && (
        <div className="fn-state">
          <div className="fn-state__icon">⚽</div>
          <h3>Live FIFA news will appear here shortly</h3>
          <p>We're lining up the latest FIFA and World Cup stories. Check back soon.</p>
        </div>
      )}

      {status === 'error' && (
        <div className="fn-state">
          <div className="fn-state__icon">⚽</div>
          <h3>Live FIFA news will appear here shortly</h3>
          <p>We're refreshing the latest stories. Please check back in a moment.</p>
          <button className="fn-readmore" onClick={() => loadNews()}>Refresh</button>
        </div>
      )}

      {status === 'ready' && (
        <div className="fn__grid">
          {featured && (
            <article className="fn-card fn-featured">
              <div className="fn-media">
                <img src={featured.image || NEWS_PLACEHOLDER} alt={featured.title} onError={onImgError} loading="lazy" />
              </div>
              <div className="fn-body">
                <div className="fn-meta">
                  <span className="fn-source">{featured.source}</span>
                  {formatRelativePublished(featured.publishedAt) && (
                    <span className="fn-date">{formatRelativePublished(featured.publishedAt)}</span>
                  )}
                </div>
                <h3 className="fn-title fn-clamp-2">{featured.title}</h3>
                <p className="fn-desc fn-clamp-3">{featured.description || 'Read the full story for more details.'}</p>
                {featured.url && (
                  <a className="fn-readmore" href={featured.url} target="_blank" rel="noopener noreferrer">
                    Read More
                  </a>
                )}
              </div>
            </article>
          )}

          <div className="fn-side">
            {secondary.map((item, index) => (
              <article className="fn-card fn-mini" key={index}>
                <div className="fn-media">
                  <img src={item.image || NEWS_PLACEHOLDER} alt={item.title} onError={onImgError} loading="lazy" />
                </div>
                <div className="fn-body">
                  <div className="fn-meta">
                    <span className="fn-source">{item.source}</span>
                    {formatRelativePublished(item.publishedAt) && (
                      <span className="fn-date">{formatRelativePublished(item.publishedAt)}</span>
                    )}
                  </div>
                  <h4 className="fn-title fn-clamp-2">{item.title}</h4>
                  <p className="fn-desc fn-clamp-2">{item.description || ''}</p>
                  {item.url && (
                    <a className="fn-readmore fn-readmore--text" href={item.url} target="_blank" rel="noopener noreferrer">
                      Read More
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default FifaNews;
