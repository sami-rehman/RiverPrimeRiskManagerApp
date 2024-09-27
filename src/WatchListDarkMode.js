import { AgGridReact } from "ag-grid-react";
import { themeQuartz } from "@ag-grid-community/theming";
import React from "react";

const myTheme = themeQuartz.withParams({
  backgroundColor: "#1F2631",
  browserColorScheme: "dark",
  chromeBackgroundColor: {
    ref: "foregroundColor",
    mix: 0.07,
    onto: "backgroundColor",
  },
  columnBorder: true,
  fontSize: "12px",
  foregroundColor: "#FFFFFF",
  headerFontSize: 14,
  iconSize: "12px",
  oddRowBackgroundColor: "#2F353F",
  spacing: "2px",
  textColor: "#E2D6D6",
});

const WatchListDarkMode = () => {
    const rowData = (() => {
        const rowData = [];
        for (let i = 0; i < 10; i++) {
          rowData.push({ make: "Toyota", model: "Celica", price: 35000 + i * 1000 });
          rowData.push({ make: "Ford", model: "Mondeo", price: 32000 + i * 1000 });
          rowData.push({
            make: "Porsche",
            model: "Boxster",
            price: 72000 + i * 1000,
          });
        }
        return rowData;
      })();
      
      const columnDefs = [{ field: "make" }, { field: "model" }, { field: "price" }];
      
      const defaultColDef = {
        editable: true,
        flex: 1,
        minWidth: 100,
        filter: true,
      };
  return (
    <div className="h-full w-full">
    <AgGridReact
      theme={myTheme}
      loadThemeGoogleFonts
      columnDefs={columnDefs}
      rowData={rowData}
      defaultColDef={defaultColDef}
    />
    </div>
  );
};


export default WatchListDarkMode;