import React from 'react';
import { WatchListFirst } from './watchlistA/WatchListFirst';
import './ag-grid-custom.css'
import {TradingviewLineChart} from "./graphs/TradingviewLineChart"
const layouts = {
    LayoutOne: () => (
        <div className={`grid grid-cols-12 grid-rows-12 gap-2 w-full h-full overflow-hidden p-2`}>
        <div className="bg-gray-200 col-span-12 row-span-12 flex justify-center items-center">
            <WatchListFirst/>
            <TradingviewLineChart/>
        </div>
       </div>
    ),
};

export default layouts;
