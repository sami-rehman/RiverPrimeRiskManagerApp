import React, {
  useMemo,
  useRef,
  useState,
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
import ToggleSwitch from "../../ToggleSwitch";

const AbookWatchList = () => {

  const [selectedStatus, setSelectedStatus] = useState('Rejected');
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
            // minWidth: 185,
            rowDrag: true,
            colId: "lpSubmit",
          },
          {
            headerName: "LP Execution",
            // floatingFilter: (selectedStatus === 'Live') && false ,
            field: selectedStatus !== 'Live' ? 'liveTimestamp' : 'activationTime',
            filter: selectedStatus === 'Live' ? true : 'agDateColumnFilter',
            filterParams: {
              comparator: selectedStatus !== 'Live' ? dateComparator : null,
            },
            // minWidth: 160,
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
            colId: "date",
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
            maxWidth: 125
          },
          {
            field: "positionId",
            headerName: "OID",
            filter: true,
            // cellRenderer: "agGroupCellRenderer",
            columnGroupShow: "open",
            maxWidth: 85
          },
          {
            field: "positionId",
            headerName: "Deal ID",
            filter: true,
            // cellRenderer: "agGroupCellRenderer",
            columnGroupShow: "open",
            maxWidth: 85,
            hide: !selectedStatus === 'Closed'
          },
          {
            headerName: 'Destination',
            field: "destination",
            filter: true,
            columnGroupShow: "open",
            maxWidth: 110
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
            maxWidth: 99
          },
          {
            field: "positionId",
            headerName: "Account",
            filter: true,
            columnGroupShow: "open",
            maxWidth: 99
          },
          {
            headerName: 'Destination',
            field: "destination",
            filter: true,
            maxWidth: 110
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
            columnGroupShow: "open",
            hide: true
          },
          {
            field: "prompts",
            headerName: "Prompt",
            filter: true,
            columnGroupShow: "open",
            maxWidth: 90
          },
          {
            field: "orderId",
            headerName: "LP Order ID",
            filter: true,
            columnGroupShow: "open",
            maxWidth: 110
          },
          {
            field: "side",
            filter: true,
            columnGroupShow: "open",
            maxWidth: 80
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
            maxWidth: 90
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
            maxWidth: 120
          },
          {
            field: "trigger_price",
            headerName: "Trigger Price",
            filter: "agNumberColumnFilter",
            valueFormatter: currencyFormatter,
            aggFunc: "sum",
            hide: true,
            maxWidth: 120
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
            columnGroupShow: "open",
            aggFunc: "sum",
            maxWidth: 120
          },
          {
            field: "currentPrice",
            headerName: "Realized PnL",
            filter: "agNumberColumnFilter",
            valueFormatter: currencyFormatter,
            aggFunc: "sum",
            maxWidth: 125
          },
          {
            field: "profit",
            headerName: "UnPL",
            filter: "agNumberColumnFilter",
            valueFormatter: currencyFormatter,
            aggFunc: "sum",
            maxWidth: 120
          },
          {
            field: "currentPrice",
            headerName: "Current Price",
            filter: "agNumberColumnFilter",
            valueFormatter: currencyFormatter,
            aggFunc: "sum",
            maxWidth: 120
          },
          {
            field: "fixId",
            headerName: "Fix ID",
            filter: true,
            columnGroupShow: "open",
            maxWidth: 120
          },
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
          rowGroupPanelShow={"always"}
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
          rowHeight={20}
          getRowStyle={getRowStyle}
          pinnedTopRowData={pinnedTopRowData}
        />
      </div>
    </div>
  );
};

export default AbookWatchList;

