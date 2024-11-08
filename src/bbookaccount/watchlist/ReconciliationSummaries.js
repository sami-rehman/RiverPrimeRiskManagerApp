import React, { useState } from "react";
import BookReconciliation from "./BookReconciliation";
import DetailedPortfolioSummary from "./DetailedPortfolioSummary";


const ReconciliationSummaries = () => {
  const [activeTab, setActiveTab] = useState("Detailed Portfolio Summary");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const tabs = ["Portfolio Summary", "Detailed Portfolio Summary", "Instrument Summary"];

  return (
    <div className="w-full h-full">
      <div className="relative flex flex-wrap px-1.5 py-1.5 list-none rounded-md bg-slate-100 dark:bg-slate-800" role="list">
        {tabs.map((tab) => (
          <li key={tab} className="z-30 flex-auto text-center">
            <button
              onClick={() => handleTabClick(tab)}
              className={`z-30 flex items-center justify-center w-full px-0 py-2 text-sm mb-0 transition-all ease-in-out border-0 rounded-md cursor-pointer ${
                activeTab === tab
                  ? "text-slate-700 dark:text-slate-300 bg-slate-300 dark:bg-slate-600 font-bold"
                  : "text-slate-600 dark:text-slate-400 bg-inherit"
              }`}
              role="tab"
              aria-selected={activeTab === tab}
              aria-controls={tab}
            >
              {tab}
            </button>
          </li>
        ))}
      </div>

      <div className="p-1 w-full h-full">
      <DetailedPortfolioSummary/>
      </div>
    </div>
  );
};

export default ReconciliationSummaries;
