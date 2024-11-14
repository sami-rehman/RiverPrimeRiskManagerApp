import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

const BookReconciliation = () => {

  const columnDefs = [
    { field: "status", pinned: "left", maxWidth: 100 },
    {
      headerName: "Portfolio Profit/Loss",
      children: [
        { field: "rpl", headerName: "R. PnL" },
        { field: "unpl", headerName: "UnPnL" },
        { field: "netPL", headerName: "P/L" },
      ]
    },
    { field: "currentPrice", },
    { field: "longs", hide: true },
    { field: "shorts", hide: true },
    { field: "net" },
    {
      headerName: "Required Hedge",
      children: [
        { field: "pl", headerName: "@P. Low" },
        { field: "curr", headerName: "@Current Price" },
        { field: "ph", headerName: "@P. High" },
      ]
    },

    {
      headerName: "Revenue",
      children: [
        { field: "commissionRevenue", headerName: "Comm.", hide: true },
        { field: "swapsRevenue", headerName: "Swaps", hide: true },
        { field: "markupRevenue", headerName: "Markups/Spread", hide: true }
      ]
    },
    {
      headerName: "Expense",
      children: [
        { field: "commissionRevenue", headerName: "Comm.", hide: true },
        { field: "swapsRevenue", headerName: "Swaps (-)", hide: true },
        { field: "swapsRevenue", headerName: "Spread", hide: true }
      ]
    },
    { field: "VWAP", headerName: "VWAP" },
    { field: "volume", headerName: "Vol. Closed", hide: true},
  ];

  function generateDataSet(numSets) {
    const symbols = [
      "EuroUSD", "ZNUSD", "GBPUSD", "USDJPY", "AUDUSD",
      "NZDUSD", "USDCAD", "EURJPY", "GBPJPY", "CHFUSD",
      "SGDUSD", "HKDUSD", "MXNUSD", "SEKUSD", "NOKUSD",
      "ZARUSD", "TRYUSD", "PLNUSD", "CZKUSD", "HUFUSD",
      "EuroUSD.", "ZNUSD.", "GBPUSD.", "USDJPY.", "AUDUSD.",
      "NZDUSD.", "USDCAD", "EURJPY.", "GBPJPY.", "CHFUSD",
      "SGDUSD.", "HKDUSD.", "MXNUSD.", "SEKUSD.", "NOKUSD.",
      "TRYUSDT", "PLNUSDT",
      "NZDUD.", "USDAD", "EUJPY.", "GBJPY.", "CHFSD",
      "SGDSD.", "HKUSD.", "MXNUSD.", "SEKSD.", "NOKSD.",
      "TRYSDT", "PLNUDT"
    ];

    const rowData = [];

    for (let i = 0; i < numSets; i++) {
      const parentSymbol = symbols[i];

      let totalLongs = 0;
      let totalShorts = 0;
      let totalRevenue = 0;
      let totalExpense = 0;
      let totalCommissionRevenue = 0;
      let totalSwapsRevenue = 0;
      let totalMarkupRevenue = 0;
      let totalRpl = 0;
      let totalUnpl = 0;
      let totalVolume = 0;

      const childRows = ["A Book", "B Book", "C Book"].map(bookType => {
        const longs = Math.floor(Math.random() * 2000) + 500;
        const shorts = Math.floor(Math.random() * 3000);
        const net = longs - shorts;
        const pl = Math.floor(Math.random() * 5000).toString();
        const vwap = (Math.random() * 0.2).toFixed(2);
        const revenue = bookType !== "C Book" ? Math.floor(Math.random() * 3000) : null;
        const commissionRevenue = bookType === "B Book" ? Math.floor(Math.random() * 1000) : null;
        const swapsRevenue = Math.floor(Math.random() * 100)
        const expense = Math.floor(Math.random() * 2000);
        const markupRevenue = Math.floor(Math.random() * 500);
        const rpl = Math.floor(Math.random() * 200);
        const unpl = Math.floor(Math.random() * 150);
        const netPL = rpl - unpl;
        const volume = Math.floor(Math.random() * 1000000);


        totalLongs += longs;
        totalShorts += shorts;
        totalRevenue += revenue;
        totalExpense += expense;
        totalCommissionRevenue += commissionRevenue;
        totalSwapsRevenue += swapsRevenue;
        totalMarkupRevenue += markupRevenue;
        totalRpl += rpl;
        totalUnpl += unpl;
        totalVolume += volume;

        return {
          status: "",
          symbol: bookType,
          longs,
          shorts,
          net: net > 0 ? `${Math.abs(net)} Longs` : `${Math.abs(net)} Shorts`,
          commissionRevenue,
          swapsRevenue,
          markupRevenue,
          revenue,
          expense,
          "P&L": pl,
          rpl,
          unpl,
          netPL,
          VWAP: vwap,
          volume,
          hierarchy: [parentSymbol, bookType]
        };
      });

      const parentNet = totalLongs - totalShorts;
      const parentNetPL = totalRpl - totalUnpl;
      const parentPL = Math.floor(Math.random() * 1000).toString();
      const parentVWAP = (Math.random() * 100).toFixed(2);
      const currentPrice = `$ ${Math.floor(Math.random() * 1500)}`;
      rowData.push({
        status: "",
        symbol: parentSymbol,
        longs: totalLongs,
        shorts: totalShorts,
        net: parentNet > 0 ? `${Math.abs(parentNet)} Longs` : `${Math.abs(parentNet)} Shorts`,
        pl: Math.floor(Math.random() * 500),
        curr: Math.floor(Math.random() * 850),
        ph: Math.floor(Math.random() * 800) - 15,
        commissionRevenue: totalCommissionRevenue,
        swapsRevenue: totalSwapsRevenue,
        markupRevenue: totalMarkupRevenue,
        rpl: totalRpl,
        unpl: totalUnpl,
        netPL: parentNetPL,
        revenue: totalRevenue,
        expense: totalExpense,
        currentPrice,
        "P&L": parentPL,
        VWAP: parentVWAP,
        volume:totalVolume,
        hierarchy: [parentSymbol]
      });

      rowData.push(...childRows);
    }

    return rowData;
  }

  const rowData = generateDataSet(42);

  console.log('rowData', rowData)

  const defaultColDef = {
    flex: 1,
    sortable: true,
    filter: true,
    resizable: true,
  };

  return (
    <div className="flex flex-col h-full w-full">
      <h1 className="m-1 text-lg font-bold leading-none tracking-tight text-gray-400">
        Books Reconciliation
      </h1>
      <div className="ag-theme-balham-dark w-full h-full">
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          defaultColDef={defaultColDef}
          treeData={true}
          animateRows={true}
          groupDefaultExpanded={0}
          getDataPath={(data) => data.hierarchy}
          autoGroupColumnDef={{
            headerName: "Symbols",
            minWidth: 120,
            cellRendererParams: {
              suppressCount: true,
            },
            cellRenderer: "agGroupCellRenderer",
          }}
          sideBar={{
            toolPanels: [
              {
                id: "columns",
                labelDefault: "Columns",
                toolPanel: "agColumnsToolPanel",
              },
              {
                id: "filters",
                labelDefault: "Filters",
                toolPanel: "agFiltersToolPanel",
              },
            ],
            hiddenByDefault: false,
          }}
          rowHeight={19}
        />
      </div>
    </div>
  );
};

export default BookReconciliation;
