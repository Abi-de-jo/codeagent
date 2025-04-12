import React, { useState } from "react";
import MessageBubble from "./MessageBubble";
import TabButtons from "./TabButtons";
import TabDisplay from "./TabDisplay";

const ChatBox = ({ messages }) => {
  const [currentTab, setCurrentTab] = useState("example");

  return (
    <div className="space-y-6 p-6 rounded-xl  bg-white/5 backdrop-blur-md border border-white/10 shadow-lg max-w-6xl mx-auto transition-all duration-300">
      {messages.map((msg, idx) => (
        <div key={idx}>
          <MessageBubble role={msg.role} content={msg.content} />
          {msg.role === "assistant" && typeof msg.content === "object" && (
            <>
              <TabButtons setCurrentTab={setCurrentTab} currentTab={currentTab} />
              <TabDisplay content={msg.content[currentTab]} tab={currentTab} />
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatBox;
