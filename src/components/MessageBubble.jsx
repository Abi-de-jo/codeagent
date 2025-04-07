import React from "react";

const MessageBubble = ({ role, content }) => {
  if (typeof content !== "string") return null;

  return (
    <div
      className={`p-3 rounded-md w-full ${
        role === "user" ? "bg-blue-700  text-white self-end" : "bg-gray-800 text-white"
      }`}
    >
      {content}
    </div>
  );
};

export default MessageBubble;