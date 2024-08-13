// 'ws://192.168.3.164:8081/ws/api_v1/watchlist

import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const StockGrid = () => {
  const [rowData, setRowData] = useState([]);
  const gridRef = useRef(null);

  const columnDefs = [
    { field: 'symbol', headerName: 'Symbol' },
    { field: 'bid', headerName: 'Bid' },
    { field: 'ask', headerName: 'Ask' },
    { field: 'volume', headerName: 'Volume' },
    { field: 'datetime', headerName: 'DateTime' },

  ];

  useEffect(() => {
    // Set up WebSocket connection
    const socket = new WebSocket('ws://192.168.3.164:8081/ws/api_v1/watchlist');

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // Handle data whether it's an object or an array
      updateTable(data);
    };

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      socket.close();
    };
  }, []);

  const updateTable = (data) => {
    // Ensure data is an array, even if it is a single object
    const incomingData = Array.isArray(data) ? data : [data];

    setRowData(prevData => {
      // Create a map of existing data by symbol
      const dataMap = new Map(prevData.map(item => [item.symbol, item]));

      // Update the map with new data
      incomingData.forEach(item => {
        dataMap.set(item.symbol, item);
      });

      // Convert the map back to an array
      return Array.from(dataMap.values());
    });
  };

  return (
    <div className="ag-theme-alpine w-[100vw] h-[50vh] p-4">
      <AgGridReact
        ref={gridRef}
        columnDefs={columnDefs}
        rowData={rowData}
        onGridReady={(params) => params.api.sizeColumnsToFit()}
      />
    </div>
  );
};

export default StockGrid;
