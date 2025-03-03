import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import WalletConnect from "../Wallet/WalletConnect";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [isConnected, setIsConnected] = useState(!!localStorage.getItem("walletAddress"));
  
  useEffect(() => {
    // Check for wallet connection
    const checkConnection = () => {
      const walletAddress = localStorage.getItem("walletAddress");
      setIsConnected(!!walletAddress);
    };
    
    // Initial check
    checkConnection();
    
    // Listen for wallet events
    window.addEventListener("storage", checkConnection);
    window.addEventListener("walletConnected", checkConnection);
    window.addEventListener("walletDisconnected", checkConnection);
    
    const checkConnectionInterval = setInterval(checkConnection, 1000);
    
    // Cleanup
    return () => {
      window.removeEventListener("storage", checkConnection);
      window.removeEventListener("walletConnected", checkConnection);
      window.removeEventListener("walletDisconnected", checkConnection);
      clearInterval(checkConnectionInterval);
    };
  }, []);
  
  const isLaunchPage = location.pathname === '/launch';
  
  return (
    <nav className="navbar">
      <div className="logo">Auto<span>Fi</span></div>
      <ul className="nav-links">
        {/* Always visible links */}
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/docs">Docs</Link></li>
        <li><Link to="/community">Community</Link></li>
        
        {/* App links only visible when connected */}
        {isConnected && (
          <>
            <li><Link to="/dashboard" className="app-link">📊 Dashboard</Link></li>
            <li><Link to="/ai-chatbot" className="app-link">🤖 AI Chatbot</Link></li>
          </>
        )}
      </ul>
      <div className="button-container">
        {isLaunchPage || isConnected ? (
          <WalletConnect />
        ) : (
          <Link to="/launch" className="launch-button">Launch App</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;