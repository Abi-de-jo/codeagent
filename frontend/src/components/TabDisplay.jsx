import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import CodeEditor from "./Codeeditor";

const getHeading = (tab) => {
  switch (tab) {
    case "example": return "Example";
    case "explanation": return "Explanation";
    case "code": return "Code";
    case "task": return "Task";
    case "use": return "Use";
    default: return "";
  }
};

const getHeadingColor = (tab) => {
  switch (tab) {
    case "example": return "text-purple-400";
    case "explanation": return "text-yellow-300";
    case "code": return "text-green-400";
    case "task": return "text-blue-400";
    case "use": return "text-indigo-400";
    default: return "text-white";
  }
};

const TabDisplay = ({ content, tab }) => {
  return (
    <div className="w-full whitespace-pre-wrap overflow-x-auto rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white shadow-inner px-4 sm:px-6 py-8 transition-all duration-300">

      {/* Heading */}
      <h2 className={`text-2xl font-bold text-center mb-6 tracking-wide uppercase ${getHeadingColor(tab)}`}>
        {getHeading(tab)}
      </h2>

      {/* Markdown Text */}
      <div className="prose prose-invert max-w-none text-base prose-pre:bg-transparent prose-pre:p-0 prose-p:my-3">
        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
          {content}
        </ReactMarkdown>
      </div>

      {/* Optional Code Editor */}
      {tab === "code" && (
        <div className="mt-6 mr-6">
          <CodeEditor initialCode={content} />
        </div>
      )}
    </div>
  );
};

export default TabDisplay;
