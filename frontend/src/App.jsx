import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ChatBox from "./components/ChatBox";
import ChatInput from "./components/ChatInput";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [name, setName] = useState("");

  useEffect(() => {
    if (!token) {
      setMessages([]);
    }
  }, [token]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white p-4">
        {/* Top bar */}
        {!token ? (
          <h1 className="text-2xl font-bold text-center mb-4 text-blue-400">
            Code Companion
          </h1>
        ) : (
          <Navbar />
        )}

        {/* Main Content */}
        <div className="max-w-4xl mx-auto w-full mt-4 flex flex-col gap-4 overflow-visible ">
        <Routes>
            <Route
              path="/"
              element={
                token ? (
                  <Navigate to="/profile" />
                ) : (
                  <Login setToken={setToken} setName={setName} />
                )
              }
            />
            <Route
              path="/profile"
              element={
                token ? (
                  <Profile token={token} setToken={setToken} setName={setName} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/dashboard"
              element={token ? <Dashboard token={token} /> : <Navigate to="/" />}
            />
            <Route
              path="/ai"
              element={
                token ? (
                  <>
                    <ChatInput setMessages={setMessages} messages={messages} />
                    <ChatBox messages={messages} />
                  </>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
