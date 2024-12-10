import React, { useState } from "react";
import InstrumentsByVolumes from "../bbookaccount/graph/InstrumentsByVolumes";
import BbookWatchList from "../bbookaccount/watchlist/BbookWatchListLiveData";
import HoldingByAccount from "../bbookaccount/graph/HoldingByAccount";

const BbookWindow = React.memo(() => {
  return (
    <div>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10 p-2">
        <div className="bg-white w-full h-full flex flex-col">
          <div className="flex-grow grid grid-cols-12 grid-rows-12 gap-1 relative"> 
          <div className="col-span-9 row-span-12 bg-gray-200 relative">
            <BbookWatchList/>
          </div>
            <div className="col-span-3 row-span-4 col-start-10 bg-gray-200 relative">
                {/* <InstrumentsByVolumes/> */}
            </div>
            <div className="col-span-3 row-span-4 col-start-10 row-start-5 bg-gray-200 relative">
                {/* <HoldingByAccount/> */}
            </div>
            <div className="col-span-3 row-span-4 col-start-10 row-start-9 bg-gray-200 relative">4</div>
          </div>
        </div>
      </div>
      
    </div>
  );
});

export default BbookWindow;
