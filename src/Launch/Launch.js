import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Launch.css";

const Launch = () => {
  const [isConnected, setIsConnected] = useState(false);
  
  useEffect(() => {
    // Check if wallet is already connected
    const checkWalletConnection = () => {
      const walletAddress = localStorage.getItem("walletAddress");
      setIsConnected(!!walletAddress);
    };
    
    // Initial check
    checkWalletConnection();
    
    // Listen for wallet connection/disconnection events
    window.addEventListener("storage", checkWalletConnection);
    window.addEventListener("walletConnected", checkWalletConnection);
    window.addEventListener("walletDisconnected", checkWalletConnection);
    
    const intervalCheck = setInterval(checkWalletConnection, 1000);
    
    // Clean up event listeners
    return () => {
      window.removeEventListener("storage", checkWalletConnection);
      window.removeEventListener("walletConnected", checkWalletConnection);
      window.removeEventListener("walletDisconnected", checkWalletConnection);
      clearInterval(intervalCheck);
    };
  }, []);
  
  return (
    <div className="launch-container">
      {isConnected ? (
        <div className="app-interface">
          <h2>Welcome to AutoFi</h2>
          <p>You're now connected and ready to use the application.</p>
          <div className="feature-cards">
            <div className="feature-card">
              <h3>📊 Dashboard</h3>
              <p>View market data and performance metrics</p>
              <Link to="/dashboard" className="feature-button">Open Dashboard</Link>
            </div>
            <div className="feature-card">
              <h3>🤖 AI Assistant</h3>
              <p>Get help with crypto trading strategies</p>
              <Link to="/ai-chatbot" className="feature-button">Chat with AI</Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="connect-prompt">
          <h2>Connect Your Wallet</h2>
          <p>Please connect your wallet using the button in the top-right corner to access AutoFi features.</p>
          <div className="wallet-info">
            <h3>Supported Wallets</h3>
            <p>• MetaMask</p>
            <p>• Ethereum-compatible wallets</p>
          </div>
          <p className="small-note">Your wallet is used to securely interact with blockchain protocols.</p>
        </div>
      )}
    </div>
  );
};

export default Launch;