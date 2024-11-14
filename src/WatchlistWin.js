import React, { useState } from 'react';

const groups = ["All", "Forex", "Metals", "Energy", "Indices", "Top 10 (by Volume)", "Best Performers", "Worst Performers", "In A-Book", "In B-Book", "In C-Book"];

const data = {
    All: [
      { id: 1, name: "XAU/USD", price: 2525, change: -12.5 },
      { id: 2, name: "EUR/USD", price: 1.185, change: 0.3 },
      { id: 3, name: "Gold", price: 1850, change: 1.2 },
      { id: 4, name: "Oil", price: 65.23, change: -0.4 },
      { id: 5, name: "NASDAQ", price: 14300, change: 1.8 },
      { id: 6, name: "Top Performer 1", price: 5000, change: 2.1 },
      { id: 7, name: "Worst Performer 1", price: 250, change: -5.0 },
      { id: 8, name: "A-Book Asset 1", price: 7200, change: 0.5 },
      { id: 9, name: "B-Book Asset 1", price: 1200, change: -1.2 },
      { id: 10, name: "C-Book Asset 1", price: 3000, change: 1.0 }
    ],
    Forex: [
      { id: 1, name: "XAU/USD", price: 2525, change: -12.5 },
      { id: 2, name: "EUR/USD", price: 1.185, change: 0.3 },
      { id: 3, name: "GBP/USD", price: 1.383, change: 0.1 }
    ],
    Metals: [
      { id: 1, name: "Gold", price: 1850, change: 1.2 },
      { id: 2, name: "Silver", price: 25.13, change: 0.6 }
    ],
    Energy: [
      { id: 1, name: "Oil", price: 65.23, change: -0.4 },
      { id: 2, name: "Natural Gas", price: 3.45, change: 1.5 }
    ],
    Indices: [
      { id: 1, name: "NASDAQ", price: 14300, change: 1.8 },
      { id: 2, name: "S&P 500", price: 4400, change: 0.9 }
    ],
    "Top 10 (by Volume)": [
      { id: 1, name: "Top Performer 1", price: 5000, change: 2.1 },
      { id: 2, name: "Top Performer 2", price: 4800, change: 1.9 },
      { id: 3, name: "Top Performer 3", price: 4700, change: 1.6 }
    ],
    "Best Performers": [
      { id: 1, name: "Top Performer 1", price: 5000, change: 2.1 },
      { id: 2, name: "Top Performer 2", price: 4800, change: 1.9 }
    ],
    "Worst Performers": [
      { id: 1, name: "Worst Performer 1", price: 250, change: -5.0 },
      { id: 2, name: "Worst Performer 2", price: 300, change: -3.2 }
    ],
    "In A-Book": [
      { id: 1, name: "A-Book Asset 1", price: 7200, change: 0.5 },
      { id: 2, name: "A-Book Asset 2", price: 7150, change: 1.3 }
    ],
    "In B-Book": [
      { id: 1, name: "B-Book Asset 1", price: 1200, change: -1.2 },
      { id: 2, name: "B-Book Asset 2", price: 1150, change: -0.9 }
    ],
    "In C-Book": [
      { id: 1, name: "C-Book Asset 1", price: 3000, change: 1.0 },
      { id: 2, name: "C-Book Asset 2", price: 2950, change: 0.8 }
    ]
  };
  

function WatchlistWin() {
  const [activeGroup, setActiveGroup] = useState("All");

  const handleTabClick = (group) => {
    setActiveGroup(group);
  };

  return (
    <div className="p-4 bg-dark">
      {/* Tabs */}
      <div className="flex space-x-2 mb-4">
        {groups.map((group) => (
          <button
            key={group}
            onClick={() => handleTabClick(group)}
            className={`px-4 py-2 rounded ${activeGroup === group ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            {group}
          </button>
        ))}
      </div>

      {/* Cells */}
      <div className="grid grid-cols-5 gap-4">
        {(activeGroup === "All" ? Object.values(data).flat() : data[activeGroup] || []).map((item, index) => (
          <div key={index} className="h-24 bg-gray-800 rounded shadow flex items-center justify-center">
            {/* Render each cell content */}
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default WatchlistWin;
