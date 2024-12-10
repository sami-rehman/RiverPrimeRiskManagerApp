import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
  } from "react";
  import { AgGridReact } from "ag-grid-react";
  
  import "ag-grid-community/styles/ag-grid.css";
  import "ag-grid-community/styles/ag-theme-quartz.css";
  import { numberFormatter } from "../../common/constant";
  import "../../styles/custom-ag-grid.css";
  
  export const LivePositionWatchlist = ({ loginID }) => {
  
    const [position, setPosition] = useState();
    const gridRef = useRef(null);
   const colDefs = useMemo(
      () => [
        {
          headerCheckboxSelection: true,
          checkboxSelection: true,
          maxWidth: 50,
        },
        {
          headerName: "Activation Time ",
          field: "mtExecution",
          filter: true,
          minWidth: 160,
        },
        {
          headerName: "Account id",
          field: "login",
          hide: true,
        },
        {
          headerName: "Position ID",
          field: "positionId",
          minWidth: 120,
          filter: "agNumberColumnFilter",
          cellDataType: "number",
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
        {
          headerName: "Symbol",
          field: "symbol",
          minWidth: 120,
          filter: true,
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
        {
          headerName: "Side",
          field: "side",
          minWidth: 90,
          filter: true,
          cellRenderer: "agAnimateSlideCellRenderer",
        },
        {
          headerName: "Type",
          field: "type",
          minWidth: 80,
          filter: true,
        },
        {
          headerName: "Req. qty",
          field: "requestedQuantity",
          minWidth: 90,
          filter: "agNumberColumnFilter",
          cellDataType: "number",
          cellRenderer: "agAnimateShowChangeCellRenderer",
          valueFormatter: numberFormatter,
          aggFunc: "sum",
        },
        {
          headerName: "Qty. filled",
          field: "quantityRemaining",
          minWidth: 100,
          filter: "agNumberColumnFilter",
          cellDataType: "number",
          cellRenderer: "agAnimateShowChangeCellRenderer",
          valueFormatter: numberFormatter,
          hide: true,
        },
        {
          headerName: "Requested price",
          field: "price",
          hide: true,
          filter: "agNumberColumnFilter",
          cellDataType: "number",
          cellRenderer: "agAnimateShowChangeCellRenderer",
          valueFormatter: numberFormatter,
        },
        {
          headerName: "Trig. price",
          field: "trigger_price",
          minWidth: 110,
          filter: "agNumberColumnFilter",
          cellDataType: "number",
          cellRenderer: "agAnimateShowChangeCellRenderer",
          valueFormatter: numberFormatter,
        },
        {
          headerName: "Tif(expiry)",
          field: "tif",
          minWidth: 100,
          filter: true,
        },
        {
          headerName: "SL",
          field: "priceSL",
          filter: "agNumberColumnFilter",
          cellDataType: "number",
          cellRenderer: "agAnimateShowChangeCellRenderer",
          valueFormatter: numberFormatter,
        },
        {
          headerName: "TP",
          field: "priceTP",
          filter: "agNumberColumnFilter",
          cellDataType: "number",
          valueFormatter: numberFormatter,
        },
        {
          headerName: "Avg. fill price",
          field: "averageFillPrice",
          hide: true,
          filter: "agNumberColumnFilter",
          cellDataType: "number",
          valueFormatter: numberFormatter,
        },
        {
          headerName: "UnP&L",
          field: "profit",
          filter: "agNumberColumnFilter",
          cellDataType: "number",
          valueFormatter: numberFormatter,
        },
        {
          headerName: "Destination",
          field: "destination",
          // hide: true,
        },
        {
          headerName: "Current price",
          field: "price",
          hide: true,
          filter: "agNumberColumnFilter",
          cellDataType: "number",
          valueFormatter: numberFormatter,
        },
        {
          headerName: "Fix ID",
          field: "fixId",
          filter: "agNumberColumnFilter",
          // hide: true,
        },
        {
          headerName: "Comments",
          field: "comments",
          hide: true,
        },
        {
          headerName: "Margin",
          field: "margin",
          // hide: true,
          filter: "agNumberColumnFilter",
          cellDataType: "number",
          valueFormatter: numberFormatter,
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
        floatingFilter: true,
        enableRowGroup: true,
        enableValue: true,
        enablePivot: true,
        sortable: true,
        resizable: true,
        // minWidth: 120,
      }),
      []
    );
  
    // Unique row ID based on positionId
    const getRowId = useCallback(
      ({ data: { positionId } }) => positionId?.toString(),
      []
    );

    const  sideBar ={
      toolPanels: [
        {
          id: 'columns',
          labelDefault: 'Columns',
          toolPanel: 'agColumnsToolPanel',
          labelKey: 'columns',
          iconKey: 'columns'
        },
        {
          id: 'filters',
          labelDefault: 'Filters',
          toolPanel: 'agFiltersToolPanel',
          labelKey: 'filters',
          iconKey: 'filter'
        }
      ],
      hiddenByDefault: false,  // This collapses the sidebar by default
    };
  
    return (
      <div className="ag-theme-balham-dark h-full w-full">
        <AgGridReact
          ref={gridRef}
          getRowId={getRowId}
          rowData={position}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          rowDragManaged={true}
          rowSelection={"multiple"}
          suppressAggFuncInHeader
          groupDefaultExpanded={-1}
          sideBar={sideBar}
          rowHeight={20}
        />
      </div>
    );
  };
