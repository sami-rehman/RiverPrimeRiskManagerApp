import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import { LicenseManager } from "ag-grid-enterprise";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { numberFormatter } from "../common/constant";
import "../styles/custom-ag-grid.css";

import NewWindow from "react-new-window";


import { rawDataPiechartEquity } from "../constant";
import AccountActivityWin from "../accountActivity/AccountActivityWin";


export const WatchListTradingAccount = () => {

  const [showNewWindow, setShowNewWindow] = useState(false);
  const [accountActivityProps, setaccountActivityProps] = useState();

  const triggerAccountActivity = (data) => {
    setaccountActivityProps(data);
    setShowNewWindow(!showNewWindow);


  };

  const closeWindow = () => {
    setShowNewWindow(false);
  };


  LicenseManager.setLicenseKey(
    "Using_this_{AG_Grid}_Enterprise_key_{AG-063926}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{River_Prime}_is_granted_a_{Single_Application}_Developer_License_for_the_application_{River_Prime}_only_for_{1}_Front-End_JavaScript_developer___All_Front-End_JavaScript_developers_working_on_{River_Prime}_need_to_be_licensed___{River_Prime}_has_been_granted_a_Deployment_License_Add-on_for_{1}_Production_Environment___This_key_works_with_{AG_Grid}_Enterprise_versions_released_before_{23_July_2025}____[v3]_[01]_MTc1MzIyNTIwMDAwMA==1200d27c6f62377b36b8f92b7c13fe53"
  );
  const [rowData, setRowData] = useState(rawDataPiechartEquity);
  const [pinnedTopRowData, setPinnedTopRowData] = useState([]);

  const gridRef = useRef(null);
  const dataMapRef1 = useRef(new Map());

  // const openNewWindow = (data) => {
  //   const newWindow = window.open("", "", "width=600,height=400");
  //   if (newWindow) {
  //     newWindow.document.title = "MT Login Data";
  //     newWindow.document.body.innerHTML = `
  //       <html>
  //         <head>
  //           <title>MT Login Data</title>
  //           <style>
  //             body { font-family: Arial, sans-serif; padding: 20px; }
  //             pre { white-space: pre-wrap; word-wrap: break-word; }
  //             button { padding: 10px; margin-top: 20px; cursor: pointer; }
  //           </style>
  //         </head>
  //         <body>
  //           <h2>Row Data for MT Login: ${data.login}</h2>
  //           <pre>${JSON.stringify(data, null, 2)}</pre>
  //           <button id="closeButton">Close</button>
  //         </body>
  //       </html>
  //     `;
  //     newWindow.document.getElementById("closeButton").onclick = () => {
  //       newWindow.close();
  //     };
  //   }
  // };

  const colDefs = useMemo(
    () => [
      {
        field: "login",
        headerName: "MT Login",
        filter: true,
        cellRenderer: (params) => {
          const handleClick = () => triggerAccountActivity(params.data)
          return (
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={handleClick}
            >
              {params.value}
            </span>
          );
        },
        cellClassRules: {
          'even-row': (params) => params.node.rowIndex % 2 === 0,
          'odd-row': (params) => params.node.rowIndex % 2 !== 0,
        },
      },
      {
        headerName: "MT Group:",
        field: "group",
        hide: true,
        cellClassRules: {
          'even-row': params => params.node.rowIndex % 2 === 0,
          'odd-row': params => params.node.rowIndex % 2 !== 0,
        }
      },
      {
        headerName: "Equity",
        field: "equity",
        filter: "agNumberColumnFilter",
        cellDataType: "number",
        cellRenderer: "agAnimateShowChangeCellRenderer",
        valueFormatter: numberFormatter,
        cellClassRules: {
          'even-row': params => params.node.rowIndex % 2 === 0,
          'odd-row': params => params.node.rowIndex % 2 !== 0,
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
        cellClassRules: {
          'even-row': params => params.node.rowIndex % 2 === 0,
          'odd-row': params => params.node.rowIndex % 2 !== 0,
        },
        aggFunc: "sum",
      },
      {
        headerName: "Notional",
        field: "volumeNotional",
        filter: "agNumberColumnFilter",
        cellDataType: "number",
        valueFormatter: numberFormatter,
        cellRenderer: "agAnimateSlideCellRenderer",
        cellClassRules: {
          'even-row': params => params.node.rowIndex % 2 === 0,
          'odd-row': params => params.node.rowIndex % 2 !== 0,
        },
        aggFunc: "sum",
      },
      {
        headerName: "Realised PL",
        field: "realizedPL",
        filter: "agNumberColumnFilter",
        cellDataType: "number",
        cellRenderer: "agAnimateShowChangeCellRenderer",
        valueFormatter: numberFormatter,
        cellClassRules: {
          'even-row': params => params.node.rowIndex % 2 === 0,
          'odd-row': params => params.node.rowIndex % 2 !== 0,
        },
        aggFunc: "sum",
      },
      {
        headerName: "Unrealised PL",
        field: "unrealizedPL",
        filter: "agNumberColumnFilter",
        cellDataType: "number",
        cellRenderer: "agAnimateShowChangeCellRenderer",
        valueFormatter: numberFormatter,
        cellClassRules: {
          'even-row': params => params.node.rowIndex % 2 === 0,
          'odd-row': params => params.node.rowIndex % 2 !== 0,
        },
        aggFunc: "sum",
      },
      {
        headerName: "Rules",
        field: "rule",
        cellClassRules: {
          'even-row': params => params.node.rowIndex % 2 === 0,
          'odd-row': params => params.node.rowIndex % 2 !== 0,
        },
      },
      {
        headerName: "Margin Utilization",
        field: "marginUtilization",
        filter: "agNumberColumnFilter",
        cellDataType: "number",
        cellRenderer: "agAnimateShowChangeCellRenderer",
        valueFormatter: numberFormatter,
        cellClassRules: {
          'even-row': params => params.node.rowIndex % 2 === 0,
          'odd-row': params => params.node.rowIndex % 2 !== 0,
        },
        aggFunc: "sum",
      },
      {
        headerName: "Longs",
        field: "longs",
        filter: "agNumberColumnFilter",
        cellDataType: "number",
        valueFormatter: numberFormatter,
        cellClassRules: {
          'even-row': params => params.node.rowIndex % 2 === 0,
          'odd-row': params => params.node.rowIndex % 2 !== 0,
        },
        aggFunc: "sum",
      },
      {
        headerName: "Shorts",
        field: "shorts",
        filter: "agNumberColumnFilter",
        cellDataType: "number",
        valueFormatter: numberFormatter,
        cellClassRules: {
          'even-row': params => params.node.rowIndex % 2 === 0,
          'odd-row': params => params.node.rowIndex % 2 !== 0,
        },
        aggFunc: "sum",
      },
      {
        headerName: "NAOI",
        field: "naoi",
        filter: "agNumberColumnFilter",
        cellDataType: "number",
        valueFormatter: numberFormatter,
        cellClassRules: {
          'even-row': params => params.node.rowIndex % 2 === 0,
          'odd-row': params => params.node.rowIndex % 2 !== 0,
        },
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
  return (
    <div className="ag-theme-quartz h-full w-full">
      <AgGridReact
        ref={gridRef}
        getRowId={getRowId}
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        pinnedTopRowData={pinnedTopRowData}
      />


      {showNewWindow && (
        <NewWindow
          onUnload={closeWindow}
          features={{ width: 1600, height: 900 }}
          title="Account Activity Login"
        >
          <AccountActivityWin accountActivityData={accountActivityProps}/>
        </NewWindow>
      )}

    </div>
  );
};