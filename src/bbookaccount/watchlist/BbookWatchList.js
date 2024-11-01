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
import { QuantityRequested } from "../../grid/QuantityRequested";
import { dateComparator } from "../../common/constant";

const BbookWatchList = () => {

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
        // field: "activationTime",
        field: selectedStatus !== 'Live' ? 'liveTimestamp' : 'activationTime',
        filter: "agDateColumnFilter",
        filterParams: {
          inRangeInclusive: true,
          comparator: dateComparator,
        },
        minWidth: 185,
        rowDrag: true,
      },
      {
        headerName: "MT Execution",
        // field: "activationTime",
        field: selectedStatus !== 'Live' ? 'liveTimestamp' : 'activationTime',
        filter: "agDateColumnFilter",
        filterParams: {
          inRangeInclusive: true,
          comparator: dateComparator,
        },
        minWidth: 160,
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
        hide: !selectedStatus=== 'Live',
      },
      {
        headerName: "Deal ID",
        field: "positionId",
        filter: true,
        // cellRenderer: "agGroupCellRenderer",
        maxWidth:85,
        hide: selectedStatus !=='Closed'
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
        filterParams: {
          comparator: dateComparator,
        },
        minWidth: 160,
        hide: true,
      },
      {
        headerName: "LP Execution",
        field: "activationTime",
        filter: "agDateColumnFilter",
        filterParams: {
          comparator: dateComparator,
        },
        minWidth: 160,
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
    [selectedStatus]
  );

  const [colDefs, setColDefs] = useState(baseColDefs);


  useEffect(() => {
    const updatedColDefs = baseColDefs.map((col) => {
      if (col.headerName === "MT Submit" || col.headerName === "MT Execution") {
        return {
          ...col,
          hide: selectedStatus === "Closed" || selectedStatus === "Rejected",
        };
      }
      if (col.headerName === "Date") {
        return {
          ...col,
          hide: !(selectedStatus === "Closed" || selectedStatus === "Rejected"),
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
      <h1 class="m-1 text-md font-bold leading-none tracking-tight text-gray-400">
      B Book View</h1>
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

export default BbookWatchList;
