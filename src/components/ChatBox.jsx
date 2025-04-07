import React, { useState } from "react";
import MessageBubble from "./MessageBubble";
import TabButtons from "./TabButtons";
import TabDisplay from "./TabDisplay";

const ChatBox = ({ messages }) => {
  const [currentTab, setCurrentTab] = useState("example");

  return (
    <div className="space-y-4 mb-4">
      {messages.map((msg, idx) => (
        <div key={idx}>
          <MessageBubble role={msg.role} content={msg.content} />
          {msg.role === "assistant" && typeof msg.content === "object" && (
            <>
              <TabButtons setCurrentTab={setCurrentTab} />
              <TabDisplay content={msg.content[currentTab]} tab={currentTab} />
              </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatBox;