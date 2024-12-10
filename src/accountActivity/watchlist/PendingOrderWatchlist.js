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

  export const PendingOrderWatchlist = ({loginID}) => {
  
    const [order, setorder] = useState();
  
    const gridRef = useRef(null);
    const colDefs = useMemo(
      () => [
        {
          headerCheckboxSelection: true,
          checkboxSelection: true,
          maxWidth: 50,
        },
        {
          field: "mtSubmit",
          headerName: "Time Setup",
          minWidth: 160,
          filter: true,
        },
        {
          headerName: "Login ID",
          field: "login",
          hide: true,
        },
        {
          headerName: "Position ID",
          field: "positionID",
          filter: true,
          hide: true,
        },
        {
          headerName: "Order ID",
          field: "orderId",
          filter: "agNumberColumnFilter",
          cellDataType: "number",
          cellRenderer: "agAnimateShowChangeCellRenderer",
          valueFormatter: numberFormatter,
        },
        {
          headerName: "Symbol",
          field: "symbol",
          filter: true,
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
        {field: 'type'},
          {
            headerName: "Price Order",
            field: "priceRequested",
            minWidth: 100,
            filter: "agNumberColumnFilter",
            cellDataType: "number",
            cellRenderer: "agAnimateShowChangeCellRenderer",
            valueFormatter: numberFormatter,
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
          },
          {
            field: "currentPrice",
            minWidth: 120,
            filter: "agNumberColumnFilter",
            cellDataType: "number",
            cellRenderer: "agAnimateShowChangeCellRenderer",
            valueFormatter: numberFormatter,
            aggFunc: "sum",
          },
          {
            headerName: "SL",
            field: "priceSL",
            filter: "agNumberColumnFilter",
            cellDataType: "number",
            cellRenderer: "agAnimateShowChangeCellRenderer",
            valueFormatter: numberFormatter,
            aggFunc: "sum",
          },
          {
            headerName: "TP",
            field: "priceTP",
            filter: "agNumberColumnFilter",
            cellDataType: "number",
            cellRenderer: "agAnimateShowChangeCellRenderer",
            valueFormatter: numberFormatter,
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
          },
          {
            headerName: "Volume Current",
            field: "volumeRemaining",
            filter: "agNumberColumnFilter",
            minWidth: 120,
          },
          {
            headerName: "Comments",
            field: "comments",
            filter: true,
          },
      ],
      []
    );
  
    useEffect(() => {
      const socket = new WebSocket("ws://192.168.3.164:8081/ws/api/v1/account/positionsActivities");
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
        floatingFilter: true,
        enableRowGroup: true,
        enableValue: true,
        enablePivot: true,
        sortable: true,
        resizable: true,
      }),
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
  
    const getRowId = useCallback(({ data: { orderId } }) => orderId?.toString(), []);
    return (
      <div className="ag-theme-balham-dark h-full w-full">
        <AgGridReact
          ref={gridRef}
          getRowId={getRowId}
          rowData={order}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          // pagination={true}
          rowDragManaged={true}
          rowSelection={"multiple"}
          // rowGroupPanelShow={"always"}
          suppressAggFuncInHeader
          groupDefaultExpanded={-1}
          sideBar={sideBar}
          rowHeight={20}
        />
  
      </div>
    );
  };