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
    <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg max-w-3xl mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <label className="text-sm font-semibold">
          <span className="text-gray-300 mr-2">💻 Choose Language:</span>
        </label>
        <select
          value={language}
          disabled
          className="p-2 bg-gray-800 border border-gray-600 rounded text-white text-sm cursor-not-allowed"
        >
          <option value="javascript">JavaScript</option>
        </select>
      </div>

      <div className="rounded overflow-hidden border border-gray-700">
        <Editor
          value={code}
          onValueChange={setCode}
          highlight={(code) => Prism.highlight(code, Prism.languages[language], language)}
          padding={16}
          className="font-mono text-sm bg-gray-800 outline-none min-h-[200px]"
        />
      </div>

      <button
        onClick={runCode}
        className="mt-4 w-full sm:w-fit bg-green-600 hover:bg-green-700 px-5 py-2 rounded-full text-white text-sm shadow-md transition duration-200"
      >
        ▶️ Run Code
      </button>

      <div className="mt-5 bg-black rounded-md p-4 text-green-400 font-mono text-sm border border-gray-800 whitespace-pre-wrap transition-all duration-300">
        <strong className="text-yellow-300 block mb-2">🖥️ Output:</strong>
        {output}
      </div>
    </div>
  );
};

export default CodeEditor;
