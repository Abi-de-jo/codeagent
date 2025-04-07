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
    <div className="text-white p-4">
      <h2 className="text-xl font-bold mb-4">📜 Your History</h2>
      {history.map((entry, i) => (
  <div key={i} className="mb-6 p-4 border rounded">
    <p className="text-sm text-gray-400">🔤 {entry.prompt} in {entry.language}</p>
    <TabButtons setCurrentTab={setCurrentTab} />
    <TabDisplay content={entry.data[currentTab]} tab={currentTab} />
  </div>
))}

    </div>
  );
};

export default Dashboard;
