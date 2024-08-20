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
import { numberFormatter, LocalDateTimeRenderer } from './common/constant';


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
      },
      {
        field: "b",
        headerName: "Bid",
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

const layouts = {
    LayoutOne: () => (
        <BaseLayout cols="12" rows="9">
            <div className="border border-gray-300 col-span-4 row-span-3 flex justify-center items-center p-2">
                <VaRCharts />
            </div>
            <div className="border border-gray-300 col-span-4 row-span-3 col-start-5 flex justify-center items-center p-2">
                <DepositsWithdrawalsAccountCharts />
            </div>
            <div className="border border-gray-300 col-span-4 row-span-3 col-start-9 flex justify-center items-center">
                <TradebookCharts />
            </div>
            <div className="border border-gray-300 col-span-3 row-span-3 row-start-4 flex justify-center items-center">
                <ECharts />
            </div>
            <div className="border border-gray-300 col-span-3 row-span-3 col-start-4 row-start-4 flex justify-center items-center">
            <ChartSwitcher chartType="line" />
            </div>
            <div className="bg-gray-200 col-span-3 row-span-3 col-start-7 row-start-4 flex justify-center items-center">
                <VaRCharts />
            </div>
            <div className="bg-gray-200 col-span-3 row-span-3 col-start-10 row-start-4 flex justify-center items-center">
                <ChartSwitcher chartType="bar" />
            </div>
            <div className="bg-gray-200 col-span-4 row-span-3 row-start-7 flex justify-center items-center">
            <ChartSwitcher chartType="pie" />
            </div>
            <div className="bg-gray-200 col-span-4 row-span-3 col-start-5 row-start-7 flex justify-center items-center">
                <WatchList />
            </div>
            <div className="border border-gray-300 col-span-4 row-span-3 col-start-9 row-start-7 flex justify-center items-center">
                <ECharts />
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
            <WatchListFirst WatchListFirstColDefs={WatchListFirstColDefs}/>
            </div>
        </BaseLayout>
    ),
    LayoutThree: () => (
        <BaseLayout cols="12" rows="12">
            <div className="bg-gray-200 col-span-12 row-span-6 flex justify-center items-center">
            <WatchListFirst WatchListFirstColDefs={WatchListSymbolMapColDefs}/>
            </div>
            <div className="bg-gray-200 col-span-6 row-span-6 row-start-7 flex justify-center items-center">
                {/* <PieCharts /> */}
                <WatchListFirst WatchListFirstColDefs={WatchListLTPColDefs}/>
            </div>
            <div className="bg-gray-200 col-span-6 row-span-6 col-start-7 row-start-7 flex justify-center items-center">
            <WatchListFirst WatchListFirstColDefs={WatchListFirstColDefs}/>
            </div>
        </BaseLayout>
    ),
    LayoutFour: () => (
        <BaseLayout cols="12" rows="8">
            <div className="bg-gray-200 col-span-12 row-span-4 flex justify-center items-center">
                <VaRCharts />
            </div>
            <div className="bg-gray-200 col-span-12 row-span-4 row-start-5 flex justify-center items-center">
                <HighchartsComponent />
            </div>
        </BaseLayout>
    ),
    LayoutFive: () => (
        <BaseLayout cols="12" rows="8">
            <div className="bg-gray-200 col-span-4 row-span-4 flex justify-center items-center">
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
                {/* <ChartSwitcher chartType="line" /> */}
                <WatchList />
            </div>
        </div>
        // </BaseLayout>
    ),
    LayoutSeven: () => (
        <BaseLayout cols="10" rows="8">
            <div className="bg-gray-200 col-span-4 row-span-8 flex justify-center items-center">
            <WatchListFirst/>
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
                <HighchartsComponent />
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
