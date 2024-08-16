import React, { useState, useEffect, useMemo, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const numberFormatter = ({ value }) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    maximumFractionDigits: 4,
  });
  return value == null ? "" : formatter.format(value);
};

const StockGrid = () => {
  const [rowData, setRowData] = useState([]);
  const gridRef = useRef(null);
  const dataMapRef = useRef(new Map());
  const lastUpdateTimeRef = useRef(Date.now());

  const columnDefs = [
    {
      field: 's',
      headerName: 'Symbol',
      enableRowChangeFlash: true,
    },
    {
      field: 'b',
      headerName: 'Bid',
      cellRenderer: 'agAnimateShowChangeCellRenderer',
      // enableCellChangeFlash: true, 
      valueFormatter: numberFormatter,
    },
    {
      field: 'a',
      headerName: 'Ask',
      cellRenderer: 'agAnimateShowChangeCellRenderer',
      // enableCellChangeFlash: true, 
      valueFormatter: numberFormatter,
    },
  ];

  const defaultColDef = useMemo(() => {
    return {
      filter: true,
      flex: 1,
    };
  }, []);

  useEffect(() => {
    const socket = new WebSocket('wss://stream.binance.com:9443/ws/!ticker');

    const handleMessage = (event) => {
      const data = JSON.parse(event.data);
      throttleUpdateTable(data);
    };

    socket.addEventListener('message', handleMessage);

    return () => {
      socket.removeEventListener('message', handleMessage);
      socket.close();
    };
  }, []);

  const throttleUpdateTable = (data) => {
    const currentTime = Date.now();

    if (currentTime - lastUpdateTimeRef.current >= 500) {
      lastUpdateTimeRef.current = currentTime;

      const incomingData = Array.isArray(data) ? data : [data];

      incomingData.forEach(item => {
        // Convert bid and ask to numbers
        item.b = parseFloat(item.b);
        item.a = parseFloat(item.a);

        dataMapRef.current.set(item.s, item);
      });

      setRowData(Array.from(dataMapRef.current.values()));
    }
  };

  return (
    <div className="ag-theme-quartz h-full w-full">
      <AgGridReact
        ref={gridRef}
        defaultColDef={defaultColDef}
        columnDefs={columnDefs}
        rowData={rowData}
        getRowId={(params) => params.data.s}
        immutableData={true}
        onGridReady={(params) => params.api.sizeColumnsToFit()}
        // pagination={true}
        // paginationPageSize={7}
        // paginationPageSizeSelector={[7, 14]}
      />
    </div>
  );
};

export default StockGrid;
