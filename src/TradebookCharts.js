import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const TradebookCharts = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chartInstance = echarts.init(chartRef.current);

        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['Profit', 'Expenses', 'Income']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'value'
                }
            ],
            yAxis: [
                {
                    type: 'category',
                    axisTick: {
                        show: false
                    },
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                }
            ],
            series: [
                {
                    name: 'Profit',
                    type: 'bar',
                    label: {
                        show: true,
                        position: 'right'
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: [200, 170, 240, 244, 200, 220, 210]
                },
                {
                    name: 'Income',
                    type: 'bar',
                    stack: 'Total',
                    label: {
                        show: true,
                        position: 'right'
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: [320, 302, 341, 374, 390, 450, 420]
                },
                {
                    name: 'Expenses',
                    type: 'bar',
                    stack: 'Total',
                    label: {
                        show: true,
                        position: 'left'
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: [-120, -132, -101, -134, -190, -230, -210]
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

export default TradebookCharts;
