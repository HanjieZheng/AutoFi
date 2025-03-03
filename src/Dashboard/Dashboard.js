import React, { useState, useEffect } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [pnlData, setPnlData] = useState(null);

  // Check if wallet is connected（didn't show it now, will update it later, maybe with a visible wallet connect button?）
  const isWalletConnected = !!localStorage.getItem("walletAddress");

  // Mock Transaction History
  const mockTransactions = [
    { id: 1, date: "2025-02-26", type: "Buy", asset: "BTC", amount: 0.05, price: 82000, total: 4100, status: "Completed" },
    { id: 2, date: "2025-02-25", type: "Sell", asset: "ETH", amount: 1.2, price: 2200, total: 2640, status: "Completed" },
    { id: 3, date: "2025-02-24", type: "Buy", asset: "SOL", amount: 10, price: 132, total: 1320, status: "Completed" },
    { id: 4, date: "2025-02-23", type: "Sell", asset: "TON", amount: 50, price: 3.6, total: 180, status: "Completed" },
    { id: 5, date: "2025-02-22", type: "Buy", asset: "TRUMP", amount: 100, price: 11, total: 1100, status: "Completed" },
  ];

  // Mock PnL data
  const mockPnlData = {
    totalPnL: 4250,
    dailyPnL: 380,
    weeklyPnL: 1120,
    monthlyPnL: 4250,
    assets: [
      { asset: "BTC", pnl: 2200, percentChange: 12.5 },
      { asset: "ETH", pnl: 950, percentChange: 8.2 },
      { asset: "SOL", pnl: -120, percentChange: -2.4 },
      { asset: "DOT", pnl: 320, percentChange: 5.1 },
      { asset: "AVAX", pnl: 900, percentChange: 15.3 },
    ],
  };

  // Load mock data
  useEffect(() => {
    setTransactions(mockTransactions);
    setPnlData(mockPnlData);
  }, []);

  return (
    <div className="dashboard-page">
      {/* Transaction History */}
      <section className="dashboard-section">
        <h2>📝 Transaction History</h2>
        {isWalletConnected ? (
          <div className="transactions-container">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Asset</th>
                  <th>Amount</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className={tx.type.toLowerCase()}>
                    <td>{tx.date}</td>
                    <td>{tx.type}</td>
                    <td>{tx.asset}</td>
                    <td>{tx.amount}</td>
                    <td>${tx.price.toLocaleString()}</td>
                    <td>${tx.total.toLocaleString()}</td>
                    <td>{tx.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Please connect your wallet to view your transaction history.</p>
        )}
      </section>

      {/* PnL Dashboard */}
      <section className="dashboard-section">
        <h2>📈 Trading PnL Dashboard</h2>
        {isWalletConnected && pnlData ? (
          <div className="pnl-container">
            <div className="pnl-stats">
              <p>Daily PnL: <span className={pnlData.dailyPnL >= 0 ? "positive" : "negative"}>${pnlData.dailyPnL}</span></p>
              <p>Weekly PnL: <span className={pnlData.weeklyPnL >= 0 ? "positive" : "negative"}>${pnlData.weeklyPnL}</span></p>
              <p>Monthly PnL: <span className={pnlData.monthlyPnL >= 0 ? "positive" : "negative"}>${pnlData.monthlyPnL}</span></p>
              <p>Total PnL: <span className={pnlData.totalPnL >= 0 ? "positive" : "negative"}>${pnlData.totalPnL}</span></p>
            </div>

            <h3>PnL by Asset</h3>
            <table className="pnl-table">
              <thead>
                <tr>
                  <th>Asset</th>
                  <th>PnL</th>
                  <th>Change %</th>
                </tr>
              </thead>
              <tbody>
                {pnlData.assets.map((asset, index) => (
                  <tr key={index}>
                    <td>{asset.asset}</td>
                    <td className={asset.pnl >= 0 ? "positive" : "negative"}>${asset.pnl.toLocaleString()}</td>
                    <td className={asset.percentChange >= 0 ? "positive" : "negative"}>
                      {asset.percentChange >= 0 ? "+" : ""}{asset.percentChange}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Please connect your wallet to view PnL data.</p>
        )}
      </section>
    </div>
  );
};

export default Dashboard;