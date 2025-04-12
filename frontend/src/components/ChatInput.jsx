import React, { useState } from "react";
import { getAIResponse } from "../services/geminiServices.js";
import { parseGeminiResponse } from "../utils/formatGemini.js";
import { saveHistory } from "../services/api";
import languageMethods from '../utils/data.json';


const ChatInput = ({ setMessages, messages }) => {
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("JavaScript");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: `${input} (${language})` };
    setMessages([userMessage]);
    setInput("");
    setLoading(true);
    setShowSuggestions(false);

    const aiReply = await getAIResponse(`${input} in ${language}`);
    const parsed = parseGeminiResponse(aiReply);

    const assistantMessage = {
      role: "assistant",
      content: parsed,
      prompt: input,
      language: language
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setLoading(false);

    const token = localStorage.getItem("token");
    if (token) {
      await saveHistory({ prompt: input, language, data: parsed }, token);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput((prev) => {
      const parts = prev.trim().split(" ");
      parts[parts.length - 1] = suggestion;
      return parts.join(" ");
    });
    setShowSuggestions(false);
  };
  

  const suggestions = languageMethods[language];
  const filteredSuggestions = input.length === 0
    ? suggestions
    : suggestions.filter((method) =>
        method.toLowerCase().includes(input.toLowerCase())
      );

      return (
        <div className="w-full max-w-6xl mx-auto px-4 mt-10">
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-5 py-4 shadow-2xl">
      
            {/* Language Dropdown */}
            <select
  value={language}
  onChange={(e) => setLanguage(e.target.value)}
  className="bg-gradient-to-br     text-white px-4 py-2 rounded-lg border border-white/20 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition font-semibold shadow-md"
>
  {Object.keys(languageMethods).map((lang) => (
    <option key={lang} value={lang} className="text-black   backdrop-blur-lg border border-white/10  ">
      {lang.toUpperCase()}
    </option>
  ))}
</select>

      
            {/* Input Field */}
            <div className="relative flex-grow w-full">
              <input
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                className="w-full px-5 py-2.5 rounded-lg bg-black/40 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Type a method like map, filter, append..."
              />
      
              {/* Suggestions Dropdown */}
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute  top-full left-0 w-full mt-2 scrollbar-hide  bg-white/5 backdrop-blur-xs border border-white/10 rounded-lg shadow-lg max-h-52 overflow-y-auto ">
                  {filteredSuggestions.map((s, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 text-sm text-white hover:bg-white/10 hover:text-blue-300  cursor-pointer transition-all duration-150"
                      onMouseDown={() => handleSuggestionClick(s)}
                    >
                      {s.toUpperCase()}
                    </div>
                  ))}
                </div>
              )}
            </div>
      
            {/* Send Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`whitespace-nowrap px-6 py-2 rounded-lg font-semibold text-white transition-all duration-300 ${
                loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Loading..." : "Send"}
            </button>
          </div>
        </div>
      );
      
      
};

export default ChatInput;
