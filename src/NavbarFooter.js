// src/NavbarFooter.js
import React from 'react';
import './PlayZone.css';
import './Signup/AuthStyle.css';
import { Link, useLocation } from 'react-router-dom';


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
      <div className="auth-buttons">
        <Link to="/login">
          <button className="login">Log in</button>
        </Link>
        <Link to="/signup">
          <button className="signup">Sign up</button>
        </Link>
      </div>
    </nav>
  );
}

function Footer() {
  // Define the styles inside the Footer function
  const hoverStyle = { color: '#007bff', cursor: 'pointer' }; // Hover style
  const defaultStyle = { color: 'black' }; // Default style

  return (
    <div>
      <footer>
      <img src={process.env.PUBLIC_URL + "/logo.png"} alt="FIFA 2034 Logo" className="footer-logo" />

        <div className="footer-columns">
          {['FAQ', 'Partnership', 'Contact Us'].map((item, idx) => (
            <div key={idx} className="column">
              <p>{item}</p>
            </div>
          ))}
        </div>
        
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '16px' }}>
          {['facebook-f', 'instagram', 'twitter'].map((icon, idx) => (
            <i
              key={idx}
              className={`fab fa-${icon}`}
              style={defaultStyle}
              onMouseEnter={(e) => (e.target.style.color = hoverStyle.color)}
              onMouseLeave={(e) => (e.target.style.color = defaultStyle.color)}
            ></i>
          ))}
        </div>
        <p className="footer-text">© 2025 FIFA. All rights reserved.</p>
      </footer>
      
    </div>
  );
}

export { Navbar, Footer };