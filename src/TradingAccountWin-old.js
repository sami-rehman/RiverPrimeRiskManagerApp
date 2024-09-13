import React, { useState, useEffect } from "react";
import TradebookCharts from "./TradebookCharts";
import ConcentrationChart from "./ConcentrationChart";
import GroupsLpChart from "./GroupsLpChart";
import { WatchListTradingAccount } from "./grid/WatchListTradingAccount";
import { ReactComponent as MaximizeIcon } from "./assets/icons/maximizeIcon.svg";
import { ReactComponent as MinimizeIcon } from "./assets/icons/minimizeIcon.svg";

const TradingAccountWin = ({ windowSize }) => {
  const [maximizedItem, setMaximizedItem] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  const [selectedOption, setSelectedOption] = useState("equity");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

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

  // Effect to reload the component when windowSize changes
  useEffect(() => {
    setReloadKey((prevKey) => prevKey + 1);
  }, [windowSize]);

  // console.log("windowSize", windowSize);

  return (
    <div className="relative">
      <div
        key={reloadKey}
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10 p-2"
      >
        <div className="bg-white w-full h-full flex flex-col">
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
            {/* <div className="col-span-5 row-span-5 col-start-8 bg-gray-200 relative">
              <button
                onClick={() => openMaximizedPopup("concentrationChart")}
                className="absolute top-0 right-0 text-gray-700 bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-sm z-10"
              >
                <MaximizeIcon className="w-4 h-4" />
              </button>
              <div className="w-full h-full">
                <ConcentrationChart windowSize={windowSize} />
              </div>
            </div> */}

            <div className="col-span-5 row-span-5 col-start-8 bg-gray-200 relative">
              <button
                onClick={() => openMaximizedPopup("concentrationChart")}
                className="absolute top-0 right-0 text-gray-700 bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-sm z-10"
              >
                <MaximizeIcon className="w-4 h-4" />
              </button>
              <div className="w-full h-full flex flex-col justify-between">
                <div className="flex-grow mb-1">
                  <ConcentrationChart windowSize={windowSize} />
                </div>
                <div className="bg-gray-100 flex justify-around">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="chartOption"
                      value="equity"
                      checked={selectedOption === "equity"}
                      onChange={handleOptionChange}
                      className="form-radio text-blue-200"
                    />
                    <span className="ml-2 text-gray-700">Equity</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="chartOption"
                      value="profitLoss"
                      checked={selectedOption === "profitLoss"}
                      onChange={handleOptionChange}
                      className="form-radio text-blue-200"
                    />
                    <span className="ml-2 text-gray-700">Profit/Loss</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="chartOption"
                      value="volume"
                      checked={selectedOption === "volume"}
                      onChange={handleOptionChange}
                      className="form-radio text-blue-200"
                    />
                    <span className="ml-2 text-gray-700">Volumes</span>
                  </label>
                </div>
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
                {/* <ChartSwitcher chartType="line" /> */}
                <GroupsLpChart />
              </div>
            </div>
            <div className="col-span-7 row-span-4 row-start-9 bg-gray-100 p-2 relative">
              <h1>Info Panel Section</h1>
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
};

export default TradingAccountWin;
