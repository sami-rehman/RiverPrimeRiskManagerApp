import React from 'react';
import BaseLayout from './BaseLayout';
import ChartSwitcher from './ChartSwitcher';
import HighchartsComponent from './HighchartsComponent';
import { GridExample } from './GridExample';
import { symbolData, userData } from './constant';
import LongShortCharts from './LongShortCharts';
import VaRCharts from './VaRCharts';
import DepositsWithdrawalsAccountCharts from './DepositsWithdrawalsAccountCharts';
import TradebookCharts from './TradebookCharts';
import ECharts from './ECharts';
import PieCharts from './PieCharts';
import FunnelChart from './FunnelChart';
import WatchList from "./WatchlistGrid";

// const userColumnDefs = [
//     { "field": "userId" },
//     { "field": "login" },
//     { "field": "clientID" },
//     { "field": "mqid" },
//     { "field": "registration" },
//     { "field": "group" },
//     { "field": "name" },
//     { "field": "company" },
//     { "field": "account" },
//     { "field": "leverage" },
//     { "field": "limitPositionsValue" },
//     { "field": "limitOrders" },
//     { "field": "balance" },
//     { "field": "credit" },
//     { "field": "interestRate" },
//     { "field": "commissionDaily" },
//     { "field": "commissionMonthly" },
//     { "field": "commissionAgentDaily" },
//     { "field": "commissionAgentMonthly" },
//     { "field": "balancePrevDay" },
//     { "field": "balancePrevMonth" },
//     { "field": "equityPrevDay" },
//     { "field": "equityPrevMonth" }
// ];

// const symbolColumnDefs = [
//     { "field": "symbol" },
//     { "field": "positionTicket" },
//     { "field": "volume" },
//     { "field": "profit" },
//     { "field": "dealer" },
//     { "field": "positionLogin" },
//     { "field": "priceCurrent" },
//     { "field": "contractSize" },
//     { "field": "priceOpen" },
//     { "field": "priceSL" },
//     { "field": "priceTP" },
//     { "field": "rateProfit" },
//     { "field": "storage" },
//     { "field": "rateMargin" },
//     { "field": "timeCreate" },
//     { "field": "timeLastUpdated" },
//     { "field": "reasonEnd" },
//     { "field": "activationMode" },
//     { "field": "activationTime" },
//     { "field": "activationPrice" },
//     { "field": "activationFlags" }
// ];

const extractNonEmptyFields = (data) => {
    return Object.keys(data)
        .filter((key) => data[key] !== null && data[key] !== 0 && data[key] !== '')
        .map((key) => ({ field: key }));
};

const userColumnDefs = extractNonEmptyFields(userData[0]);
const symbolColumnDefs = extractNonEmptyFields(symbolData[0]);

console.log('userColumnDefs', userColumnDefs);

const layouts = {
    LayoutOne: () => (
        // <BaseLayout cols="12" rows="9">
        //     <div className="border border-gray-300 col-span-4 row-span-3 flex justify-center items-center p-2">
        //         {/* <ChartSwitcher chartType="bar" /> */}
        //         {/* <GridExample data={userData} columnDefs={userColumnDefs} /> */}
        //         <VaRCharts />
        //     </div>
        //     <div className="border border-gray-300 col-span-4 row-span-3 col-start-5 flex justify-center items-center p-2">
        //         {/* <ChartSwitcher chartType="line" /> */}
        //         <DepositsWithdrawalsAccountCharts />
        //     </div>
        //     <div className="border border-gray-300 col-span-4 row-span-3 col-start-9 flex justify-center items-center">
        //         {/* <ChartSwitcher chartType="pie" /> */}
        //         <TradebookCharts />
        //     </div>
        //     <div className="border border-gray-300 col-span-3 row-span-3 row-start-4 flex justify-center items-center">
        //         {/* <ChartSwitcher chartType="bar" /> */}
        //         <ECharts />
        //     </div>
        //     <div className="border border-gray-300 col-span-3 row-span-3 col-start-4 row-start-4 flex justify-center items-center">
        //         {/* <ChartSwitcher chartType="bar" /> */}
        //         <PieCharts />
        //     </div>
        //     <div className="bg-gray-200 col-span-3 row-span-3 col-start-7 row-start-4 flex justify-center items-center">
        //         {/* <ChartSwitcher chartType="line" /> */}
        //         <VaRCharts />
        //     </div>
        //     <div className="bg-gray-200 col-span-3 row-span-3 col-start-10 row-start-4 flex justify-center items-center">
        //         <ChartSwitcher chartType="bar" />
        //     </div>
        //     <div className="bg-gray-200 col-span-4 row-span-3 row-start-7 flex justify-center items-center">
        //         {/* <ChartSwitcher chartType="line" /> */}
        //         <GridExample data={userData} columnDefs={userColumnDefs} />

        //     </div>
        //     <div className="bg-gray-200 col-span-4 row-span-3 col-start-5 row-start-7 flex justify-center items-center">
        //         <ChartSwitcher chartType="bar" />
        //     </div>
        //     <div className="border border-gray-300 col-span-4 row-span-3 col-start-9 row-start-7 flex justify-center items-center">
        //         {/* <ChartSwitcher chartType="pie" /> */}
        //         <ECharts />
        //     </div>
        // </BaseLayout>
        <WatchList/>
    ),
    LayoutTwo: () => (
        <BaseLayout cols="12" rows="12">
            <div className="bg-gray-200 col-span-6 row-span-6 flex justify-center items-center">
                {/* <GridExample data={userData} columnDefs={userColumnDefs} /> */}
                <FunnelChart />
                {/* <ChartSwitcher chartType="line" /> */}
            </div>
            <div className="border border-gray-300 rounded-sm col-span-6 row-span-6 col-start-7 flex justify-center items-center p-2">
                <LongShortCharts />
                {/* <ChartSwitcher chartType="line" /> */}
            </div>
            <div className="border border-gray-300 col-span-12 row-span-6 row-start-7 flex justify-center items-center">
                {/* <GridExample data={symbolData} columnDefs={symbolColumnDefs} /> */}
                <VaRCharts />
                {/* <ChartSwitcher chartType="line" /> */}
            </div>
        </BaseLayout>
    ),
    LayoutThree: () => (
        <BaseLayout cols="12" rows="12">
            <div className="bg-gray-200 col-span-12 row-span-6 flex justify-center items-center">
                {/* <ChartSwitcher chartType="line" /> */}
                <HighchartsComponent />
            </div>
            <div className="bg-gray-200 col-span-6 row-span-6 row-start-7 flex justify-center items-center">
                {/* <ChartSwitcher chartType="bar" /> */}
                <PieCharts />
            </div>
            <div className="bg-gray-200 col-span-6 row-span-6 col-start-7 row-start-7 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
        </BaseLayout>
    ),
    LayoutFour: () => (
        <BaseLayout cols="12" rows="8">
            <div className="bg-gray-200 col-span-12 row-span-4 flex justify-center items-center">
                {/* <ChartSwitcher chartType="bar" /> */}
                <VaRCharts />
            </div>
            <div className="bg-gray-200 col-span-12 row-span-4 row-start-5 flex justify-center items-center">
                {/* <ChartSwitcher chartType="line" /> */}
                <HighchartsComponent />
            </div>
        </BaseLayout>
    ),
    LayoutFive: () => (
        <BaseLayout cols="12" rows="8">
            <div className="bg-gray-200 col-span-4 row-span-4 flex justify-center items-center">
                {/* <ChartSwitcher chartType="line" /> */}
                <HighchartsComponent />
            </div>
            <div className="bg-gray-200 col-span-4 row-span-4 col-start-5 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-4 row-span-4 col-start-9 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-4 row-span-4 row-start-5 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-4 row-span-4 col-start-5 row-start-5 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-4 row-span-4 col-start-9 row-start-5 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
        </BaseLayout>
    ),
    LayoutSix: () => (
        // <BaseLayout cols="10" rows="8">
        <div className="grid grid-cols-10 grid-rows-8 gap-2 w-full h-full overflow-hidden">
            <div className="bg-gray-200 col-span-3 row-span-4 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-3 row-span-4 col-start-1 row-start-5 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-3 row-span-4 col-start-4 row-start-1 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-3 row-span-4 col-start-4 row-start-5 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-4 row-span-8 col-start-7 row-start-1 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
        </div>
        // </BaseLayout>
    ),
    LayoutSeven: () => (
        <BaseLayout cols="10" rows="8">
            <div className="bg-gray-200 col-span-4 row-span-8 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-3 row-span-4 col-start-5 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-3 row-span-4 col-start-8 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-3 row-span-4 col-start-5 row-start-5 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-3 row-span-4 col-start-8 row-start-5 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
        </BaseLayout>
    ),
    LayoutEight: () => (
        <BaseLayout cols="10" rows="8">
            <div className="bg-gray-200 col-span-5 row-span-4 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-5 row-span-4 col-start-6 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-5 row-span-4 row-start-5 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-5 row-span-4 col-start-6 row-start-5 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
        </BaseLayout>
    ),
    LayoutNine: () => (
        <BaseLayout cols="10" rows="9">
            <div className="bg-gray-200 col-span-10 row-span-3 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-10 row-span-3 row-start-4 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-10 row-span-3 row-start-7 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
        </BaseLayout>
    ),
    LayoutTen: () => (
        <BaseLayout cols="12" rows="8">
            <div className="bg-gray-200 col-span-6 row-span-4 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-6 row-span-4 col-start-7 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-4 row-span-4 row-start-5 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-4 row-span-4 col-start-5 row-start-5 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-4 row-span-4 col-start-9 row-start-5 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
        </BaseLayout>
    ),
    LayoutEleven: () => (
        <BaseLayout cols="12" rows="8">
            <div className="bg-gray-200 col-span-6 row-span-4 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-6 row-span-4 col-start-1 row-start-5 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-6 row-span-8 col-start-7 row-start-1 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
        </BaseLayout>
    ),
    LayoutTwelve: () => (
        <BaseLayout cols="12" rows="8">
            <div className="bg-gray-200 col-span-6 row-span-8 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-6 row-span-4 col-start-7 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-6 row-span-4 col-start-7 row-start-5 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
        </BaseLayout>
    ),
    LayoutThirteen: () => (
        <BaseLayout cols="12" rows="8">
            <div className="bg-gray-200 col-span-12 row-span-4 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-12 row-span-4 row-start-5 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
        </BaseLayout>
    ),

    LayoutFourteen: () => (
        <BaseLayout cols="12" rows="8">
            <div className="bg-gray-200 col-span-6 row-span-4 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-6 row-span-4 col-start-7 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-3 row-span-4 row-start-5 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-3 row-span-4 col-start-4 row-start-5 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-3 row-span-4 col-start-7 row-start-5 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-3 row-span-4 col-start-10 row-start-5 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
        </BaseLayout>
    ),
    LayoutFifteen: () => (
        <BaseLayout cols="12" rows="8">
            <div className="bg-gray-200 col-span-3 row-span-4 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-3 row-span-4 col-start-4 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-3 row-span-4 col-start-7 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-3 row-span-4 col-start-10 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-6 row-span-4 row-start-5 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-6 row-span-4 col-start-7 row-start-5 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
        </BaseLayout>
    ),
    LayoutSixteen: () => (
        <BaseLayout cols="9" rows="9">
            <div className="bg-gray-200 col-span-3 row-span-3 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-3 row-span-3 col-start-4 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-3 row-span-3 col-start-7 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-3 row-span-3 row-start-4 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-3 row-span-3 col-start-1 row-start-7 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-3 row-span-3 col-start-4 row-start-4 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-3 row-span-3 col-start-7 row-start-4 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-3 row-span-3 col-start-4 row-start-7 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-3 row-span-3 col-start-7 row-start-7 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
        </BaseLayout>
    ),
    LayoutSeventeen: () => (
        <BaseLayout cols="12" rows="12">
            <div className="bg-gray-200 col-span-3 row-span-3 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-3 row-span-3 col-start-4 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-3 row-span-3 col-start-7 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-3 row-span-3 col-start-1 row-start-4 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-3 row-span-3 col-start-1 row-start-7 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-3 row-span-3 col-start-4 row-start-4 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-3 row-span-3 col-start-7 row-start-4 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-3 row-span-3 col-start-4 row-start-7 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-3 row-span-3 col-start-7 row-start-7 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-3 row-span-3 col-start-10 row-start-1 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-3 row-span-3 col-start-10 row-start-4 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-3 row-span-3 col-start-10 row-start-7 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-3 row-span-3 row-start-10 flex justify-center items-center">
                {/* <ChartSwitcher chartType="line" /> */}
                {/* <HighchartsComponent /> */}
                <GridExample data={userData} columnDefs={userColumnDefs} />
            </div>
            <div className="bg-gray-200 col-span-3 row-span-3 col-start-4 row-start-10 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-3 row-span-3 col-start-7 row-start-10 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-3 row-span-3 col-start-10 row-start-10 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
        </BaseLayout>
    ),
};

export default layouts;
