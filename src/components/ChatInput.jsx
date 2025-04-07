import React, { useState } from "react";
import { getAIResponse } from "../services/geminiServices.js";
import { parseGeminiResponse } from "../utils/formatGemini.js";

const ChatInput = ({ setMessages, messages }) => {
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("JavaScript");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: `${input} (${language})` };
  setMessages([userMessage]); // ✨ Clear all previous and add current

    setInput("");
    
    setLoading(true);

    const aiReply = await getAIResponse(`${input} in ${language}`);
    const parsed = parseGeminiResponse(aiReply);
    console.log("Gemini Raw Response:", aiReply);

    setMessages((prev) => [...prev, { role: "assistant", content: parsed }]);
    setLoading(false);
    
  };

  return (
    <div className="flex flex-col gap-2  outline-none p-1  mt-5 sm:flex-row">
      <div className="flex w-full gap-2">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white"
        >
          <option value="JavaScript">JavaScript</option>
          <option value="Python">Python</option>
          <option value="C">C</option>
          <option value="C++">C++</option>
          <option value="Java">Java</option>
          <option value="TypeScript">TypeScript</option>
          <option value="Go">Go</option>
        </select>

        <input
  type="text"
  value={input}
  onChange={(e) => setInput(e.target.value)}
  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
  className="w-full p-2 rounded bg-gray-800 text-white overflow-hidden text-ellipsis whitespace-nowrap"
  placeholder="Type a method like map, filter, append..."
/>

      </div>

      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-600 rounded text-white disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Cooking..." : "Send"}
      </button>
    </div>
  );
};

export default ChatInput;
