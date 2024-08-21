//LPSymbolsCharts.js

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const ROOT_PATH = 'https://echarts.apache.org/examples';

const LPSymbolsCharts = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);
    const dataUrl = `${ROOT_PATH}/data/asset/data/flare.json`;

    const fetchData = async () => {
      try {
        myChart.showLoading();

        const response = await fetch(dataUrl);
        const data = await response.json();

        myChart.hideLoading();

        data.children.forEach((datum, index) => {
          if (index % 2 === 0) datum.collapsed = true;
        });

        const option = {
          tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
          },
          series: [
            {
              type: 'tree',
              data: [data],
              top: '1%',
              left: '7%',
              bottom: '1%',
              right: '20%',
              symbolSize: 7,
              label: {
                position: 'left',
                verticalAlign: 'middle',
                align: 'right',
                fontSize: 9
              },
              leaves: {
                label: {
                  position: 'right',
                  verticalAlign: 'middle',
                  align: 'left'
                }
              },
              emphasis: {
                focus: 'descendant'
              },
              expandAndCollapse: true,
              animationDuration: 550,
              animationDurationUpdate: 750
            }
          ]
        };

        myChart.setOption(option);
      } catch (error) {
        console.error('Error fetching or processing data:', error);
      }
    };

    fetchData();

    return () => {
      myChart.dispose();
    };
  }, []);

  return <div ref={chartRef} className='h-full w-full p-2'  />;
};

export default LPSymbolsCharts;
