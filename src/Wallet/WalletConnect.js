import React, { useState, useEffect } from "react";

// used AI to help make edits and debug after partial completion. Also suggested ether.js api for meta mask intergration
const WalletConnect = () => {
  const [walletAddress, setWalletAddress] = useState(localStorage.getItem("walletAddress"));

  useEffect(() => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log("✅ MetaMask detected");

      window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          localStorage.setItem("walletAddress", accounts[0]);
        }
      });

      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          localStorage.setItem("walletAddress", accounts[0]);
        } else {
          disconnectWallet();
        }
      });

      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    } else {
      console.error("❌ MetaMask is not installed.");
      alert("MetaMask is not installed! Please install it.");
    }
  }, []);

  // ✅ Connect Wallet
  const connectWallet = async () => {
    if (!window.ethereum || !window.ethereum.isMetaMask) {
      alert("❌ MetaMask is not installed!");
      return;
    }

    try {
      console.log("🔌 Requesting wallet connection...");
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setWalletAddress(accounts[0]);
      localStorage.setItem("walletAddress", accounts[0]);
      console.log("✅ Connected:", accounts[0]);
    } catch (error) {
      console.error("❌ Connection failed:", error);
      alert("Could not connect to MetaMask. Please try again.");
    }
  };

  // ✅ Hybrid Disconnect: First Try Revoke, Then Clear Local Storage
  const disconnectWallet = async () => {
    console.log("🔌 Attempting to revoke wallet permissions...");

    try {
      await window.ethereum.request({
        method: "wallet_revokePermissions",
        params: [{ eth_accounts: {} }],
      });
      console.log("✅ Permissions revoked");
    } catch (error) {
      console.warn("⚠️ Could not revoke permissions, clearing local storage instead.");
    }

    localStorage.removeItem("walletAddress");
    setWalletAddress(null);
    alert("Disconnected! If you're still connected in MetaMask, remove the site manually.");
  };

  return (
    <button onClick={walletAddress ? disconnectWallet : connectWallet}>
      {walletAddress ? `Disconnect (${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)})` : "Connect Wallet"}
    </button>
  );
};

export default WalletConnect;
