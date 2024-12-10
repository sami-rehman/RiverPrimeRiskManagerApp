import React, {useState} from "react";
import AnalyticsWin from "./PredictionWin";
import MainSideBar from "./MainSideBar";
import BbookWindow from "./BbookWindow";
import CbookWindow from "./CbookWindow";
import AbookWindow from "./AbookWindow";
const MainContainer = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("Analytics");

  const componentMap = {
    "Executive Dashboard": () => <div>Executive Dashboard Content</div>,
    "Manager Dashboard": () => <div>Manager Dashboard Content</div>,
    Portfolio: () => <div>Portfolio Content</div>,
    "A-Book": AbookWindow,
    "B-Book": BbookWindow,
    "C-Book": CbookWindow,
    "Revenues & Expenses": () => <div>Revenues & Expenses Content</div>,
    "Trading Accounts": () => <div>Trading Accounts Content</div>,
    "Account Activity": () => <div>Account Activity Content</div>,
    "Institutional Accounts": () => <div>Institutional Accounts Content</div>,
    Analytics: AnalyticsWin,
    "Hedge Screen": () => <div>Hedge Screen Content</div>,
    "LPS Map": () => <div>LPS Map Content</div>,
    Concentration: () => <div>Concentration Content</div>,
    "Value at Risk": () => <div>Value at Risk Content</div>,
  };

  const RenderedComponent = componentMap[selectedMenuItem] || (() => <div>Not Found</div>);
  return (
    <div className="w-full h-full flex bg-[#2D2D2D] text-white overflow-hidden">
      <MainSideBar 
         setSelectedMenuItem={setSelectedMenuItem}
         selectedMenuItem={selectedMenuItem}
      />
        <RenderedComponent />
    </div>
  );
};

export default MainContainer;
