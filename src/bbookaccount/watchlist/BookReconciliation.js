import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const BookReconciliation = () => {

  const columnDefs = [
    {field: "longs", },
    {field: "shorts", },
    {field: "net", },
    { field: "P&L", headerName: "P&L" },
    { field: "VWAP", headerName: "VWAP" },
    { field: "HedgeReq", headerName: "Hedge Req." },

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
      
      // Generate random values for child rows (A Book, B Book, C Book)
      let totalLongs = 0;
      let totalShorts = 0;
      const childRows = ["A Book", "B Book", "C Book"].map(bookType => {
          const longs = Math.floor(Math.random() * 2000) + 500;
          const shorts = Math.floor(Math.random() * 3000);
          const net = longs - shorts;
          const pl = Math.floor(Math.random() * 5000).toString();
          const vwap = (Math.random() * 0.2).toFixed(2);

          // Accumulate longs and shorts for the parent row
          totalLongs += longs;
          totalShorts += shorts;

          return {
              symbol: bookType,
              longs: longs,
              shorts: shorts,
              net: net > 0 ? `${Math.abs(net)} Longs` : `${Math.abs(net)} Shorts`,
              HedgeReq: "",
              "P&L": pl,
              VWAP: vwap,
              hierarchy: [parentSymbol, bookType]
          };
      });

      // Calculate parent row values
      const parentNet = totalLongs - totalShorts;
      const parentPL = Math.floor(Math.random() * 1000).toString();
      const parentVWAP = (Math.random() * 100).toFixed(2);

      // Add parent row
      rowData.push({
          symbol: parentSymbol,
          longs: totalLongs,
          shorts: totalShorts,
          net: parentNet > 0 ? `${Math.abs(parentNet)} Longs` : `${Math.abs(parentNet)} Shorts`,
          HedgeReq: "",
          "P&L": parentPL,
          VWAP: parentVWAP,
          hierarchy: [parentSymbol]
      });

      // Add child rows
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
      <h1 class="m-1 text-lg font-bold leading-none tracking-tight text-gray-400">
      Reconciliation Book
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

export default BookReconciliation;