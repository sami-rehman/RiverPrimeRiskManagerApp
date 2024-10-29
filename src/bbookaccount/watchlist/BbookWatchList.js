// import { useMemo, useRef, useState, useCallback, useEffect } from "react";
// import { AgGridReact } from "ag-grid-react";

// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-quartz.css";
// import { dummyDataBbook } from "./dummyData";
// import { StatusRender } from "../../grid/statusRendered";
// import {CustomDateFilter} from "../agGridFilters/CustomDateFilter";

// const BbookWatchList = () => {
//   const [rowData] = useState(dummyDataBbook);

//   console.log("dummyDataBbook", dummyDataBbook);
//   const [pinnedTopRowData, setPinnedTopRowData] = useState([]);
//   const gridRef = useRef(null);
//   const detailGridRef = useRef(null);


//   const currencyFormatter = (params) => {
//     const value = params.value;
//     if (value == null) return ""; // Handle null or undefined values

//     const absValue = Math.abs(value).toLocaleString("en-US", {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     }); // Format with commas and two decimals
//     const formattedValue = `$\u00A0${absValue}`; // Add space after $

//     return value < 0 ? `-${formattedValue}` : formattedValue;
//   };



//   const dateComparator = (filterLocalDateAtMidnight, cellValue) => {
//     if (cellValue == null) return -1;

//     // Convert cellValue ("22-10-2024 00:29:01") to Date object
//     const dateParts = cellValue.split(" ")[0].split("-");
//     const timeParts = cellValue.split(" ")[1].split(":");

//     const cellDate = new Date(
//       dateParts[2],                // Year
//       dateParts[1] - 1,            // Month (0-based index)
//       dateParts[0],                // Day
//       timeParts[0],                // Hours
//       timeParts[1],                // Minutes
//       timeParts[2]                 // Seconds
//     );

//     // Compare cell date with filter date (ignoring time)
//     return cellDate - filterLocalDateAtMidnight;
//   };


//   const [colDefs] = useState([
//     {
//       headerCheckboxSelection: true,
//       checkboxSelection: true,
//       maxWidth: 40,
//     },
//     {
//       headerName: "Status",
//       field: "rules",
//       filter: true,
//       maxWidth: 99,
//       cellRenderer: StatusRender,
//     },
//     {
//       headerName: "Date Time",
//       field: "activationTime",
//       filter: 'agDateColumnFilter',
//       filterFramework: CustomDateFilter,
//       // filter: "agDateColumnFilter",
//       // filterParams: {
//       //   comparator: dateComparator,
//       // },|
//       maxWidth: null,
//       rowDrag: true,
//       minWidth: 170,
//     },

//     {
//       headerName: "Account ID",
//       field: "login",
//       filter: true,
//       hide: true,
//       cellRenderer: (params) => {
//         // Determine the color based on the flag
//         const isActive = params?.data?.rules === "Active";
//         const textColor = !isActive ? "#8ca6f3" : "#f7cf13";
//         return (
//           <span style={{ color: textColor, cursor: "pointer" }}>
//             {params.value}
//           </span>
//         );
//       },
//     },
//     {
//       headerName: "Position ID",
//       field: "positionId",
//       filter: true,
//       cellRenderer: "agGroupCellRenderer",
//       hide: true,
//     },
//     {
//       field: "side",
//       filter: true,
//       cellRenderer: "agGroupCellRenderer",
//     },
//     {
//       field: "requestedQuantity",
//       headerName: "Qty. Req.",
//       filter: "agNumberColumnFilter",
//     },
//     {
//       field: "symbol",
//       filter: "agTextColumnFilter",
//     },
//     {
//       field: "type",
//       filter: true,
//     },
//     {
//       field: "Price",
//       filter: "agNumberColumnFilter",
//       valueFormatter: currencyFormatter,
//     },
//     {
//       field: "priceTP",
//       headerName: "TP",
//       filter: "agNumberColumnFilter",
//       valueFormatter: currencyFormatter,
//     },
//     {
//       field: "priceSL",
//       headerName: "SL",
//       filter: "agNumberColumnFilter",
//       valueFormatter: currencyFormatter,
//     },
//     {
//       field: "quantityFilled",
//       headerName: "Qty. Filled",
//       filter: "agNumberColumnFilter",
//       hide: true,
//     },
//     {
//       field: "quantityRemaining",
//       headerName: "Qty. Left",
//       filter: "agNumberColumnFilter",
//       hide: true,
//     },
//     {
//       field: "trigger_price",
//       headerName: "Trigger Price",
//       filter: "agNumberColumnFilter",
//       valueFormatter: currencyFormatter,
//       hide: true
//     },
//     {
//       field: "tif",
//       filter: true,
//     },
//     {
//       field: "orderId",
//       headerName: "Order ID",
//       cellRenderer: "agGroupCellRenderer",
//       filter: true,
//       hide: true,
//     },
//     {
//       field: "Price",
//       headerName: "Avg. Fill Price",
//       filter: "agNumberColumnFilter",
//       valueFormatter: currencyFormatter,
//     },
//     {
//       field: "profit",
//       headerName: "UnPL",
//       filter: "agNumberColumnFilter",
//       valueFormatter: currencyFormatter,
//     },
//     {
//       field: "destination",
//       filter: "agTextColumnFilter",
//       hide:true,
//     },
//     {
//       field: "currentPrice",
//       // headerName: "Current Price",
//       filter: "agNumberColumnFilter",
//       valueFormatter: currencyFormatter,
//     },
//     { field: "fixId", headerName: "Fix ID", filter: true },
//     { field: "comments", filter: "agTextColumnFilter", maxWidth: null },
//   ]);

//   const defaultColDef = useMemo(
//     () => ({
//       // flex: 1,
//       floatingFilter: true,
//       enableRowGroup: true,
//       enableValue: true,
//       enablePivot: true,
//       sortable: true,
//       resizable: true,
//       // maxWidth: 115,
//     }),
//     []
//   );

//   const sideBar = {
//     toolPanels: [
//       {
//         id: "columns",
//         labelDefault: "Columns",
//         toolPanel: "agColumnsToolPanel",
//         labelKey: "columns",
//         iconKey: "columns",
//       },
//       {
//         id: "filters",
//         labelDefault: "Filters",
//         toolPanel: "agFiltersToolPanel",
//         labelKey: "filters",
//         iconKey: "filter",
//       },
//     ],
//     hiddenByDefault: false,
//   };

//   const getSummaryRow = (data) => {
//     // Summing up required fields for the top summary row
//     const summary = data.reduce(
//       (acc, row) => {
//         acc.requestedQuantity += row.requestedQuantity || 0;
//         acc.quantityFilled += row.quantityFilled || 0;
//         acc.quantityRemaining += row.quantityRemaining || 0;
//         acc.Price += row.Price || 0;
//         acc.trigger_price += row.trigger_price || 0;
//         acc.priceSL += row.priceSL || 0;
//         acc.priceTP += row.priceTP || 0;
//         acc.profit += row.profit || 0;
//         acc.currentPrice += row.currentPrice || 0;
//         return acc;
//       },
//       {
//         requestedQuantity: 0,
//         quantityFilled: 0,
//         quantityRemaining: 0,
//         Price: 0,
//         trigger_price: 0,
//         priceSL: 0,
//         priceTP: 0,
//         profit: 0,
//         currentPrice: 0,
//       }
//     );

//     // Setting "Summary" for the rules field and leaving others blank
//     return [
//       {
//         rules: "Summary",
//         requestedQuantity: summary.requestedQuantity,
//         quantityFilled: summary.quantityFilled,
//         quantityRemaining: summary.quantityRemaining,
//         // Other fields can be left as undefined or null to keep them blank
//         Price: null,
//         profit: null,
//         trigger_price: null,
//         priceSL: null,
//         priceTP: null,
//         orderId: null,
//         symbol: null,
//         side: null,
//         type: null,
//         destination: null,
//         currentPrice: null,
//         fixId: null,
//         comments: null,
//       },
//     ];
//   };

//   // Function to get the child data
//   // const getDetailRowData = (params) => {
//   //   // If no associatedOrders, return an empty array
//   //   if (
//   //     params.data.associatedOrders &&
//   //     params.data.associatedOrders.length > 0
//   //   ) {
//   //     params.successCallback(params.data.associatedOrders);
//   //   } else {
//   //     params.successCallback([]); // No associated orders
//   //   }
//   // };

//   const getDetailRowData = (params) => {
//     params.successCallback(params.data.associatedOrders || []);
//   };

//   // Use the same columns as the main grid for the associatedOrders detail grid
//   const detailCellRendererParams = {
//     detailGridOptions: {
//       columnDefs: colDefs,
//       // columnDefs: [
//       //   { field: " ", headerName: "" },
//       //   { field: " ", headerName: "" },
//       //   { field: " ", headerName: "" },
//       //   { field: " ", headerName: "" },
//       //   { field: "orderId", headerName: "Order ID", filter: true },
//       //   { field: "symbol", headerName: "Symbol", filter: true },
//       //   { field: "side", headerName: "Side", filter: true },
//       //   { field: "requestedQuantity", headerName: "Quantity", filter: true },
//       //   { field: "price", headerName: "Price", filter: true },
//       //   { field: "tif", headerName: "TIF", filter: true },
//       // ],
//       // defaultColDef: {
//       //   // flex: 1,
//       //   // maxWidth: 115,
//       //   // resizable: true,
//       //   // sortable: true,
//       //   // filter: true,
//       // },
//       defaultColDef: defaultColDef,
//     },
//     getDetailRowData: getDetailRowData,
//   };

//   // const onColumnMoved = useCallback(() => {
//   //   const mainGridOrder = gridRef?.current?.api?.getColumnDefs();
//   //   detailGridRef?.current?.api?.setColumnDefs(mainGridOrder);
//   // }, []);

//   const onColumnMoved = useCallback(() => {
//     const newColDefs = gridRef?.current?.api?.getColumnDefs();
//     if (detailGridRef?.current && detailGridRef?.current?.api) {
//       detailGridRef?.current?.api.setColumnDefs(newColDefs); // Update detail grid column definitions
//     }
//   }, []);

//   useEffect(() => {
//     // Set pinned top row data
//     setPinnedTopRowData(getSummaryRow(rowData));
//   }, [rowData]);

//   const onFirstDataRendered = useCallback((params) => {
//     setTimeout(() => {
//       params.api.getDisplayedRowAtIndex(1).setExpanded(false);
//     }, 0);
//   }, []);

//   // Add custom styling for the pinned top row
//   const getRowStyle = (params) => {
//     if (params.node.rowPinned === "top") {
//       return { backgroundColor: "#2B908F" }; // Top row background
//     }
//     return null;
//   };

//   return (
//     <div className="ag-theme-balham-dark h-full w-full">
//       <AgGridReact
//         ref={gridRef}
//         rowData={rowData}
//         columnDefs={colDefs}
//         defaultColDef={defaultColDef}
//         rowDragManaged={true}
//         rowSelection={"multiple"}
//         rowGroupPanelShow={"always"}
//         suppressAggFuncInHeader
//         // groupDefaultExpanded={1} // Ensure rows are collapsed by default
//         masterDetail={true} // Enable Master-Detail
//         detailCellRendererParams={detailCellRendererParams} // Reuse column headers
//         // detailCellRendererParams={{ ...detailCellRendererParams, ref: detailGridRef }}

//         sideBar={sideBar}
//         rowHeight={19}
//         getRowStyle={getRowStyle} // Apply custom row style
//         pinnedTopRowData={pinnedTopRowData} // Adds the top summary row
//         detailRowAutoHeight={true}
//         onFirstDataRendered={onFirstDataRendered}
//         // groupTotalRow= {'top'}
//         onColumnMoved={onColumnMoved}

//       />
//     </div>
//   );
// };

// export default BbookWatchList;




import React, { useMemo, useRef, useState, useCallback, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { dummyDataBbook } from "./dummyData";
import { StatusRender } from "../../grid/statusRendered";
import { CustomDateFilter } from "../agGridFilters/CustomDateFilter";
import { DateRangePicker } from 'react-date-range';
import { addYears } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { QuantityRequested } from "../../grid/QuantityRequested";

const BbookWatchList = () => {

  const [activeButton, setActiveButton] = useState('Live');
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addYears(new Date(), 1), // Adds 1 year to the current date
      key: 'selection',
    },
  ]);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const [rowData] = useState(dummyDataBbook);
  const [pinnedTopRowData, setPinnedTopRowData] = useState([]);
  const gridRef = useRef(null);

  const currencyFormatter = (params) => {
    const value = params.value;
    if (value == null) return "";
    const absValue = Math.abs(value).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const formattedValue = `$\u00A0${absValue}`;
    return value < 0 ? `-${formattedValue}` : formattedValue;
  };

  const colDefs = useMemo(() => [
    { headerCheckboxSelection: true, checkboxSelection: true, maxWidth: 40 },
    { headerName: "Status", field: "rules", filter: true, minWidth: 99, cellRenderer: StatusRender },
    { headerName: "MT Submit", field: "activationTime", filter: "agDateColumnFilter", filterFramework: CustomDateFilter, minWidth: 185, rowDrag: true },
    { headerName: "MT Execution", field: "activationTime", filter: "agDateColumnFilter", filterFramework: CustomDateFilter, minWidth: 185, },
    { headerName: "Account ID", field: "login", filter: true, hide: true, cellRenderer: (params) => <span style={{ color: params?.data?.rules === "Active" ? "#FFBF00" : "#8ca6f3" }}>{params.value}</span> },
    { headerName: "Position ID", field: "positionId", filter: true, cellRenderer: "agGroupCellRenderer", hide: true },
    { field: "side", filter: true, cellRenderer: "agGroupCellRenderer" },
    { field: "requestedQuantity", headerName: "Qty. Req.", filter: "agNumberColumnFilter", cellRenderer: QuantityRequested },
    { field: "symbol", filter: "agTextColumnFilter" },
    { field: "type", filter: true },
    { field: "Price", filter: "agNumberColumnFilter", valueFormatter: currencyFormatter },
    { field: "priceTP", headerName: "TP", filter: "agNumberColumnFilter", valueFormatter: currencyFormatter },
    { field: "priceSL", headerName: "SL", filter: "agNumberColumnFilter", valueFormatter: currencyFormatter },
    { field: "quantityFilled", headerName: "Qty. Filled", filter: "agNumberColumnFilter", hide: true },
    { field: "quantityRemaining", headerName: "Qty. Left", filter: "agNumberColumnFilter", hide: true },
    { field: "trigger_price", headerName: "Trigger Price", filter: "agNumberColumnFilter", valueFormatter: currencyFormatter, hide: true },
    { field: "tif", filter: true, hide:true },
    { field: "orderId", headerName: "Order ID", cellRenderer: "agGroupCellRenderer", filter: true, hide: true },
    { field: "Price", headerName: "Avg. Fill Price", filter: "agNumberColumnFilter", valueFormatter: currencyFormatter },
    { field: "profit", headerName: "UnPL", filter: "agNumberColumnFilter", valueFormatter: currencyFormatter },
    { field: "destination", filter: "agTextColumnFilter", hide: true },
    { headerName: "LP Submit", field: "activationTime", filter: "agDateColumnFilter", filterFramework: CustomDateFilter, minWidth: 185, hide:true },
    { headerName: "LP Execution", field: "activationTime", filter: "agDateColumnFilter", filterFramework: CustomDateFilter, minWidth: 185, hide: true },
    { field: "currentPrice", filter: "agNumberColumnFilter", valueFormatter: currencyFormatter },
    { field: "fixId", headerName: "Fix ID", filter: true },
    { field: "comments", filter: "agTextColumnFilter" },
  ], []);

  const defaultColDef = useMemo(() => ({
    flex: 1,
    floatingFilter: true,
    enableRowGroup: true,
    enableValue: true,
    enablePivot: true,
    sortable: true,
    resizable: true,
  }), []);

  const getSummaryRow = (data) => {
    const summary = data.reduce((acc, row) => {
      acc.requestedQuantity += row.requestedQuantity || 0;
      acc.quantityFilled += row.quantityFilled || 0;
      acc.quantityRemaining += row.quantityRemaining || 0;
      return acc;
    }, { requestedQuantity: 0, quantityFilled: 0, quantityRemaining: 0 });
    return [{ rules: "Summary", ...summary }];
  };

  const getDetailRowData = (params) => {
    params.successCallback(params.data.associatedOrders || []);
  };

    // Create a new column definition excluding filters for detail grid
    const detailColDefs = useMemo(() => {
      return colDefs.map(col => ({ ...col, filter: false })); // Remove filters from detail grid columns
    }, [colDefs]);

  const detailCellRendererParams = useMemo(() => ({
    detailGridOptions: {
      columnDefs: detailColDefs,
      defaultColDef: {...defaultColDef, floatingFilter: false, filter: false },
    },
    getDetailRowData: getDetailRowData,
  }), [detailColDefs, defaultColDef]);

  const onFirstDataRendered = useCallback((params) => {
    setTimeout(() => {
      params.api.getDisplayedRowAtIndex(1).setExpanded(false);
    }, 0);
  }, []);

  const onColumnMoved = useCallback(() => {
    // Force update the detail grid when columns are moved
    const newColDefs = gridRef.current.api.getColumnDefs();

       // Update the detail grid column definitions without filters
       const newDetailColDefs = newColDefs.map(col => ({ ...col, floatingFilter: false, filter: false }));
       detailCellRendererParams.detailGridOptions.columnDefs = newDetailColDefs;

    // Force refresh of all detail grids
    gridRef.current.api.forEachNode((node) => {
      if (node.detail) {
        node.setData(node.data); // Refresh the data for the detail grid
        node.setExpanded(true); // Re-expand the node to refresh the detail grid
      }
    });
  }, [detailCellRendererParams]);

  useEffect(() => {
    setPinnedTopRowData(getSummaryRow(rowData));
  }, [rowData]);

  const getRowStyle = (params) => (params.node.rowPinned === "top" ? { backgroundColor: "#2B908F" } : null);

  return (
    <div>
<div className="flex flex-col items-center space-y-4">
      <div className="flex space-x-4">
        {['Live', 'Pending', 'Closed', 'Rejected'].map((button) => (
          <button
            key={button}
            className={`px-4 py-2 rounded text-white ${
              activeButton === button
                ? 'bg-blue-600'
                : 'bg-gray-500 hover:bg-gray-600'
            }`}
            onClick={() => handleButtonClick(button)}
          >
            {button}
          </button>
        ))}
      </div>

      <div className="w-80">
        <DateRangePicker
          ranges={dateRange}
          onChange={handleSelect}
          disabled={activeButton === 'Live'}
          className={`${
            activeButton === 'Live' ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        />
      </div>

      <div className="text-lg font-semibold">
        Active Button: <span className="text-blue-600">{activeButton}</span>
      </div>
    </div>



    
    <div className="ag-theme-balham-dark h-full w-full">
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        rowDragManaged={true}
        rowSelection={"multiple"}
        rowGroupPanelShow={"always"}
        masterDetail={true}
        detailRowAutoHeight={true}
        detailCellRendererParams={detailCellRendererParams}
        sideBar={{
          toolPanels: [
            { id: "columns", labelDefault: "Columns", toolPanel: "agColumnsToolPanel" },
            { id: "filters", labelDefault: "Filters", toolPanel: "agFiltersToolPanel" },
          ],
          hiddenByDefault: false,
        }}
        rowHeight={19}
        getRowStyle={getRowStyle}
        pinnedTopRowData={pinnedTopRowData}
        onFirstDataRendered={onFirstDataRendered}
        onColumnMoved={onColumnMoved} // Listen for column moved event
      />
    </div>
    </div>
  );
};

export default BbookWatchList;
