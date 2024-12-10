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
import { dateComparator, numberFormatter } from "../../common/constant";
import { formatNumber } from "../../common";
import { PercentageUnderline } from "../../grid/percentageUnderline";
import ToggleSwitch from "../../ToggleSwitch";


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

const CbookWatchList = () => {

  const [pinnedTopRowData, setPinnedTopRowData] = useState([]);
  const [rowClosedData, setRowClosedData] = useState(dummyDataBbook);
  const [rowRejectedData, setRowRejectedData] = useState(dummyDataBbook);
  const [rowPendingData, setRowPendingData] = useState(dummyDataBbook);
  const [rowLiveData, setRowLiveData] = useState(dummyDataBbook);

  const [isBroker, setIsBroker] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Closed");
  const [selectedDate, setSelectedDate] = useState('Today');
  const statuses = ['Live', 'Pending', 'Closed', 'Rejected'];
  const dateOptions = ['Today', 'Yesterday', 'This Week', 'Last Week', 'This Month', 'Last Month', '3 Months', '6 Months', '12 Months'];

  const gridRef = useRef(null);
  const socketRef = useRef(null);
  const dataMapRef = useRef(new Map());



  const getSocketRequestType = (status) => {
    switch (status) {
      case "Live":
        return "c_book_positions";
      case "Pending":
        return "c_book_open_orders";
      case "Rejected":
        return "c_book_rejected_orders";
      case "Closed":
        return "c_book_closed_positions";
      default:
        return "";
    }
  };

  const handleSocketMessage = useCallback((event) => {
    let data;

    try {
        data = JSON.parse(event?.data);
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return;
    }
      const allData = Array.isArray(data) ? data : [data];

      allData.forEach((item) => {
          if (item) {
              dataMapRef.current.set(item, item); 
          }
      });

        const mappedData = Array.from(dataMapRef.current.values());
        if (selectedStatus === "Live") setRowLiveData(mappedData);
        else if (selectedStatus === "Pending") setRowPendingData(mappedData);
        else if (selectedStatus === "Rejected") setRowRejectedData(mappedData);
        else if (selectedStatus === "Closed") setRowClosedData(mappedData);
}, [selectedStatus]);


  const sendSocketRequest = useCallback(() => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const requestMessage = {
        type: "request",
        requestType: getSocketRequestType(selectedStatus),
        accounts: "all",
      };
      socketRef.current.send(JSON.stringify(requestMessage));
    }
  }, [selectedStatus]);

  useEffect(() => {
    // Close the existing WebSocket if it exists
    if (socketRef.current) {
        if (socketRef.current.readyState === WebSocket.OPEN) {
            // Send an unsubscribe message before closing
            dataMapRef.current.clear();
            const unsubscribeMessage = {
                type: "unsubscribe",
                requestType: getSocketRequestType(selectedStatus),
                accounts: "all",
            };
            socketRef.current.send(JSON.stringify(unsubscribeMessage));
        }

        // Close the WebSocket and clean up
        socketRef.current.close();
        socketRef.current = null;
    }

    // Create a new WebSocket connection
    socketRef.current = new WebSocket("ws://192.168.3.164:8081/ws/api/v1/bookPositionsB");

    // Set up event handlers
    socketRef.current.onopen = () => {
        console.log("WebSocket connection opened");
        sendSocketRequest();
    };

    socketRef.current.onmessage = handleSocketMessage;

    socketRef.current.onerror = (error) => {
        console.error("WebSocket error:", error);
    };

    socketRef.current.onclose = () => {
        console.log("WebSocket connection closed");
        dataMapRef.current.clear();
    };

    return () => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
          
            const unsubscribeMessage = {
                type: "unsubscribe",
                requestType: getSocketRequestType(selectedStatus),
                accounts: "all",
            };
            socketRef.current.send(JSON.stringify(unsubscribeMessage));
            socketRef.current.close();
        }
        socketRef.current = null;
    };
}, [selectedStatus, sendSocketRequest, handleSocketMessage]);



  const rowData = useMemo(() => {
    switch (selectedStatus) {
      case "Live":
        return rowLiveData;
      case "Pending":
        return rowPendingData;
      case "Rejected":
        return rowRejectedData;
      case "Closed":
        return rowClosedData;
      default:
        return dummyDataBbook;
    }
  }, [selectedStatus, rowLiveData, rowPendingData, rowRejectedData, rowClosedData]);


  const colDefs = useMemo(
    () => [
      {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        maxWidth: 40,
      },

      {
        headerName: selectedStatus === "Rejected" ? "LP Rejection" : "Broker Submit",
        field: selectedStatus === "Rejected" ? "lpRejected" : "mtSubmit",
        filter: "agDateColumnFilter",
        filterParams: {
          comparator: dateComparator,
        },
        minWidth: 185,
        rowDrag: true,
         hide: selectedStatus === 'Closed'
      },
      {
        headerName: "LP Execution",
        field: "mtExecution",
        filter: "agDateColumnFilter",
        filterParams: {
          comparator: dateComparator,
        },
        minWidth: 160,
        hide: selectedStatus !== 'Live',
      },
      {
        field: "closingTime",
        filter: "agDateColumnFilter",
        filterParams: {
          comparator: dateComparator,
        },
        minWidth: 160,
        hide:   !(selectedStatus === "Closed"),
      },
      {
        headerName: "Broker ID ",
        field: "brokerId",
        filter: true,
        hide: true
      },
      {
        headerName: "Position ID",
        field: "positionId",
        filter: true,
        cellRendererSelector: (params) => {
          if (params?.data?.associateOrder?.length > 0) {
            return { component: "agGroupCellRenderer" };
          }
          return null;
        },
        hide: (selectedStatus === 'Pending' || selectedStatus === 'Rejected'),
      },
      {
        headerName: "Deal ID",
        field: "dealId",
        filter: true,
        maxWidth: 85,
        hide: selectedStatus !== 'Closed'
      },
      {
        headerName: "Volume",
        field: "requestedQuantity",
        filter: "agNumberColumnFilter",
        valueFormatter: numberFormatter,
      },
      // {
      //   headerName: "Notional",
      //   field: "trigger_price",
      //   filter: "agNumberColumnFilter",
      //   valueFormatter: currencyFormatter,
      // },
      {
        field: "symbol",
        filter: "agTextColumnFilter"
      },
      {
        headerName: "Vol. Closed",
        field: "volumeClosed",
        filter: "agNumberColumnFilter",
        hide: selectedStatus !== 'Closed'
      },
      {
        field: "side",
        filter: true,
      },
      {
        headerName: "Open Price",
        field: "trigger_price",
        filter: "agNumberColumnFilter",
        valueFormatter: currencyFormatter,
        hide: selectedStatus === 'Closed'
      },
      {
        headerName: "Closed Price",
        field: "closingPrice",
        filter: "agNumberColumnFilter",
        valueFormatter: currencyFormatter,
       hide: selectedStatus !== 'Closed'
      },
      {
        field: selectedStatus === 'Closed' ? "pnl" : "profit",
        headerName: "P&L",
        filter: "agNumberColumnFilter",
        valueFormatter: currencyFormatter,
      },
      {
        headerName: "Margin Utilization ($, %)",
        field: "marginUtilization",
        filter: "agNumberColumnFilter",
        valueFormatter: currencyFormatter,
        cellRenderer: (params) => (
          <PercentageUnderline
            value={params?.data?.marginUtilization} 
            percentage={params?.data?.marginUtilizationPercentage}
          />
        ),
        minWidth:180,
      },
      { field: "swapSize", filter: true, hide: selectedStatus !== 'Closed' },
      { field: "commission", filter: "agNumberColumnFilter", valueFormatter: currencyFormatter, hide: selectedStatus !== 'Closed' },
      { field: "fee",
        filter: "agNumberColumnFilter",
        valueFormatter: currencyFormatter,
      hide: selectedStatus !== 'Closed'
      },
      {
        headerName: "Reference",
        field: "positionId",
        filter: true,
      },
      {field:'destination', filter: true},
      { field: "fixId", headerName: "Fix ID", filter: true, hide: true },
      { field: "comments", filter: "agTextColumnFilter", },
    ],
    [selectedStatus]
  );

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
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
        return acc
      },
      { requestedQuantity: 0, quantityFilled: 0, quantityRemaining: 0 }
    );
     // Limit each value to two decimal places
     summary.requestedQuantity = parseFloat(summary.requestedQuantity.toFixed(2));
     summary.quantityFilled = parseFloat(summary.quantityFilled.toFixed(2));
     summary.quantityRemaining = parseFloat(summary.quantityRemaining.toFixed(2));
     
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

    gridRef?.current?.api?.forEachNode((node) => {
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
       <div className="flex items-center space-x-4 p-1  bg-[#2D2D2D] border-b-4 border-black px-2 h-[40px]">
        <div className="flex items-center space-x-2">
          {statuses.map((status) => (
            <label key={status} className="flex items-center space-x-1">
              <div className="relative h-5 w-5">
                <input
                  type="checkbox"
                  checked={selectedStatus === status}
                  onChange={() => setSelectedStatus(status)}
                  className="absolute h-full w-full opacity-0 cursor-pointer"
                />
                <div className="h-full w-full rounded border-2 bg-transparent flex items-center justify-center pointer-events-none">
                {
                  selectedStatus === status
                  ? <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 text-white transition-colors duration-200 ease-in-out ${selectedStatus === status ? 'text-[#47FFA6]' : ''
                      }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg> : null
                }
                </div>
              </div>

              <span className="text-sm text-gray-300">{status}</span>
            </label>
          ))}
        </div>


        <div className="relative w-28">
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className={`appearance-none text-sm w-full h-6 text-gray-300 bg-[#2D2D2D] rounded-xl border border-gray-300 focus:outline-none pl-2 pr-4 ${selectedStatus === 'Live' ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            disabled={selectedStatus === 'Live'}
          >
            {dateOptions.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
          {/* Custom arrow */}
          <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#47FFA6"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        <ToggleSwitch />
      </div>

      <div className="ag-theme-balham-dark w-full h-full">
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          rowDragManaged={true}
          rowSelection={"multiple"}
          // rowGroupPanelShow={"always"}
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

export default CbookWatchList;
