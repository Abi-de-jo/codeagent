import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-800 text-white shadow-md px-4 py-3 ">
      <div className="max-w-6xl mx-auto flex  justify-between items-center">
        <h1
          className="text-xl font-bold text-blue-400 cursor-pointer"
          onClick={() => navigate("/profile")}
        >
           Code Companion   
        
        </h1>

        <div className="flex gap-5 text-sm sm:text-base">
          <button
            onClick={() => navigate("/ai")}
            className="hover:text-blue-400 transition"
          >
            Chat
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="hover:text-blue-400 transition"
          >
             History
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="hover:text-blue-400 transition"
          >
             Profile
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
