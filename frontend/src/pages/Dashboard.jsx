import React, { useEffect, useState } from "react";
import { getHistory } from "../services/api";
import TabDisplay from "../components/TabDisplay";
import TabButtons from "../components/TabButtons";

const Dashboard = ({ token }) => {
  const [history, setHistory] = useState([]);
  const [currentTab, setCurrentTab] = useState("example");

  useEffect(() => {
    if (token) {
      getHistory(token).then(setHistory);
    }
  }, [token]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-white">
      <h2 className="text-3xl font-bold text-center text-blue-300 mb-10 uppercase tracking-wide">
        Your History
      </h2>

      {history.map((entry, i) => {

        return (
          <div
            key={i}
            className="mb-8 p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg transition-all duration-300"
          >
            <div className="mb-4">
              <p className="text-sm text-blue-200">
                <span className="font-medium text-white">Prompt:</span> {entry.prompt}
              </p>
              <p className="text-sm text-gray-400">
                <span className="font-medium text-white">Language:</span> {entry.language}
              </p>
            </div>

            <TabButtons setCurrentTab={setCurrentTab} currentTab={currentTab} />
            <TabDisplay content={entry.data[currentTab]} tab={currentTab} />
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
