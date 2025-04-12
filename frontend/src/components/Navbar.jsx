import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // optional icon lib, or replace with unicode

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/5 border-b border-white/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Brand */}
        <h1
          className="text-2xl font-bold text-white cursor-pointer tracking-wide"
          onClick={() => navigate("/profile")}
        >
          Code Companion
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 text-sm sm:text-base font-medium text-gray-200">
          <button
            onClick={() => navigate("/ai")}
            className="hover:text-blue-400 transition"
          >
            Chat
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="hover:text-green-400 transition"
          >
            History
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="hover:text-pink-400 transition"
          >
            Profile
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white focus:outline-none"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/70 border-t border-white/10 px-6 py-4 space-y-3 text-gray-200 text-base font-medium">
          <button
            onClick={() => {
              navigate("/ai");
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left hover:text-blue-400 transition"
          >
            Chat
          </button>
          <button
            onClick={() => {
              navigate("/dashboard");
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left hover:text-green-400 transition"
          >
            History
          </button>
          <button
            onClick={() => {
              navigate("/profile");
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left hover:text-pink-400 transition"
          >
            Profile
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
