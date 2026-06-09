import React, { useEffect, useState } from 'react';
import './HomePage.css';

const API_KEY = process.env.REACT_APP_NEWSDATA_API_KEY;
const PLACEHOLDER = `${process.env.PUBLIC_URL}/HomePage/placeholder.svg`;
const REFRESH_MS = 30 * 60 * 1000;
const QUERY = '"World Cup 2034" OR "FIFA World Cup" OR "Saudi Arabia 2034" OR "football tournament"';

function formatDate(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

function normalize(item) {
  return {
    title: item.title,
    description: item.description,
    url: item.link,
    image: item.image_url || null,
    source: item.source_id || 'News',
    publishedAt: item.pubDate || null,
  };
}

const onImgError = (e) => {
  if (e.target.src !== PLACEHOLDER) e.target.src = PLACEHOLDER;
};

function FifaNews() {
  const [articles, setArticles] = useState([]);
  const [status, setStatus] = useState(API_KEY ? 'loading' : 'no-key'); // loading | ready | empty | error | no-key

  const loadNews = () => {
    if (!API_KEY) {
      setStatus('no-key');
      return;
    }
    setStatus((prev) => (prev === 'ready' ? prev : 'loading'));

    const url = `https://newsdata.io/api/1/latest?apikey=${API_KEY}&language=en&q=${encodeURIComponent(QUERY)}`;

    fetch(url)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('bad response'))))
      .then((data) => {
        const results = Array.isArray(data.results) ? data.results : [];
        const list = results.map(normalize).filter((a) => a.title).slice(0, 5);
        setArticles(list);
        setStatus(list.length ? 'ready' : 'empty');
      })
      .catch((err) => {
        console.error('News fetch error:', err);
        setStatus('error');
      });
  };

  useEffect(() => {
    loadNews();
    const id = setInterval(loadNews, REFRESH_MS);
    return () => clearInterval(id);
  }, []);

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
          <button className="fn-readmore" onClick={loadNews}>Refresh</button>
        </div>
      )}

      {status === 'ready' && (
        <div className="fn__grid">
          {featured && (
            <article className="fn-card fn-featured">
              <div className="fn-media">
                <img src={featured.image || PLACEHOLDER} alt={featured.title} onError={onImgError} loading="lazy" />
              </div>
              <div className="fn-body">
                <div className="fn-meta">
                  <span className="fn-source">{featured.source}</span>
                  {formatDate(featured.publishedAt) && <span className="fn-date">{formatDate(featured.publishedAt)}</span>}
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
                  <img src={item.image || PLACEHOLDER} alt={item.title} onError={onImgError} loading="lazy" />
                </div>
                <div className="fn-body">
                  <div className="fn-meta">
                    <span className="fn-source">{item.source}</span>
                    {formatDate(item.publishedAt) && <span className="fn-date">{formatDate(item.publishedAt)}</span>}
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
