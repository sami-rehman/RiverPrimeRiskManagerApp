import { useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import { LicenseManager } from "ag-grid-enterprise";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import styles from "./InventoryExample.module.css";
import { getData } from "./data";
import { ProductCellRenderer } from "./cell-renderers/ProductCellRenderer";
import { StockCellRenderer } from "./cell-renderers/StockCellRenderer";
import { PriceCellRenderer } from "./cell-renderers/PriceCellRenderer";

const paginationPageSizeSelector = [5, 10, 20];

 const BbookPosition = () => {
  LicenseManager.setLicenseKey(
    "Using_this_{AG_Grid}_Enterprise_key_{AG-063926}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{River_Prime}_is_granted_a_{Single_Application}_Developer_License_for_the_application_{River_Prime}_only_for_{1}_Front-End_JavaScript_developer___All_Front-End_JavaScript_developers_working_on_{River_Prime}_need_to_be_licensed___{River_Prime}_has_been_granted_a_Deployment_License_Add-on_for_{1}_Production_Environment___This_key_works_with_{AG_Grid}_Enterprise_versions_released_before_{23_July_2025}____[v3]_[01]_MTc1MzIyNTIwMDAwMA==1200d27c6f62377b36b8f92b7c13fe53"
  );
  const gridRef = useRef(null);

  const [colDefs] = useState([
    {
      field: "product",
      headerName: "Album Name",
      cellRenderer: "agGroupCellRenderer",
    //   headerClass: "header-product",
      cellRendererParams: {
        innerRenderer: ProductCellRenderer,
      },
      minWidth: 300,
    },
    { field: "artist" },
    { field: "year", width: 150, headerClass: "header-sku" },
    
    {
      field: "available",
      cellRenderer: StockCellRenderer,
    //   headerClass: "header-inventory",
      sortable: false,
    },
    {
      field: "incoming",
      cellEditorParams: {
        precision: 0,
        step: 1,
        showStepperButtons: true,
      },
      editable: true,
    },
    { field: "sold", headerClass: "header-calendar" },
    {
      headerName: "Est. Profit",
      colId: "profit",
      headerClass: "header-percentage",
      cellDataType: "number",
      valueGetter: ({ data: { price, sold } }) => (price * sold) / 10,
      valueFormatter: ({ value }) => `£${value}`,
      width: 150,
    },
  ]);

  const [rowData] = useState(getData());
  const defaultColDef = useMemo(() => ({ resizable: false }), []);

  const detailCellRendererParams = useMemo(() => ({
    detailGridOptions: {
      columnDefs: [
        { field: "title", flex: 1.5 },
        { field: "available", maxWidth: 120 },
        { field: "format", flex: 2 },
        { field: "label", flex: 1 },
        { field: "country", flex: 0.66 },
        { field: "cat", headerName: "Cat#", type: "rightAligned", flex: 0.66 },
        { field: "year", type: "rightAligned", maxWidth: 80 },
      ],
      headerHeight: 38,
    },
    getDetailRowData: ({ successCallback, data: { variantDetails } }) =>
      successCallback(variantDetails),
  }), []);
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* <div className={`ag-theme-quartz ag-theme-quartz ${styles.inventoryTable}`}> */}
        <div className="ag-theme-balham-dark h-full w-full">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={colDefs}
            detailCellRendererParams={detailCellRendererParams}
            defaultColDef={defaultColDef}
            suppressDragLeaveHidesColumns
            pagination
            paginationPageSize={paginationPageSizeSelector[1]}
            domLayout="autoHeight"
            animateRows
            suppressMovableColumns
            masterDetail
          />
        </div>
      </div>
    </div>
  );
};

export default BbookPosition;