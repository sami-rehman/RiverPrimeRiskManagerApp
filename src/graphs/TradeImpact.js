import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import axios from 'axios';

const TradeImpact = () => {
    const [option, setOption] = useState({});

    useEffect(() => {
        const ROOT_PATH = 'https://echarts.apache.org/examples';

        axios.get(`${ROOT_PATH}/data/asset/data/aqi-beijing.json`).then((response) => {
            const data = response.data;

            console.log('datadata', data)

            setOption({
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
                    data: data.map((item) => item[0]),
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
                        lte: 50,
                        color: '#93CE07'
                      },
                      {
                        gt: 50,
                        lte: 100,
                        color: '#FBDB0F'
                      },
                      {
                        gt: 100,
                        lte: 150,
                        color: '#FC7D02'
                      },
                      {
                        gt: 150,
                        lte: 200,
                        color: '#FD0100'
                      },
                      {
                        gt: 200,
                        lte: 300,
                        color: '#AA069F'
                      },
                      {
                        gt: 300,
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
                        data: data.map((item) => item[1]),
                        markLine: {
                            silent: true,
                            lineStyle: {
                                color: '#333',
                            },
                            data: [
                                { yAxis: 50 },
                                { yAxis: 100 },
                                { yAxis: 150 },
                                { yAxis: 200 },
                                { yAxis: 300 },
                            ],
                        },
                    },
                ],
            });
        });
    }, []);

    return (
        <ReactECharts option={option} style={{ minHeight: '300px', minWidth: '450px', height:'100%', width:'100%' }} />
    );
};

export default TradeImpact;