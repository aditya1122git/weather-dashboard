import React from 'react';
import './Footer.css';

const Footer = ({ onSectionChange }) => {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (section) => {
    if (onSectionChange) {
      onSectionChange(section);
      // Scroll to top when navigating
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-background"></div>
      <div className="footer-content">
        <div className="footer-section footer-brand-section">
          <div className="footer-brand">
            <div className="footer-logo">
              <i className="fas fa-cloud-sun-rain"></i>
            </div>
            <div className="footer-brand-info">
              <h3 className="footer-brand-title">WeatherPro</h3>
              <p className="footer-tagline">Smart Weather Dashboard</p>
            </div>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-section-title">Quick Links</h4>
          <ul className="footer-links">
            <li><button onClick={() => handleLinkClick('home')} className="footer-link-btn">Home</button></li>
            <li><button onClick={() => handleLinkClick('analytics')} className="footer-link-btn">Analytics</button></li>
            <li><button onClick={() => handleLinkClick('map')} className="footer-link-btn">Weather Map</button></li>
            <li><button onClick={() => handleLinkClick('alerts')} className="footer-link-btn">Alerts</button></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-section-title">Connect</h4>
          <div className="footer-social">
            <a href="https://github.com/aditya1122git" className="social-icon" title="GitHub" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://linkedin.com/in/aditya-raj-07a7a02a7" className="social-icon" title="LinkedIn" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="footer-copyright">
            © {currentYear} WeatherPro. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
