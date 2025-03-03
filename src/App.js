import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Home from "./Home/Home";
import About from "./About/About";
import Docs from "./Doc/Doc";
import Community from "./Community/Community";
import Launch from "./Launch/Launch";
import Footer from "./Footer/Footer";
import Dashboard from "./Dashboard/Dashboard"; 
import "./App.css";
import AIChatbot from "./Chatbot/AIChatbot";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <div className="background-overlay"></div> {}
        <Navbar /> {}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/community" element={<Community />} />
          <Route path="/launch" element={<Launch />} />
          <Route path="/ai-chatbot" element={<AIChatbot />} />
          <Route path="/dashboard" element={<Dashboard />} /> {}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
