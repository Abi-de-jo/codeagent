// src/pages/Login.jsx
import React, { useState } from "react";
import { loginOrRegister } from "../services/api";

const Login = ({ setToken, setName }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginOrRegister(email, password);
    if (res.token) {
      setToken(res.token);
      setName(res.name);
      localStorage.setItem("token", res.token);
    } else {
      setError(res.error || "Failed to login/register");
    }
  };

  return (
    <div className="max-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full bg-gray-800 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">👤 Login / Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">📧 Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded text-black"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">🔒 Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded text-black"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white font-medium"
          >
            🚀 Get Started
          </button>

          {error && <p className="text-red-400 text-sm mt-2">❗ {error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
