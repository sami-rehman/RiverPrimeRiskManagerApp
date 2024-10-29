import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import { numberFormatter } from "../common/constant";
import "ag-grid-community/styles/ag-theme-balham.css";

import NewWindow from "react-new-window";


import { rawDataPiechartEquity } from "../constant";
import AccountActivityWin from "../accountActivity/AccountActivityWin";
import { StatusRender } from "./statusRendered";
import { formatNumber } from "../common";
import { PercentageUnderline } from "./percentageUnderline";


export const WatchListTradingAccount = ({ setSelectedLogins }) => {

  const [showNewWindow, setShowNewWindow] = useState(false);
  const [accountActivityProps, setaccountActivityProps] = useState();


  const triggerAccountActivity = (data) => {
    setaccountActivityProps(data);
    setShowNewWindow(!showNewWindow);
  };

  const closeWindow = () => {
    setShowNewWindow(false);
  };

  const [rowData, setRowData] = useState(rawDataPiechartEquity);
  const [pinnedTopRowData, setPinnedTopRowData] = useState([]);

  const gridRef = useRef(null);
  const dataMapRef1 = useRef(new Map());

  const colDefs = useMemo(
    () => [
      {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        maxWidth: 40,
      },
      {
        field: "rule",
        headerName: "Status",
        filter: true,
        maxWidth: 99,
        cellRenderer: StatusRender,
      },
      {
        field: "login",
        headerName: "MT Login",
        rowDrag: true,
        filter: true,
        minWidth: 99,
        cellRenderer: (params) => {
          const handleClick = () => triggerAccountActivity(params.data)
          // Determine the color based on the flag
          const isActive = params?.data?.rule === 'Active';
          const textColor = !isActive ? "#8ca6f3" : "#f7cf13";
          return (
            <span
              style={{ color: textColor, cursor: "pointer" }}
              onClick={handleClick}
            >
              {params.value}
            </span>
          );
        },
      },
      {
        headerName: "MT Group:",
        field: "group",
        hide: true,
      },
      {
        headerName: "Equity",
        field: "equity",
        filter: "agNumberColumnFilter",
        cellDataType: "number",
        // cellRenderer: "agAnimateShowChangeCellRenderer",
        valueFormatter: (params) => {
          return `$${formatNumber(params.value)}`;
        },
        aggFunc: "sum",
      },
      {
        headerName: "Lots",
        field: "volumeLots",
        filter: "agNumberColumnFilter",
        cellDataType: "number",
        valueFormatter: numberFormatter,
        cellRenderer: "agAnimateShowChangeCellRenderer",
        aggFunc: "sum",
      },
      {
        headerName: "Notional",
        field: "volumeNotional",
        filter: "agNumberColumnFilter",
        cellDataType: "number",
        valueFormatter: numberFormatter,
        cellRenderer: "agAnimateSlideCellRenderer",
        aggFunc: "sum",
      },
      {
        headerName: "Realised PL",
        field: "realizedPL",
        filter: "agNumberColumnFilter",
        cellDataType: "number",
        // cellRenderer: "agAnimateShowChangeCellRenderer",
        valueFormatter: numberFormatter,
        aggFunc: "sum",
      },
      {
        headerName: "Unrealised PL",
        field: "unrealizedPL",
        filter: "agNumberColumnFilter",
        cellDataType: "number",
        // cellRenderer: "agAnimateShowChangeCellRenderer",
        valueFormatter: numberFormatter,
        aggFunc: "sum",
      },
      {
        headerName: "Rules",
        field: "rule",
        filter: "agSetColumnFilter",
        filterParams: {
          suppressMiniFilter: true,
        },
        hide: true,
      },
      {
        headerName: "Margin Utilization",
        field: "marginUtilization",
        filter: "agNumberColumnFilter",
        cellRenderer: (params) => (
          <PercentageUnderline
            value={params?.data?.marginUtilization}
            percentage={params?.data?.marginUtilizationPercentage}
          />
        ),
      },
      {
        headerName: "Longs",
        field: "longs",
        filter: "agNumberColumnFilter",
        cellDataType: "number",
        valueFormatter: numberFormatter,
        aggFunc: "sum",
      },
      {
        headerName: "Shorts",
        field: "shorts",
        filter: "agNumberColumnFilter",
        cellDataType: "number",
        valueFormatter: numberFormatter,
        aggFunc: "sum",
      },
      {
        headerName: "NAOI",
        field: "naoi",
        filter: "agNumberColumnFilter",
        cellDataType: "number",
        valueFormatter: numberFormatter,
        aggFunc: "sum",
      },
    ],
    []
  );

  useEffect(() => {
    const socket = new WebSocket("ws://192.168.3.164:8081/ws/api/v1/accountData");
    let isSocketOpen = false;

    const handleMessage = (event) => {
      const data = JSON.parse(event.data);
      throttleUpdateTable1(data);
    };

    const sendRequest = () => {
      if (socket.readyState === WebSocket.OPEN) {
        const requestMessage = {
          type: "request",
          requestType: "accountDailyReport",
          accounts: "all"

        };
        socket.send(JSON.stringify(requestMessage));
      }
    };

    socket.addEventListener("message", handleMessage);

    socket.onopen = () => {
      isSocketOpen = true;
      sendRequest();
    };

    return () => {
      if (isSocketOpen) {
        const unsubscribeMessage = {
          type: "unsubscribe",
          requestType: "accountDailyReport",
          accounts: "all",
        };
        socket.send(JSON.stringify(unsubscribeMessage));
        socket.removeEventListener("message", handleMessage);
        socket.close();
      }
    };
  }, []);

  const throttleUpdateTable1 = (data) => {
    const incomingData = Array.isArray(data) ? data : [data];
    incomingData.forEach((item) => {
      dataMapRef1.current.set(item.login, item);
    });

    // Calculate sums for numeric fields
    const aggregatedData = Array.from(dataMapRef1.current.values());
    const totals = aggregatedData.reduce((acc, item) => {
      Object.keys(item).forEach(key => {
        if (key !== "login" && key !== "rule") {
          acc[key] = (acc[key] || 0) + item[key];
        }
      });
      return acc;
    }, {});

    // Prepare pinned top row data
    const totalRow = {
      login: "Totals",
      volumeLots: totals.volumeLots || 0,
      volumeNotional: totals.volumeNotional || 0,
      equity: totals.equity || 0,
      realizedPL: totals.realizedPL || 0,
      unrealizedPL: totals.unrealizedPL || 0,
      marginUtilization: totals.marginUtilization || 0,
      marginFree: totals.marginFree || 0,
      marginLevel: totals.marginLevel || 0,
      longs: totals.longs || 0,
      shorts: totals.shorts || 0,
      naoi: totals.naoi || 0,
      cellClass: "totalRow-background",
    };

    setRowData(aggregatedData);
    setPinnedTopRowData([totalRow]);
  };

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
        'totalRow-background': (params) => params.node.rowPinned === 'top',
      },
    }),
    []
  );


  const getRowId = useCallback(({ data: { login } }) => login?.toString(), []);


  // Function to update selected logins whenever selection changes
  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef?.current?.api?.getSelectedRows();
    const selectedLogins = selectedRows?.map(row => row?.login); // Extracting logins
    // console.log('selectedLogins', selectedLogins); // Log the array of logins
    setSelectedLogins(selectedLogins); // Store selected logins in state if needed
  }, []);

  return (
    <div className="ag-theme-balham-dark h-full w-full">
      <AgGridReact
        ref={gridRef}
        getRowId={getRowId}
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        rowDragManaged={true}
        rowSelection={"multiple"}
        rowGroupPanelShow={"always"}
        suppressAggFuncInHeader
        groupDefaultExpanded={-1}
        sideBar={true}
        rowHeight={19}
        // pinnedTopRowData={pinnedTopRowData}
        onSelectionChanged={onSelectionChanged}
      />

      {showNewWindow && (
        <NewWindow
          onUnload={closeWindow}
          features={{ width: 1800, height: 980 }}
          title="Account Activity Login"
        >
          <AccountActivityWin accountActivityData={accountActivityProps} />
        </NewWindow>
      )}

    </div>
  );
};