import React, { useState } from "react";
import { WatchListTradingAccount } from "./grid/WatchListTradingAccount";
import { ReactComponent as MaximizeIcon } from "./assets/icons/maximizeIcon.svg";
import { ReactComponent as MinimizeIcon } from "./assets/icons/minimizeIcon.svg";
import BbookPosition from "./bbookaccount/watchlist/BbookPosition";

const BbookWin = React.memo(() => {
  const [maximizedItem, setMaximizedItem] = useState("");

  // const openMaximizedPopup = (item) => {
  //   setMaximizedItem(item);
  // };

  // const closeMaximizedPopup = () => {
  //   setMaximizedItem("");
  // };

  // const renderContent = () => {
  //   switch (maximizedItem) {
  //     case "watchListTradingAccount":
  //       return <WatchListTradingAccount />;
  //     default:
  //       return null;
  //   }
  // };

  return (
    <div className="relative">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10 p-2">
        <div className="bg-white w-full h-full flex flex-col">
          <div className="flex-grow grid grid-cols-12 grid-rows-12 gap-1 relative"> 
            <div className="col-span-8 row-span-4  bg-gray-200 relative">
              <BbookPosition/>
            </div>
            <div className="col-span-8 row-span-4 col-start-1 row-start-5 bg-gray-200 relative">2</div>
            <div className="col-span-4 row-span-4 col-start-1 row-start-9 bg-gray-200 relative">3</div>
            <div className="col-span-4 row-span-4 col-start-5 row-start-9 bg-gray-200 relative">4</div>
            <div className="col-span-4 row-span-4 col-start-9 row-start-1 bg-gray-200 relative">5</div>
            <div className="col-span-4 row-span-4 col-start-9 row-start-5 bg-gray-200 relative">6</div>
            <div className="col-span-4 row-span-4 col-start-9 row-start-9 bg-gray-200 relative">7</div>

          </div>
        </div>
      </div>

      {/* {maximizedItem && (
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
      )} */}
    </div>
  );
});

export default BbookWin;