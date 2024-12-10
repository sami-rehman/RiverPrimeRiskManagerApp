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
import { dateComparator } from "../../common/constant";
import { numberFormatter } from "../../common/constant";
import { PercentageUnderline } from "../../grid/percentageUnderline";

const CbookWatchList = () => {

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
        headerName: "Broker Submit",
        // floatingFilter: false,
        field: "liveTimestamp",
        filter: "agDateColumnFilter",
        filterParams: {
          comparator: dateComparator,
        },
        minWidth: 185,
        rowDrag: true,
      },
      {
        headerName: "LP Execution",
        field: "liveTimestamp",
        filter: "agDateColumnFilter",
        filterParams: {
          comparator: dateComparator,
        },
        minWidth: 160,

      },
      {
        headerName: "Broker ID ",
        field: "positionId",
        filter: true,
      },
      {
        headerName: "Lots",
        field: "lots",
        filter: "agNumberColumnFilter",
        valueFormatter: numberFormatter,
      },
      {
        headerName: "Notional",
        field: "trigger_price",
        filter: "agNumberColumnFilter",
        valueFormatter: currencyFormatter,
      },
      {
        field: "symbol",
        filter: "agTextColumnFilter"
      },
      {
        field: "side",
        filter: true,
      },
      {
        headerName: "Open Price",
        field: "currentPrice",
        filter: "agNumberColumnFilter",
        valueFormatter: currencyFormatter,
      },
      {
        headerName: "Closed Price",
        field: "price",
        filter: "agNumberColumnFilter",
        valueFormatter: currencyFormatter,
      },
      {
        field: "profit",
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
      { field: "swapSize", filter: true },
      { field: "commission", filter: "agNumberColumnFilter", valueFormatter: currencyFormatter },
      { field: "fee",
        filter: "agNumberColumnFilter",
        valueFormatter: currencyFormatter
      },
      {
        headerName: "Reference",
        field: "positionId",
        filter: true,
      },
      { field: "fixId", headerName: "Fix ID", filter: true, hide: true },
      { field: "comment", filter: "agTextColumnFilter", },
    ],
    []
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
      <h1 class="m-1 text-lg font-bold leading-none tracking-tight text-gray-400">C Book View</h1>

      <div className="flex items-center space-x-4 p-1 border border-gray-300 rounded-sm shadow-lg bg-gray-900">
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
          // pinnedTopRowData={pinnedTopRowData}
        />
      </div>
    </div>
  );
};

export default CbookWatchList;

