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
  import { numberFormatter } from "../../common/constant";
  import "../../styles/custom-ag-grid.css";

  export const PendingOrderWatchlist = ({loginID}) => {
  
    LicenseManager.setLicenseKey(
      "Using_this_{AG_Grid}_Enterprise_key_{AG-063926}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{River_Prime}_is_granted_a_{Single_Application}_Developer_License_for_the_application_{River_Prime}_only_for_{1}_Front-End_JavaScript_developer___All_Front-End_JavaScript_developers_working_on_{River_Prime}_need_to_be_licensed___{River_Prime}_has_been_granted_a_Deployment_License_Add-on_for_{1}_Production_Environment___This_key_works_with_{AG_Grid}_Enterprise_versions_released_before_{23_July_2025}____[v3]_[01]_MTc1MzIyNTIwMDAwMA==1200d27c6f62377b36b8f92b7c13fe53"
    );
    const [order, setorder] = useState();
  
    const gridRef = useRef(null);
    const colDefs = useMemo(
      () => [
        {
          field: "timeSetup",
          headerName: "Time Setup",
          minWidth: 160,
          filter: true,
          headerCheckboxSelection: true,
          checkboxSelection: true,
          width: 10,
          headerCheckboxSelectionFilteredOnly: true,
          cellClassRules: {
            'even-row': (params) => params.node.rowIndex % 2 === 0,
            'odd-row': (params) => params.node.rowIndex % 2 !== 0,
          },
        },
        {
          headerName: "Login ID",
          field: "login",
          hide: true,
          cellClassRules: {
            'even-row': params => params.node.rowIndex % 2 === 0,
            'odd-row': params => params.node.rowIndex % 2 !== 0,
          }
        },
        {
          headerName: "Position ID",
          field: "positionID",
          cellClassRules: {
            'even-row': params => params.node.rowIndex % 2 === 0,
            'odd-row': params => params.node.rowIndex % 2 !== 0,
          }
        },
        {
          headerName: "Order ID",
          field: "orderId",
          filter: "agNumberColumnFilter",
          cellDataType: "number",
          cellRenderer: "agAnimateShowChangeCellRenderer",
          valueFormatter: numberFormatter,
          cellClassRules: {
            'even-row': params => params.node.rowIndex % 2 === 0,
            'odd-row': params => params.node.rowIndex % 2 !== 0,
          },
        },
        {
          headerName: "Symbol",
          field: "symbol",
          cellRenderer: "agAnimateShowChangeCellRenderer",
          cellClassRules: {
            'even-row': params => params.node.rowIndex % 2 === 0,
            'odd-row': params => params.node.rowIndex % 2 !== 0,
          },
        },
          {
            headerName: "Price Order",
            field: "priceRequested",
            minWidth: 100,
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
            headerName: "Price Trigger",
            field: "priceTrigger",
            hide: true,
            filter: "agNumberColumnFilter",
            cellDataType: "number",
            cellRenderer: "agAnimateShowChangeCellRenderer",
            valueFormatter: numberFormatter,
            cellClassRules: {
              'even-row': params => params.node.rowIndex % 2 === 0,
              'odd-row': params => params.node.rowIndex % 2 !== 0,
            },
          },
          {
            headerName: "Price Current",
            field: "priceCurrent",
            minWidth: 120,
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
            headerName: "SL",
            field: "priceSL",
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
            headerName: "TP",
            field: "priceTP",
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
            headerName: "Volume Initial",
            field: "volumeRequested",
            minWidth: 120,
            filter: "agNumberColumnFilter",
            cellDataType: "number",
            cellRenderer: "agAnimateShowChangeCellRenderer",
            valueFormatter: numberFormatter,
            cellClassRules: {
              'even-row': params => params.node.rowIndex % 2 === 0,
              'odd-row': params => params.node.rowIndex % 2 !== 0,
            },
          },
          {
            headerName: "Volume Current",
            field: "volumeRemaining",
            minWidth: 120,
            cellClassRules: {
              'even-row': params => params.node.rowIndex % 2 === 0,
              'odd-row': params => params.node.rowIndex % 2 !== 0,
            },
          },
          {
            headerName: "Comments",
            field: "comments",
            cellClassRules: {
              'even-row': params => params.node.rowIndex % 2 === 0,
              'odd-row': params => params.node.rowIndex % 2 !== 0,
            },
          },
      ],
      []
    );
  
    useEffect(() => {
      const socket = new WebSocket("ws://192.168.3.164:8081/ws/api/v1/positionsActivities");
      let isSocketOpen = false;
  
      const handleMessage = (event) => {
        const data = JSON.parse(event.data);
        if(data.type === 'ClientAccountOrderActivities'){
            setorder(data?.orders)
        }
       
      };
  
      const sendRequest = () => {
        if (socket.readyState === WebSocket.OPEN) {
          const requestMessage = {
            type: "request",
            requestType: "positionsActivities",
            accounts: loginID
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
            accounts: "all",
          };
          socket.send(JSON.stringify(unsubscribeMessage));
          socket.removeEventListener("message", handleMessage);
          socket.close();
        }
      };
    }, [loginID]);
  
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
  
  
    const getRowId = useCallback(({ data: { orderId } }) => orderId?.toString(), []);
    return (
      <div className="ag-theme-quartz h-full w-full">
        <AgGridReact
          ref={gridRef}
          getRowId={getRowId}
          rowData={order}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          pagination={true}
        />
  
      </div>
    );
  };