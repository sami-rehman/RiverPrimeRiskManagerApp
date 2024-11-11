import React, { useState } from "react";
import BookReconciliation from "./bbookaccount/watchlist/BookReconciliation";
import ReconciliationSummaries from "./bbookaccount/watchlist/ReconciliationSummaries";

const PortfolioWin = React.memo(() => {
  
  return (
   
      <div
        className="w-full h-full flex justify-center items-center"
      >
        <div className="bg-white w-full h-full flex flex-col">
          <div className="flex-grow grid grid-cols-12 grid-rows-12 gap-1 relative">

          <div className="col-span-9 row-span-12 bg-gray-200 relative">
            <BookReconciliation/>
          </div>
          <div className="col-span-3 row-span-6 col-start-10 bg-gray-200 relative">
            <ReconciliationSummaries/>
          </div>
          <div className="col-span-3 row-span-6 col-start-10 row-start-7 bg-gray-200 relative">3</div>           
          </div>
        </div>
      </div>
  );
});

export default PortfolioWin;
