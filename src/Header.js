import React, { useState, useEffect } from "react";
import TradingAccountWin from "./TradingAccountWin";
import NewWindow from "react-new-window";

const Header = ({ setLayout }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [newWindowRef, setNewWindowRef] = useState(null);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const openWindow = () => {
    setIsOpen(true);
  };

  const closeWindow = () => {
    setIsOpen(false);
    if (newWindowRef) {
      newWindowRef.close(); // Ensure the window closes properly
    }
  };

  const handleOpen = (win) => {
    setNewWindowRef(win); // Save reference to the new window
    setWindowSize({
      width: win.innerWidth,
      height: win.innerHeight,
    });

    const resizeHandler = () => {
      setWindowSize({
        width: win.innerWidth,
        height: win.innerHeight,
      });
    };

    win.addEventListener("resize", resizeHandler);

    // Clean up the event listener on window close
    win.onunload = () => {
      win.removeEventListener("resize", resizeHandler);
    };
  };

  useEffect(() => {
    const handleFocus = () => {
      if (newWindowRef && isOpen) {
        newWindowRef.postMessage("refresh", "*");
      }
    };

    const handleBlur = () => {
      if (newWindowRef && isOpen) {
        newWindowRef.postMessage("paused", "*");
      }
    };

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, [newWindowRef, isOpen]);

  return (
    <>
      <header className="p-4 bg-blue-600 text-gray-500 flex justify-between">
        <h1 className="text-xl text-white">Layout Switcher</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={togglePopup}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Trading Accounts
          </button>

          <div>
            <button
              onClick={openWindow}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Open Trading Account Window
            </button>
          </div>

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

      {isPopupOpen && <TradingAccountWin togglePopup={togglePopup} />}
      {isOpen && (
        <NewWindow
          onUnload={closeWindow}
          onOpen={handleOpen}
          features={{ width: 1680, height: 900 }}
        >
          <TradingAccountWin windowSize={windowSize} />
          {/* <TradingAccountPieChart/> */}
        </NewWindow>
      )}
    </>
  );
};

export default Header;


// import React, { useState, useEffect } from "react";
// import TradingAccountWin from "./TradingAccountWin";

// const Header = ({ setLayout }) => {
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
//   const [newWindowRef, setNewWindowRef] = useState(null);

//   // Toggle the popup for Trading Accounts
//   const togglePopup = () => {
//     setIsPopupOpen(!isPopupOpen);
//   };

//   // Open or focus the window if already open
//   const openWindow = () => {
//     if (newWindowRef && !newWindowRef.closed) {
//       newWindowRef.focus(); // Focus on the existing window if it's already open
//     } else {
//       // Open a new window with a specific name
//       const newWin = window.open(
//         "",
//         "tradingAccountWindow",
//         "width=1680,height=900"
//       );
//       setNewWindowRef(newWin); // Set reference to the newly opened window

//       // Write content to the new window
//       newWin.document.body.innerHTML = "<div id='trading-account-root'></div>";
//       const tradingAccountRoot = newWin.document.getElementById(
//         "trading-account-root"
//       );

//       // Render the component manually in the new window
//       newWin.React = React;
//       newWin.ReactDOM = require("react-dom");
//       newWin.ReactDOM.render(
//         <TradingAccountWin windowSize={windowSize} />,
//         tradingAccountRoot
//       );

//       setIsOpen(true);
//     }
//   };

//   // Close the window and reset the state
//   const closeWindow = () => {
//     if (newWindowRef) {
//       newWindowRef.close();
//       setNewWindowRef(null);
//       setIsOpen(false);
//     }
//   };

//   // Reload the already opened window on page refresh
//   useEffect(() => {
//     if (window.name === "tradingAccountWindow") {
//       const existingWindow = window.open("", "tradingAccountWindow");
//       if (existingWindow && !existingWindow.closed) {
//         setNewWindowRef(existingWindow);
//         setIsOpen(true);
//       }
//     }
//   }, []);

//   // Handle focus and blur events
//   useEffect(() => {
//     const handleFocus = () => {
//       if (newWindowRef && isOpen) {
//         newWindowRef.postMessage("refresh", "*");
//       }
//     };

//     const handleBlur = () => {
//       if (newWindowRef && isOpen) {
//         newWindowRef.postMessage("paused", "*");
//       }
//     };

//     window.addEventListener("focus", handleFocus);
//     window.addEventListener("blur", handleBlur);

//     return () => {
//       window.removeEventListener("focus", handleFocus);
//       window.removeEventListener("blur", handleBlur);
//     };
//   }, [newWindowRef, isOpen]);

//   return (
//     <>
//       <header className="p-4 bg-blue-600 text-gray-500 flex justify-between">
//         <h1 className="text-xl text-white">Layout Switcher</h1>
//         <div className="flex items-center space-x-4">
//           <button
//             onClick={togglePopup}
//             className="bg-green-500 text-white px-4 py-2 rounded"
//           >
//             Trading Accounts
//           </button>

//           <div>
//             <button
//               onClick={openWindow}
//               className="bg-green-500 text-white px-4 py-2 rounded"
//             >
//               Open Trading Account Window
//             </button>
//           </div>

//           <select
//             className="p-2 rounded"
//             onChange={(e) => setLayout(e.target.value)}
//           >
//             <option value="LayoutOne">Layout One</option>
//             <option value="LayoutTwo">Layout Two</option>
//             <option value="LayoutThree">Layout Three</option>
//             <option value="LayoutFour">Layout Four</option>
//             <option value="LayoutFive">Layout Five</option>
//             <option value="LayoutSix">Layout Six</option>
//             <option value="LayoutSeven">Layout Seven</option>
//             <option value="LayoutEight">Layout Eight</option>
//             <option value="LayoutNine">Layout Nine</option>
//             <option value="LayoutTen">Layout Ten</option>
//             <option value="LayoutEleven">Layout Eleven</option>
//             <option value="LayoutTwelve">Layout Twelve</option>
//             <option value="LayoutThirteen">Layout Thirteen</option>
//             <option value="LayoutFourteen">Layout Fourteen</option>
//             <option value="LayoutFifteen">Layout Fifteen</option>
//             <option value="LayoutSixteen">Layout Sixteen</option>
//             <option value="LayoutSeventeen">Layout Seventeen</option>
//           </select>
//         </div>
//       </header>

//       {isPopupOpen && <TradingAccountWin togglePopup={togglePopup} />}
//     </>
//   );
// };

// export default Header;

