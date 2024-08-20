// import React, { useEffect, useRef, useState } from 'react';
// import {
//     Chart,
//     LineElement,
//     PointElement,
//     LineController,
//     CategoryScale,
//     LinearScale,
//     Tooltip,
//     Legend
// } from 'chart.js';

// Chart.register(LineElement, PointElement, LineController, CategoryScale, LinearScale, Tooltip, Legend);

// export const LineChart = ({ data }) => {
//     const [chartData, setChartData] = useState({
//         labels: [],
//         datasets: [{
//             label: 'Ask Price',
//             data: [],
//             fill: false,
//             borderColor: 'rgb(75, 192, 192)',
//             tension: 0.1
//         }]
//     });
//     const chartRef = useRef(null);
//     const chartInstance = useRef(null);

//     useEffect(() => {
//         // Convert the data values to numbers
//         const newLabel = new Date(data.E).toLocaleTimeString();  // Convert timestamp to human-readable format
//         const newData = Number(data.a);

//         setChartData(prevData => {
//             const updatedLabels = [...prevData.labels, newLabel];
//             const updatedData = [...prevData.datasets[0].data, newData];

//             return {
//                 labels: updatedLabels,
//                 datasets: [{
//                     ...prevData.datasets[0],
//                     data: updatedData
//                 }]
//             };
//         });
//     }, [data]);

//     useEffect(() => {
//         const ctx = chartRef.current.getContext('2d');

//         if (chartInstance.current) {
//             chartInstance.current.destroy();
//         }

//         chartInstance.current = new Chart(ctx, {
//             type: 'line',
//             data: chartData,
//             options: {
//                 plugins: {
//                     legend: {
//                         display: false, // Disable the legend
//                     }
//                 },
//                 scales: {
//                     x: {
//                         type: 'category',
//                         title: {
//                             display: false,
//                             text: 'Timestamp'
//                         }
//                     },
//                     y: {
//                         type: 'linear',
//                         beginAtZero: true,
//                         title: {
//                             display: false,
//                             text: 'Price'
//                         }
//                     }
//                 }
//             }
//         });

//         return () => {
//             if (chartInstance.current) {
//                 chartInstance.current.destroy();
//             }
//         };
//     }, [chartData]);

//     return <canvas ref={chartRef} className='w-[150]'></canvas>;
// };


import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export const LineChart = () => {
  const chartRef = useRef(null);
  let data = [];
  let now = new Date(1997, 9, 3);
  const oneDay = 24 * 3600 * 1000;
  let value = Math.random() * 1000;

  function randomData() {
    now = new Date(+now + oneDay);
    value = value + Math.random() * 21 - 10;
    return {
      name: now.toString(),
      value: [
        [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
        Math.round(value),
      ],
    };
  }

  for (let i = 0; i < 1000; i++) {
    data.push(randomData());
  }

  useEffect(() => {
    const myChart = echarts.init(chartRef.current);

    const option = {
      xAxis: {
        type: 'time',
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          type: 'line',
          showSymbol: false,
          data: data,
        },
      ],
    };

    myChart.setOption(option);

    const interval = setInterval(() => {
      for (let i = 0; i < 5; i++) {
        data.shift();
        data.push(randomData());
      }
      myChart.setOption({
        series: [
          {
            data: data,
          },
        ],
      });
    }, 99);

    return () => {
      clearInterval(interval);
      myChart.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};
