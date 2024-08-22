import React from 'react';
import BaseLayout from './BaseLayout';
import { WatchListFirst } from './watchlistA/WatchListFirst';
import './ag-grid-custom.css'
import {TradingviewLineChart} from "./graphs/TradingviewLineChart"
const layouts = {
    LayoutOne: () => (
        <BaseLayout cols="12" rows="12">
        <div className="bg-gray-200 col-span-12 row-span-12 flex justify-center items-center">
            <WatchListFirst/>
            <TradingviewLineChart/>
        </div>
        </BaseLayout>
    ),
};

export default layouts;
