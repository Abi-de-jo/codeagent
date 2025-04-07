import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

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
    <div className="bg-gray-900 text-white p-4 rounded text-sm whitespace-pre-wrap space-y-4 prose prose-invert prose-pre:bg-gray-800 prose-pre:rounded prose-pre:text-sm max-w-none">
      <h2 className="text-lg font-semibold">{getHeading(tab)}</h2>
      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default TabDisplay;
