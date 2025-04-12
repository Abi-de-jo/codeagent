import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css";

const languageTemplates = {
  javascript: `console.log("Hello from JavaScript!");`,
};

const CodeEditor = () => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(languageTemplates[language]);
  const [output, setOutput] = useState("");

  const runCode = () => {
    if (language !== "javascript") {
      setOutput("❌ Running code is only supported for JavaScript in the browser.");
      return;
    }

    const logs = [];
    const originalLog = console.log;
    console.log = (...args) => logs.push(args.join(" "));

    try {
      new Function(code)();
      setOutput(logs.join("\n") || "✅ Code ran with no result.");
    } catch (err) {
      setOutput("❌ Error: " + err.message);
    } finally {
      console.log = originalLog;
    }
  };

  return (
    <div className="w-full mt-10 max-w-5xl mx-auto bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg space-y-5 transition-all duration-300">
      
      {/* Language (static for now) */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-medium text-gray-300">Language:</p>
        <select
          disabled
          value={language}
          className="bg-gray-800 text-white text-sm px-3 py-1.5 rounded-lg border border-gray-600 cursor-not-allowed"
        >
          <option value="javascript">JavaScript</option>
        </select>
      </div>

      {/* Editor */}
      <div className="rounded-xl overflow-hidden border border-white/10 shadow-inner">
        <Editor
          value={code}
          onValueChange={setCode}
          highlight={(code) => Prism.highlight(code, Prism.languages[language], language)}
          padding={20}
          className="text-sm font-mono bg-gray-900 text-white min-h-[200px] outline-none"
        />
      </div>

      {/* Run Button */}
      <div className="flex justify-center sm:justify-start">
        <button
          onClick={runCode}
          className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-full text-white text-sm font-semibold shadow transition-all duration-200"
        >
          Run Code
        </button>
      </div>

      {/* Output */}
      <div className="bg-black rounded-lg border border-gray-800 p-4 text-sm font-mono text-green-400 whitespace-pre-wrap transition-all duration-300">
        <p className="text-yellow-300 font-semibold mb-2">Output:</p>
        {output}
      </div>
    </div>
  );
};

export default CodeEditor;
