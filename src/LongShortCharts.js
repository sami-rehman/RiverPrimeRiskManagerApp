import { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import {
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    DataZoomComponent
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { longData, shortData, timeDataSet } from './constant';

echarts.use([
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    DataZoomComponent,
    LineChart,
    CanvasRenderer,
    UniversalTransition
]);

const LongShortCharts = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chartInstance = echarts.init(chartRef.current);

        let timeData = timeDataSet;

        timeData = timeData.map(str => str.replace('2009/', ''));

        const option = {
            title: {
                text: 'Long vs Short',
                left: 'center'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    animation: false
                }
            },
            // legend: {
            //     data: ['Long', 'Short'],
            //     left: 10,
            // },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            axisPointer: {
                link: [
                    {
                        xAxisIndex: 'all'
                    }
                ]
            },
            dataZoom: [
                {
                    show: true,
                    realtime: false,
                    start: 33,
                    end: 66,
                    xAxisIndex: [0, 1]
                },
                {
                    type: 'inside',
                    realtime: true,
                    start: 33,
                    end: 66,
                    xAxisIndex: [0, 1]
                }
            ],
            grid: [
                { left: 60, right: 50, bottom: '56%', height: '35%' }, // Increased bottom to create space
                { left: 60, right: 50, top: '56%', height: '35%' } // Increased top to create space
            ],
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    axisLine: { onZero: true },
                    data: timeData
                },
                {
                    gridIndex: 1,
                    type: 'category',
                    boundaryGap: false,
                    axisLine: { onZero: true },
                    data: timeData,
                    position: 'top'
                }
            ],
            yAxis: [
                {
                    name: 'Long(m³/s)',
                    type: 'value',
                },
                {
                    gridIndex: 1,
                    name: 'Short(mm)',
                    type: 'value',
                    inverse: true
                }
            ],
            series: [
                {
                    name: 'Long',
                    type: 'line',
                    symbolSize: 8,
                    data: longData
                },
                {
                    name: 'Short',
                    type: 'line',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    symbolSize: 8,
                    data: shortData
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

export default LongShortCharts;
