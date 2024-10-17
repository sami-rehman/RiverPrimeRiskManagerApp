import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';

const TradeImpact = ({loginID}) => {
    const [optionData, setOptionData] = useState([]);

    console.log('SamiOptionData', optionData)

    useEffect(() => {
        const socket = new WebSocket(
            "ws://192.168.3.164:8081/ws/api/v1/account/accountPositionsProfit"
        );

        const handleMessage = (event) => {
            const data = JSON.parse(event.data);
            // console.log('SamiData1', data?.data)
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

    const transformedData = optionData
        ?.filter(item => item.totalProfit > 0)  // Only include values where totalProfit > 0
        ?.map(item => [
            item.time,
            Math.round(item.totalProfit)
        ]);

    const option = {
        title: {
            text: 'Trade Impact',
            left: '1%',
        },
        tooltip: {
            trigger: 'axis',
        },
        grid: {
            left: '15%',
            right: '15%',
            bottom: '22%',
        },
        xAxis: {
            data: transformedData?.map((item) => item[0]),
        },
     
        yAxis: {
            show: true,
            name: 'Floating Profit ',
            nameLocation: 'middle',      
            nameGap: 40,
            axisLabel: {
                formatter: (value) => `$${value}`,
            },
        },
        toolbox: {
            right: 10,
            feature: {
                // dataZoom: {
                //     yAxisIndex: 'none',
                // },
                // saveAsImage: {},
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
                lte: 300,
                color: '#93CE07'
              },
              {
                gt: 300,
                lte: 600,
                color: '#FBDB0F'
              },
              {
                gt: 600,
                lte: 900,
                color: '#FC7D02'
              },
              {
                gt: 900,
                lte: 1200,
                color: '#FD0100'
              },
              {
                gt: 1200,
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
                        {
                            yAxis: 300,
                            label: {
                                formatter: 'Info',
                                position: 'end',
                            },
                        },
                        {
                            yAxis: 600,
                            label: {
                                formatter: 'Monitor',
                                position: 'end',
                            },
                        },
                        {
                            yAxis: 900,
                            label: {
                                formatter: 'Warning',
                                position: 'end',
                            },
                        },
                        {
                            yAxis: 1200,
                            label: {
                                formatter: 'Critical',
                                position: 'end',
                            },
                        },
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
