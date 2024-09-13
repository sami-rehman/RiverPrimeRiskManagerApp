import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import { GroupsLpChartData } from './constant';

const GroupsLpChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartDom = chartRef.current;

    if (!chartDom) {
      console.error('Chart container not found');
      return;
    }

    const myChart = echarts.init(chartDom);

    myChart.setOption(GroupsLpChartData);

    // Resize the chart when the window size changes
    window.addEventListener('resize', myChart.resize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', myChart.resize);
      myChart.dispose();
    };
  }, []);

  return (
    <div
      ref={chartRef}
      className="h-full w-full"
      style={{ minHeight: '400px', minWidth: '620' }}
    />
  );
};

export default GroupsLpChart;
