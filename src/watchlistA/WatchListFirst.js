import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import { LicenseManager } from "ag-grid-enterprise";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { numberFormatter, LocalDateTimeRenderer } from '../common/constant';

import {LineGraphRenderer}  from "../graphs/LineGraphRenderer";


export const WatchListFirst = () => {

const WatchListFirstColDefs = [
        {
            field: "s",
            headerName: "MT Symbol",
        },
        {
            headerName: "Ask",
            field: "a",
            // field:"p",
            cellDataType: "number",
            valueFormatter: numberFormatter,
            cellRenderer: "agAnimateShowChangeCellRenderer",
    
        },
        {
            headerName: "Bid",
            field: "b",
            cellDataType: "number",
            valueFormatter: numberFormatter,
            cellRenderer: "agAnimateShowChangeCellRenderer",
        },
        {
            headerName: "Spread",
            cellDataType: "number",
            valueGetter: ({ data }) =>
                data && data.a - data.b,
            valueFormatter: numberFormatter,
            cellRenderer: "agAnimateShowChangeCellRenderer",
        },
        {
            headerName: "High",
            field: "h",
            cellDataType: "number",
            valueFormatter: numberFormatter,
        },
        {
            headerName: "Low",
            field: "l",
            cellDataType: "number",
             valueFormatter: numberFormatter,
        },
        {
            headerName: "Change (%)",
            field: "P",
        },
        // {
        //     headerName: "Line Graph",
        //     minWidth: 350,
        //     cellRenderer: LineGraphRenderer,
        //     cellRendererParams: (params) => ({
        //       data: {
        //         timestamps: params.data.E, 
        //         asks: params.data.a, 
        //         bids: params.data.b,
        //         highs: params.data.h,
        //         lows: params.data.l,
        //         symbol: params.data.s
        //       }
        //     })
        //   }
    ];

    const colDefs = useMemo(()=>WatchListFirstColDefs)

    LicenseManager.setLicenseKey("Using_this_{AG_Grid}_Enterprise_key_{AG-063926}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{River_Prime}_is_granted_a_{Single_Application}_Developer_License_for_the_application_{River_Prime}_only_for_{1}_Front-End_JavaScript_developer___All_Front-End_JavaScript_developers_working_on_{River_Prime}_need_to_be_licensed___{River_Prime}_has_been_granted_a_Deployment_License_Add-on_for_{1}_Production_Environment___This_key_works_with_{AG_Grid}_Enterprise_versions_released_before_{23_July_2025}____[v3]_[01]_MTc1MzIyNTIwMDAwMA==1200d27c6f62377b36b8f92b7c13fe53");

    const [rowData, setRowData] = useState();
    const gridRef = useRef(null);
    const dataMapRef = useRef(new Map());

    useEffect(() => {
        const socket = new WebSocket('wss://stream.binance.com:9443/ws/!ticker@arr');

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
            const incomingData = Array.isArray(data) ? data : [data];
            incomingData.forEach(item => {
                dataMapRef.current.set(item.s, item);
            });
            setRowData(Array.from(dataMapRef.current.values()));
    };

    const defaultColDef = useMemo(() => ({
        flex: 1,
        filter: true,
        enableRowGroup: true,
        enableValue: true,
        enablePivot: true,
    }), []);

    const getRowId = useCallback(({ data: { s } }) => s, []);


    return (
        <div className="ag-theme-quartz h-full w-full">
            <AgGridReact
                ref={gridRef}
                getRowId={getRowId}
                rowData={rowData}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
                enableRangeSelection
                rowSelection={"multiple"}
                suppressAggFuncInHeader
                groupDefaultExpanded={-1}
                // rowHeight={150}
                immutableData={true}
                pagination={true}
                paginationPageSize={18}
                paginationPageSizeSelector={[18, 50]}
            />
        </div>
    );
};
