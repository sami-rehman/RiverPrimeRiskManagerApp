import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const InstrumentSummary = () => {

  const columnDefs = [
    { field: "portfolio", hide: true },
    { field: "description" },
  ];

const rowData = [
  
  // A-Book P/L
  {
      "hierarchy": [
          "A-Book P/L"
      ]
  },
  {
      "description": "$ 5200",
      "hierarchy": [
          "A-Book P/L",
        "Realized A-Book Markup",
      ]
  },
  {
    "description": "$ 9000",
    "hierarchy": [
        "A-Book P/L",
        "A-Book P/L"
    ]
},

 // B-Book P/L
{
  "hierarchy": [
      "B-Book P/L"
  ]
},
{
  "description": "$ 5200",
  "hierarchy": [
      "B-Book P/L",
    "Realized B-Book Principle",
  ]
},
{
"description": "$ 9000",
"hierarchy": [
    "B-Book P/L",
    "Realized B-Book Spread"
]
},
{
  "description": "$ 500",
  "hierarchy": [
      "B-Book P/L",
      "Un-Realized B-Book Principle"
  ]
  },


  // C-Book P/L

  {
    "hierarchy": [
        "C-Book P/L"
    ]
},
{
    "description": "$ 2200",
    "hierarchy": [
        "C-Book P/L",
      "Realized C-Book",
    ]
},
{
  "description": "$ 990",
  "hierarchy": [
      "C-Book P/L",
      "Un-Realized C-Book"
  ]
},
{
  "description": "$ 99",
  "hierarchy": [
      "C-Book P/L",
      "C-Book P/L"
  ]
},

// Revenue & Expenses

{
  "hierarchy": [
      "Revenues & Expenses"
  ]
},
{
  "description": "$ 2200",
  "hierarchy": [
      "Revenues & Expenses",
    "Commission Revenue",
  ]
},
{
"description": "$ 99250",
"hierarchy": [
    "Revenues & Expenses",
    "Swaps Revenue"
]
},
{
"description": "$ 92549",
"hierarchy": [
    "Revenues & Expenses",
    "Fee Revenue"
]
},
{
  "description": "$ 5248",
  "hierarchy": [
      "Revenues & Expenses",
      "Commission & Pip Rebates"
  ]
  },
  {
    "description": "$ 2199",
    "hierarchy": [
        "Revenues & Expenses",
        "Fee Expense"
    ]
    },
    
  // Instrument Net Profit & Loss

{
  "hierarchy": [
      "Instrument Net Profit & Loss"
  ]
},
{
  "description": "$ 27500",
  "hierarchy": [
      "Instrument Net Profit & Loss",
    "Net P/L",
  ]
},

  // Volumes

  {
    "hierarchy": [
        "Volumes"
    ]
  },
  {
    "description": "8750245",
    "hierarchy": [
        "Volumes",
      "Closed Volume (Contracts)",
    ]
  },
  {
    "description": "28562585",
    "hierarchy": [
        "Volumes",
      "Closed Volume (Notional)",
    ]
  },
  {
    "description": "43588",
    "hierarchy": [
        "Volumes",
      "Revenue PM",
    ]
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
      Instrument Summary
      </h1> */}
      <div className="ag-theme-balham-dark w-full h-full">
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          defaultColDef={defaultColDef}
          treeData={true}
          animateRows={true}
          groupDefaultExpanded={-1}
          getDataPath={(data) => data.hierarchy}
          autoGroupColumnDef={{
            headerName: "Portfolio",
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

export default InstrumentSummary;
