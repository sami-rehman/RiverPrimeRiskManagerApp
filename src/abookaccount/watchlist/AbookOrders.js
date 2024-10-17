import { useMemo, useRef, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import { LicenseManager } from "ag-grid-enterprise";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const AbookOrders = () => {
  LicenseManager.setLicenseKey(
    "Using_this_{AG_Grid}_Enterprise_key_{AG-063926}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{River_Prime}_is_granted_a_{Single_Application}_Developer_License_for_the_application_{River_Prime}_only_for_{1}_Front-End_JavaScript_developer___All_Front-End_JavaScript_developers_working_on_{River_Prime}_need_to_be_licensed___{River_Prime}_has_been_granted_a_Deployment_License_Add-on_for_{1}_Production_Environment___This_key_works_with_{AG_Grid}_Enterprise_versions_released_before_{23_July_2025}____[v3]_[01]_MTc1MzIyNTIwMDAwMA==1200d27c6f62377b36b8f92b7c13fe53"
  );

  const [rowData, setRowData] = useState()
  const gridRef = useRef(null);
  const dataMapRef = useRef(new Map());

  const colDefs = [
    {
      children: [
        {
          field: "login",
          headerName: "Account",
        }
      ]
    },
    {
      headerName: 'Parties',
      children: [
        {
          field: "orderId",
          headerName: "Order ID",
        },
        {
          field: "positionID",
          headerName: "Position ID",
          // hide: true,
        },
        {
          field: "brokerId",
          headerName: "Broker_ID",
          hide: true,
        },
        {
          field: "accountIdLp",
          headerName: "Account_ID@LP",
          hide: true,
        },
        {
          field: "destination",
          headerName: "Destination",
          hide:true
        }
      ]
    },
    {
      headerName: 'Particular of the Trade',
      // hide: true,
      children: [
        {
          field: "rule",
          headerName: "Rule",
          hide: true,
        },
        {
          field: "prompt",
          headerName: "Prompt",
          hide: true,
        },
        {
          field: "lp_oid",
          headerName: "LP_Order ID",
        },
        {
          field: "side",
          hide: true,
        },
        {
          field: "symbol",
          headerName: "Symbol",
        },
        {
          field: "type",
          headerName: "Type",
        },
        {
          field: "priceCurrent",
          // headerName: "QTY: R|F|L",
        },
        {
          field: "priceRequested",
          headerName: "Price (Req)",
        },
        {
          field: "timeExpiration",
        },
        {
          field: "volumeRemaining ",
        },
        {
          field: "volumeRequested",
        },
        {
          field: "comments",
          headerName: "Comments",
          hide: true,
        },
      ]
    }
  ];

  useEffect(() => {
    const socket = new WebSocket("ws://192.168.3.164:8081/ws/api/v1/bookA/bookPositions");
    let isSocketOpen = false;

    const handleMessage = (event) => {
      const data = JSON.parse(event.data);
      updateTable(data?.orders);
    };

    const sendRequest = () => {
      if (socket.readyState === WebSocket.OPEN) {
        const requestMessage = {
          type: "request",
          requestType: "a_book_positions",
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
          requestType: "a_book_positions",
          accounts: 'all',
        };
        socket.send(JSON.stringify(unsubscribeMessage));
        socket.removeEventListener("message", handleMessage);
        socket.close();
      }
    };
  }, []);


  const updateTable = (data) => {
    if (!data) return;  // If data is undefined or null, return early
  
    const incomingData = Array.isArray(data) ? data : [data];
    
    incomingData.forEach(item => {
      // Check if the item exists and has the 'login' property
      if (item && item.login) {
        dataMapRef.current.set(item.login, item);
      } else {
        console.warn('Invalid item received:', item);  // Log any problematic item for debugging
      }
    });
  
    setRowData(Array.from(dataMapRef.current.values()));
  };

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
        suppressDragLeaveHidesColumns
        pagination
        animateRows
        suppressMovableColumns
        masterDetail
      />
    </div>
  );
};

export default AbookOrders;