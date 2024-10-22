import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-quartz.css";
import { numberFormatter } from "../common/constant";
// import "../styles/custom-ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { rawDataPiechartEquity } from "../constant";
import { StatusRender } from "./statusRendered";
import { PercentageUnderline } from "./percentageUnderline";

export const TradingAccountGrid = () => {

  const [rowData] = useState(rawDataPiechartEquity);
  const gridRef = useRef(null);

  const colDefs = useMemo(
    () => [
      {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        maxWidth: 50,
      },
      {
        field: "rule",
        headerName: "Status",
        filter: true,
        maxWidth: 79,
        cellRenderer: StatusRender,
      },
      {
        field: "login",
        headerName: "MT Login",
        rowDrag: true,
        filter: true,
        minWidth: 99,
      },
      {
        headerName: "MT Group:",
        field: "group",
        hide: true,
      },
      {
        headerName: "Equity",
        field: "equity",
        filter: "agNumberColumnFilter",
        cellDataType: "number",
        cellRenderer: "agAnimateShowChangeCellRenderer",
        valueFormatter: numberFormatter,
        aggFunc: "sum",
      },
      {
        headerName: "Lots",
        field: "volumeLots",
        filter: "agNumberColumnFilter",
        cellDataType: "number",
        valueFormatter: numberFormatter,
        cellRenderer: "agAnimateShowChangeCellRenderer",
        aggFunc: "sum",
      },
      {
        headerName: "Notional",
        field: "volumeNotional",
        filter: "agNumberColumnFilter",
        cellDataType: "number",
        valueFormatter: numberFormatter,
        cellRenderer: "agAnimateSlideCellRenderer",
        aggFunc: "sum",
      },
      {
        headerName: "Realised PL",
        field: "realizedPL",
        filter: "agNumberColumnFilter",
        cellDataType: "number",
        cellRenderer: "agAnimateShowChangeCellRenderer",
        valueFormatter: numberFormatter,
        aggFunc: "sum",
      },
      {
        headerName: "Unrealised PL",
        field: "unrealizedPL",
        filter: "agNumberColumnFilter",
        cellDataType: "number",
        cellRenderer: "agAnimateShowChangeCellRenderer",
        valueFormatter: numberFormatter,
        aggFunc: "sum",
      },
      {
        headerName: "Rules",
        field: "rule",
        filter: "agSetColumnFilter",
        filterParams: {
        suppressMiniFilter: true,
      },
      },
      {
        headerName: "Margin Utilization",
        field: "marginUtilization",
        filter: "agNumberColumnFilter",
        cellRenderer: (params) => (
          <PercentageUnderline
            value={params?.data?.marginUtilization} 
            percentage={params?.data?.marginUtilizationPercentage}
          />
        ),
      },
      {
        headerName: "Longs",
        field: "longs",
        filter: "agNumberColumnFilter",
        cellDataType: "number",
        valueFormatter: numberFormatter,
        aggFunc: "sum",
      },
      {
        headerName: "Shorts",
        field: "shorts",
        filter: "agNumberColumnFilter",
        cellDataType: "number",
        valueFormatter: numberFormatter,
        aggFunc: "sum",
      },
      {
        headerName: "NAOI",
        field: "naoi",
        filter: "agNumberColumnFilter",
        cellDataType: "number",
        valueFormatter: numberFormatter,
        aggFunc: "sum",
      },
    ],
    []
  );
  
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

  const getRowId = useCallback(({ data: { login } }) => login?.toString(), []);

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
    {/* <div className="ag-theme-alpine h-full w-full"> */}
      <AgGridReact
        ref={gridRef}
        getRowId={getRowId}
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        rowDragManaged={true}
        rowSelection={"multiple"}
        rowGroupPanelShow={"always"}
        suppressAggFuncInHeader
        groupDefaultExpanded={-1}
        sideBar={sideBar}
        rowHeight={18}
      
      />
    </div>
  );
};