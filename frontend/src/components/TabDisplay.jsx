import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import CodeEditor from "./Codeeditor";

const getHeading = (tab) => {
  switch (tab) {
    case "example":
      return "🧠 Example";
    case "explanation":
      return "🔍 Explanation";
    case "code":
      return "💻 Code";
    case "task":
      return "📝 Task";
    case "use":
      return "👍 Use";
    default:
      return "";
  }
};

const TabDisplay = ({ content, tab }) => {
  return (
    <div className="bg-gray-900 text-white p-4 rounded text-sm 
  prose prose-invert max-w-none overflow-x-auto break-words 
  whitespace-pre-wrap prose-pre:whitespace-pre-wrap prose-pre:break-words
  prose-h1:text-xl prose-h2:text-lg prose-h3:text-base prose-p:text-sm prose-strong:text-white scrollbar-hide"
>

      <h2 className="text-lg font-semibold">{getHeading(tab)}</h2>

      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
        {content}
      </ReactMarkdown>

      {tab === "code" && <CodeEditor initialCode={content} />}
    </div>
  );
};

export default TabDisplay;
