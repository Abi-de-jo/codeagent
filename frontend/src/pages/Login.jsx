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
    <div className="min-h-[86vh] flex items-center justify-center bg-gradient-to-br p-6">
      <div className="w-full max-w-md rounded-2xl p-8 bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 text-white space-y-8">
        <h2 className="text-3xl font-bold text-center tracking-wide text-blue-300">Welcome Back</h2>
        <p className="text-center text-sm text-gray-300">Enter your credentials to login or register</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="peer w-full px-4 pt-5 pb-2 rounded-xl bg-white/10 text-white placeholder-transparent border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Email address"
            />
            <label className="absolute -z-10 left-4 top-2 text-sm text-gray-300 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-400">
              Email address
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="peer w-full px-4 pt-5 pb-2 rounded-xl bg-white/10 text-white placeholder-transparent border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Password"
            />
            <label className="absolute -z-10 left-4 top-2 text-sm text-gray-300 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-400">
              Password
            </label>
          </div>

          {/* Error message */}
          {error && (
            <p className="text-red-300 text-center text-sm bg-red-500/10 rounded-md p-2 border border-red-300/30">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 py-2 rounded-xl font-semibold transition duration-300 shadow-md"
          >
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
