import React from "react";
import "tailwindcss/tailwind.css";
import BbookWatchList from "./bbookaccount/watchlist/BbookWatchListLiveData";
const BbookWindow = () => {
    return (
        <div
        className="flex flex-col flex-grow border-4 border-black border-l-0" >
            <div className="w-full h-full grid grid-cols-10 grid-rows-10 gap-0">
            <div className="col-span-10 row-span-10">
                <BbookWatchList/>
            </div>
            </div>

        </div>

    );
};

export default BbookWindow;
