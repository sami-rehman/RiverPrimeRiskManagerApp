import { useMemo, useRef, useState, useCallback } from "react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { dummyDataBbook } from "./dummyData";
import { StatusRender } from "../../grid/statusRendered";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { numberFormatter } from "../../common/constant";


const AbookWatchList = () => {
  const [rowData] = useState(dummyDataBbook);

  console.log("dummyDataBbook", dummyDataBbook);

  const gridRef = useRef(null);

  const [colDefs] = useState([
    {
      headerCheckboxSelection: true,
      checkboxSelection: true,
      maxWidth: 40,
    },
    {
      field: "rules",
      headerName: "Status",
      filter: true,
      maxWidth: 99,
      cellRenderer: StatusRender,
    },
    {
      children: [
        {
          headerName: "Date Time",
          field: "activationTime",
          filter: true,
          maxWidth: null,
          rowDrag: true,
        },
      ]
    },
    {
      headerName: "Parties",
      headerClass: "parties-group",
      children: [
        {
          field: "login",
          headerName: "Agressor",
          filter: true,
          cellRenderer: (params) => {
            // Determine the color based on the flag
            const isActive = params?.data?.rules === 'Active';
            const textColor = !isActive ? "#8ca6f3" : "#f7cf13";
            return (
              <span
                style={{ color: textColor, cursor: "pointer" }}
              >
                {params.value}
              </span>
            );
          },
        },
        {
          field: "positionId",
          headerName: "Agressor OID",
          filter: true,
          // cellRenderer: "agGroupCellRenderer",
        },
        {
          field: "positionId",
          headerName: "Broker ID",
          filter: true,
        },
        {
          field: "positionId",
          headerName: "Account @LP",
          filter: true,
        },
        {
          field: "destination",
          filter: true,
        },
      ],
    },
    {
      headerName: "Particulars of the Trade",
      headerClass: "particularsTrade-group",
      children: [
        {
          field: "rules",
          headerName: "Rules",
          filter: true,
        },
        {
          field: "prompts",
          headerName: "Prompt",
          filter: true,
        },
        {
          field: "orderId",
          headerName: "LP_Order ID",
          filter: true,
        },
        {
          field: "side",
          filter: true,
        },
        {
          field: "symbol",
          filter: true,
        },
       
        {
          field: "type",
          filter: true,
        },
        {
          field: "requestedQuantity",
          headerName: "Qty. Req.",
          filter: "agNumberColumnFilter",
          aggFunc: "sum",
        },
        {
          field: "quantityFilled",
          headerName: "Qty. Filled",
          filter: "agNumberColumnFilter",
          valueFormatter: numberFormatter,
          aggFunc: "sum",

        },
        {
          field: "quantityRemaining",
          headerName: "Qty. Left",
          filter: "agNumberColumnFilter",
          aggFunc: "sum",
        },
        {
          field: "Price",
          filter: "agNumberColumnFilter",
          valueFormatter: numberFormatter,
          aggFunc: "sum",
        },
        {
          field: "trigger_price",
          headerName: "Trigger Price",
          filter: "agNumberColumnFilter",
          valueFormatter: numberFormatter,
          aggFunc: "sum",
        },
        {
          field: "tif",
          filter: true,
        },
        {
          field: "priceSL",
          headerName: "SL",
          filter: "agNumberColumnFilter",
          valueFormatter: numberFormatter,
          aggFunc: "sum",
        },
        {
          field: "priceTP",
          headerName: "TP",
          filter: "agNumberColumnFilter",
          valueFormatter: numberFormatter,
          aggFunc: "sum",
        },
        {
          field: "Price",
          headerName: "Avg. Fill Price",
          filter: "agNumberColumnFilter",
          valueFormatter: numberFormatter,
          aggFunc: "sum",
        },
        {
          field: "profit",
          headerName: "UnPL",
          filter: "agNumberColumnFilter",
          valueFormatter: numberFormatter,
          aggFunc: "sum",
        },
        {
          field: "destination",
          filter: true,
        },
        {
          field: "currentPrice",
          headerName: "Current Price",
          filter: "agNumberColumnFilter",
          valueFormatter: numberFormatter,
          aggFunc: "sum",
        },
        { field: "fixId", headerName: "Fix ID", filter: true },
        { field: "riskManager", filter: true, },
        { field: "comments", filter: true, maxWidth: null },
      ]
    }
  ]);

  const defaultColDef = useMemo(
    () => ({
      // flex: 1,
      floatingFilter: true,
      enableRowGroup: true,
      enableValue: true,
      enablePivot: true,
      sortable: true,
      resizable: true,
      maxWidth: 120,
    }),
    []
  );

  const sideBar = {
    toolPanels: [
      {
        id: "columns",
        labelDefault: "Columns",
        toolPanel: "agColumnsToolPanel",
        labelKey: "columns",
        iconKey: "columns",
      },
      {
        id: "filters",
        labelDefault: "Filters",
        toolPanel: "agFiltersToolPanel",
        labelKey: "filters",
        iconKey: "filter",
      },
    ],
    hiddenByDefault: false, // This collapses the sidebar by default
  };

  // Function to get the child data
  // const getDetailRowData = (params) => {
  //   // If no associatedOrders, return an empty array
  //   if (
  //     params.data.associatedOrders &&
  //     params.data.associatedOrders.length > 0
  //   ) {
  //     params.successCallback(params.data.associatedOrders);
  //   } else {
  //     params.successCallback([]); // No associated orders
  //   }
  // };

  // Use the same columns as the main grid for the associatedOrders detail grid
  // const detailCellRendererParams = {
  //   detailGridOptions: {
  //     columnDefs: [
  //       { field: " ", headerName: "",  },
  //       { field: " ", headerName: "" },
  //       { field: " ", headerName: "" },
  //       { field: " ", headerName: "" },
  //       { field: "orderId", headerName: "Order ID",filter: true, },
  //       { field: "symbol", headerName: "Symbol", filter: true, },
  //       { field: "side", headerName: "Side", filter: true, },
  //       { field: "requestedQuantity", headerName: "Quantity", filter: true, },
  //       { field: "price", headerName: "Price", filter: true, },
  //       { field: "tif", headerName: "TIF", filter: true, },
  //     ],
  //     defaultColDef: {
  //       flex: 1,
  //       maxWidth: 112,
  //       resizable: true,
  //       // sortable: true,
  //       // filter: true,
  //     },
  //   },
  //   getDetailRowData: getDetailRowData,
  // };

  // const onFirstDataRendered = useCallback((params) => {
  //   setTimeout(() => {
  //     params.api.getDisplayedRowAtIndex(1).setExpanded(false);
  //   }, 0);
  // }, []);

  return (
    <div className="ag-theme-balham-dark h-full w-full">
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        rowDragManaged={true}
        rowSelection={"multiple"}
        rowGroupPanelShow={"always"}
        suppressAggFuncInHeader
        sideBar={sideBar}
        rowHeight={19}
        detailRowAutoHeight={true}
      />
    </div>
  );
};

export default AbookWatchList;
