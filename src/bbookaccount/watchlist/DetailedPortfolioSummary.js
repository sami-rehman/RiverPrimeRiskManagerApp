import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const DetailedPortfolioSummary = () => {

  const columnDefs = [
    { field: "symbol" },
    { field: "longs" },
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
      "TRYUSDT", "PLNUSDT"
    ];

    const rowData = [];

    for (let i = 0; i < numSets; i++) {
      const parentSymbol = symbols[i];

      let totalLongs = 0;
      let totalShorts = 0;
      let totalRevenue = 0;
      let totalExpense = 0;

      const childRows = ["A Book", "B Book", "C Book"].map(bookType => {
        const longs = Math.floor(Math.random() * 2000) + 500;
        const shorts = Math.floor(Math.random() * 3000);
        const net = longs - shorts;
        const pl = Math.floor(Math.random() * 5000).toString();
        const vwap = (Math.random() * 0.2).toFixed(2);
        const revenue = bookType !== "C Book" ? Math.floor(Math.random() * 3000) : null;
        const expense = Math.floor(Math.random() * 2000);

        totalLongs += longs;
        totalShorts += shorts;
        totalRevenue += revenue;
        totalExpense += expense;

        return {
          status: "",
          symbol: bookType,
          longs,
          shorts,
          net: net > 0 ? `${Math.abs(net)} Longs` : `${Math.abs(net)} Shorts`,
          revenue,
          expense,
          HedgeReq: "",
          "P&L": pl,
          VWAP: vwap,
          hierarchy: [parentSymbol, bookType]
        };
      });

      const parentNet = totalLongs - totalShorts;
      const parentPL = Math.floor(Math.random() * 1000).toString();
      const parentVWAP = (Math.random() * 100).toFixed(2);

      rowData.push({
        status: "",
        symbol: parentSymbol,
        longs: totalLongs,
        shorts: totalShorts,
        net: parentNet > 0 ? `${Math.abs(parentNet)} Longs` : `${Math.abs(parentNet)} Shorts`,
        revenue: totalRevenue,
        expense: totalExpense,
        HedgeReq: "",
        "P&L": parentPL,
        VWAP: parentVWAP,
        hierarchy: [parentSymbol]
      });

      rowData.push(...childRows);
    }

    return rowData;
  }

  const rowData = generateDataSet(40);

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
            cellRendererParams: {
              suppressCount: true,
            },
            cellRenderer: "agGroupCellRenderer",
          }}
        />
      </div>
    </div>
  );
};

export default DetailedPortfolioSummary;
