import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const PortfolioSummary = () => {

  const columnDefs = [
    { field: "portfolio"},
    { field: "currentMonth" },
    { field: "today" },
  ];

const rowData = [
  {
    "portfolio": "A-Book P/L",
    "currentMonth": "$ 2452",
    "today": "$211",
  },
  {
    "portfolio": "B-Book P/L",
    "currentMonth": "$ 4545",
    "today": "$111",
  },
  {
    "portfolio": "C-Book P/L",
    "currentMonth": "$ 4524",
    "today": "$364",
  },
  {
    "portfolio": "Fee Revenue",
    "currentMonth": "$ 8875",
    "today": "$642",
  },
  {
    "portfolio": "Fee Expenses",
    "currentMonth": "$ 6547",
    "today": "$361",
  },
  {
    "portfolio": "Net P/L",
    "currentMonth": "$ 3245",
    "today": "$321",
  },
  {
    "portfolio": "Volumes",
    "currentMonth": "322452",
    "today": "34511",
  },
  {
    "portfolio": "RPM",
    "currentMonth": "2452",
    "today": "345",
  },

];

  const defaultColDef = {
    flex: 1,
    sortable: true,
    filter: true,
    resizable: true,
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* <h1 className="m-1 text-lg font-bold leading-none tracking-tight text-gray-400">
      Portfolio Summary
      </h1> */}
      <div className="ag-theme-balham-dark w-full h-full">
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          defaultColDef={defaultColDef}
          animateRows={true}
        />
      </div>
    </div>
  );
};

export default PortfolioSummary;
