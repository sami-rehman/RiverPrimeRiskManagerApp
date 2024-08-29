import React, { useState } from "react";
import TradebookCharts from "./TradebookCharts";
import ConcentrationChart from "./ConcentrationChart";
import GroupsLpChart from "./GroupsLpChart";
import { WatchListTradingAccount } from "./grid/WatchListTradingAccount";
import { ReactComponent as MaximizeIcon } from "./assets/icons/maximizeIcon.svg";
import { ReactComponent as CloseIcon } from "./assets/icons/closeIcon.svg";
import { ReactComponent as MinimizeIcon } from "./assets/icons/minimizeIcon.svg";


const TradingAccountWin = ({ togglePopup }) => {
  const [maximizedItem, setMaximizedItem] = useState(null);

  const openMaximizedPopup = (item) => {
    setMaximizedItem(item);
  };

  const closeMaximizedPopup = () => {
    setMaximizedItem(null);
  };

  const renderContent = () => {
    switch (maximizedItem) {
      case "watchListTradingAccount":
        return <WatchListTradingAccount />;
      case "concentrationChart":
        return <ConcentrationChart />;
      case "groupsLpChart":
        return <GroupsLpChart />;
      case "tradebookCharts":
        return <TradebookCharts />;
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
        <div className="bg-white w-11/12 h-[90%] p-1 rounded-lg shadow-lg relative flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h6 className="text-sm font-semibold text-gray-700 px-1">
              Trading Accounts
            </h6>
            <button
              type="button"
              onClick={togglePopup}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-200 rounded-md text-sm"
              data-modal-hide="default-modal"
            >
            <CloseIcon className="w-4 h-4 text-red-600" />
            </button>
          </div>
          {/* Main Container */}
          <div className="flex-grow grid grid-cols-12 grid-rows-12 gap-2 relative">
            <div className="col-span-7 row-span-8 bg-gray-200 p-1 relative">
              <button
                onClick={() => openMaximizedPopup("watchListTradingAccount")}
                className="absolute top-0 right-0 text-gray-700 bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-sm z-10"
              >
                <MaximizeIcon className="w-4 h-4" />
              </button>
              <div className="w-full h-full">
                <WatchListTradingAccount />
              </div>
            </div>
            <div className="col-span-5 row-span-5 col-start-8 bg-gray-200 relative">
              <button
                onClick={() => openMaximizedPopup("concentrationChart")}
                className="absolute top-0 right-0 text-gray-700 bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-sm z-10"
              >
                <MaximizeIcon className="w-4 h-4" />
              </button>
              <div className="w-full h-full">
                <ConcentrationChart />
              </div>
            </div>
            <div className="col-span-5 row-span-7 col-start-8 row-start-6 bg-gray-200 relative">
              <button
                onClick={() => openMaximizedPopup("groupsLpChart")}
                className="absolute top-0 right-0 text-gray-700 bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-sm z-10"
              >
                <MaximizeIcon className="w-4 h-4" />
              </button>
              <div className="w-full h-full">
                <GroupsLpChart />
              </div>
            </div>
            <div className="col-span-7 row-span-4 row-start-9 bg-gray-100 p-2 relative">
              <h1>Info Plane Section</h1>
              {/* <button
                onClick={() => openMaximizedPopup("tradebookCharts")}
                className="absolute top-0 right-0 text-gray-700 bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-sm z-10"
              >
                <MaximizeIcon className="w-4 h-4" />
              </button>
              <div className="w-full h-full">
                <TradebookCharts />
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Maximized Item */}
      {maximizedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white w-4/5 h-4/5 p-2 rounded-lg shadow-lg relative flex flex-col z-[20]">
            <button
              onClick={closeMaximizedPopup}
              className="absolute top-0 right-0 text-gray-700 bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-sm"
              style={{ zIndex: 20 }}
            >
             <MinimizeIcon className="w-4 h-4"/>
            </button>
            <div className="w-full h-full flex items-center justify-center">
              {renderContent()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradingAccountWin;
