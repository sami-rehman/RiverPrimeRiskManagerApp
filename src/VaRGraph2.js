import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const VaRGraph2 = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);

    const colors = ['#5470C6', '#91CC75', '#EE6666'];
    const option = {
      color: colors,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
      },
      grid: {
        // right: '15%',
        containLabel: true,
        bottom: 15,
      },
      legend: {
        data: ['Evaporation', 'Precipitation', 'Temperature'],
      },
      xAxis: [
        {
          type: 'category',
          axisTick: {
            alignWithLabel: true,
          },
          data: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
        },
      ],
      yAxis: [
        {
          type: 'value',
        //   name: 'Evaporation',
          position: 'right',
          alignTicks: true,
          axisLine: {
            show: true,
            lineStyle: {
              color: colors[0],
            },
          },
          axisLabel: {
            formatter: '{value} ml',
          },
        },
        {
          type: 'value',
        //   name: 'Precipitation',
          position: 'right',
          alignTicks: true,
          offset: 55,
          axisLine: {
            show: true,
            lineStyle: {
              color: colors[1],
            },
          },
          axisLabel: {
            formatter: '{value} ml',
          },
        },
        {
          type: 'value',
        //   name: 'Temperature',
          position: 'left',
          alignTicks: true,
          axisLine: {
            show: true,
            lineStyle: {
              color: colors[2],
            },
          },
          axisLabel: {
            formatter: '{value} °C',
          },
        },
      ],
      series: [
        {
          name: 'Evaporation',
          type: 'bar',
          data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
        },
        {
          name: 'Precipitation',
          type: 'bar',
          yAxisIndex: 1,
          data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
        },
        {
          name: 'Temperature',
          type: 'line',
          yAxisIndex: 2,
          data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
        },
      ],
    };

    chartInstance.setOption(option);

    // Cleanup function
    return () => {
      chartInstance.dispose();
    };
  }, []);

  return <div ref={chartRef} className='h-full w-full p-2'/>;
};

export default VaRGraph2;
