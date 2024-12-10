import React, { useState } from "react";
import TradingAccountWin from "./TradingAccountWin";
import NewWindow from "react-new-window";
import BbookWin from "./BbookWin";
import AbookWin from "./AbookWin";

const Header = ({ setLayout }) => {
  const [isBbookOpen, setIsBbookOpen] = useState(false);
  const [isAbookOpen, setIsAbookOpen] = useState(false);
  const [isTradingAccountOpen, setIsTradingAccountOpen] = useState(false);

  const openBbookWindow = () => {
    setIsBbookOpen(true);
  };

  const closeBbookWindow = () => {
    setIsBbookOpen(false);
  };

  const openAbookWindow = () => {
    setIsAbookOpen(true);
  };

  const closeAbookWindow = () => {
    setIsAbookOpen(false);
  };

  const openTradingAccountWindow = () => {
    setIsTradingAccountOpen(true);
  };

  const closeTradingAccountWindow = () => {
    setIsTradingAccountOpen(false);
  };

  return (
    <>
      <header className="p-4 bg-blue-600 text-gray-500 flex justify-between">
        <h1 className="text-xl text-white">Layout Switcher</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={openTradingAccountWindow}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Trading Accounts
          </button>

          <button
            onClick={openBbookWindow}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            B Book Window
          </button>

          <button
            onClick={openAbookWindow}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            A Book Window
          </button>

          <select
            className="p-2 rounded"
            onChange={(e) => setLayout(e.target.value)}
          >
            <option value="LayoutOne">Layout One</option>
            <option value="LayoutTwo">Layout Two</option>
            <option value="LayoutThree">Layout Three</option>
            <option value="LayoutFour">Layout Four</option>
            <option value="LayoutFive">Layout Five</option>
            <option value="LayoutSix">Layout Six</option>
            <option value="LayoutSeven">Layout Seven</option>
            <option value="LayoutEight">Layout Eight</option>
            <option value="LayoutNine">Layout Nine</option>
            <option value="LayoutTen">Layout Ten</option>
            <option value="LayoutEleven">Layout Eleven</option>
            <option value="LayoutTwelve">Layout Twelve</option>
            <option value="LayoutThirteen">Layout Thirteen</option>
            <option value="LayoutFourteen">Layout Fourteen</option>
            <option value="LayoutFifteen">Layout Fifteen</option>
            <option value="LayoutSixteen">Layout Sixteen</option>
            <option value="LayoutSeventeen">Layout Seventeen</option>
          </select>
        </div>
      </header>

      {/* Open B Book Window */}
      {isBbookOpen && (
        <NewWindow
          onUnload={closeBbookWindow}
          features={{ width: 1680, height: 900 }}
        >
          <BbookWin />
        </NewWindow>
      )}


  {/* Open A Book Window */}
  {isAbookOpen && (
        <NewWindow
          onUnload={closeAbookWindow}
          features={{ width: 1680, height: 900 }}
        >
        <AbookWin />
        </NewWindow>
      )}


      {/* Open Trading Account Window */}
      {isTradingAccountOpen && (
        <NewWindow
          onUnload={closeTradingAccountWindow}
          features={{ width: 1680, height: 900 }}
        >
          <TradingAccountWin />
        </NewWindow>
      )}
    </>
  );
};

export default Header;