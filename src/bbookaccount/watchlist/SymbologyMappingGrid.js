import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

const SymbologyMappingGrid = () => {
    const [category, setCategory] = useState("Forex");
    const [symbol, setSymbol] = useState("EURUSD");

    const categories = ["Forex", "Crypto", "Metals"];
    const symbols = {
        Forex: ["EURUSD", "USDJPY", "EURONZ", "USDBTC"],
        Crypto: ["BTCUSD", "ETHUSD", "LTCUSD"],
        Metals: ["XAUUSD", "XAGUSD"]
    };

    const parseValue = (value) => {
        // Convert string to numeric value for comparison
        if (typeof value === "string") {
            const numValue = parseFloat(value.replace(/[^0-9.-]/g, ""));
            return isNaN(numValue) ? null : numValue;
        }
        return value;
    };

    const getCellStyle = (params, mtField) => {
        const mtValue = parseValue(params.data[mtField]);
        const cellValue = parseValue(params.value);
    
        if (mtValue !== null && cellValue !== null) {
            if (cellValue < mtValue) {
                return { backgroundColor: "rgba(0, 226, 114, 1)", color: "white" };
            } else if (cellValue > mtValue) {
                return { backgroundColor: "rgba(250, 75, 66, 1)", color: "white" };
            }
        }
        return null; // No style applied if values cannot be compared
    };

    const columnDefs = [
        { headerName: "Attribute", field: "attribute", pinned: "left", width: 120 },
        { headerName: "MT", field: "mt", width: 200,
            cellStyle: { fontWeight: "bold", backgroundColor: "#333", color: "#fff" },
         },
        { headerName: "CMC", field: "cmc", width: 200,
            cellStyle: (params) => getCellStyle(params, "mt"),
         },
        { headerName: "LMAX", field: "lmax", width: 200,
            cellStyle: (params) => getCellStyle(params, "mt"),
         },
        { headerName: "Match-Prime", field: "matchPrime", width: 200,
            cellStyle: (params) => getCellStyle(params, "mt"),
         }
    ];

    const rowData = [
        { attribute: "Mapped to", cmc: "CMCEURUSD", lmax: "LMAXEURUSD", matchPrime: "MPEURUSD", mt: "MTEURUSD" },
        
        // Pricing and Markup
        { attribute: "Markup", cmc: "0.3 pips", lmax: "0.1 pips", matchPrime: "0.2 pips", mt: "0.2 pips" },
        { attribute: "Spreads", cmc: "0.00024", lmax: "0.0029", matchPrime: "0.00011", mt: "0.00011" },
        
        // Costs
        { attribute: "Fees", cmc: "$3 per lot", lmax: "$2.5 per lot", matchPrime: "$3 per lot", mt: "$3 per lot" },
        { attribute: "Commissions", cmc: "$5 per million", lmax: "$4.5 per million", matchPrime: "$5 per million", mt: "$5 per million" },
        
        // Margin Requirements
        { attribute: "Init. Margins", cmc: "1.5%", lmax: "2.0%", matchPrime: "2.0%", mt: "2.0%" },
        { attribute: "Main. Margins", cmc: "0.75%", lmax: "1.0%", matchPrime: "0.9%", mt: "0.9%" },
        
        // Leverage
        { attribute: "Leverage", cmc: "1:200", lmax: "1:100", matchPrime: "1:150", mt: "1:150" },
        
        // Order Types
        { attribute: "OT: Limit", cmc: "Supported", lmax: "Not supported", matchPrime: "Supported", mt: "Supported" },
        { attribute: "OT: Stop", cmc: "Supported", lmax: "Supported", matchPrime: "Not supported", mt: "Not supported" },
        { attribute: "OT: Market", cmc: "Supported", lmax: "Supported", matchPrime: "Supported", mt: "Supported" },
        
        // Size Limits
        { attribute: "Min. Size", cmc: "0.01 lot", lmax: "0.1 lot", matchPrime: "0.01 lot", mt: "0.01 lot" },
        { attribute: "Max. Size", cmc: "500 lots", lmax: "100 lots", matchPrime: "200 lots", mt: "200 lots" },
        
        // Price and Contract Specifications
        { attribute: "Price format", cmc: "5 decimals", lmax: "4 decimals", matchPrime: "5 decimals", mt: "5 decimals" },
        { attribute: "Precision", cmc: "0.00001", lmax: "0.0001", matchPrime: "0.00001", mt: "0.00001" },
        { attribute: "Price multiplier", cmc: "100", lmax: "1000", matchPrime: "100", mt: "100" },
        { attribute: "Contract size multiplier", cmc: "100,000", lmax: "1,000,000", matchPrime: "100,000", mt: "100,000" }
    ];

    const defaultColDef = {
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
    };

    return (
        <div className="p-1 w-full h-full">
            <div className="flex gap-2 mb-2 items-center">
                <div className="flex flex-col align-center">
                    {/* <label className="flex justify-center text-xs font-medium text-gray-600 dark:text-gray-500">Category</label> */}
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border border-gray-300 dark:border-gray-700 rounded px-1 text-xs bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col">
                    {/* <label className="flex justify-center text-xs font-medium text-gray-600 dark:text-gray-500">Symbol</label> */}
                    <select
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value)}
                        className="border border-gray-300 dark:border-gray-700 rounded px-1  text-xs bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {symbols[category].map((sym) => (
                            <option key={sym} value={sym}>{sym}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="ag-theme-balham-dark w-full h-full">
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={rowData}
                    defaultColDef={defaultColDef}
                    domLayout="autoHeight"
                    sideBar={{
                        toolPanels: [
                            {
                                id: "columns",
                                labelDefault: "Columns",
                                toolPanel: "agColumnsToolPanel",
                            },
                            {
                                id: "filters",
                                labelDefault: "Filters",
                                toolPanel: "agFiltersToolPanel",
                            },
                        ],
                        hiddenByDefault: false,
                    }}
                    rowHeight={19}

                />
            </div>
        </div>
    );
};

export default SymbologyMappingGrid;
