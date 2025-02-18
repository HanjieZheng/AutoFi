import React, { useState, useEffect } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [marketData, setMarketData] = useState(null);

  // used AI to finish and debug after partial completion. Also suggested API
  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await fetch("https://api.coingecko.com/api/v3/global");
        const data = await response.json();
        setMarketData(data.data);
      } catch (error) {
        console.error("Error fetching market data:", error);
      }
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 60000); // Refresh every 60 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container">
      <h2>📊 Market Overview</h2>
      {marketData ? (
        <div className="market-info">
          <p>💰 Total Market Cap: ${marketData.total_market_cap.usd.toLocaleString()}</p>
          <p className={marketData.market_cap_change_percentage_24h_usd >= 0 ? "positive" : "negative"}>
            📉 24h Market Cap Change: {marketData.market_cap_change_percentage_24h_usd.toFixed(2)}%
          </p>
          <p>🔄 24h Trading Volume: ${marketData.total_volume.usd.toLocaleString()}</p>
          <p>📈 Bitcoin Dominance: {marketData.market_cap_percentage.btc.toFixed(2)}%</p>
        </div>
      ) : (
        <p>Loading market data...</p>
      )}
    </div>
  );
};

export default Dashboard;
