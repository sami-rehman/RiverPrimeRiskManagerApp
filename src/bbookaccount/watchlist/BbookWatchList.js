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
import Datepicker from "react-tailwindcss-datepicker";
import { dummyDataBbook } from "./dummyData";
import { StatusRender } from "../../grid/statusRendered";
import { CustomDateFilter } from "../agGridFilters/CustomDateFilter";
import { QuantityRequested } from "../../grid/QuantityRequested";

const BbookWatchList = () => {
  const [activeButton, setActiveButton] = useState("Working Order");
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
    },
  ]);

  const handleSelect = (ranges) => {
    setDateRange(ranges);
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

  const dateComparator = (filterLocalDateAtMidnight, cellValue) => {
    if (!cellValue) return -1;
  
    // Parse the cell value, e.g., "17-10-2024 13:17:36.145"
    const [day, month, yearTime] = cellValue.split("-");
    const [year, time] = yearTime.split(" ");
    const [hours, minutes, secondsMilliseconds] = time.split(":");
    const [seconds, milliseconds] = secondsMilliseconds.split(".");
  
    // Convert to a JavaScript Date object
    const cellDate = new Date(
      year,
      month - 1,
      day,
      hours,
      minutes,
      seconds,
      milliseconds
    );
  
    // Only compare dates, ignoring the time part
    const cellDateAtMidnight = new Date(
      cellDate.getFullYear(),
      cellDate.getMonth(),
      cellDate.getDate()
    );
  
    if (cellDateAtMidnight < filterLocalDateAtMidnight) return -1;
    if (cellDateAtMidnight > filterLocalDateAtMidnight) return 1;
    return 0;
  };
  

  const baseColDefs  = useMemo(
    () => [
      { headerCheckboxSelection: true, checkboxSelection: true, maxWidth: 40 },
      {
        headerName: "Status",
        field: "rules",
        filter: true,
        minWidth: 99,
        cellRenderer: StatusRender,
      },
      {
        headerName: "MT Submit",
        field: "activationTime",
        filter: "agDateColumnFilter",
        filterParams: {
          comparator: dateComparator,
        },
        minWidth: 185,
        rowDrag: true,
        floatingFilter: false,
      },
      {
        headerName: "MT Execution",
        field: "activationTime",
        filter: "agDateColumnFilter",
        minWidth: 160,
        floatingFilter: false,
      },


      {
        headerName: "Date",
        field: "activationTime",
        filter: "agDateColumnFilter",
        filterParams: {
          comparator: dateComparator,
        },
        minWidth: 160,
        hide: true,
      },

      {
        headerName: "Account ID",
        field: "login",
        filter: true,
        hide: true,
        cellRenderer: (params) => (
          <span
            style={{
              color: params?.data?.rules === "Active" ? "#FFBF00" : "#8ca6f3",
            }}
          >
            {params.value}
          </span>
        ),
      },
      {
        headerName: "Position ID",
        field: "positionId",
        filter: true,
        cellRenderer: "agGroupCellRenderer",
        hide: true,
      },
      { field: "side", filter: true, cellRenderer: "agGroupCellRenderer" },
      {
        field: "requestedQuantity",
        headerName: "Qty. Req.",
        filter: "agNumberColumnFilter",
        cellRenderer: QuantityRequested,
      },
      { field: "symbol", filter: "agTextColumnFilter" },
      { field: "type", filter: true },
      {
        field: "Price",
        filter: "agNumberColumnFilter",
        valueFormatter: currencyFormatter,
      },
      {
        field: "priceTP",
        headerName: "TP",
        filter: "agNumberColumnFilter",
        valueFormatter: currencyFormatter,
      },
      {
        field: "priceSL",
        headerName: "SL",
        filter: "agNumberColumnFilter",
        valueFormatter: currencyFormatter,
      },
      {
        field: "quantityFilled",
        headerName: "Qty. Filled",
        filter: "agNumberColumnFilter",
        hide: true,
      },
      {
        field: "quantityRemaining",
        headerName: "Qty. Left",
        filter: "agNumberColumnFilter",
        hide: true,
      },
      {
        field: "trigger_price",
        headerName: "Trigger Price",
        filter: "agNumberColumnFilter",
        valueFormatter: currencyFormatter,
        hide: true,
      },
      { field: "tif", filter: true, hide: true },
      {
        field: "orderId",
        headerName: "Order ID",
        cellRenderer: "agGroupCellRenderer",
        filter: true,
        hide: true,
      },
      {
        field: "Price",
        headerName: "Avg. Fill Price",
        filter: "agNumberColumnFilter",
        valueFormatter: currencyFormatter,
      },
      {
        field: "profit",
        headerName: "UnPL",
        filter: "agNumberColumnFilter",
        valueFormatter: currencyFormatter,
      },
      { field: "destination", filter: "agTextColumnFilter", hide: true },
      {
        headerName: "LP Submit",
        field: "activationTime",
        filter: "agDateColumnFilter",
        filterFramework: CustomDateFilter,
        minWidth: 185,
        hide: true,
      },
      {
        headerName: "LP Execution",
        field: "activationTime",
        filter: "agDateColumnFilter",
        filterFramework: CustomDateFilter,
        minWidth: 185,
        hide: true,
      },
      {
        field: "currentPrice",
        filter: "agNumberColumnFilter",
        valueFormatter: currencyFormatter,
      },
      { field: "fixId", headerName: "Fix ID", filter: true },
      { field: "comments", filter: "agTextColumnFilter" },
    ],
    []
  );

  const [colDefs, setColDefs] = useState(baseColDefs);


  useEffect(() => {
    const updatedColDefs = baseColDefs.map((col) => {
      if (col.headerName === "MT Submit" || col.headerName === "MT Execution") {
        return {
          ...col,
          hide: activeButton === "Closed" || activeButton === "Rejected",
        };
      }
      if (col.headerName === "Date") {
        return {
          ...col,
          hide: !(activeButton === "Closed" || activeButton === "Rejected"),
        };
      }
      return col;
    });
    setColDefs(updatedColDefs);
  }, [activeButton, baseColDefs]);

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      floatingFilter: true,
      enableRowGroup: true,
      enableValue: true,
      enablePivot: true,
      sortable: true,
      resizable: true,
    }),
    []
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
      filter: false }));
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
      <div className="flex items-center space-x-4 m-1">
        <div className=" space-x-2">
          {["Working Order", "Closed", "Rejected"].map((button) => (
            <button
              key={button}
              className={`px-2 py-1 text-xs rounded text-white ${activeButton === button
                  ? "bg-blue-600"
                  : "bg-gray-500 hover:bg-gray-600"
                }`}
              onClick={() => handleButtonClick(button)}
            >
              {button}
            </button>
          ))}
        </div>

        <div className="w-60">
          <Datepicker
            displayFormat="MM/DD/YYYY"
            value={dateRange}
            onChange={handleSelect}
            showSelectionPreview={true}
            showShortcuts={true}
            disabled={activeButton === "Working Order"}
            inputClassName={
              "relative transition-all duration-300 py-1 pl-4 pr-14 w-full border-gray-600 dark:bg-gray-500 dark:text-white dark:border-gray-600 rounded tracking-wide text-xs placeholder-gray-400 bg-white focus:ring disabled:opacity-40 disabled:cursor-not-allowed focus:border-gray-500 focus:ring-gray-500/20"
            }
            className={` ${activeButton === "Live" || activeButton === "Pending"
                ? "opacity-50 cursor-not-allowed"
                : ""
              }`}
          />
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

export default BbookWatchList;
