'use strict';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { userData } from './constant';

export const GridExample = ({ data, columnDefs }) => {
    const gridRef = useRef(null);

    // const onGridReady = (params) => {
    //     fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
    //         .then((resp) => resp.json())
    //         .then((data) => {
    //             setRowData(data);
    //         });
    // };

    const defaultColDef = useMemo(() => {
        return {
            filter: true,
            flex: 1,
        };
    }, []);
    return (
        <div className="ag-theme-quartz h-full w-full">
            <AgGridReact
                ref={gridRef}
                rowData={data}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                // onGridReady={onGridReady}
                pagination={true}
                paginationPageSize={7}
                paginationPageSizeSelector={[7, 14]}
            />
        </div>
    );
};
