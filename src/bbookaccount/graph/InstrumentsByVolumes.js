import React, { useEffect, useState, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const InstrumentsByVolumes = () => {
  const nbr = 20;
  const dataMapRef = useRef(new Map());
  const [dataset, setDataset] = useState(null);
  const [chartOptions, setChartOptions] = useState({});

  const getData = () => {
    if (!dataset || dataset?.length === 0) return [];
    return dataset
      ?.map(item => ({
        name: item.symbol,
        y: Number(item.totalvol),
        totalUnrealizedPL: Number(item.totalUnrealizedPL),
      }))
      .sort((a, b) => b.y - a.y)
      .slice(0, nbr);
  };

   const dataTest = [ {
    "symbol": "AUDCAD",
    "totalLongVol": 2.537E9,
    "totalLongVolLots": 1000000.0,
    "totalShortVol": 0.0,
    "totalShortVolLots": 0.0,
    "totalUnrealizedPL": "-32.620000"
},
{
    "symbol": "AUDCAD.",
    "totalLongVol": 2.2E8,
    "totalLongVolLots": 2.00001E10,
    "totalShortVol": 4.0E8,
    "totalShortVolLots": 4.0E7,
    "totalUnrealizedPL": "-103.950000"
},
{
    "symbol": "AUDCHF",
    "totalLongVol": 2.52E9,
    "totalLongVolLots": 100000.0,
    "totalShortVol": 0.0,
    "totalShortVolLots": 0.0,
    "totalUnrealizedPL": "2.850000"
},
{
    "symbol": "AUDCHF.",
    "totalLongVol": 9.43E8,
    "totalLongVolLots": 300000.0,
    "totalShortVol": 0.0,
    "totalShortVolLots": 0.0,
    "totalUnrealizedPL": "36.460000"
},
{
    "symbol": "AUDJPY",
    "totalLongVol": 2.521E9,
    "totalLongVolLots": 100000.0,
    "totalShortVol": 0.0,
    "totalShortVolLots": 0.0,
    "totalUnrealizedPL": "5.030000"
},
{
    "symbol": "AUDJPY.",
    "totalLongVol": 3.5E8,
    "totalLongVolLots": 1.2024E9,
    "totalShortVol": 6000000.0,
    "totalShortVolLots": 1.2E9,
    "totalUnrealizedPL": "185.620000"
}];

  useEffect(() => {
    const socket = new WebSocket(
      "ws://192.168.3.164:8081/ws/api/v1/bookPositionsB"
    );
    let isSocketOpen = false;

    const handleMessage = (event) => {
      const data = JSON.parse(event.data);
      updateTable(data);
    };

    const sendRequest = () => {
      if (socket.readyState === WebSocket.OPEN) {
        const requestMessage = {
          type: "request",
          requestType: "instrumentsPerformance",
          accounts: 'all',
        };
        socket.send(JSON.stringify(requestMessage));
      }
    };

    socket.addEventListener("message", handleMessage);

    socket.onopen = () => {
      isSocketOpen = true;
      sendRequest();
    };

    return () => {
      if (isSocketOpen) {
        const unsubscribeMessage = {
          type: "unsubscribe",
          requestType: "positionsActivities",
          accounts: 'all',
        };
        socket.send(JSON.stringify(unsubscribeMessage));
        socket.removeEventListener("message", handleMessage);
        socket.close();
      }
    };
  }, []);

  const updateTable = (data) => {
    const incomingData = Array.isArray(data) ? data : [data];
    incomingData.forEach(item => {
      dataMapRef.current.set(item.symbol, item);
    });
    setDataset(Array.from(dataMapRef.current.values()));
  };

  useEffect(() => {
    if (dataset) {
      const chartHeight = 290;
      const barHeight = chartHeight / nbr; 
      const fontSize = Math.max(12, barHeight * 0.4);

      setChartOptions({
        chart: {
          type: 'bar',
          height: chartHeight, // Set chart height
          reflow: false,  // very important flag to avoid resize loop error 
        },
        title: {
          text: 'Instruments by Total Volume',
          align: 'left',
        },
        legend: {
          enabled: false,
        },
        xAxis: {
        //   type: 'category',
        //   labels: {
        //     style: {
        //       fontSize: `${fontSize}px`,
        //     },
        //   },
        categories: dataTest.map(item => item.symbol), // Symbol labels
        title: {
            text: 'Symbols'
        }
        },
        yAxis: {
          opposite: true,
          tickPixelInterval: 150,
          title: {
            text: 'Total Volume',
          },
    //       labels: {
    //       formatter: function () {
    //         const value = this.value; // The current label value
    //         return (value / 1000000).toFixed(1) + 'M'; // Convert to millions and format
    //     }
    // }
        },
        // tooltip: {
        //   formatter: function () {
        //     return `<b>${this.point.name}</b><br/>
        //             Total Volume: ${this.y}<br/>
        //             Total Unrealized P&L: ${this.point.totalUnrealizedPL}`;
        //   },
        // },
        plotOptions: {
          series: {
            stacking: 'normal',
            animation: false,
            groupPadding: 0,
            pointPadding: 0.1,
            borderWidth: 0,
            colorByPoint: true,
            dataSorting: {
              enabled: true,
              matchByName: true,
            },
            dataLabels: {
              enabled: true,
            },
          },
        },
        // series: [
        //   {
        //     type: 'bar',
        //     name: 'Total Volume',
        //     data: getData(),
        //   },
        // ]

        series: [{
        name: 'Total Short Volume',
        data: dataTest.map(item => item.totalShortVol), // Short volumes
        color: '#FF5733' // Color for Short volume
    }, {
        name: 'Total Long Volume',
        data: dataTest.map(item => item.totalLongVol), // Long volumes
        color: '#33FF57' // Color for Long volume
    }]
      });
    }
  }, [dataset]);

  return (
    <div className='h-full w-full'>
      {dataset ? (
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default InstrumentsByVolumes;

