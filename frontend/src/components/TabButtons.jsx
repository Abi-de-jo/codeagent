import React from "react";

const TabButtons = ({ setCurrentTab, currentTab }) => {
  const tabs = [
    { label: "Example", value: "example", color: "bg-purple-600/80 hover:bg-purple-700" },
    { label: "Explanation", value: "explanation", color: "bg-yellow-500/80 hover:bg-yellow-600" },
    { label: "Code", value: "code", color: "bg-green-500/80 hover:bg-green-600 " },
    { label: "Task", value: "task", color: "bg-blue-500/80 hover:bg-blue-600" },
    { label: "Use", value: "use", color: "bg-indigo-500/80 hover:bg-indigo-600" }
  ];

  return (
    <div className="flex   flex-wrap mt-[-10px] mb-5 justify-center gap-3 ">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => setCurrentTab(tab.value)}
          className={`text-sm px-4 py-1.5 rounded-xl  font-semibold backdrop-blur-md border border-white/10 shadow-md transition-all duration-300
            ${tab.color}
            ${currentTab === tab.value ? "ring-2 ring-white scale-105" : "text-white"}
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabButtons;
