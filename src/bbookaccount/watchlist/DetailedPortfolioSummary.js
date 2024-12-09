import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const DetailedPortfolioSummary = () => {

  const columnDefs = [
    { field: "portfolio", hide: true },
    { field: "description" },
  ];

const rowData = [
  
  // A-Book
  {
      "hierarchy": [
          "A-Book"
      ]
  },
  {
      "description": "$ 5200",
      "hierarchy": [
          "A-Book",
        "Realized A-Book Markup",
      ]
  },
  {
    "description": "$ 9000",
    "hierarchy": [
        "A-Book",
        "A-Book P/L"
    ]
},

 // B-Book
{
  "hierarchy": [
      "B-Book"
  ]
},
{
  "description": "$ 5200",
  "hierarchy": [
      "B-Book",
    "Realized B-Book Principle",
  ]
},
{
"description": "$ 9000",
"hierarchy": [
    "B-Book",
    "Realized B-Book Spread"
]
},
{
  "description": "$ 500",
  "hierarchy": [
      "B-Book",
      "Un-Realized B-Book Principle"
  ]
  },


  // C-Book

  {
    "hierarchy": [
        "C-Book"
    ]
},
{
    "description": "$ 2200",
    "hierarchy": [
        "C-Book",
      "Realized C-Book",
    ]
},
{
  "description": "$ 990",
  "hierarchy": [
      "C-Book",
      "Un-Realized C-Book"
  ]
},
{
  "description": "$ 99",
  "hierarchy": [
      "C-Book",
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
    
  // Portfolio Net Profit & Loss

{
  "hierarchy": [
      "Portfolio Net Profit & Loss"
  ]
},
{
  "description": "$ 27500",
  "hierarchy": [
      "Portfolio Net Profit & Loss",
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
      Detailed Portfolio Summary
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

export default DetailedPortfolioSummary;
