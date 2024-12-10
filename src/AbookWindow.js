import React from "react";
import "tailwindcss/tailwind.css";
import AbookWatchList from "./bbookaccount/watchlist/AbookWatchList";
const AbookWindow = () => {
    return (
        <div
        className="flex flex-col flex-grow border-4 border-black border-l-0" >
            <div className="w-full h-full grid grid-cols-10 grid-rows-10 gap-0">
            <div className="col-span-10 row-span-10">
                <AbookWatchList/>
            </div>
            </div>

        </div>

    );
};

export default AbookWindow;
