// src/NavbarFooter.js
import React from 'react';
import './PlayZone.css';
import './Footer.css';
import './Signup/AuthStyle.css';
import { Link, useLocation } from 'react-router-dom';

const QUICK_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Host Cities', to: '/cities' },
  { label: 'Stadiums', to: '/stadiums/riyadh' },
  { label: 'Games', to: '/play-zone' },
  { label: 'News', to: '/#news-section' },
  {
    label: 'FAQ',
    href: 'https://www.fifa.com/en/tournaments/mens/worldcup/canada-mexico-usa-2026/articles/faq',
  },
];

const SOCIAL_LINKS = [
  { icon: 'facebook-f', label: 'Facebook', href: 'https://www.facebook.com/FIFA' },
  { icon: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/fifa/' },
  { icon: 'x-twitter', label: 'X (Twitter)', href: 'https://twitter.com/FIFA' },
];


function Navbar() {
  const location = useLocation(); // لمعرفة الصفحة الحالية <Link to="/host-cities" className={`nav-link ${isActive('/host-cities') ? 'active' : ''}`}>Host Cities & Stadiums</Link>

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <img src={process.env.PUBLIC_URL + "/logo.png"} alt="FIFA Logo" className="logo" />
      <ul>
        <li>
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
        </li>
        <li>
          <Link to="/overview" className={`nav-link ${isActive('/overview') ? 'active' : ''}`}>Overview</Link>
        </li>
        <li>

          <Link to="/cities" className={`nav-link ${isActive('/cities') ? 'active' : ''}`}>Host Cities & Stadiums</Link>

        </li>
        <li>
          <Link to="/teams-and-matches" className={`nav-link ${isActive('/teams-and-matches') ? 'active' : ''}`}>Teams & Matches</Link>
        </li>
        <li>
          <Link to="/play-zone" className={`nav-link ${isActive('/play-zone') ? 'active' : ''}`}>Play Zone</Link>
        </li>
      </ul>
    </nav>
  );
}

function FooterLink({ item }) {
  if (item.to) {
    return (
      <li>
        <Link to={item.to}>{item.label}</Link>
      </li>
    );
  }

  return (
    <li>
      <a
        href={item.href}
        target={item.href.startsWith('mailto:') ? undefined : '_blank'}
        rel="noopener noreferrer"
      >
        {item.label}
      </a>
    </li>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__accent" aria-hidden="true" />

      <div className="site-footer__main">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <img
              src={process.env.PUBLIC_URL + '/logo.png'}
              alt="FIFA World Cup 2034 Fan Portal"
              className="site-footer__logo"
            />
            <p className="site-footer__tagline">
              Your ultimate destination for FIFA World Cup 2034 news, games, stadiums, host cities, and fan experiences.
            </p>
          </div>

          <nav className="site-footer__column" aria-label="Quick links">
            <h3 className="site-footer__heading">Quick Links</h3>
            <ul className="site-footer__links">
              {QUICK_LINKS.map((item) => (
                <FooterLink key={item.label} item={item} />
              ))}
            </ul>
          </nav>

          <div className="site-footer__column">
            <h3 className="site-footer__heading">Contact &amp; Social</h3>
            <ul className="site-footer__links">
              <li>
                <a href="mailto:contact@saudi2034.example.com">Contact Us</a>
              </li>
              <li>
                <a
                  href="https://www.fifa.com/en/partners"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Partnership Opportunities
                </a>
              </li>
            </ul>
            <div className="site-footer__social" aria-label="Social media">
              {SOCIAL_LINKS.map(({ icon, label, href }) => (
                <a
                  key={icon}
                  className="site-footer__social-link"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  <i className={`fab fa-${icon}`} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="site-footer__bottom">
        <p className="site-footer__copyright">
          &copy; 2025 FIFA World Cup 2034 Fan Portal. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export { Navbar, Footer };