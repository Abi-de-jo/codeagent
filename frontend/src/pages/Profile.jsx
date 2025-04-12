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
    }, 4000);
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
<div className="max-h-screen mt-26 px-8 py-12 flex justify-center items-center">
  <div className="w-full max-w-[2000px]  flex flex-col md:flex-row gap-8">
    
    {/* Left Quote */}
    <div className="flex-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-10 shadow-xl flex flex-col justify-center">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">Motivational Quote</h2>
      <p className="italic text-gray-200 text-lg text-center leading-relaxed transition-all duration-1000 ease-in-out">
        "{motivationalQuotes[quoteIndex]}"
      </p>
    </div>

    {/* Right Profile */}
    <div className="flex-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-10 shadow-xl flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold text-blue-300 mb-1">Welcome, {profile.name}</h2>
        <p className="text-sm text-gray-300 mb-6">{profile.email}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Dashboard */}
        <div className="bg-white/5 rounded-xl p-5 border border-white/10 shadow">
          <h3 className="text-lg font-semibold mb-3 text-purple-200">Your Dashboard</h3>
          <ul className="list-disc ml-5 space-y-2 text-sm text-gray-200">
            <li>Explore coding topics</li>
            <li>Ask questions with AI</li>
            <li>View saved histories</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="bg-white/5 rounded-xl p-5 border border-white/10 shadow flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-green-200">Quick Actions</h3>
          <button
            onClick={() => navigate("/ai")}
            className="bg-blue-600 hover:bg-blue-700 font-semibold py-2 rounded-xl text-white"
          >
            Go to AI Chat
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-green-600 hover:bg-green-700 font-semibold py-2 rounded-xl text-white"
          >
            View History
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 font-semibold py-2 rounded-xl text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</div>



  );
};

export default Profile;
