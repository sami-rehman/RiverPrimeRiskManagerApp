import React, { useState, useEffect, useCallback, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import Exporting from 'highcharts/modules/exporting';
import FullScreen from 'highcharts/modules/full-screen';
import ExportData from 'highcharts/modules/export-data';

Exporting(Highcharts);
FullScreen(Highcharts);
ExportData(Highcharts);

const equityData = [
    {
        "login": 1010211,
        "equity": 3336.03,
        "%equity": 0.01
    },
    {
        "login": 1010824,
        "equity": 99999.55,
        "%equity": 0.24
    },
    {
        "login": 908278,
        "equity": 36115.87,
        "%equity": 0.09
    },
    {
        "login": 1010894,
        "equity": 100000,
        "%equity": 0.24
    },
    {
        "login": 904495,
        "equity": 10000,
        "%equity": 0.02
    },
    {
        "login": 905727,
        "equity": 99701.4,
        "%equity": 0.24
    },
    {
        "login": 909674,
        "equity": 2995.63,
        "%equity": 0.01
    },
    {
        "login": 903127,
        "equity": 80018.62,
        "%equity": 0.19
    },
    {
        "login": 1010910,
        "equity": 100000,
        "%equity": 0.24
    },
    {
        "login": 1010327,
        "equity": 5888.96,
        "%equity": 0.01
    },
    {
        "login": 908096,
        "equity": 34057.83,
        "%equity": 0.08
    },
    {
        "login": 908909,
        "equity": 100000,
        "%equity": 0.24
    },
    {
        "login": 907894,
        "equity": 119159.07,
        "%equity": 0.29
    },
    {
        "login": 907139,
        "equity": 99002.76,
        "%equity": 0.24
    },
    {
        "login": 908024,
        "equity": 93381.95,
        "%equity": 0.23
    },
    {
        "login": 1010375,
        "equity": 135912,
        "%equity": 0.33
    },
    {
        "login": 908080,
        "equity": 141.82,
        "%equity": 0
    },
    {
        "login": 1011026,
        "equity": 151085.75,
        "%equity": 0.37
    },
    {
        "login": 905461,
        "equity": 116638.8,
        "%equity": 0.28
    },
    {
        "login": 909939,
        "equity": 6190385.66,
        "%equity": 15
    },
    {
        "login": 904642,
        "equity": 2320534.36,
        "%equity": 5.62
    },
    {
        "login": 1011035,
        "equity": 100000,
        "%equity": 0.24
    },
    {
        "login": 907323,
        "equity": 130704.47,
        "%equity": 0.32
    },
    {
        "login": 910060,
        "equity": 196.36,
        "%equity": 0
    },
    {
        "login": 909106,
        "equity": 10725.74,
        "%equity": 0.03
    },
    {
        "login": 1010963,
        "equity": 5016380.13,
        "%equity": 12.16
    },
    {
        "login": 907802,
        "equity": 5118167.56,
        "%equity": 12.41
    },
    {
        "login": 910473,
        "equity": 23816.04,
        "%equity": 0.06
    },
    {
        "login": 1011111,
        "equity": 9955.49,
        "%equity": 0.02
    },
    {
        "login": 1010446,
        "equity": 76.51,
        "%equity": 0
    },
    {
        "login": 1010665,
        "equity": 133176.8,
        "%equity": 0.32
    },
    {
        "login": 910282,
        "equity": 107164.71,
        "%equity": 0.26
    },
    {
        "login": 907973,
        "equity": 35487.62,
        "%equity": 0.09
    },
    {
        "login": 908454,
        "equity": 5267526.59,
        "%equity": 12.77
    },
    {
        "login": 910386,
        "equity": 67303.8,
        "%equity": 0.16
    },
    {
        "login": 1010683,
        "equity": 100000,
        "%equity": 0.24
    },
    {
        "login": 910353,
        "equity": 218.6,
        "%equity": 0
    },
    {
        "login": 908076,
        "equity": 35042.29,
        "%equity": 0.08
    },
    {
        "login": 910435,
        "equity": 315.92,
        "%equity": 0
    },
    {
        "login": 910371,
        "equity": 1775.42,
        "%equity": 0
    },
    {
        "login": 909091,
        "equity": 2137373.52,
        "%equity": 5.18
    },
    {
        "login": 1010731,
        "equity": 3019.08,
        "%equity": 0.01
    },
    {
        "login": 1010246,
        "equity": 101123.3,
        "%equity": 0.25
    },
    {
        "login": 910492,
        "equity": 5003308.04,
        "%equity": 12.13
    },
    {
        "login": 1010932,
        "equity": 100000,
        "%equity": 0.24
    },
    {
        "login": 1010418,
        "equity": 6615.23,
        "%equity": 0.02
    },
    {
        "login": 1010794,
        "equity": 6713.98,
        "%equity": 0.02
    },
    {
        "login": 909263,
        "equity": 9100.2,
        "%equity": 0.02
    },
    {
        "status": "200",
        "message": "promise fulfilled."
    }
];

const volumeData = [
    {
        "login": 1010211,
        "volLots": 2,
        "volNots": 170300
    },
    {
        "login": 1010824,
        "volLots": 2.01,
        "volNots": 201
    },
    {
        "login": 908278,
        "volLots": 6.19,
        "volNots": 619000
    },
    {
        "login": 1010894,
        "volLots": 0.05,
        "volNots": 1053
    },
    {
        "login": 904495,
        "volLots": 1.01,
        "volNots": 100050
    },
    {
        "login": 905727,
        "volLots": 0.11,
        "volNots": 8061
    },
    {
        "login": 909674,
        "volLots": 0.02,
        "volNots": 2
    },
    {
        "login": 903127,
        "volLots": 3.01,
        "volNots": 1201
    },
    {
        "login": 1010910,
        "volLots": 2,
        "volNots": 200
    },
    {
        "login": 1010327,
        "volLots": 0.5,
        "volNots": 91.4
    },
    {
        "login": 908096,
        "volLots": 4.43,
        "volNots": 443000
    },
    {
        "login": 908909,
        "volLots": 1.1,
        "volNots": 110
    },
    {
        "login": 907894,
        "volLots": 9.58,
        "volNots": 958000
    },
    {
        "login": 907139,
        "volLots": 0.72,
        "volNots": 72
    },
    {
        "login": 908024,
        "volLots": 0.21,
        "volNots": 3.3
    },
    {
        "login": 1010375,
        "volLots": 5,
        "volNots": 500
    },
    {
        "login": 908080,
        "volLots": 0.03,
        "volNots": 3000
    },
    {
        "login": 1011026,
        "volLots": 0.32,
        "volNots": 32
    },
    {
        "login": 905461,
        "volLots": 1,
        "volNots": 100
    },
    {
        "login": 909939,
        "volLots": 41.64,
        "volNots": 2203.8
    },
    {
        "login": 904642,
        "volLots": 0.08,
        "volNots": 8
    },
    {
        "login": 1011035,
        "volLots": 4.7,
        "volNots": 136.5
    },
    {
        "login": 907323,
        "volLots": 0.22,
        "volNots": 22
    },
    {
        "login": 910060,
        "volLots": 0.03,
        "volNots": 3000
    },
    {
        "login": 909106,
        "volLots": 0.03,
        "volNots": 3
    },
    {
        "login": 1010963,
        "volLots": 0.1,
        "volNots": 72.2
    },
    {
        "login": 907802,
        "volLots": 17,
        "volNots": 1700
    },
    {
        "login": 910473,
        "volLots": 1,
        "volNots": 52.5
    },
    {
        "login": 1011111,
        "volLots": 0.02,
        "volNots": 2
    },
    {
        "login": 1010446,
        "volLots": 0.01,
        "volNots": 1000
    },
    {
        "login": 1010665,
        "volLots": 2.05,
        "volNots": 587.5
    },
    {
        "login": 910282,
        "volLots": 0.13,
        "volNots": 160
    },
    {
        "login": 907973,
        "volLots": 6.05,
        "volNots": 605000
    },
    {
        "login": 908454,
        "volLots": 30,
        "volNots": 3000
    },
    {
        "login": 910386,
        "volLots": 0.1,
        "volNots": 2
    },
    {
        "login": 1010683,
        "volLots": 3,
        "volNots": 300
    },
    {
        "login": 910353,
        "volLots": 0.01,
        "volNots": 1000
    },
    {
        "login": 908076,
        "volLots": 6.46,
        "volNots": 646000
    },
    {
        "login": 910435,
        "volLots": 1,
        "volNots": 1
    },
    {
        "login": 910371,
        "volLots": 6.21,
        "volNots": 621
    },
    {
        "login": 909091,
        "volLots": 2,
        "volNots": 200
    },
    {
        "login": 1010731,
        "volLots": 0.23,
        "volNots": 23
    },
    {
        "login": 1010246,
        "volLots": 0.2,
        "volNots": 20
    },
    {
        "login": 910492,
        "volLots": 210.1,
        "volNots": 21010
    },
    {
        "login": 1010932,
        "volLots": 2,
        "volNots": 5100
    },
    {
        "login": 1010418,
        "volLots": 2.1,
        "volNots": 21
    },
    {
        "login": 1010794,
        "volLots": 0.04,
        "volNots": 200
    },
    {
        "login": 909263,
        "volLots": 0.02,
        "volNots": 2
    },
    {
        "status": "200",
        "message": "promise fulfilled."
    }
];

const LoadingNotification = ({ isLoading }) => {
    if (isLoading) {
        return <div className="loadingNotification">Loading...</div>;
    } else {
        return null;
    }
};

const PieHighCharts = React.memo(() => {
    const chartRef = useRef(null);
    const dataMapRef = useRef(new Map());
    const [chartData, setChartData] = useState([]);
    const [selectedSection, setSelectedSection] = useState("equity");
    const [topRecords, setTopRecords] = useState(10);
    const [dataArray, setDataArray] = useState(equityData);
    const [isVolLots, setIsVolLots] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleVolToggle = (event) => {
        setIsVolLots(event.target.checked);
    };

    function capitalizeWords(sentence) {
        if (!sentence) return '';
        return sentence
          .split(' ') // Split the sentence into words
          .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
          .join(' '); // Join the words back into a sentence
      }

    const updateTable = useCallback((data) => {
        const incomingData = Array.isArray(data) ? data : [data];
        incomingData.forEach((item) => {
            dataMapRef.current.set(item.login, item); // Add data to the map
        });
        setDataArray(Array.from(dataMapRef.current.values())); // Update dataArray with new values
    }, []);

    console.log('dataArray', dataArray)
    useEffect(() => {
        setIsLoading(true)
        const socket = new WebSocket("ws://192.168.3.164:8081/ws/api/v1/accountConcentration");
        let isComponentUnmounted = false;

        const handleMessage = (event) => {
            const data = JSON.parse(event.data);
            updateTable(data);

            // Check if the message contains "promise fulfilled"
            if (data.message === "promise fulfilled.") {
                setIsLoading(false);
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
        const sortedData = Array.from(dataMapRef.current.values())
            .sort((a, b) => b[selectedSection === 'equity' ? 'equity' : !isVolLots ? 'volLots' : 'volNots'] - a[selectedSection === 'equity' ? 'equity' : !isVolLots ? 'volLots' : 'volNots'])
            .slice(0, topRecords)
            .map((item) => ({
                y: item[selectedSection === 'equity' ? 'equity' : !isVolLots ? 'volLots' : 'volNots'],
                name: `(MT)${item.login?.toString()}`,
            }));

        setChartData(sortedData);
    }, [selectedSection, topRecords, dataArray, isVolLots]);

    const colors = Highcharts.getOptions().colors.map((c, i) =>
        Highcharts.color(Highcharts.getOptions().colors[0])
            .brighten((i - 3) / 20)
            .get()
    );

    console.log(colors, 'samiColors')

    const options = {
        chart: {
            type: 'pie',
            plotBorderWidth: 1,
            style: {
                fontFamily: "'Arial', sans-serif",
            },
            events: {
                load: function () {
                    if (chartRef.current) {
                        setTimeout(() => {
                            this.reflow();
                        }, 100);
                    }
                }
            },
        },
        title: {
            text: `Concentration by ${selectedSection}`,
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
                colors,
                dataLabels: [{
                    enabled: true,
                    distance: 10,
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

    return (
        <div className="h-full w-full flex flex-col">
            {/* <div className="flex space-x-4 items-center ml-2">
                <div>
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
                {
                    selectedSection !== 'equity' &&
                    <div className="inline-flex items-center gap-2 m-1">
                        <label className="text-slate-800 text-xs cursor-pointer ml-2">
                            Lots
                        </label>
                        <div className="relative inline-block w-11 h-5">
                            <input
                                id="switch-component-on"
                                type="checkbox"
                                className="peer appearance-none w-11 h-5 bg-slate-600 rounded-full checked:bg-slate-600 cursor-pointer transition-colors duration-300"
                                checked={isVolLots}
                                onChange={handleVolToggle}
                                disabled={selectedSection === "equity"}
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
                }


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
            </div> */}

            <div className="flex space-x-4 items-center ml-2">
                <div>
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
                {selectedSection !== 'equity' && (
                    <div className="inline-flex items-center gap-2 m-1">
                        <label className="text-slate-800 text-xs cursor-pointer ml-2">
                            Lots
                        </label>
                        <div className="relative inline-block w-11 h-5">
                            <input
                                id="switch-component-on"
                                type="checkbox"
                                className="peer appearance-none w-11 h-5 bg-slate-600 rounded-full checked:bg-slate-600 cursor-pointer transition-colors duration-300"
                                checked={isVolLots}
                                onChange={handleVolToggle}
                                disabled={selectedSection === "equity"}
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
                )}
                <div className="mr-auto"> {/* Pushes this div to the right */}
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


            <div className="flex-grow w-full">
                <HighchartsReact
                    ref={chartRef}
                    highcharts={Highcharts}
                    options={options}
                />
                <LoadingNotification isLoading={isLoading} />
            </div>
        </div>
    );
});

export default PieHighCharts;


