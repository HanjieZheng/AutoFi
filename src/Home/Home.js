import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero">
        <h1>Decentralized Portfolio Management</h1>
        <p>AutoFi is a DeFi protocol leveraging AI to manage crypto assets efficiently.</p>
      </div>

      {/* Extra content to allow scrolling */}
      <div className="extra-content">
        <h2>Why Choose AutoFi?</h2>
        <p>AutoFi offers AI-powered solutions for optimizing DeFi investments.</p>
        <p>Our protocol integrates seamlessly with major blockchain networks.</p>
        <p>Explore our features and experience the next generation of DeFi.</p>
      </div>
    </div>
  );
};

export default Home;
