import React, { useState } from "react";
import { ReactComponent as MaximizeIcon } from "./assets/icons/maximizeIcon.svg";
import { ReactComponent as MinimizeIcon } from "./assets/icons/minimizeIcon.svg";
import BbookPosition from "./bbookaccount/watchlist/BbookPosition";
import { numberFormatter } from './common/constant';

import { WatchListFirst } from './watchlistA/WatchListFirst';
import AbookPosition from "./abookaccount/watchlist/AbookPosition";
const AbookWin = React.memo(() => {
  const [maximizedItem, setMaximizedItem] = useState("");

  const openMaximizedPopup = (item) => {
    setMaximizedItem(item);
  };

  const closeMaximizedPopup = () => {
    setMaximizedItem("");
  };

  const renderContent = () => {
    switch (maximizedItem) {
      case "watchListBbookPosition":
        return <BbookPosition />;
      default:
        return null;
    }
  };



  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10 p-2">
        <div className="bg-white w-full h-full flex flex-col">
          <div className="col-span-12 bg-gray-300 flex items-center justify-between p-1 space-x-4 text-xs">
            <div>
              <span className="font-semibold text-gray-700">A Book</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Equity:</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">UPL:</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Volumes($M):</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Volumes(Lots):</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Revenues:</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Margin Use:</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Active LP1:</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Active LP2:</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Active LP3:</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Active LP4:</span>
            </div>
          </div>
          <div className="flex-grow grid grid-cols-12 grid-rows-12 gap-1 relative">
            <div className="col-span-8 row-span-5 bg-gray-200 relative">
              <AbookPosition/>
            </div>
            <div className="col-span-8 row-span-3 col-start-1 row-start-6 bg-gray-200 relative">
              2
            </div>
            <div className="col-span-2 row-span-4 col-start-1 row-start-9 bg-gray-200 relative">
              4
            </div>
            <div className="col-span-4 row-span-4 col-start-3 row-start-9 bg-gray-200 relative">
              5
            </div>
            <div className="col-span-2 row-span-4 col-start-7 row-start-9 bg-gray-200 relative">
              6
            </div>
            <div className="col-span-4 row-span-5 col-start-9 row-start-1 bg-gray-200 relative">
              7
            </div>
            <div className="col-span-4 row-span-3 col-start-9 row-start-6 bg-gray-200 relative">
              8
            </div>
            <div className="col-span-4 row-span-4 col-start-9 row-start-9 bg-gray-200 relative">
              9
            </div>
          </div>
        </div>
      </div>

      {maximizedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white w-4/5 h-4/5 p-2 rounded-lg shadow-lg relative flex flex-col z-[20]">
            <button
              onClick={closeMaximizedPopup}
              className="absolute top-0 right-0 text-gray-700 bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-sm"
              style={{ zIndex: 20 }}
            >
              <MinimizeIcon className="w-4 h-4" />
            </button>
            <div className="w-full h-full flex items-center justify-center">
              {renderContent()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default AbookWin;
