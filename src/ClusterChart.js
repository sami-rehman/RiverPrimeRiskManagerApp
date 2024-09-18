import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import * as echarts from 'echarts';
import { clusterData } from './constant';
import { throttle } from 'lodash';

const ClusterChart = () => {
    const chartRef = useRef(null);
    const [clusterDataArr, seTclusterDataArr] = useState(clusterData);
    const dataMapRef2 = useRef(new Map());
    const chartInstance = useRef(null);

    const throttleUpdateTable = useCallback(throttle((data) => {
        const incomingData = Array.isArray(data) ? data : [data];
        incomingData.forEach((item) => {
            dataMapRef2.current.set(item.login, item);
        });
        const aggregatedData = Array.from(dataMapRef2.current.values());
        seTclusterDataArr(aggregatedData);
    }, 1000), []);


    useEffect(() => {
        const socket = new WebSocket("ws://192.168.3.164:8081/ws/api/v1/positionsConcentration");

        const handleMessage = (event) => {
            const data = JSON.parse(event.data);
            throttleUpdateTable(data);
        };

        const sendRequest = () => {
            if (socket.readyState === WebSocket.OPEN) {
                const requestMessage = {
                    type: "request",
                    requestType: 'positionsConcentration',
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
    }, [throttleUpdateTable]);



    const symbolColors = useMemo(() => {
        const colorPalette = [
            '#37A2DA', '#e06343', '#37a354', '#b55dba', '#b5bd48',
            '#8378EA', '#96BFFF', '#ff9e3a', '#ff6f61', '#ffcc00',
            '#fb7293', '#e7bcf3', '#9d96f5', '#8378ea', '#96bfff'
        ];
        const uniqueSymbols = Array.from(
            new Set(clusterDataArr?.flatMap(user => user?.positions?.map(pos => pos.symbol)))
        );
        return uniqueSymbols.reduce((acc, symbol, index) => {
            acc[symbol] = colorPalette[index % colorPalette.length];
            return acc;
        }, {});
    }, [clusterDataArr]);

    const transformedData = useMemo(() => {
        return clusterDataArr?.flatMap(user =>
            user?.positions?.map(pos => [
                pos.flag === 'short' ? -pos.volume : pos.volume,
                Number(pos.profit).toFixed(2),
                pos.flag,
                user.login,
                pos.symbol
            ])
        );
    }, [clusterDataArr]);

    console.log('transformedData', transformedData)

    useEffect(() => {
        const chartDom = chartRef.current;
        if (!chartDom) return;

        // Initialize chart only once
        if (!chartInstance.current) {
            chartInstance.current = echarts.init(chartDom);
        }

        const volumes = transformedData.map(item => item[0]);
        const profits = transformedData.map(item => item[1]);

        const maxVolume = Math.max(...volumes);
        const minProfit = Math.min(...profits);
        const maxProfit = Math.max(...profits);

        const option = {
            grid: {
                left: '2%',
                right: '7%',
                bottom: '7%',
                containLabel: true
              },
            tooltip: {
                trigger: 'item',
                formatter: (params) => {
                    const { value } = params.data;
                    return `Login ID: ${value[3]}<br/>Symbol: ${value[4]}<br/>Volume: ${Math.abs(value[0])}<br/>Profit: ${value[1]}<br/>Action: ${value[2]}`;
                },
                axisPointer: {
                    show: true,
                    type: 'cross',
                    lineStyle: {
                        type: 'dashed',
                        width: 1
                    }
                }
            },
            xAxis: {
                name: 'Volume',
                type: 'value',
                splitLine: { show: true },
                min: -maxVolume,
                max: maxVolume,
                axisLine: {
                    onZero: true,
                },
            },
            yAxis: {
                name: 'Profit',
                type: 'value',
                splitLine: { show: true },
                min: -maxProfit,
                max: maxProfit,
                axisLine: {
                    onZero: true,
                },
            },
           
    dataZoom: [
      {
        type: 'inside'
      },
      {
        type: 'slider',
        showDataShadow: false,
        handleIcon:
          'path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        handleSize: '80%'
      },
      {
        type: 'inside',
        orient: 'vertical'
      },
      {
        type: 'slider',
        orient: 'vertical',
        showDataShadow: false,
        handleIcon:
          'path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        handleSize: '80%'
      }
    ],
    animation: false,
            series: [
                {
                    type: 'scatter',
                    symbolSize: 15,
                    data: transformedData?.map(item => ({
                        value: item,
                        itemStyle: {
                            color: symbolColors[item[4]] || '#000000'
                        }
                    })),
                    encode: {
                        x: 0,
                        y: 1,
                        tooltip: [0, 1, 2, 3, 4],
                    }
                }
            ],
        };

        chartInstance.current.setOption(option);

        // Clean up chart on component unmount
        return () => {
            chartInstance.current && chartInstance.current.dispose();
            chartInstance.current = null;
        };
    }, [transformedData, symbolColors]);

    return <div ref={chartRef} className='h-full w-full p-2' />;
};

export default ClusterChart;


// import React, { useEffect, useRef, useState, useMemo } from 'react';
// import * as echarts from 'echarts';
// import { clusterData } from './constant';
// import { throttle } from 'lodash';

// const ClusterChart = () => {
//   const chartRef = useRef(null);
//   const [clusterDataArr, seTclusterDataArr] = useState(clusterData);
//   const dataMapRef2 = useRef(new Map());
//   const chartInstance = useRef(null);

//   // Define the throttled function outside of useEffect
//   const throttleUpdateTable = useMemo(() => throttle((data) => {
//     const incomingData = Array.isArray(data) ? data : [data];
//     incomingData.forEach((item) => {
//       dataMapRef2.current.set(item.login, item);
//     });
//     const aggregatedData = Array.from(dataMapRef2.current.values());
//     seTclusterDataArr(aggregatedData);
//   }, 1000), []);

//   useEffect(() => {
//     const socket = new WebSocket("ws://192.168.3.164:8081/ws/api/v1/positionsConcentration");

//     const handleMessage = (event) => {
//       const data = JSON.parse(event.data);
//       throttleUpdateTable(data);
//     };

//     const sendRequest = () => {
//       if (socket.readyState === WebSocket.OPEN) {
//         const requestMessage = {
//           type: "request",
//           requestType: 'positionsConcentration',
//           accounts: "all",
//         };
//         socket.send(JSON.stringify(requestMessage));
//       }
//     };

//     socket.onopen = sendRequest;
//     socket.addEventListener("message", handleMessage);

//     return () => {
//       if (socket.readyState === WebSocket.OPEN) {
//         const unsubscribeMessage = {
//           type: "unsubscribe",
//           requestType: "accountDailyReport",
//           accounts: "all",
//         };
//         socket.send(JSON.stringify(unsubscribeMessage));
//         socket.removeEventListener("message", handleMessage);
//         socket.close();
//       }
//     };
//   }, [throttleUpdateTable]);

//   const symbolColors = useMemo(() => {
//     const colorPalette = [
//       '#37A2DA', '#e06343', '#37a354', '#b55dba', '#b5bd48',
//       '#8378EA', '#96BFFF', '#ff9e3a', '#ff6f61', '#ffcc00',
//       '#fb7293', '#e7bcf3', '#9d96f5', '#8378ea', '#96bfff'
//     ];
//     const uniqueSymbols = Array.from(
//       new Set(clusterDataArr?.flatMap(user => user?.positions?.map(pos => pos.symbol)))
//     );
//     return uniqueSymbols.reduce((acc, symbol, index) => {
//       acc[symbol] = colorPalette[index % colorPalette.length];
//       return acc;
//     }, {});
//   }, [clusterDataArr]);

//   const transformedData = useMemo(() => {
//     return clusterDataArr?.flatMap(user =>
//       user?.positions?.map(pos => [
//         pos.flag === 'short' ? -pos.volume : pos.volume,
//         pos.profit,
//         pos.flag,
//         user.login,
//         pos.symbol
//       ])
//     );
//   }, [clusterDataArr]);

//   useEffect(() => {
//     const chartDom = chartRef.current;
//     if (!chartDom) return;

//     // Initialize chart only once
//     if (!chartInstance.current) {
//       chartInstance.current = echarts.init(chartDom);
//     }

//     const option = {
//       tooltip: {
//         trigger: 'item',
//         formatter: (params) => {
//           const { value } = params.data;
//           return `Login ID: ${value[3]}<br/>Symbol: ${value[4]}<br/>Volume: ${Math.abs(value[0])}<br/>Profit: ${value[1]}<br/>Action: ${value[2]}`;
//         }
//       },
//       xAxis: {
//         name: 'Volume',
//         type: 'value',
//         splitLine: { show: true },
//       },
//       yAxis: {
//         name: 'Profit',
//         type: 'value',
//         splitLine: { show: true },
//       },
//       series: [
//         {
//           type: 'scatter',
//           symbolSize: 15,
//           data: transformedData?.map(item => ({
//             value: item,
//             itemStyle: {
//               color: symbolColors[item[4]] || '#000000'
//             }
//           })),
//           encode: {
//             x: 0,
//             y: 1,
//             tooltip: [0, 1, 2, 3, 4],
//           }
//         }
//       ],
//     };

//     chartInstance.current.setOption(option);

//     // Clean up chart on component unmount
//     return () => {
//       chartInstance.current && chartInstance.current.dispose();
//       chartInstance.current = null;
//     };
//   }, [transformedData, symbolColors]);

//   return <div ref={chartRef} className='h-full w-full p-4' />;
// };

// export default ClusterChart;

