// DepositsWithdrawalsAccountCharts.js

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const DepositsWithdrawalsAccountCharts = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chartInstance = echarts.init(chartRef.current);

        const option = {
            // title: {
            //     text: 'Accumulated Waterfall Chart'
            // },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: function (params) {
                    let tar;
                    if (params[1] && params[1].value !== '-') {
                        tar = params[1];
                    } else {
                        tar = params[2];
                    }
                    return tar && tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
                }
            },
            legend: {
                data: ['Expenses', 'Income']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: (() => {
                    let list = [];
                    for (let i = 1; i <= 11; i++) {
                        list.push('Nov ' + i);
                    }
                    return list;
                })()
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'Placeholder',
                    type: 'bar',
                    stack: 'Total',
                    silent: true,
                    itemStyle: {
                        borderColor: 'transparent',
                        color: 'transparent'
                    },
                    emphasis: {
                        itemStyle: {
                            borderColor: 'transparent',
                            color: 'transparent'
                        }
                    },
                    data: [0, 900, 1245, 1530, 1376, 1376, 1511, 1689, 1856, 1495, 1292]
                },
                {
                    name: 'Income',
                    type: 'bar',
                    stack: 'Total',
                    label: {
                        show: true,
                        position: 'top'
                    },
                    data: [900, 345, 393, '-', '-', 135, 178, 286, '-', '-', '-']
                },
                {
                    name: 'Expenses',
                    type: 'bar',
                    stack: 'Total',
                    label: {
                        show: true,
                        position: 'bottom'
                    },
                    data: ['-', '-', '-', 108, 154, '-', '-', '-', 119, 361, 203]
                }
            ]
        };

        chartInstance.setOption(option);

        return () => {
            chartInstance.dispose();
        };
    }, []);

    return <div ref={chartRef} className='h-full w-full p-2' />;
};

export default DepositsWithdrawalsAccountCharts;
