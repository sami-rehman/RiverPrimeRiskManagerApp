import React from 'react';
import BaseLayout from './BaseLayout';
import ChartSwitcher from './ChartSwitcher';
import HighchartsComponent from './HighchartsComponent';
import LongShortCharts from './LongShortCharts';
import VaRCharts from './VaRCharts';
import DepositsWithdrawalsAccountCharts from './DepositsWithdrawalsAccountCharts';
import TradebookCharts from './TradebookCharts';
import ECharts from './ECharts';
import PieCharts from './PieCharts';
import FunnelChart from './FunnelChart';
import WatchList from "./WatchlistGrid";
import { WatchListFirst } from './watchlistA/WatchListFirst';
import './ag-grid-custom.css'
import { LineGraphRenderer } from "./graphs/LineGraphRenderer";
import { TradingviewLineChart } from "./graphs/TradingviewLineChart"
import { numberFormatter, LocalDateTimeRenderer } from './common/constant';
import ActiveInstumentsChart from './ActiveInstumentsChart';
import ConcentrationChart from './ConcentrationChart';
import LPSymbolsCharts from './LPSymbolsCharts';
import GroupsLpChart from './GroupsLpChart';
import EChartsCandlestickChart from './EChartsCandlestickChart';
import VaRGraph2 from './VaRGraph2';
import TradeImpact from './graphs/TradeImpact';
import RulesHighcharts from './RulesHighcharts'
import PerformanceHighChart from './PerformanceHighChart';
import WatchListDarkMode from './WatchListDarkMode';
import InstrumentsByVolumes from './bbookaccount/graph/InstrumentsByVolumes';
import PieHighCharts from './graphs/PieHighCharts';
import HoldingByAccount from './bbookaccount/graph/HoldingByAccount';
import { WatchListTradingAccount } from './grid/WatchListTradingAccount';
import { TradingAccountGrid } from './grid/TradingAccountGrid';
import AbookWatchList from './bbookaccount/watchlist/AbookWatchList';
// import BbookWatchList from './bbookaccount/watchlist/BbookWatchList';
import BbookWatchList from './bbookaccount/watchlist/BbookWatchListLiveData';
import CbookWatchList from './bbookaccount/watchlist/CbookWatchList';
import BookReconciliation from './bbookaccount/watchlist/BookReconciliation';
import ReconciliationSummaries from './bbookaccount/watchlist/ReconciliationSummaries';


const WatchListFirstColDefs = [
    {
        field: "s",
        headerName: "MT Symbol",
    },
    {
        headerName: "Ask",
        field: "a",
        cellDataType: "number",
        valueFormatter: numberFormatter,
        cellRenderer: "agAnimateShowChangeCellRenderer",

    },
    {
        headerName: "Bid",
        field: "b",
        cellDataType: "number",
        valueFormatter: numberFormatter,
        cellRenderer: "agAnimateShowChangeCellRenderer",
    },
    {
        headerName: "Spread",
        cellDataType: "number",
        valueGetter: ({ data }) =>
            data && data.a - data.b,
        valueFormatter: numberFormatter,
        cellRenderer: "agAnimateShowChangeCellRenderer",
    },
    {
        headerName: "High",
        field: "h",
        cellDataType: "number",
        valueFormatter: numberFormatter,

    },
    {
        headerName: "Low",
        field: "l",
        cellDataType: "number",
        valueFormatter: numberFormatter,
    },
    {
        headerName: "Change (%)",
        field: "P",
    }
];

const WatchListLTPColDefs = [
    {
        field: "s",
        headerName: "Symbol",
    },
    {
        headerName: "LTP",
        field: "a",
        cellDataType: "number",
        valueFormatter: numberFormatter,
        cellRenderer: "agAnimateShowChangeCellRenderer",

    },
    {
        headerName: "Book",
        field: "b",
        cellDataType: "number",
        valueFormatter: numberFormatter,
        cellRenderer: "agAnimateShowChangeCellRenderer",
    },
    {
        headerName: "Account",
        field: "L",
        cellDataType: "number",
        // valueFormatter: numberFormatter,
        cellRenderer: "agAnimateShowChangeCellRenderer",
    },
    {
        headerName: "Time",
        field: "E",
        cellRenderer: LocalDateTimeRenderer,
    },
]

const WatchListSymbolMapColDefs = [
    {
        field: "s",
        headerName: "MT Symbol",

    },
    {
        headerName: 'Symbol Mapping - CS Multiplier',
        // headerClass: 'header-group-symbol-mapping',
        children: [
            {
                field: "s",
                headerName: "LP1 Symbol",
            },
            {
                field: "s",
                headerName: "LP2 Symbol",
            },
            {
                field: "s",
                headerName: "LP3 Symbol",
            }
        ]
    },
    {
        field: "a",
        headerName: "Ask",
        valueFormatter: numberFormatter,
        cellRenderer: "agAnimateShowChangeCellRenderer",
    },
    {
        field: "b",
        headerName: "Bid",
        valueFormatter: numberFormatter,
        cellRenderer: "agAnimateShowChangeCellRenderer",
    },
    {
        headerName: 'Spread Ratio',
        // headerClass: 'header-group-spread-ratio',
        children: [
            {
                field: "b",
                headerName: "SID-LP1",
            },
            {
                field: "b",
                headerName: "SID-LP2",
            },
            {
                field: "b",
                headerName: "SID-LP3",
            }
        ]
    },
    {
        headerName: 'Margins Conditions',
        // headerClass: 'header-group-margins-conditions',
        children: [
            {
                field: "b",
                headerName: "SID-LP1",
            },
            {
                field: "b",
                headerName: "SID-LP2",
            },
            {
                field: "b",
                headerName: "SID-LP3",
            }
        ]
    },
    {
        headerName: 'Fees (/Lot)',
        // headerClass: 'header-group-fees',
        children: [
            {
                field: "b",
                headerName: "SID-LP1",
            },
            {
                field: "b",
                headerName: "SID-LP2",
            },
            {
                field: "b",
                headerName: "SID-LP3",
            }
        ]
    },

]

const WatchListMarketColDefs = [
    {
        headerName: 'Market',
        children: [
            {
                field: "s",
                headerName: "MT Symbol",
            },
            {
                field: "a",
                headerName: "LTP",
                valueFormatter: numberFormatter,
                cellRenderer: "agAnimateShowChangeCellRenderer",
            },
        ]
    },
    {
        headerName: 'Book Exposure',
        children: [
            {
                field: "s",
                headerName: "A-Book",
            },
            {
                field: "s",
                headerName: "B-Book",
            },
            {
                field: "s",
                headerName: "C-Book",
            }
        ]
    },
    {
        headerName: 'Predicted Hedge',
        hide: true,
        children: [
            {
                field: "b",
                headerName: "Buy / Sell",
                valueFormatter: numberFormatter,
                cellRenderer: "agAnimateShowChangeCellRenderer",
            },
            {
                field: "L",
                headerName: "H. Quantity",
                valueFormatter: numberFormatter,
                cellRenderer: "agAnimateShowChangeCellRenderer",
            },
            {
                field: "b",
                headerName: "Entry",
                valueFormatter: numberFormatter,
                cellRenderer: "agAnimateShowChangeCellRenderer",
            },
            {
                field: "b",
                headerName: "Take Profit",
            },
            {
                field: "b",
                headerName: "Stop Loss",
            },
            {
                field: "L",
                headerName: "Window",
                valueFormatter: numberFormatter,
                cellRenderer: "agAnimateShowChangeCellRenderer",
            },
            {
                field: "b",
                headerName: "Expiry",
            },
            {
                field: "b",
                headerName: "Re-Entry",
            },
            {
                field: "b",
                headerName: "Confidence",
            },
            {
                field: "b",
                headerName: "Objective",
            },
            {
                field: "b",
                headerName: "Warning",
            }
        ]
    },
    {
        headerName: 'Margins Conditions',
        children: [
            {
                field: "b",
                headerName: "SID-LP1",
            },
            {
                field: "b",
                headerName: "SID-LP2",
            },
            {
                field: "b",
                headerName: "SID-LP3",
            }
        ]
    },
    {
        headerName: 'LPS',
        children: [
            {
                field: "b",
                headerName: "CMC | LMAX | PrimeXM | Equiti",
                valueFormatter: numberFormatter,
                cellRenderer: "agAnimateShowChangeCellRenderer",
            },
        ]
    },

]

const layouts = {
    LayoutOne: () => (
        // <BaseLayout cols="12" rows="9">
        //     <div className="border border-gray-300 col-span-4 row-span-3 flex justify-center items-center p-2">
        //         <VaRCharts />
        //     </div>
        //     <div className="border border-gray-300 col-span-4 row-span-3 col-start-5 flex justify-center items-center p-2">
        //         <DepositsWithdrawalsAccountCharts />
        //     </div>
        //     <div className="border border-gray-300 col-span-4 row-span-3 col-start-9 flex justify-center items-center">
        //         <TradebookCharts />
        //     </div>
        //     <div className="border border-gray-300 col-span-3 row-span-3 row-start-4 flex justify-center items-center">
        //         <ECharts />
        //     </div>
        //     <div className="border border-gray-300 col-span-3 row-span-3 col-start-4 row-start-4 flex justify-center items-center">
        //         {/* <ActiveInstumentsChart /> */}
        //         {/* <WatchListDarkMode/> */}
        //         {/* <InstrumentsByVolumes/> */}
        //     </div>
        //     <div className="bg-gray-200 col-span-3 row-span-3 col-start-7 row-start-4 flex justify-center items-center">
        //     <PerformanceHighChart />
        //     {/* <InstrumentsByVolumes/> */}
        //     </div>
        //     <div className="bg-gray-200 col-span-3 row-span-3 col-start-10 row-start-4 flex justify-center items-center">
        //         <div className="relative w-[100%] h-[100%]">
        //             <RulesHighcharts />
        //         </div>
        //     </div>
        //     <div className="bg-gray-200 col-span-4 row-span-3 row-start-7 flex justify-center items-center">
        //         <EChartsCandlestickChart/>
        //     </div>
        //     <div className="bg-gray-200 col-span-4 row-span-3 col-start-5 row-start-7 flex justify-center items-center">
        //         <WatchList />
        //     </div>
        //     <div className="border border-gray-300 col-span-4 row-span-3 col-start-9 row-start-7 flex justify-center items-center">
        //         <LPSymbolsCharts/>
        //     </div>
        // </BaseLayout>
        <BaseLayout cols="12" rows="12">
        <div className="bg-gray-200 col-span-12 row-span-12 flex justify-center items-center">
           {/* <InstrumentsByVolumes/> */}
           {/* <HoldingByAccount/> */}
           {/* <PieHighCharts/> */}
           {/* <TradingAccountGrid/> */}
           {/* <AbookWatchList/> */}
           {/* <BbookWatchList/> */}
           {/* <CbookWatchList/> */}
           <BookReconciliation/>
           {/* <ReconciliationSummaries/> */}
        </div>
    </BaseLayout>

    ),
    LayoutTwo: () => (
        <BaseLayout cols="12" rows="12">
            <div className="bg-gray-200 col-span-6 row-span-6 flex justify-center items-center">
                <FunnelChart />
            </div>
            <div className="border border-gray-300 rounded-sm col-span-6 row-span-6 col-start-7 flex justify-center items-center p-2">
                <LongShortCharts />
            </div>
            <div className="border border-gray-300 col-span-12 row-span-6 row-start-7 flex justify-center items-center">
                <WatchListFirst WatchListColDefs={WatchListSymbolMapColDefs} sideBar={true} />

            </div>
        </BaseLayout>
    ),
    LayoutThree: () => (
        <BaseLayout cols="12" rows="12">
            <div className="bg-gray-200 col-span-12 row-span-6 flex justify-center items-center">
                <WatchListFirst WatchListColDefs={WatchListMarketColDefs} sideBar={true} />
            </div>
            <div className="bg-gray-200 col-span-6 row-span-6 row-start-7 flex justify-center items-center">
                <WatchListFirst WatchListColDefs={WatchListLTPColDefs} />
            </div>
            <div className="bg-gray-200 col-span-6 row-span-6 col-start-7 row-start-7 flex justify-center items-center">
                <WatchListFirst WatchListColDefs={WatchListFirstColDefs} />
            </div>
        </BaseLayout>
    ),
    LayoutFour: () => (
        <BaseLayout cols="12" rows="8">
            <div className="bg-gray-200 col-span-12 row-span-4 flex justify-center items-center">
                <HighchartsComponent />
            </div>
            <div className="bg-gray-200 col-span-12 row-span-4 row-start-5 flex justify-center items-center">
                {/* <HighchartsComponent /> */}
                <TradeImpact />
            </div>
        </BaseLayout>
    ),
    LayoutFive: () => (
        <BaseLayout cols="12" rows="8">
            <div className="bg-gray-200 col-span-4 row-span-4 flex justify-center items-center">
                <HighchartsComponent />
            </div>
            <div className="bg-gray-200 col-span-4 row-span-4 col-start-5 flex justify-center items-center">
                <ActiveInstumentsChart />
            </div>
            <div className="bg-gray-200 col-span-4 row-span-4 col-start-9 flex justify-center items-center">
                <ConcentrationChart />
            </div>
            <div className="bg-gray-200 col-span-4 row-span-4 row-start-5 flex justify-center items-center">
                <LPSymbolsCharts />
            </div>
            <div className="bg-gray-200 col-span-4 row-span-4 col-start-5 row-start-5 flex justify-center items-center">
                <EChartsCandlestickChart />
            </div>
            <div className="bg-gray-200 col-span-4 row-span-4 col-start-9 row-start-5 flex justify-center items-center">
                <PieCharts />
            </div>
        </BaseLayout>
    ),
    LayoutSix: () => (
        // <BaseLayout cols="10" rows="8">
        <div className="grid grid-cols-10 grid-rows-8 gap-2 w-full h-full overflow-hidden">
            <div className="bg-gray-200 col-span-3 row-span-4 flex justify-center items-center">
                {/* <ChartSwitcher chartType="line" /> */}
                <PieCharts />
            </div>
            <div className="bg-gray-200 col-span-3 row-span-4 col-start-1 row-start-5 flex justify-center items-center">
                <VaRGraph2 />
            </div>
            <div className="bg-gray-200 col-span-3 row-span-4 col-start-4 row-start-1 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-3 row-span-4 col-start-4 row-start-5 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-4 row-span-8 col-start-7 row-start-1 flex justify-center items-center">
                <LPSymbolsCharts />
                {/* <WatchList /> */}
            </div>
        </div>
        // </BaseLayout>
    ),
    LayoutSeven: () => (
        <BaseLayout cols="10" rows="8">
            <div className="bg-gray-200 col-span-4 row-span-8 flex justify-center items-center">
                <RulesHighcharts />
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
        // <BaseLayout cols="9" rows="9">
        <div className="grid grid-cols-9 grid-rows-9 gap-2 w-full h-full overflow-hidden">
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
        </div>
        // </BaseLayout>
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
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-3 row-span-3 col-start-4 row-start-10 flex justify-center items-center">
                <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-3 row-span-3 col-start-7 row-start-10 flex justify-center items-center">
                <ChartSwitcher chartType="pie" />
            </div>
            <div className="bg-gray-200 col-span-3 row-span-3 col-start-10 row-start-10 flex justify-center items-center">
                {/* <ChartSwitcher chartType="line" /> */}
                <VaRGraph2 />
            </div>
        </BaseLayout>
    ),
};

export default layouts;
