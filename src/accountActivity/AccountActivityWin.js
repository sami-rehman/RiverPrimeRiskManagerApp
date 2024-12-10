import React, { useState } from "react";
import { ReactComponent as MaximizeIcon } from "../assets/icons/maximizeIcon.svg";
import { ReactComponent as MinimizeIcon } from "../assets/icons/minimizeIcon.svg";
import { LivePositionWatchlist } from "./watchlist/LivePositionWatchlist";
import { PendingOrderWatchlist } from "./watchlist/PendingOrderWatchlist";
import TradeImpact from "../graphs/TradeImpact";
import RulesHighcharts from "../RulesHighcharts";
import PerformanceHighChart from "../PerformanceHighChart";

const AccountActivityWin = React.memo(({ accountActivityData }) => {
  accountActivityData ={
    "agent": 0,
    "equity": 7805.43,
    "equityPercentage": 0.0,
    "group": "demo\\SINV\\EXECUTIVE",
    "login": 10001058,
    "longs": 1,
    "marginFree": 7498.63,
    "marginLevel": 2544.1427640156453,
    "marginLeverage": 100.0,
    "marginUtilization": 306.8,
    "marginUtilizationPercentage": 1.268605007454E-311,
    "naoi": 6.95324827911596E-310,
    "realizedPL": 7805.43,
    "shorts": 0,
    "unrealizedPL": 1767.18,
    "volumeLots": 0.3,
    "volumeNotional": 0.0
}
  console.log('accountActivityData', accountActivityData)
  const [maximizedItem, setMaximizedItem] = useState("");

  const openMaximizedPopup = (item) => {
    setMaximizedItem(item);
  };

  const closeMaximizedPopup = () => {
    setMaximizedItem("");
  };

  const renderContent = () => {
    switch (maximizedItem) {
      case "watchListAccountActivityLivePosition":
        return <LivePositionWatchlist loginID={accountActivityData.login} />;
      case "watchListAccountActivityPendingOrder":
        return <PendingOrderWatchlist loginID={accountActivityData.login} />;
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
            <div className="col-span-9 row-span-3 bg-gray-200 relative">
              <button
                onClick={() => openMaximizedPopup("watchListAccountActivityLivePosition")}
                className="absolute top-0 right-0 text-gray-700 bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-sm z-10"
              >
                <MaximizeIcon className="w-4 h-4" />
              </button>
              <div className="w-full h-full">
                <LivePositionWatchlist loginID={accountActivityData.login} />
              </div>
            </div>
            <div className="col-span-9 row-span-3 col-start-1 row-start-4 bg-gray-200 relative">
              <button
                onClick={() => openMaximizedPopup("watchListAccountActivityPendingOrder")}
                className="absolute top-0 right-0 text-gray-700 bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-sm z-10"
              >
                <MaximizeIcon className="w-4 h-4" />
              </button>
              <div className="w-full h-full">
                <PendingOrderWatchlist loginID={accountActivityData.login} />
              </div>
            </div>
            <div className="col-span-3 row-span-4 col-start-1 row-start-9 bg-gray-200 relative">
              <TradeImpact loginID={accountActivityData.login}/>
            </div>
            <div className="col-span-3 row-span-4 col-start-4 row-start-9  relative">
              {/* <RulesHighcharts/> */}
            </div>
            <div className="col-span-3 row-span-4 col-start-7 row-start-9 bg-gray-200 relative">
            <PerformanceHighChart loginID={accountActivityData.login}/>
            </div>
          </div>
          
          
  

        </div>
      </div>
    </div>
  );
});

export default AccountActivityWin;
