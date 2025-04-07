import React from "react";

const TabButtons = ({ setCurrentTab }) => (
  <div className="flex gap-2 mt-2">
    <button onClick={() => setCurrentTab("example")} className="text-sm px-2 py-1 bg-purple-600 text-white rounded">🧠 Example</button>
    <button onClick={() => setCurrentTab("explanation")} className="text-sm px-2 py-1 bg-yellow-600 text-white rounded">🔍 Explanation</button>
    <button onClick={() => setCurrentTab("code")} className="text-sm px-2 py-1 bg-green-600 text-white rounded">💻 Code</button>
    <button onClick={() => setCurrentTab("task")} className="text-sm px-2 py-1 bg-blue-600 text-white rounded">📝 Task</button>
    <button onClick={() => setCurrentTab("use")} className="text-sm px-2 py-1 bg-blue-600 text-white rounded">👍 Use</button>
  </div>
);

export default TabButtons;