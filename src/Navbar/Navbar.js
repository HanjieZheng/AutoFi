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
<<<<<<< HEAD
        <li><Link to="/dashboard">Dashboard</Link></li>
=======
        <li><Link to="/ai-chatbot">🤖 AI Chatbot</Link></li>  
        <li><Link to="/dashboard">📊 Market Data</Link></li>
>>>>>>> origin/Yixing
      </ul>
      <WalletConnect />
    </nav>
  );
};

export default Navbar;
