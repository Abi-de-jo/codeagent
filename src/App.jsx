import React, { useState } from "react";
import ChatBox from "./components/ChatBox";
import ChatInput from "./components/ChatInput";

const App = () => {
  const [messages, setMessages] = useState([]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Code Companion</h1>

      {/* Container wraps everything and prevents overflow */}
<div className="max-w-4xl mx-auto w-full overflow-hidden mt-4 flex flex-col gap-4">
  <ChatInput setMessages={setMessages} messages={messages} />
  <ChatBox messages={messages} />
</div>

    </div>
  );
};

export default App;
