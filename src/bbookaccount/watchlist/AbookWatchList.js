
import React, {
  useMemo,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { dummyDataBbook } from "./dummyData";
import { StatusRender } from "../../grid/statusRendered";
import { QuantityRequested } from "../../grid/QuantityRequested";
import { dateComparator } from "../../common/constant";
import { numberFormatter } from "../../common/constant";

const AbookWatchList = () => {

  const [selectedStatus, setSelectedStatus] = useState('Live');
  const [selectedDate, setSelectedDate] = useState('Today');
  const [isBroker, setIsBroker] = useState(false);

  const statuses = ['Live', 'Pending', 'Closed', 'Rejected'];
  const dateOptions = ['Today', 'Yesterday', 'This Week', 'Last Week', 'This Month', 'Last Month', '3 Months', '6 Months', '12 Months'];

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



  const baseColDefs = useMemo(
    () => [

      {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        maxWidth: 40,
      },
      {
        field: "rules",
        headerName: "Status",
        headerClass: "parties-group",
        filter: true,
        maxWidth: 99,
        cellRenderer: StatusRender,
      },
      {
        headerName: "Timestamp (LP)",
        children: [
          {
            headerName: "LP Submit",
            floatingFilter: false,
            // field: "liveTimestamp",
            field: selectedStatus !== 'Live' ? 'liveTimestamp' : 'activationTime',
            filter: "agDateColumnFilter",
            filterParams: {
              comparator: dateComparator,
            },
            minWidth: 185,
            rowDrag: true,
            colId: "lpSubmit", // Add unique identifier
          },
          {
            headerName: "LP Execution",
            floatingFilter: false,
            // field: "activationTime",
            field: selectedStatus !== 'Live' ? 'liveTimestamp' : 'activationTime',
            filter: "agDateColumnFilter",
            filterParams: {
              comparator: dateComparator,
            },
            minWidth: 160,
            colId: "lpExecution",

          },
          {
            headerName: "Date",
            field: "liveTimestamp",
            filter: "agDateColumnFilter",
            filterParams: {
              comparator: dateComparator,
            },
            minWidth: 160,
            hide: true,
            colId: "date", // Add unique identifier
          },
        ]
      },
      {
        headerName: "Agressor (MT)",
        headerClass: "parties-group",
        children: [
          {
            field: "login",
            headerName: "Login",
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
            maxWidth:85
          },
          {
            field: "positionId",
            headerName: "OID",
            filter: true,
            // cellRenderer: "agGroupCellRenderer",
            maxWidth:85
          },
          {
            field: "positionId",
            headerName: "Deal ID",
            filter: true,
            // cellRenderer: "agGroupCellRenderer",
            maxWidth:85,
            hide: !selectedStatus==='Closed'
          },
          {
            headerName: 'Destination',
            field: "destination",
            filter: true,
            maxWidth:110
          },
        ]
      },
      {
        headerName: "Counterparty (LP)",
        // headerClass: "parties-group",
        children: [
          {
            field: "positionId",
            headerName: "Broker ID",
            filter: true,
            maxWidth:99
          },
          {
            field: "positionId",
            headerName: "Account",
            filter: true,
            maxWidth:99
          },
          {
            headerName: 'Destination',
            field: "destination",
            filter: true,
            maxWidth:110
          },
        ],
      },
      {
        headerName: "Particulars of the Trade",
        headerClass: "particularsTrade-group",
        children: [
          {
            field: selectedStatus === 'Live' ? 'liveType' : (selectedStatus === 'Pending' ? 'pendingType' : 'type'),
            headerName: "Type",
            filter: true,
            maxWidth: 90
          },
          {
            field: "rules",
            headerName: "Rules",
            filter: true,
            hide:true
          },
          {
            field: "prompts",
            headerName: "Prompt",
            filter: true,
            maxWidth:90
          },
          {
            field: "orderId",
            headerName: "LP Order ID",
            filter: true,
            maxWidth:110
          },
          {
            field: "side",
            filter: true,
            maxWidth:80
          },
          {
            field: "requestedQuantity",
            headerName: "Qty. Req.",
            cellRenderer: QuantityRequested,
            filter: "agNumberColumnFilter",
            aggFunc: "sum",
            // maxWidth:99
          },
          {
            field: "symbol",
            filter: true,
            maxWidth:90
          },
          {
            field: "quantityFilled",
            headerName: "Qty. Filled",
            filter: "agNumberColumnFilter",
            valueFormatter: numberFormatter,
            hide: true,
            aggFunc: "sum",
            // maxWidth:120

          },
          {
            field: "quantityRemaining",
            headerName: "Qty. Left",
            filter: "agNumberColumnFilter",
            hide: true,
            aggFunc: "sum",
          },
          {
            field: "Price",
            filter: "agNumberColumnFilter",
            valueFormatter: currencyFormatter,
            aggFunc: "sum",
            maxWidth:120
          },
          {
            field: "trigger_price",
            headerName: "Trigger Price",
            filter: "agNumberColumnFilter",
            valueFormatter: currencyFormatter,
            aggFunc: "sum",
            hide: true,
            maxWidth:120
          },
          {
            field: "tif",
            filter: true,
            hide: true
          },
          {
            field: "priceSL",
            headerName: "SL",
            filter: "agNumberColumnFilter",
            valueFormatter: currencyFormatter,
            aggFunc: "sum",
            hide: true
          },
          {
            field: "priceTP",
            headerName: "TP",
            filter: "agNumberColumnFilter",
            valueFormatter: currencyFormatter,
            aggFunc: "sum",
            hide: true
          },
          {
            field: "Price",
            headerName: "Avg. Fill Price",
            filter: "agNumberColumnFilter",
            valueFormatter: currencyFormatter,
            aggFunc: "sum",
            maxWidth:120
          },
          {
            field: "currentPrice",
            headerName: "Realized PnL",
            filter: "agNumberColumnFilter",
            valueFormatter: currencyFormatter,
            aggFunc: "sum",
            maxWidth:125
          },
          {
            field: "profit",
            headerName: "UnPL",
            filter: "agNumberColumnFilter",
            valueFormatter: currencyFormatter,
            aggFunc: "sum",
            maxWidth:120
          },
          {
            field: "currentPrice",
            headerName: "Current Price",
            filter: "agNumberColumnFilter",
            valueFormatter: currencyFormatter,
            aggFunc: "sum",
            maxWidth:120
          },
          { field: "fixId", headerName: "Fix ID", filter: true, maxWidth:120 },
          { field: "riskManager", filter: true, hide: true },
          {
            field: "comments",
            headerName: "Reason",
            hide: true,
          },
          { field: "comments", filter: true, maxWidth: null },
        ]
      }
    ],
    [selectedStatus]
  );

  const [colDefs, setColDefs] = useState(baseColDefs);


  // useEffect(() => {
  //   const updatedColDefs = baseColDefs.map((col) => {
  //     if (col.children) {
  //       return {
  //         ...col,
  //         children: col.children.map((child) => {
  //           if (child.colId === "lpSubmit" || child.colId === "lpExecution") {
  //             return { ...child, hide: selectedStatus === "Closed" || selectedStatus === "Rejected" };
  //           }
  //           if (child.colId === "date") {
  //             return { ...child, hide: !(selectedStatus === "Closed" || selectedStatus === "Rejected") };
  //           }
  //           return child;
  //         })
  //       };
  //     }
  //     return col;
  //   });
  //   setColDefs(updatedColDefs);
  // }, [selectedStatus, baseColDefs]);


  useEffect(() => {
    const updatedColDefs = baseColDefs.map((col) => {
      if (col.children) {
        return {
          ...col,
          children: col.children.map((child) => {
            // Hide or show LP Submit, LP Execution, and Date columns based on status
            if (child.colId === "lpSubmit" || child.colId === "lpExecution") {
              return { ...child, hide: selectedStatus === "Closed" || selectedStatus === "Rejected" };
            }
            if (child.colId === "date") {
              return { ...child, hide: !(selectedStatus === "Closed" || selectedStatus === "Rejected") };
            }
            // Handle Type column options based on selectedStatus
            if (child.field === "type") {
              if (selectedStatus === "Live") {
                return { ...child, hide: false, cellEditorParams: { values: ["Market"] } };
              } else if (selectedStatus === "Pending") {
                return { ...child, hide: false, cellEditorParams: { values: ["Limit", "Stop"] } };
              } else if (selectedStatus === "Closed") {
                return { ...child };
              } else if (selectedStatus === "Rejected") {
                return { ...child };
              }
            }
            // Show Reason column only if status is Rejected
            if (child.headerName === "Reason" && selectedStatus === "Rejected") {
              return { ...child, hide: false };
            }
            return child;
          })
        };
      }
      return col;
    });
    setColDefs(updatedColDefs);
  }, [selectedStatus, baseColDefs]);



  const defaultColDef = useMemo(
    () => ({
      // flex: 1,
      floatingFilter: true,
      enableRowGroup: true,
      enableValue: true,
      enablePivot: true,
      sortable: true,
      resizable: true,
      cellClassRules: {
        "ag-strikethrough": params => (selectedStatus === 'Pending') ? params?.data?.rules === "Active" : false,
    }
    }),
    [selectedStatus]
  );

  const getSummaryRow = (data) => {
    const summary = data.reduce(
      (acc, row) => {
        acc.requestedQuantity += row.requestedQuantity || 0;
        acc.quantityFilled += row.quantityFilled || 0;
        acc.quantityRemaining += row.quantityRemaining || 0;
        return acc;
      },
      { requestedQuantity: 0, quantityFilled: 0, quantityRemaining: 0 }
    );
    return [{ rules: "Summary", ...summary }];
  };

  const getDetailRowData = (params) => {
    params.successCallback(params.data.associatedOrders || []);
  };

  const detailColDefs = useMemo(() => {
    return colDefs.map((col) => ({
      ...col,
      filter: false
    }));
  }, [colDefs]);

  const detailCellRendererParams = useMemo(
    () => ({
      detailGridOptions: {
        columnDefs: detailColDefs,
        defaultColDef: {
          ...defaultColDef,
          floatingFilter: false,
          filter: false,
        },
      },
      getDetailRowData: getDetailRowData,
    }),
    [detailColDefs, defaultColDef]
  );

  const onFirstDataRendered = useCallback((params) => {
    setTimeout(() => {
      params.api.getDisplayedRowAtIndex(1).setExpanded(false);
    }, 0);
  }, []);

  const onColumnMoved = useCallback(() => {
    const newColDefs = gridRef.current.api.getColumnDefs();
    const newDetailColDefs = newColDefs.map((col) => ({
      ...col,
      floatingFilter: false,
      filter: false,
    }));
    detailCellRendererParams.detailGridOptions.columnDefs = newDetailColDefs;

    gridRef.current.api.forEachNode((node) => {
      if (node.detail) {
        node.setData(node.data);
        node.setExpanded(true);
      }
    });
  }, [detailCellRendererParams]);

  useEffect(() => {
    setPinnedTopRowData(getSummaryRow(rowData));
  }, [rowData]);

  const getRowStyle = (params) =>
    params.node.rowPinned === "top" ? { backgroundColor: "#2B908F" } : null;

  return (
    <div className="flex flex-col h-full w-full">
   <h1 class="m-1 text-lg font-bold leading-none tracking-tight text-gray-400">
   A Book View</h1>

      <div className="flex items-center space-x-4 p-1 border border-gray-300 rounded-sm shadow-lg bg-gray-900">
        {/* Status Checkboxes */}
        <div className="flex items-center space-x-2">
          {statuses.map((status) => (
            <label key={status} className="flex items-center space-x-1">
              <input
                type="checkbox"
                checked={selectedStatus === status}
                onChange={() => setSelectedStatus(status)}
                className="form-checkbox h-3 w-3 text-gray-600"
              />
              <span className="text-xs text-gray-200">{status}</span>
            </label>
          ))}
        </div>

        {/* Date Dropdown */}
        <select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className={`text-xs h-5 text-white bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 ${selectedStatus === 'Live' ? 'opacity-50 cursor-not-allowed' : null} `}
          disabled={selectedStatus === 'Live'}
        >
          {dateOptions.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>

        {/* Toggle Switch */}
        <div className="flex items-center text-gray-300 text-xs space-x-2">
          <span className=" ">Clients</span>
          <div
            onClick={() => setIsBroker(!isBroker)}
            className={`w-8 h-4 flex items-center bg-gray-600 rounded-full p-1 cursor-pointer ${isBroker ? 'justify-end' : ''}`}
          >
            <div className="bg-white w-3 h-3 rounded-full shadow-md transform transition-transform duration-200" />
          </div>
          <span className="">Broker</span>
        </div>
      </div>
    
      <div className="ag-theme-balham-dark w-full h-full">
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
          getRowStyle={getRowStyle}
          pinnedTopRowData={pinnedTopRowData}
          onFirstDataRendered={onFirstDataRendered}
          onColumnMoved={onColumnMoved}
        />
      </div>
    </div>
  );
};

export default AbookWatchList;

