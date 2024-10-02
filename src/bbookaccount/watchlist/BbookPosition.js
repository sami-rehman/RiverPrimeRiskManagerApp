import { useMemo, useRef, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import { LicenseManager } from "ag-grid-enterprise";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

 const BbookPosition = () => {
  LicenseManager.setLicenseKey(
    "Using_this_{AG_Grid}_Enterprise_key_{AG-063926}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{River_Prime}_is_granted_a_{Single_Application}_Developer_License_for_the_application_{River_Prime}_only_for_{1}_Front-End_JavaScript_developer___All_Front-End_JavaScript_developers_working_on_{River_Prime}_need_to_be_licensed___{River_Prime}_has_been_granted_a_Deployment_License_Add-on_for_{1}_Production_Environment___This_key_works_with_{AG_Grid}_Enterprise_versions_released_before_{23_July_2025}____[v3]_[01]_MTc1MzIyNTIwMDAwMA==1200d27c6f62377b36b8f92b7c13fe53"
  );

  const [rowData, setRowData] = useState()
  const gridRef = useRef(null);
  const dataMapRef = useRef(new Map());

  const [colDefs] = useState([
    {
      field: "login",
      headerName: "Account",
    },
    { field: "symbol" },
    { field: "side" },
    { field: "currentPrice" },
    { field: "price" },
    { field: "priceSL" },
    { field: "priceTP" },
    { field: "profit" },
    { field: "quantityRemaining", headerName:"Rem. Qty" },
    { field: "requestedQuantity",  headerName:"Req. Qty" },
    { field: "marginUtilization" },
  ]);

  useEffect(() => {
    const socket = new WebSocket(
      "ws://192.168.3.164:8081/ws/api/v1/bookPositionsB"
    );
    let isSocketOpen = false;

    const handleMessage = (event) => {
      const data = JSON.parse(event.data);
      updateTable(data);
    };

    const sendRequest = () => {
      if (socket.readyState === WebSocket.OPEN) {
        const requestMessage = {
          type: "request",
          requestType: "b_book_positions",
          accounts: 'all',
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
          requestType: "positionsActivities",
          accounts: 'all',
        };
        socket.send(JSON.stringify(unsubscribeMessage));
        socket.removeEventListener("message", handleMessage);
        socket.close();
      }
    };
  }, []);

  const updateTable = (data) => {
    const incomingData = Array.isArray(data) ? data : [data];
    incomingData.forEach(item => {
        dataMapRef.current.set(item.login, item);
    });
    setRowData(Array.from(dataMapRef.current.values()));
};

  const detailCellRendererParams = useMemo(() => ({
    detailGridOptions: {
      columnDefs: [
        { field: "title", flex: 1.5 },
        { field: "available", maxWidth: 120 },
        { field: "format", flex: 2 },
        { field: "label", flex: 1 },
        { field: "country", flex: 0.66 },
        { field: "cat", headerName: "Cat#", type: "rightAligned", flex: 0.66 },
        { field: "year", type: "rightAligned", maxWidth: 80 },
      ],
      headerHeight: 38,
    },
    getDetailRowData: ({ successCallback, data: { variantDetails } }) =>
      successCallback(variantDetails),
  }), []);

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      enableRowGroup: true,
      enableValue: true,
      enablePivot: true,
      sortable: true,
      resizable: true,
    }),
    []
  );

  return (
        <div className="ag-theme-balham-dark h-full w-full">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            detailCellRendererParams={detailCellRendererParams}
            suppressDragLeaveHidesColumns
            pagination
            animateRows
            suppressMovableColumns
            masterDetail
          />
        </div>
  );
};

export default BbookPosition;