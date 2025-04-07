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
    <div className="w-full max-w-4xl mx-auto bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col sm:flex-row gap-3 mt-5">
      <div className="flex flex-col sm:flex-row w-full gap-3">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-gray-700 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.keys(languageMethods).map((lang) => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>

        <div className="relative w-full">
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
            className="w-full p-2 rounded bg-gray-900 text-white scrollbar-hide placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="🔍 Type a method like map, filter, append..."
          />
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute z-999 mt-1 bg-gray-700 border scrollbar-hide border-gray-600 rounded w-full max-h-40 overflow-y-auto text-sm">
             {filteredSuggestions.map((s, index) => (
  <div
    key={index}
    className="px-3 py-1 cursor-pointer hover:bg-gray-600"
    onMouseDown={() => handleSuggestionClick(s)}
  >
    {s}
  </div>
))}

            </div>
          )}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`w-full sm:w-auto px-6 py-2 rounded text-white font-semibold transition-all duration-300 ${
          loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Cooking..." : "Send"}
      </button>
    </div>
  );
};

export default ChatInput;
