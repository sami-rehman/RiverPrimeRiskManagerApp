import React, { useState } from "react";
import SymbologyMappingGrid from "./bbookaccount/watchlist/SymbologyMappingGrid";
import PortfolioChart from "./PortfolioChart";

const SymbologyWin = React.memo(() => {

  return (

    <div
      className="w-full h-full flex justify-center items-center"
    >
      <div className="bg-white w-full h-full flex flex-col">
        <div className="flex-grow grid grid-cols-12 grid-rows-12 gap-1 relative">
          <div className="col-span-6 row-span-6 bg-gray-200 relative">
            <SymbologyMappingGrid/>
          </div>
          <div className="col-span-6 row-span-6 col-start-1 row-start-7 bg-gray-200 relative">
            <PortfolioChart/>
          </div>
          <div className="col-span-6 row-span-12 col-start-7 row-start-1 bg-gray-200 relative">3</div>
        </div>
      </div>
    </div>
  );
});

export default SymbologyWin;
