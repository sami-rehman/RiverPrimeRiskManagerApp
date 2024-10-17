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
  
  export const LivePositionWatchlist = ({ loginID }) => {
    LicenseManager.setLicenseKey(
        "Using_this_{AG_Grid}_Enterprise_key_{AG-063926}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{River_Prime}_is_granted_a_{Single_Application}_Developer_License_for_the_application_{River_Prime}_only_for_{1}_Front-End_JavaScript_developer___All_Front-End_JavaScript_developers_working_on_{River_Prime}_need_to_be_licensed___{River_Prime}_has_been_granted_a_Deployment_License_Add-on_for_{1}_Production_Environment___This_key_works_with_{AG_Grid}_Enterprise_versions_released_before_{23_July_2025}____[v3]_[01]_MTc1MzIyNTIwMDAwMA==1200d27c6f62377b36b8f92b7c13fe53"
      );
  
    const [position, setPosition] = useState();
    const gridRef = useRef(null);

    console.log('positionXX', position)
  
    const colDefs = useMemo(
              () => [
                {
                  headerName: "DATE TIME",
                  field: "activationTime",
                  filter: true,
                  headerCheckboxSelection: true,
                  checkboxSelection: true,
                  minWidth: 160,
                  headerCheckboxSelectionFilteredOnly: true,
                  cellClassRules: {
                    'even-row': (params) => params.node.rowIndex % 2 === 0,
                    'odd-row': (params) => params.node.rowIndex % 2 !== 0,
                  },
                },
                {
                  headerName: "ACCOUNT ID",
                  field: "login",
                  hide: true,
                  cellClassRules: {
                    'even-row': params => params.node.rowIndex % 2 === 0,
                    'odd-row': params => params.node.rowIndex % 2 !== 0,
                  }
                },
                {
                  headerName: "POSITION ID",
                  field: "positionId",
                  minWidth: 110,
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
                  headerName: "SYMBOL",
                  field: "symbol",
                  minWidth: 70,
                  cellRenderer: "agAnimateShowChangeCellRenderer",
                  cellClassRules: {
                    'even-row': params => params.node.rowIndex % 2 === 0,
                    'odd-row': params => params.node.rowIndex % 2 !== 0,
                  },
                },
                {
                  headerName: "SIDE",
                  field: "side",
                  minWidth: 80,
                  filter: "agNumberColumnFilter",
                  cellRenderer: "agAnimateSlideCellRenderer",
                  cellClassRules: {
                    'even-row': params => params.node.rowIndex % 2 === 0,
                    'odd-row': params => params.node.rowIndex % 2 !== 0,
                  },
                },
                {
                  headerName: "TYPE",
                  field: "type",
                  minWidth: 80,
                  cellClassRules: {
                    'even-row': params => params.node.rowIndex % 2 === 0,
                    'odd-row': params => params.node.rowIndex % 2 !== 0,
                  },
                },
                {
                  headerName: "REQ. QTY",
                  field: "requestedQuantity",
                  minWidth: 90,
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
                    headerName: "QTY. FILLED",
                    field: "quantityRemaining",
                    minWidth: 100,
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
                    headerName: "Requested PRICE",
                    field: "price",
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
                    headerName: "TRIG. PRICE",
                    field: "trigger_price",
                    minWidth: 110,
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
                  headerName: "TIF(expiry)",
                  field: "tif",
                  minWidth: 100,
                  cellClassRules: {
                    'even-row': params => params.node.rowIndex % 2 === 0,
                    'odd-row': params => params.node.rowIndex % 2 !== 0,
                  },
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
                },
                {
                  headerName: "TP",
                  field: "priceTP",
                  filter: "agNumberColumnFilter",
                  cellDataType: "number",
                  valueFormatter: numberFormatter,
                  cellClassRules: {
                    'even-row': params => params.node.rowIndex % 2 === 0,
                    'odd-row': params => params.node.rowIndex % 2 !== 0,
                  },
                },
                {
                  headerName: "AVG. FILL PRICE",
                  field: "averageFillPrice",
                  hide:true,
                  filter: "agNumberColumnFilter",
                  cellDataType: "number",
                  valueFormatter: numberFormatter,
                  cellClassRules: {
                    'even-row': params => params.node.rowIndex % 2 === 0,
                    'odd-row': params => params.node.rowIndex % 2 !== 0,
                  },
                },
                {
                    headerName: "UNPL",
                    field: "profit",
                    filter: "agNumberColumnFilter",
                    cellDataType: "number",
                    valueFormatter: numberFormatter,
                    cellClassRules: {
                      'even-row': params => params.node.rowIndex % 2 === 0,
                      'odd-row': params => params.node.rowIndex % 2 !== 0,
                    },
                  },
                  {
                    headerName: "DESTINATION",
                    field: "destination",
                    hide: true,
                    cellClassRules: {
                      'even-row': params => params.node.rowIndex % 2 === 0,
                      'odd-row': params => params.node.rowIndex % 2 !== 0,
                    },
                  },
                  {
                    headerName: "CURRENT PRICE",
                    field: "price",
                    hide: true,
                    filter: "agNumberColumnFilter",
                    cellDataType: "number",
                    valueFormatter: numberFormatter,
                    cellClassRules: {
                      'even-row': params => params.node.rowIndex % 2 === 0,
                      'odd-row': params => params.node.rowIndex % 2 !== 0,
                    },
                  },
                  {
                    headerName: "FIXID",
                    field: "fixId",
                    filter: "agNumberColumnFilter",
                    cellDataType: "number",
                    valueFormatter: numberFormatter,
                    cellClassRules: {
                      'even-row': params => params.node.rowIndex % 2 === 0,
                      'odd-row': params => params.node.rowIndex % 2 !== 0,
                    },
                  },
                  {
                    headerName: "COMMENTS",
                    field: "comments",
                   hide: true,
                    cellClassRules: {
                      'even-row': params => params.node.rowIndex % 2 === 0,
                      'odd-row': params => params.node.rowIndex % 2 !== 0,
                    },
                  },
                  {
                    headerName: "MARGIN",
                    field: "margin",
                    hide: true,
                    filter: "agNumberColumnFilter",
                    cellDataType: "number",
                    valueFormatter: numberFormatter,
                    cellClassRules: {
                      'even-row': params => params.node.rowIndex % 2 === 0,
                      'odd-row': params => params.node.rowIndex % 2 !== 0,
                    },
                  },
              ],
              []
            );
      
    useEffect(() => {
      const socket = new WebSocket(
        "ws://192.168.3.164:8081/ws/api/v1/account/positionsActivities"
      );
      let isSocketOpen = false;
  
      const handleMessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "ClientAccountPositionActivities") {
          setPosition(data?.positions);
        }
      };
  
      const sendRequest = () => {
        if (socket.readyState === WebSocket.OPEN) {
          const requestMessage = {
            type: "request",
            requestType: "positionsActivities",
            accounts: loginID,
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
  
    // Unique row ID based on positionId
    const getRowId = useCallback(
      ({ data: { positionId } }) => positionId?.toString(),
      []
    );
  
    return (
      <div className="ag-theme-quartz h-full w-full">
        <AgGridReact
          ref={gridRef}
          getRowId={getRowId}
          rowData={position}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          pagination={true}
        />
      </div>
    );
  };
  