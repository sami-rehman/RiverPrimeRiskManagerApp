import React from "react";

const MainSideBar = ({ setSelectedMenuItem, selectedMenuItem }) => {
    const menuItems = [
        "Executive Dashboard",
        "Manager Dashboard",
        "Portfolio",
        "A-Book",
        "B-Book",
        "C-Book",
        "Revenues & Expenses",
        "Trading Accounts",
        "Account Activity",
        "Institutional Accounts",
        "Analytics",
        "Hedge Screen",
        "LPS Map",
        "Concentration",
        "Value at Risk",
    ];

    return (
        <div className="w-1/9 bg-[#3B3B3B] flex flex-col border-4 border-black">
            <header className="flex items-center justify-between border-b-4 border-black px-2 h-[40px]">
                <div className="text-lg font-bold"></div>
                {/* Action Buttons */}
                <div className="flex space-x-2">
                    <button className="p-1 hover:rounded-full hover:bg-[#4C4C4C] transition-all">
                        <svg
                            width="13"
                            height="12"
                            viewBox="0 0 13 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M0 0V12.01H12.86V0H0ZM11.79 11.16H4.38V0.830002H11.79V11.16Z"
                                fill="white"
                            />
                        </svg>
                    </button>
                    <button className="p-1 hover:rounded-full hover:bg-[#4C4C4C] transition-all">
                        <svg
                            width="14"
                            height="12"
                            viewBox="0 0 14 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M0.189941 0V12.01H13.0499V0H0.189941ZM1.25994 0.839996H8.66994V11.17H1.25994V0.839996Z"
                                fill="white"
                            />
                        </svg>
                    </button>
                    <button className="p-1 hover:rounded-full hover:bg-[#4C4C4C] transition-all">
                        <svg
                            width="12"
                            height="11"
                            viewBox="0 0 12 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M4.67009 7.58002L6.81009 9.72002L7.12009 9.41002C7.99009 8.54002 8.33009 7.28001 8.03009 6.09001L7.92009 5.65002L8.83009 4.74002L8.92009 4.83002C9.37009 5.30002 10.1001 5.37002 10.6401 5.00002C11.2301 4.58002 11.3701 3.76002 10.9501 3.17002C10.9101 3.11002 10.8601 3.06002 10.8101 3.00002L8.6601 0.850016C8.2101 0.380016 7.48009 0.310018 6.94009 0.680018C6.35009 1.10002 6.2101 1.92002 6.6301 2.51002C6.6701 2.57002 6.7201 2.62002 6.7701 2.68002L6.90009 2.81002L5.9901 3.72002L5.56009 3.61002C4.37009 3.30002 3.10009 3.64002 2.23009 4.51002L1.92009 4.82002L4.06009 6.96002L0.850098 10.17L1.47009 10.79L4.68008 7.58002H4.67009ZM5.3501 4.46002L6.2701 4.68002L8.15009 2.80002L7.40009 2.06002C7.23009 1.89002 7.23009 1.61002 7.40009 1.44002C7.42009 1.42002 7.4401 1.41002 7.4601 1.39002C7.6501 1.27002 7.90009 1.31002 8.05009 1.47002L10.2001 3.62002C10.3701 3.79002 10.3701 4.07002 10.2001 4.24002C10.1801 4.26002 10.1601 4.27002 10.1401 4.29002C9.95009 4.41002 9.70009 4.37002 9.55009 4.21002L8.84009 3.50002L6.9601 5.38002L7.19009 6.30002C7.38009 7.04002 7.24009 7.83002 6.80009 8.46002L3.20009 4.86002C3.83009 4.42002 4.62009 4.27002 5.36009 4.47002L5.3501 4.46002Z"
                                fill="white"
                            />
                        </svg>
                    </button>
                </div>
            </header>
            <div className="flex flex-col space-y-4 mt-1 p-2">
                {menuItems.map((item, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedMenuItem(item)}
                        // className={`text-left px-4 py-1 rounded-2xl border shadow-md shadow-[#2D2D2D] text-md ${item === "Analytics" ? "text-[#47FFA6]" : ""
                        //     }`}
                        // style={{
                        //     borderColor: item === "Analytics" ? "#47FFA6" : "#FFFFFF",
                        // }}
                        className={`text-left px-4 py-1 rounded-2xl border shadow-md shadow-[#2D2D2D] text-md ${selectedMenuItem === item
                                ? "text-[#47FFA6] border-[#47FFA6] bg-[#4C4C4C]"
                                : "border-[#FFFFFF] text-white"
                            }`}
                        style={{
                            transition: "all 0.3s",
                        }}
                    >
                        {item}
                    </button>
                ))}
                {/* Add Button */}
                <button className="text-center px-4 py-1 rounded-2xl border shadow-md shadow-[#2D2D2D] text-md">
                    +
                </button>
            </div>
        </div>
    );
};

export default MainSideBar;
