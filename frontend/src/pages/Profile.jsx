// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { getProfile } from "../services/api";
import { useNavigate } from "react-router-dom";

const motivationalQuotes = [
  "Code is like humor. When you have to explain it, it’s bad.",
  "First, solve the problem. Then, write the code.",
  "Experience is the name everyone gives to their mistakes.",
  "Java is to JavaScript what car is to Carpet.",
  "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday’s code.",
  "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.",
  "Before software can be reusable it first has to be usable.",
  "Make it work, make it right, make it fast.",
  "Code never lies, comments sometimes do.",
  "Fix the cause, not the symptom.",
  "Optimism is an occupational hazard of programming.",
  "Simplicity is the soul of efficiency.",
  "Programming isn't about what you know; it's about what you can figure out.",
  "The best error message is the one that never shows up.",
  "If debugging is the process of removing bugs, then programming must be the process of putting them in.",
  "In order to be irreplaceable, one must always be different.",
  "Talk is cheap. Show me the code.",
  "Give a man a program, frustrate him for a day. Teach a man to program, frustrate him for a lifetime.",
  "A user interface is like a joke. If you have to explain it, it's not that good.",
  "Walking on water and developing software from a specification are easy if both are frozen.",
  "Software undergoes beta testing shortly before it's released. Beta is Latin for 'still doesn't work.'",
  "Software and cathedrals are much the same – first we build them, then we pray.",
  "Deleted code is debugged code.",
  "Programming today is a race between software engineers striving to build bigger and better idiot-proof programs, and the Universe trying to produce bigger and better idiots. So far, the Universe is winning.",
  "There are only two kinds of programming languages: those people always complain about and those nobody uses.",
  "The computer was born to solve problems that did not exist before.",
  "The best thing about a boolean is even if you are wrong, you are only off by a bit.",
  "Computers are fast; developers keep them slow.",
  "One man’s crappy software is another man’s full-time job.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand."
];

const Profile = ({ token, setToken, setName }) => {
  const [profile, setProfile] = useState(null);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;
    getProfile(token).then(setProfile);
  }, [token]);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % motivationalQuotes.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    setToken("");
    setName("");
    localStorage.removeItem("token");
    navigate("/");
  };

  if (!profile) return <p className="text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 shadow-md sm:col-span-1 flex flex-col items-center justify-center">
          <h2 className="text-xl font-bold mb-4 text-yellow-400">💡 Motivational Quote</h2>
          <p className="text-sm text-center italic text-gray-300 transition-all duration-1000 ease-in-out">
            "{motivationalQuotes[quoteIndex]}"
          </p>
        </div>

        {/* Right: Profile & Actions */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-md sm:col-span-2">
          <h2 className="text-2xl font-bold mb-2">👤 Welcome, {profile.name}</h2>
          <p className="mb-4 text-sm text-gray-300">📧 Email: {profile.email}</p>

          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <div className="bg-gray-700 rounded p-4">
              <h3 className="text-lg font-semibold mb-2">🗂 Your Dashboard</h3>
              <ul className="list-disc ml-5 text-sm">
                <li>🧠 Explore coding topics</li>
                <li>💬 Ask questions with AI</li>
                <li>💾 See your saved histories</li>
              </ul>
            </div>

            <div className="bg-gray-700 rounded p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">📚 Quick Actions</h3>
                <button
                  onClick={() => navigate("/ai")}
                  className="w-full mb-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                >
                  ✨ Go to AI Chat
                </button>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="w-full bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
                >
                  📜 View History
                </button>
              </div>
              <button
                onClick={handleLogout}
                className="mt-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
              >
                🔒 Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
