import React from "react";

const MessageBubble = ({ role, content }) => {
  const isUser = role === "user";

  return (
    <div
      className={`max-w-4xl mx-auto px-5 py-3 rounded-xl    transition-all duration-300 ${
        isUser ? "bg-blue-600/30 text-white border border-blue-400" : ""
      }`}
    >
      {typeof content === "string" && content.trim() !== "" ? (
        <p>{content.toUpperCase()}</p>
      ) : null}
    </div>
  );
};
  

export default MessageBubble;
