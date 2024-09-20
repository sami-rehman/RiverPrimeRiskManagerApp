import React, { useState } from "react";
import { ReactComponent as MaximizeIcon } from "../assets/icons/maximizeIcon.svg";
import { ReactComponent as MinimizeIcon } from "../assets/icons/minimizeIcon.svg";
import { LivePositionWatchlist } from "./watchlist/LivePositionWatchlist";

const AccountActivityWin = React.memo(({ accountActivityData }) => {
  const [maximizedItem, setMaximizedItem] = useState("");

  const openMaximizedPopup = (item) => {
    setMaximizedItem(item);
  };

  const closeMaximizedPopup = () => {
    setMaximizedItem("");
  };

  const renderContent = () => {
    switch (maximizedItem) {
      case "watchListAccountActivity":
        return <LivePositionWatchlist />;
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10 p-2"
      >
        <div className="bg-white w-full h-full flex flex-col">
        <div className="col-span-12 bg-gray-300 flex items-center justify-between p-1 space-x-4 text-xs">
              <div>
                <span className="font-semibold text-gray-700">Login ID:</span> {accountActivityData.login}
              </div>
              <div>
                <span className="font-semibold text-gray-700">Group:</span> {accountActivityData.group}
              </div>
              <div>
                <span className="font-semibold text-gray-700">Equity:</span> {accountActivityData.equity}
              </div>
              <div>
                <span className="font-semibold text-gray-700">P&L (R/U):</span>
                {accountActivityData.unrealizedPL}
              </div>
              <div>
                <span className="font-semibold text-gray-700">Risk Profile:</span> {accountActivityData.realizedPL}
              </div>
              <div>
                <span className="font-semibold text-gray-700">Margin Utilisation:</span> {accountActivityData.marginUtilization}
              </div>
              <div>
                <span className="font-semibold text-gray-700">Trading Impact:</span> {accountActivityData.realizedPL}
              </div>
              <div>
                <span className="font-semibold text-gray-700">Last Login:</span> 12/09/2024 / 14:10:15 UTC
              </div>
              <div>
                <span className="font-semibold text-gray-700">Agent:</span> {accountActivityData.login}
              </div>
            </div>
          <div className="flex-grow grid grid-cols-12 grid-rows-12 gap-1 relative">
            <div className="col-span-9 row-span-3 row-start-1 bg-gray-200 relative">
              <button
                onClick={() => openMaximizedPopup("watchListAccountActivity")}
                className="absolute top-0 right-0 text-gray-700 bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-sm z-10"
              >
                <MaximizeIcon className="w-4 h-4" />
              </button>
              <div className="w-full h-full">
                <LivePositionWatchlist/>
              </div>
            </div>
            <div className="col-span-9 row-span-3 col-start-1 row-start-4 bg-gray-200 relative">3</div>
            <div className="col-span-9 row-span-3 col-start-1 row-start-7 bg-gray-200 relative">4</div>
            <div className="col-span-3 row-span-3 col-start-1 row-start-10 bg-gray-200 relative">5</div>
            <div className="col-span-3 row-span-3 col-start-4 row-start-10 bg-gray-200 relative">6</div>
            <div className="col-span-3 row-span-3 col-start-7 row-start-10 bg-gray-200 relative">7</div>
            <div className="col-span-3 row-span-3 col-start-10 row-start-10 bg-gray-200 relative">8</div>
            <div className="col-span-3 row-span-5 col-start-10 row-start-5 bg-gray-200 relative">10</div>
            <div className="col-span-3 row-span-4 col-start-10 row-start-1 bg-gray-200 relative">11</div>
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

export default AccountActivityWin;
