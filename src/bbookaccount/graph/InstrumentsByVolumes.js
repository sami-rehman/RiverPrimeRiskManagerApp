import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const InstrumentsByVolumes = () => {
  const nbr = 10;
  const [dataset, setDataset] = useState(null);
  const [volumeType, setVolumeType] = useState('Notional'); // State to manage the selected volume type

  // Sorting function based on volumeType state
  const getData = dataset
    ? dataset
        ?.sort((a, b) => {
          if (volumeType === 'lots') {
            return b?.totalVolLots - a?.totalVolLots; // Sort by totalVolLots
          } else {
            return b?.totalVolNots - a?.totalVolNots; // Sort by totalVolNots
          }
        })
        .slice(0, nbr)
    : [];

  useEffect(() => {
    const socket = new WebSocket("ws://192.168.3.164:8081/ws/api/v1/bookPositionsB");
    let isSocketOpen = false;

    const handleMessage = (event) => {
      const data = JSON.parse(event.data);
      setDataset(data);
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

  const chartHeight = 270;

  // Dynamically update chart options based on volumeType
  const chartOptions = getData?.length
    ? {
        chart: {
          type: 'bar',
          height: chartHeight,
          reflow: false,
        },
        title: {
          text: `Total Volume by ${volumeType}`,
          align: 'left',
        },
        legend: {
          enabled: false,
        },
        xAxis: {
          categories: getData.map((item) => item.symbol),
          title: {
            text: '',
          }
        },
        yAxis: {
          opposite: true,
          tickPixelInterval: 100,
          title: {
            text: ''
          }
        },
        
        plotOptions: {
          series: {
            stacking: 'normal',
            animation: false,
            groupPadding: 0,
            pointPadding: 0.1,
            borderWidth: 0,
            colorByPoint: false,
            dataSorting: {
              enabled: true,
              matchByName: true,
            },
            // dataLabels: {
            //   enabled: false,
            //   // style: {
            //   //   fontSize: '8px',
            //   // },
            // },
          },
        },
        series: [
          {
            name: volumeType === 'Lots' ? 'Total Short Volume Lots' : 'Total Short Volume Notional',
            data: getData?.map((item) =>
              volumeType === 'Lots' ? item.totalShortVolLots : item.totalShortVolNotional
            ),
            color: '#ccccff',
          },
          {
            name: volumeType === 'Lots' ? 'Total Long Volume Lots' : 'Total Long Volume Notional',
            data: getData?.map((item) =>
              volumeType === 'Lots' ? item.totalLongVolLots : item.totalLongVolNotional
            ),
            color: '#b5d1cf',
          },
        ],
      }
    : null;

  return (
    <>
      <div className="flex justify-start ml-2">
        <label className="mr-4">
          <input
            type="radio"
            value="Lots"
            checked={volumeType === 'Lots'}
            onChange={() => setVolumeType('Lots')}
          />
          <span className="ml-1">Lots</span>
        </label>
        <label>
          <input
            type="radio"
            value="Notional"
            checked={volumeType === 'Notional'}
            onChange={() => setVolumeType('Notional')}
          />
          <span className="ml-1">Notional</span>
        </label>
      </div>
      
      {/* Highcharts component */}
      {dataset ? (
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      ) : (
        <p>Loading chart...</p>
      )}
    </>
  );
};

export default InstrumentsByVolumes;
