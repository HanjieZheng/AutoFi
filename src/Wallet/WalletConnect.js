import React, { useState, useEffect } from "react";

const WalletConnect = () => {
  const [walletAddress, setWalletAddress] = useState(localStorage.getItem("walletAddress"));
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log("✅ MetaMask detected");

      // Check for existing connections
      window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
        if (accounts.length > 0) {
          handleSuccessfulConnection(accounts[0]);
        }
      });

      // Setup event listeners
      const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
          handleSuccessfulConnection(accounts[0]);
        } else {
          // MetaMask disconnected from its side
          handleDisconnection();
        }
      };

      const handleChainChanged = () => {
        window.location.reload();
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);

      // Cleanup event listeners on unmount
      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      };
    } else {
      console.error("❌ MetaMask is not installed.");
    }
  }, []);

  const handleSuccessfulConnection = (address) => {
    setWalletAddress(address);
    localStorage.setItem("walletAddress", address);
    console.log("✅ Connected:", address);
    
    // Trigger custom events
    window.dispatchEvent(new Event('walletConnected'));
    window.dispatchEvent(new Event('storage'));
    
    setIsConnecting(false);
  };

  // Better disconnect handling
  const handleDisconnection = () => {
    // Clear the local state
    localStorage.removeItem("walletAddress");
    setWalletAddress(null);
    
    // Trigger events
    window.dispatchEvent(new Event('walletDisconnected'));
    window.dispatchEvent(new Event('storage'));
    
    console.log("✅ Wallet disconnected in application");
  };

  // Connect Wallet
  const connectWallet = async () => {
    if (!window.ethereum || !window.ethereum.isMetaMask) {
      alert("MetaMask is not installed. Please install it to continue.");
      return;
    }

    try {
      setIsConnecting(true);
      console.log("🔌 Requesting wallet connection...");
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      handleSuccessfulConnection(accounts[0]);
    } catch (error) {
      console.error("❌ Connection failed:", error);
      setIsConnecting(false);
      alert("Could not connect to MetaMask. Please try again.");
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    handleDisconnection();
    // Optional: Show a non-intrusive info message
    console.log("Note: Your wallet is still connected in MetaMask. This app will no longer access your account until you connect again.");
  };

  return (
    <button 
      className="wallet-button" 
      onClick={walletAddress ? disconnectWallet : connectWallet}
      disabled={isConnecting}
    >
      {isConnecting 
        ? "Connecting..." 
        : walletAddress 
          ? `Disconnect (${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)})` 
          : "Connect Wallet"
      }
    </button>
  );
};

export default WalletConnect;