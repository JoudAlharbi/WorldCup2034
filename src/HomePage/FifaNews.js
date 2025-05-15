import React, { useEffect, useState } from 'react';
import './HomePage.css';

function FifaNews() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://newsapi.org/v2/everything?q=FIFA%202034&language=en&apiKey=81584510969d4229b6316a10c85c1f7d')
      .then(response => response.json())
      .then(data => {
        setArticles(data.articles.slice(0, 5)); // 1 main + 4 side
      })
      .catch(err => {
        console.error("API fetch error:", err);
        setError("Failed to load news. Please try again later.");
      });
  }, []);

  return (
    <div className="card news-card">
      <h2 style={{ color: '#2E3569' }}>Latest News (Live)</h2>

      {error ? (
        <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
      ) : (
        <div className="news-section">
          {/* Main News */}
          {articles[0] && (
            <div className="main-news">
              <img
                src={articles[0].urlToImage ? articles[0].urlToImage : `${process.env.PUBLIC_URL}/HomePage/placeholder.jpeg`}
                alt="Main News"
              />
              <h3>{articles[0].title}</h3>
              <p>{articles[0].description || "No description available."}</p>
            </div>
          )}

          {/* Side News */}
          <div className="side-news">
            {articles.slice(1, 5).map((article, index) => (
              <div key={index} className="side-card">
                <img
                  src={article.urlToImage ? article.urlToImage : `${process.env.PUBLIC_URL}/HomePage/placeholder.jpeg`}
                  alt="News"
                />
                <div className="side-content">
                  <small>{article.source.name}</small>
                  <strong>{article.title}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default FifaNews;


