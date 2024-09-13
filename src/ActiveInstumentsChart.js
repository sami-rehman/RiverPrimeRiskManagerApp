// ActiveInstumentsChart
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const ROOT_PATH = 'https://echarts.apache.org/examples';
const updateFrequency = 2000;
const dimension = 0;

const countryColors = {
  Australia: '#00008b',
  Canada: '#f00',
  China: '#ffde00',
  Cuba: '#002a8f',
  Finland: '#003580',
  France: '#ed2939',
  Germany: '#000',
  Iceland: '#003897',
  India: '#f93',
  Japan: '#bc002d',
  'North Korea': '#024fa2',
  'South Korea': '#000',
  'New Zealand': '#00247d',
  Norway: '#ef2b2d',
  Poland: '#dc143c',
  Russia: '#d52b1e',
  Turkey: '#e30a17',
  'United Kingdom': '#00247d',
  'United States': '#b22234'
};

const ActiveInstumentsChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);
    let option;

    const fetchData = async () => {
      try {
        const [flagsResponse, dataResponse] = await Promise.all([
          fetch('https://fastly.jsdelivr.net/npm/emoji-flags@1.3.0/data.json'),
          fetch(`${ROOT_PATH}/data/asset/data/life-expectancy-table.json`)
        ]);

        const flags = await flagsResponse.json();
        const data = await dataResponse.json();

        const years = [];
        for (let i = 0; i < data.length; ++i) {
          if (years.length === 0 || years[years.length - 1] !== data[i][4]) {
            years.push(data[i][4]);
          }
        }

        const getFlag = (countryName) => {
          if (!countryName) return '';
          return (flags.find((item) => item.name === countryName) || {}).emoji;
        };

        let startIndex = 10;
        let startYear = years[startIndex];

        option = {
          grid: {
            top: 10,
            bottom: 30,
            left: 150,
            right: 80
          },
          xAxis: {
            max: 'dataMax',
            axisLabel: {
              formatter: function (n) {
                return Math.round(n) + '';
              }
            }
          },
          dataset: {
            source: data.slice(1).filter((d) => d[4] === startYear)
          },
          yAxis: {
            type: 'category',
            inverse: true,
            max: 20,
            axisLabel: {
              show: true,
              fontSize: 10,
              formatter: function (value) {
                return value + '{flag|' + getFlag(value) + '}';
              },
              rich: {
                flag: {
                  fontSize: 10,
                  padding: 3
                }
              }
            },
            animationDuration: 300,
            animationDurationUpdate: 300
          },
          series: [
            {
              realtimeSort: true,
              seriesLayoutBy: 'column',
              type: 'bar',
              itemStyle: {
                color: function (param) {
                  return countryColors[param.value[3]] || '#5470c6';
                }
              },
              encode: {
                x: dimension,
                y: 3
              },
              label: {
                show: true,
                precision: 1,
                position: 'right',
                valueAnimation: true,
                fontFamily: 'monospace'
              },
              barWidth: 5,
            }
          ],
          animationDuration: 0,
          animationDurationUpdate: updateFrequency,
          animationEasing: 'linear',
          animationEasingUpdate: 'linear',
          graphic: {
            elements: [
              {
                type: 'text',
                right: 60,
                bottom: 60,
                style: {
                  text: startYear,
                  font: 'bolder 80px monospace',
                  fill: 'rgba(100, 100, 100, 0.25)'
                },
                z: 100
              }
            ]
          }
        };

        myChart.setOption(option);

        for (let i = startIndex; i < years.length - 1; ++i) {
          (function (i) {
            setTimeout(function () {
              updateYear(years[i + 1]);
            }, (i - startIndex) * updateFrequency);
          })(i);
        }

        const updateYear = (year) => {
          let source = data.slice(1).filter((d) => d[4] === year);
          option.series[0].data = source;
          option.graphic.elements[0].style.text = year;
          myChart.setOption(option);
        };
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    return () => {
      myChart.dispose();
    };
  }, []);

  return <div id="ActiveInstumentsChart" ref={chartRef} className='h-full w-full p-2' />;
};

export default ActiveInstumentsChart;
