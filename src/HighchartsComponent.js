import React, { useState, useEffect, useCallback, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import DarkUnica from "highcharts/themes/dark-unica";

import HighchartsMore from "highcharts/highcharts-more"; // For Bubble view
import Exporting from "highcharts/modules/exporting";
import FullScreen from "highcharts/modules/full-screen";
import ExportData from "highcharts/modules/export-data";
import { clusterData } from "./constant";

DarkUnica(Highcharts);
HighchartsMore(Highcharts);
Exporting(Highcharts);
FullScreen(Highcharts);
ExportData(Highcharts);

const HighchartsComponent = React.memo(({ selectedLogins = [] }) => {
    const chartRef = useRef(null);
    const [chartType] = useState("scatter");
    const [useVolLots, setUseVolLots] = useState(true); // Switch state for volLots/volNots
    const [clusterDataArr, seTclusterDataArr] = useState(clusterData);
    const dataMapRef = useRef(new Map());

    const updateTable = useCallback((data) => {
        const incomingData = Array.isArray(data) ? data : [data];
        incomingData.forEach((item) => {
            dataMapRef.current.set(item.login, item); // Add data to the map
        });
        seTclusterDataArr(Array.from(dataMapRef.current.values())); // Update dataArray with new values
    }, []);

    useEffect(() => {
        const socket = new WebSocket(
            "ws://192.168.3.164:8081/ws/api/v1/positionsConcentration"
        );

        const handleMessage = (event) => {
            const data = JSON.parse(event.data);
            updateTable(data);
        };

        const sendRequest = () => {
            if (socket.readyState === WebSocket.OPEN) {
                const requestMessage = {
                    type: "request",
                    requestType: "positionsConcentration",
                    accounts: "all",
                };
                socket.send(JSON.stringify(requestMessage));
            }
        };

        socket.onopen = sendRequest;
        socket.addEventListener("message", handleMessage);

        return () => {
            if (socket.readyState === WebSocket.OPEN) {
                const unsubscribeMessage = {
                    type: "unsubscribe",
                    requestType: "accountDailyReport",
                    accounts: "all",
                };
                socket.send(JSON.stringify(unsubscribeMessage));
                socket.removeEventListener("message", handleMessage);
                socket.close();
            }
        };
    }, [updateTable, useVolLots]);

    const transformedData = clusterDataArr
        ?.flatMap((account) =>
            account?.positions?.map((pos) => {
                const vol = useVolLots ? pos?.volLots : pos?.volNots;
                if (typeof vol === "undefined" || typeof pos?.profit === "undefined") {
                    return null;
                }
                return {
                    x: pos?.flag === "short" ? -vol : vol || 0,
                    y: pos?.profit || 0,
                    z: Math.abs(pos?.profit || 0),
                    symbol: pos?.symbol || "Unknown",
                    action: pos?.flag || "Unknown",
                    login: account?.login || "Unknown",
                };
            })
        )
        ?.filter((dataPoint) => dataPoint !== null)
        .filter(
            (dataPoint) =>
                selectedLogins?.length === 0 ||
                selectedLogins?.includes(dataPoint.login)
        );

    const options = {
        chart: {
            type: chartType,
            plotBorderWidth: 1,
            zooming: { type: "xy" },
            style: {
                fontFamily: "'Arial', sans-serif", // Global font family
            },
        },
        title: { text: "Positions Concentration" },
        legend: { enabled: false },
        xAxis: {
            gridLineWidth: 1,
            title: { text: `Volume (${useVolLots ? "Lots" : "Notionals"})` },

            plotLines: [{ color: "black", width: 2, value: 0 }],
            crosshair: { color: "#68b2ac", width: 1, dashStyle: "ShortDash" },
            labels: {
                formatter: function () {
                    const absValue = Math.abs(this.value);
                    return absValue >= 1e6
                        ? Highcharts.numberFormat(absValue / 1e6, 1) + "M"
                        : absValue >= 1e3
                            ? Highcharts.numberFormat(absValue / 1e3, 1) + "K"
                            : Highcharts.numberFormat(absValue, 0);
                },
            },
        },

        yAxis: {
            gridLineWidth: 1,
            title: { text: "Profit" },
            plotLines: [{ color: "black", width: 2, value: 0 }],
            crosshair: { color: "#68b2ac", width: 1, dashStyle: "ShortDash" },
            labels: {
                useHTML: true,
                formatter: function () {
                    const absValue = Math.abs(this.value);
                    const formattedValue =
                        absValue >= 1e6
                            ? Highcharts.numberFormat(absValue / 1e6, 1) + " M($)"
                            : absValue >= 1e3
                                ? Highcharts.numberFormat(absValue / 1e3, 1) + " K($)"
                                : Highcharts.numberFormat(absValue, 0);

                    const color = this.value >= 0 ? "#1b7e57" : "#ff3e3e";

                    return `<span style="color: ${color};">${formattedValue}</span>`;
                },
            },
        },
        tooltip: {
            useHTML: true,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            style: {
                color: "#000000",
            },
            borderColor: "#68b2ac",
            headerFormat: "<table>",
            formatter: function () {
                const { symbol, x, y, action, login } = this.point;
                return `
                    <div class="relative group">
                    <table class="table-auto text-left">
                    <tr>
                    <th colspan="2" class="font-semibold text-sm pb-1">
                    <h3>${login}</h3>
                    </th>
                    </tr>
                    <tr>
                    <th class="pr-2">Symbol:</th>
                    <td>${symbol}</td>
                    </tr>
                    <tr>
                    <th class="pr-2">Volume:</th>
                    <td>${Math.abs(x)}</td>
                    </tr>
                    <tr>
                    <th class="pr-2">Profit:</th>
                    <td>${y.toFixed(2)}</td>
                    </tr>
                    <tr>
                    <th class="pr-2">Action:</th>
                    <td>${action}</td>
                    </tr>
                    </table>
                    </div>
        `;
            },
            footerFormat: "",
            followPointer: true,
        },

        plotOptions: {
            series: {
                dataLabels: { enabled: false, format: "{point.symbol}" },
            },
        },
        series: [{ data: transformedData, colorByPoint: true }],
        exporting: {
            enabled: true,
            buttons: {
                contextButton: {
                    menuItems: [
                        "viewFullscreen",
                        "printChart",
                        "separator",
                        "downloadPNG",
                        "downloadJPEG",
                        "downloadPDF",
                        "downloadSVG",
                    ],
                },
            },
        },
    };

    useEffect(() => {
        if (chartRef.current && chartRef.current.chart) {
            chartRef.current.chart.reflow();
        }
    }, [transformedData]);

    return (
        <div className="w-full h-full">
            <div className="inline-flex items-center gap-2 m-1">
                <label className="text-slate-800 text-xs cursor-pointer ml-2">
                    Lots
                </label>
                <div className="relative inline-block w-11 h-5">
                    <input
                        id="switch-component-on"
                        type="checkbox"
                        className="peer appearance-none w-11 h-5 bg-slate-600 rounded-full checked:bg-slate-600 cursor-pointer transition-colors duration-300"
                        checked={!useVolLots}
                        onChange={() => setUseVolLots(!useVolLots)}
                    />
                    <label
                        htmlFor="switch-component-on"
                        className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer"
                    />
                </div>
                <label className="text-slate-800 text-xs cursor-pointer">
                    Notionals
                </label>
            </div>
            <HighchartsReact
                ref={chartRef}
                highcharts={Highcharts}
                options={options}
            />
        </div>
    );
});

export default HighchartsComponent;
