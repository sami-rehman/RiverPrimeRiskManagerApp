import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const ECharts = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chartDom = chartRef.current;
        const myChart = echarts.init(chartDom);

        let xAxisData = [];
        let data1 = [];
        let data2 = [];
        let data3 = [];
        for (let i = 0; i < 10; i++) {
            xAxisData.push('Class' + i);
            data1.push(+(Math.random() * 2).toFixed(2));
            data2.push(+(Math.random() * 5).toFixed(2));
            data3.push(+(Math.random() + 0.3).toFixed(2));
        }

        console.log('xAxisData', xAxisData, data1, data2, data3)

        const emphasisStyle = {
            itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0,0,0,0.3)'
            }
        };

        const option = {
            legend: {
                data: ['bar', 'bar2', 'bar3'],
                left: '10%'
            },
            brush: {
                toolbox: [''],
                xAxisIndex: 0
            },
            toolbox: {
                feature: {
                    // magicType: {
                    //     type: ['stack']
                    // },
                    // dataView: {}
                }
            },
            tooltip: {},
            xAxis: {
                data: xAxisData,
                // name: 'X Axis',
                axisLine: { onZero: true },
                splitLine: { show: false },
                splitArea: { show: false }
            },
            yAxis: {},
            grid: {
                bottom: 25
            },
            series: [
                {
                    name: 'bar',
                    type: 'bar',
                    stack: 'one',
                    emphasis: emphasisStyle,
                    data: data1
                },
                {
                    name: 'bar2',
                    type: 'bar',
                    stack: 'one',
                    emphasis: emphasisStyle,
                    data: data2
                },
                {
                    name: 'bar3',
                    type: 'bar',
                    stack: 'two',
                    emphasis: emphasisStyle,
                    data: data3
                }
            ]
        };

        myChart.setOption(option);

        myChart.on('brushSelected', function (params) {
            const brushed = [];
            const brushComponent = params.batch[0];
            for (let sIdx = 0; sIdx < brushComponent.selected.length; sIdx++) {
                const rawIndices = brushComponent.selected[sIdx].dataIndex;
                brushed.push(`[Series ${sIdx}] ${rawIndices.join(', ')}`);
            }
            myChart.setOption({
                title: {
                    backgroundColor: '#333',
                    text: `SELECTED DATA INDICES: \n${brushed.join('\n')}`,
                    bottom: 0,
                    right: '10%',
                    width: 100,
                    textStyle: {
                        fontSize: 12,
                        color: '#fff'
                    }
                }
            });
        });

        return () => {
            myChart.dispose();
        };
    }, []);

    return (
        <div ref={chartRef} className='h-full w-full p-2' />
    );
};

export default ECharts;
