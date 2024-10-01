// import React, { useEffect, useState } from 'react';
// import ReactECharts from 'echarts-for-react';
// import axios from 'axios';

// const TradeImpact = () => {
//     const [option, setOption] = useState({});

//     useEffect(() => {
//         const ROOT_PATH = 'https://echarts.apache.org/examples';

//         axios.get(`${ROOT_PATH}/data/asset/data/aqi-beijing.json`).then((response) => {
//             const data = response.data;

//             console.log('datadata', data)

//             setOption({
//                 title: {
//                     text: 'Trade Impact',
//                     left: '1%',
//                 },
//                 tooltip: {
//                     trigger: 'axis',
//                 },
//                 grid: {
//                     left: '10%',
//                     right: '15%',
//                     bottom: '10%',
//                 },
//                 xAxis: {
//                     data: data.map((item) => item[0]),
//                 },
//                 yAxis: {
//                     show: false,
//                 },
//                 toolbox: {
//                     right: 10,
//                     feature: {
//                         dataZoom: {
//                             yAxisIndex: 'none',
//                         },
//                         saveAsImage: {},
//                     },
//                 },
//                 dataZoom: [
//                     {
//                         startValue: '2014-06-01',
//                     },
//                     {
//                         type: 'inside',
//                     },
//                 ],
//                 visualMap: {
//                     top: 50,
//                     right: 10,
//                     show: false,  
//                     pieces: [
//                       {
//                         gt: 0,
//                         lte: 50,
//                         color: '#93CE07'
//                       },
//                       {
//                         gt: 50,
//                         lte: 100,
//                         color: '#FBDB0F'
//                       },
//                       {
//                         gt: 100,
//                         lte: 150,
//                         color: '#FC7D02'
//                       },
//                       {
//                         gt: 150,
//                         lte: 200,
//                         color: '#FD0100'
//                       },
//                       {
//                         gt: 200,
//                         lte: 300,
//                         color: '#AA069F'
//                       },
//                       {
//                         gt: 300,
//                         color: '#AC3B2A'
//                       }
//                     ],
//                     outOfRange: {
//                       color: '#999'
//                     }
//                   },
//                 series: [
//                     {
//                         name: 'UNPL',
//                         type: 'line',
//                         data: data.map((item) => item[1]),
//                         markLine: {
//                             silent: true,
//                             lineStyle: {
//                                 color: '#333',
//                             },
//                             data: [
//                                 { yAxis: 50 },
//                                 { yAxis: 100 },
//                                 { yAxis: 150 },
//                                 { yAxis: 200 },
//                                 { yAxis: 300 },
//                             ],
//                         },
//                     },
//                 ],
//             });
//         });
//     }, []);

//     return (
//         <ReactECharts option={option} style={{ minHeight: '300px', minWidth: '450px', height:'100%', width:'100%' }} />
//     );
// };

// export default TradeImpact;


import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';

const TradeImpact = ({loginID}) => {
    const [optionData, setOptionData] = useState([]);

    useEffect(() => {
        const socket = new WebSocket(
            "ws://192.168.3.164:8081/ws/api/v1/account/accountPositionsProfit"
        );

        const handleMessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('SamiData1', data?.data)
            if(data?.data)
                setOptionData(data?.data);
            // }
        };

        const sendRequest = () => {
            if (socket.readyState === WebSocket.OPEN) {
                const requestMessage = {
                    type: "request",
                    requestType: "accountPositionsProfit",
                    accounts: loginID,
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
            }
            socket.removeEventListener("message", handleMessage);
            socket.close();
        };
    }, [loginID]);

    // Transform data for chart use
    const transformedData = optionData?.map(item => [
        item.time,
        Math.round(item.totalProfit)
    ]);


    console.log('transformedData', transformedData)

    const option = {
        title: {
            text: 'Trade Impact',
            left: '1%',
        },
        tooltip: {
            trigger: 'axis',
        },
        grid: {
            left: '10%',
            right: '15%',
            bottom: '10%',
        },
        xAxis: {
            data: transformedData?.map((item) => item[0]),
        },
        yAxis: {
            show: false,
        },
        toolbox: {
            right: 10,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none',
                },
                saveAsImage: {},
            },
        },
        dataZoom: [
            {
                startValue: '2014-06-01',
            },
            {
                type: 'inside',
            },
        ],
        visualMap: {
            top: 50,
            right: 10,
            show: false,  
            pieces: [
              {
                gt: 0,
                lte: 50000,
                color: '#93CE07'
              },
              {
                gt: 50000,
                lte: 52000,
                color: '#FBDB0F'
              },
              {
                gt: 52000,
                lte: 53000,
                color: '#FC7D02'
              },
              {
                gt: 53000,
                lte: 54000,
                color: '#FD0100'
              },
              {
                gt: 54000,
                lte: 55000,
                color: '#AA069F'
              },
              {
                gt: 75000,
                color: '#AC3B2A'
              }
            ],
            outOfRange: {
              color: '#999'
            }
          },
        series: [
            {
                name: 'UNPL',
                type: 'line',
                data: transformedData?.map((item) => item[1]),
                markLine: {
                    silent: true,
                    lineStyle: {
                        color: '#333',
                    },
                    data: [
                        { yAxis: 50000 },
                        { yAxis: 52000 },
                        { yAxis: 53000 },
                        { yAxis: 54000 },
                        { yAxis: 55000 },
                    ],
                },
            },
        ],
    };

    return (
        <ReactECharts
            option={option}
            style={{ minHeight: '300px', minWidth: '450px', height: '100%', width: '100%' }}
        />
    );
};

export default TradeImpact;
