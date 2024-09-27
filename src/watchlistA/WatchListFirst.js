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

import { themeBalham } from '@ag-grid-community/theming';
import "ag-grid-community/styles/ag-theme-balham.css";

const myTheme = themeBalham
	.withParams({
        backgroundColor: "#1f2836",
        browserColorScheme: "dark",
        chromeBackgroundColor: "#2E3744",
        foregroundColor: "#FFF",
        headerFontFamily: {
            googleFont: "IBM Plex Sans"
        },
        headerFontSize: "14px",
        iconSize: "12px",
        oddRowBackgroundColor: "#313945",
        spacing: "2px"
    });


export const WatchListFirst = ({WatchListColDefs, sideBar}) => {

    const colDefs = useMemo(()=>WatchListColDefs)

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
        // flex: 1,
        filter: true,
        enableRowGroup: true,
        enableValue: true,
        enablePivot: true,
    }), []);

    const getRowId = useCallback(({ data: { s } }) => s, []);

    const autoSizeStrategy = {
        type: 'fitGridWidth',
        defaultMinWidth: 135,
    };

   
    return (
        <div className="ag-theme-balham-dark h-full w-full">
            <AgGridReact
                ref={gridRef}
                getRowId={getRowId}
                rowData={rowData}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
                suppressAggFuncInHeader
                groupDefaultExpanded={-1}
                sideBar={sideBar}
                immutableData={true}
                pagination={true}
                autoSizeStrategy={autoSizeStrategy}
                // theme={myTheme}
            />
        </div>
    );
};
