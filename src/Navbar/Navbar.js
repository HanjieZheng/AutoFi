import React from "react";
import { Link } from "react-router-dom";
import WalletConnect from "../Wallet/WalletConnect";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Auto<span>Fi</span></div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/launch">Launch</Link></li>
        <li><Link to="/docs">Docs</Link></li>
        <li><Link to="/community">Community</Link></li>
      </ul>
      {/* Move Connect Wallet button inside Navbar */}
      <WalletConnect />
    </nav>
  );
};

export default Navbar;
