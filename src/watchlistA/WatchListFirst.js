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

import {LineGraphRenderer}  from "../graphs/LineGraphRenderer";

const numberFormatter = ({ value }) => {
    const formatter = new Intl.NumberFormat("en-US", {
        style: "decimal",
        maximumFractionDigits: 4,
    });
    return value == null ? "" : formatter.format(value);
};

export const WatchListFirst = () => {
    LicenseManager.setLicenseKey("Using_this_{AG_Grid}_Enterprise_key_{AG-063926}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{River_Prime}_is_granted_a_{Single_Application}_Developer_License_for_the_application_{River_Prime}_only_for_{1}_Front-End_JavaScript_developer___All_Front-End_JavaScript_developers_working_on_{River_Prime}_need_to_be_licensed___{River_Prime}_has_been_granted_a_Deployment_License_Add-on_for_{1}_Production_Environment___This_key_works_with_{AG_Grid}_Enterprise_versions_released_before_{23_July_2025}____[v3]_[01]_MTc1MzIyNTIwMDAwMA==1200d27c6f62377b36b8f92b7c13fe53");

    const [rowData, setRowData] = useState();
    const gridRef = useRef(null);
    const dataMapRef = useRef(new Map());

    useEffect(() => {
        const socket = new WebSocket('wss://stream.binance.com:9443/ws/!ticker@arr');
        // const socket = new WebSocket('ws://192.168.3.164:8081/ws/api_v1/watchlist');

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
                dataMapRef.current.set(item.symbol, item);
            });
            setRowData(Array.from(dataMapRef.current.values()));
    };

    const colDefs = useMemo(() => [
        {
            field: "symbol",
            headerName: "MT Symbol",
        },
        {
            headerName: "Ask",
            field: "ask",
            cellDataType: "number",
            valueFormatter: numberFormatter,
            cellRenderer: "agAnimateShowChangeCellRenderer",

        },
        {
            headerName: "Bid",
            field: "bid",
            cellDataType: "number",
            valueFormatter: numberFormatter,
            cellRenderer: "agAnimateShowChangeCellRenderer",
        },
        {
            headerName: "Spread",
            cellDataType: "number",
            field:"spread",
            valueFormatter: numberFormatter,
            cellRenderer: "agAnimateShowChangeCellRenderer",
        },
        {
            headerName: "High",
            field: "high",
            cellDataType: "number",
            valueFormatter: numberFormatter,
        },
        {
            headerName: "Low",
            field: "low",
            cellDataType: "number",
             valueFormatter: numberFormatter,
        },
        // {
        //     headerName: "Change (%)",
        //     field: "P",
        // },
        // {
        //     headerName: "Line Graph",
        //     minWidth: 350,
        //     cellRenderer: LineGraphRenderer,
        //     cellRendererParams: (params) => (
        //         {
        //         data: {
        //             timestamps: params.data.E, 
        //             asks: params.data.a, 
        //             bids: params.data.b,
        //             highs: params.data.h,
        //             lows: params.data.l,
        //             symbol: params.data.s
        //         }
        //     }
        // )
        // },
    ], []);

    const defaultColDef = useMemo(() => ({
        flex: 1,
        filter: true,
        enableRowGroup: true,
        enableValue: true,
    }), []);

    const getRowId = useCallback(({ data: { symbol } }) => symbol, []);
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
                // rowGroupPanelShow={"always"}
                suppressAggFuncInHeader
                groupDefaultExpanded={-1}
                immutableData={true}
                pagination={true}
                paginationPageSize={18}
                paginationPageSizeSelector={[, 50]}
            />
        </div>
    );
};
