import React, { useState, useEffect, useCallback, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { rawDataPiechartEquity } from "../constant";

import Exporting from 'highcharts/modules/exporting';
import FullScreen from 'highcharts/modules/full-screen';
import ExportData from 'highcharts/modules/export-data';

Exporting(Highcharts);
FullScreen(Highcharts);
ExportData(Highcharts);

const PieHighCharts = React.memo(() => {
    const dataMapRef = useRef(new Map());
    const [chartData, setChartData] = useState([]);
    const [selectedSection, setSelectedSection] = useState("volume");
    const [topRecords, setTopRecords] = useState(10);
    const [dataArray, setDataArray] = useState(rawDataPiechartEquity);
    const [renderChart, setRenderChart] = useState(false); // State to trigger chart rendering
    const [loading, setLoading] = useState(true); // State for loader


    const updateTable = useCallback((data) => {
        const incomingData = Array.isArray(data) ? data : [data];
        incomingData?.forEach((item) => {
            dataMapRef.current.set(item.login, item); // Add data to the map
        });
        setDataArray(Array.from(dataMapRef.current.values())); // Update dataArray with new values
    }, []);

    useEffect(() => {
        const socket = new WebSocket("ws://192.168.3.164:8081/ws/api/v1/accountConcentration");
        let isComponentUnmounted = false;

        const handleMessage = (event) => {
            const data = JSON.parse(event.data);

            // Update data array with incoming data
            updateTable(data);

            // Check if the message contains "promise fulfilled"
            if (data.message === "promise fulfilled.") {
                setRenderChart(true); // Set renderChart to true when the final message is received
                setLoading(false);
            }
        };

        const sendRequest = (section) => {
            if (socket.readyState === WebSocket.OPEN) {
                const requestMessage = {
                    type: "request",
                    requestType: section,
                    accounts: "all",
                };
                socket.send(JSON.stringify(requestMessage));
            }
        };

        socket.onopen = () => {
            if (!isComponentUnmounted) {
                sendRequest(selectedSection);
            }
        };

        socket.addEventListener("message", handleMessage);

        return () => {
            isComponentUnmounted = true;
            const unsubscribeMessage = {
                type: "unsubscribe",
                requestType: "accountDailyReport",
                accounts: "all",
            };
            if (socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify(unsubscribeMessage));
                socket.close();
            }
            socket.removeEventListener("message", handleMessage);
        };
    }, [selectedSection, updateTable]);

    useEffect(() => {
        const rawData = dataArray;
        const sortedData = rawData?.sort((a, b) => b[selectedSection] - a[selectedSection])
            ?.slice(0, topRecords)
            ?.map((item) => ({
                y: item[selectedSection],
                name: `LoginID_${item.login?.toString()}`,
            }));

        setChartData(sortedData);
    }, [selectedSection, topRecords, dataArray]);

    const chartRef = useRef(null);

    const options = {
        chart: {
            type: 'pie'
        },
        title: {
            text: '',
        },
        accessibility: {
            announceNewData: {
                enabled: true
            },
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            series: {
                borderRadius: 5,
                dataLabels: [{
                    enabled: true,
                    distance: 15,
                    format: '{point.name}'
                }]
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: ' +
                '<b>{point.y:.2f}</b><br/>'
        },
        series: [
            {
                name: selectedSection,
                colorByPoint: true,
                data: chartData
            }
        ]
    };

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.chart.reflow();
        }
    }, []);

    return (
        // <div className="h-full w-full flex flex-col">
        //     <div className="flex space-x-4 items-center ml-2">
        //         <div>
        //             <label htmlFor="section-select" className="text-sm">
        //                 Concentration:
        //             </label>
        //             <select
        //                 id="section-select"
        //                 value={selectedSection}
        //                 onChange={(e) => setSelectedSection(e.target.value)}
        //                 className="p-1 text-xs border border-gray-300 rounded ml-1"
        //             >
        //                 <option value="equity">Equity</option>
        //                 <option value="volume">Volume</option>
        //             </select>
        //         </div>

        //         <div>
        //             <label htmlFor="top-records-select" className="text-sm">
        //                 Top Records:
        //             </label>
        //             <select
        //                 id="top-records-select"
        //                 value={topRecords}
        //                 onChange={(e) => setTopRecords(Number(e.target.value))}
        //                 className="p-1 text-xs border border-gray-300 rounded ml-1"
        //             >
        //                 <option value={20}>20</option>
        //                 <option value={15}>15</option>
        //                 <option value={10}>10</option>
        //                 <option value={5}>5</option>
        //             </select>
        //         </div>
        //     </div>

        //     {/* Render the chart only when renderChart is true */}
        //     {renderChart && (
        //         <div className="flex-grow w-full">
        //             <HighchartsReact
        //                 ref={chartRef}
        //                 highcharts={Highcharts}
        //                 options={options1}
        //             />
        //         </div>
        //     )}
        // </div>
        <div className="h-full w-full flex flex-col">
            <div className="flex space-x-4 items-center ml-2">
                <div>
                    <label htmlFor="section-select" className="text-sm">
                        Concentration:
                    </label>
                    <select
                        id="section-select"
                        value={selectedSection}
                        onChange={(e) => setSelectedSection(e.target.value)}
                        className="p-1 text-xs border border-gray-300 rounded ml-1"
                    >
                        <option value="equity">Equity</option>
                        <option value="volume">Volume</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="top-records-select" className="text-sm">
                        Top Records:
                    </label>
                    <select
                        id="top-records-select"
                        value={topRecords}
                        onChange={(e) => setTopRecords(Number(e.target.value))}
                        className="p-1 text-xs border border-gray-300 rounded ml-1"
                    >
                        <option value={20}>20</option>
                        <option value={15}>15</option>
                        <option value={10}>10</option>
                        <option value={5}>5</option>
                    </select>
                </div>
            </div>

            {/* Show loader while loading */}
            {/* {loading && (
                <div className="flex-grow w-full flex items-center justify-center">
                    <div className="loader">Loading...</div>
                </div>
            )} */}

            {/* Render the chart only when renderChart is true */}
           
                <div className="flex-grow w-full">
                    <HighchartsReact
                        ref={chartRef}
                        highcharts={Highcharts}
                        options={options}
                    />
                </div>
            
        </div>

    );
});

export default PieHighCharts;
