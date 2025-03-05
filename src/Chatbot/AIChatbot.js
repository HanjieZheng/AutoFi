import React, { useState } from "react";
<<<<<<< HEAD
import "./AIChatbot.css"; 
const AIChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    // Simulate AI response (Replace with actual API call if needed)
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Hello! How can I assist you?", sender: "ai" },
      ]);
    }, 1000);
  };

  return (
    <div className="chatbot-container">
      <h2>AI Chatbot</h2>
      <div className="chatbox">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === "user" ? "user-msg" : "ai-msg"}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
=======
import "./AIChatbot.css";

import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: "sk-06a271805b2c416e85228cbe502242ea", 
  dangerouslyAllowBrowser: true            // deepseek api key
});

const AIChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const buildOpenAIMessages = (localMessages) => {
    const openAIMessages = localMessages.map((msg) => {
      if (msg.sender === "user") {
        return { role: "user", content: msg.text };
      } else {
        return { role: "assistant", content: msg.text };
      }
    });

    openAIMessages.unshift({
      role: "system",
      content: "You are a de-fi chatbot, you are capable of assiting the user in market predictions, making de-fi investment suggestions, and other de-fi trading assistances.",
    });

    return openAIMessages;
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage = { text: inputText, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const conversation = buildOpenAIMessages([...messages, userMessage]);

      const completion = await openai.chat.completions.create({
        messages: conversation,
        model: "deepseek-chat", 
      });

      const botResponseText =
        completion.choices?.[0]?.message?.content || "No response";

      const botMessage = { text: botResponseText, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error calling DeepSeek API:", error);

      const errorMessage = {
        text: "Deepseek is busy, try it later...",
        sender: "bot",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="ai-chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            <span className="message-text">{msg.text}</span>
          </div>
        ))}
        {isLoading && (
          <div className="chat-message bot">
            <span className="message-text">Loading...</span>
          </div>
        )}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <button onClick={handleSend} disabled={isLoading}>
          Send
        </button>
>>>>>>> origin/master
      </div>
    </div>
  );
};

export default AIChatbot;
