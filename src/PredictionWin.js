import React from "react";
import "tailwindcss/tailwind.css";
import { AnalyticsGrid } from "./AnalyticsGrid";
import { AnalyticsChart } from "./AnalyticsChart";
import { Sidebar } from "./Sidebar";
const AnalyticsWin = () => {
    return (
        <div
        className="flex flex-col flex-grow border-4 border-black border-l-0" >
            <div className="w-full h-full grid grid-cols-10 grid-rows-10 gap-0">
                <div className="col-span-2 row-span-10">
                    <Sidebar />
                </div>
                <div className="col-span-4 row-span-10 col-start-3 border-r-4 border-black">
                    <AnalyticsGrid />
                </div>
                <div className="col-span-4 row-span-10 col-start-7 border-r-4 border-black">
                    <AnalyticsChart />
                </div>
            </div>

        </div>

    );
};

export default AnalyticsWin;
