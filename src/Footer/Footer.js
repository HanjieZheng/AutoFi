import React from "react";
import "./Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">&copy; 2025 AutoFi. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <span className="separator">|</span>
          <a href="#">Terms of Service</a>
          <span className="separator">|</span>
          <a href="#">Careers</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
