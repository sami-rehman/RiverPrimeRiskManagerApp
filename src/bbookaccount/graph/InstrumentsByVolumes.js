import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { formatNumber } from '../../common';

const InstrumentsByVolumes = () => {
  const nbr = 5;
  const [volumeType, setVolumeType] = useState('Notional');
  const [dataset, setDataset] = useState([
    {

      "averageFillPriceLong": 2652.720446722824,

      "averageFillPriceShort": 2571.143055573134,

      "symbol": "Gold.",

      "totalLongVolLots": 3650736770,

      "totalShortVolLots": 3354541600,
      "totalLongVolNotional": 56041000,

      "totalShortVolNotional": 35638500,

      "totalUnrealizedPL": "10614581.960000",

      "totalVolNots": 91679500,

      "totalVollots": 7005278370

    },

    {

      "averageFillPriceLong": 41757.58105981567,

      "averageFillPriceShort": 41515.95062498265,

      "symbol": "DJI30",

      "totalLongVolLots": 41008538070,

      "totalLongVolNotional": 87491100,

      "totalShortVolLots": 161765130,

      "totalShortVolNotional": 302800,

      "totalUnrealizedPL": "24282572.310000",

      "totalVolNots": 87793900,

      "totalVollots": 41170303200

    },

    {

      "averageFillPriceLong": 19561.65237444786,

      "averageFillPriceShort": 19869.800732244094,

      "symbol": "NDX100",

      "totalLongVolLots": 44393242860,

      "totalLongVolNotional": 16378600,

      "totalShortVolLots": 11518700,

      "totalShortVolNotional": 2091800,

      "totalUnrealizedPL": "17506262.950000",

      "totalVolNots": 18470400,

      "totalVollots": 44404761560

    },

    {

      "averageFillPriceLong": 2644.2912323409073,

      "averageFillPriceShort": 2622.7083399748476,

      "symbol": "Gold",

      "totalLongVolLots": 777220,

      "totalLongVolNotional": 7683600,

      "totalShortVolLots": 659990,

      "totalShortVolNotional": 4102400,

      "totalUnrealizedPL": "-1273659.400000",

      "totalVolNots": 11786000,

      "totalVollots": 1437210

    },

    {

      "averageFillPriceLong": 20244.1423046574,

      "averageFillPriceShort": 20234.453933027668,

      "symbol": "NQZ24",

      "totalLongVolLots": 67747510,

      "totalLongVolNotional": 2089000,

      "totalShortVolLots": 704470,

      "totalShortVolNotional": 6266200,

      "totalUnrealizedPL": "-2314255.170000",

      "totalVolNots": 8355200,

      "totalVollots": 68451980

    }
  ]);

  useEffect(() => {
    const socket = new WebSocket('ws://192.168.3.164:8081/ws/api/v1/bookPositionsB');
    let isSocketOpen = false;

    const handleMessage = (event) => {
      const data = JSON.parse(event.data);
      setDataset(data);
    };

    const sendRequest = () => {
      if (socket.readyState === WebSocket.OPEN) {
        const requestMessage = {
          type: 'request',
          requestType: 'instrumentsPerformance',
          accounts: 'all',
        };
        socket.send(JSON.stringify(requestMessage));
      }
    };

    socket.addEventListener('message', handleMessage);

    socket.onopen = () => {
      isSocketOpen = true;
      sendRequest();
    };

    return () => {
      if (isSocketOpen) {
        const unsubscribeMessage = {
          type: 'unsubscribe',
          requestType: 'positionsActivities',
          accounts: 'all',
        };
        socket.send(JSON.stringify(unsubscribeMessage));
        socket.removeEventListener('message', handleMessage);
        socket.close();
      }
    };
  }, []);

  const chartHeight = 265;

  const getData = dataset
    ?.sort((a, b) => {
      if (volumeType === 'lots') {
        return b?.totalVollots - a?.totalVollots;
      } else {
        return b?.totalVolNots - a?.totalVolNots;
      }
    })
    .slice(0, nbr);

  console.log('XgetData', getData)

  const chartOptions = getData?.length
    ? {
      chart: {
        type: 'bar',
        height: chartHeight,
        zooming: { type: "xy" },
        style: {
          fontFamily: "'Arial', sans-serif",
        },
      },
      title: {
        text: `Total Volume by ${volumeType}`,
        align: 'left',
      },

      xAxis: {
        categories: getData.map((item) => item?.symbol),
        title: {
          text: 'Instruments',
        },
        plotBands: getData.map((_, index) => ({
          from: index - 0.5,
          to: index + 0.5,
          color: index % 2 === 0 ? '#232730' : '#292e37',
        })),
      },
      yAxis: {
        title: {
          text: `Volume (${volumeType})`,
        },
        labels: {
          formatter: function () {
            const value = Math.abs(this.value);

            const formatNumber = (num, suffix) => {
              return (num % 1 === 0 ? num.toFixed(0) : num.toFixed(1)) + suffix;
            };

            if (value >= 1000000000) {
              return formatNumber(value / 1000000000, 'B');
            } else if (value >= 1000000) {
              return formatNumber(value / 1000000, 'M');
            } else if (value >= 10000) {
              return formatNumber(value / 1000, 'K');
            } else {
              return value;
            }
          },
        },
      },

      tooltip: {
        useHTML: true,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        style: {
          color: "#000000",
        },
        borderColor: "#68b2ac",
        headerFormat: "<table>",
        formatter: function () {
          const { category, y, UnrealizedPL, averageFillPrice, direction, color } = this.point;
          const UnrealizedPLFormatted = Number(UnrealizedPL) < 0 ? `-$${formatNumber(Number(Math.abs(UnrealizedPL)))}` : `$${formatNumber(Number(UnrealizedPL))}`;
          return `
              <div class="relative group">
              <table class="table-auto text-left">
              <tr>
              <th colspan="2" class="font-semibold text-sm pb-1">
              <div class="flex items-center">
              <div class="w-2 h-2 rounded-full" style="background-color: ${color}; margin-right: 0.5rem;"></div>
              <h3>${category}  [${direction}]</h3>
              </div>
              </th>
              </tr>
              <tr>
              <th class="pr-2">Average Fill Price:</th>
              <td>$${formatNumber(averageFillPrice)}</td>
              </tr>
              <tr>
              <th class="pr-2">Volume:</th>
              <td>${formatNumber(Math.abs(y))}</td>
              </tr>
              <tr>
              <th class="pr-2">UnrealizedPL:</th>
              <td>
              ${UnrealizedPLFormatted}
              </tr>
              </table>
              </div> `;
        },
        footerFormat: "",
        followPointer: true,
      },

      plotOptions: {
        series: {
          // stacking: 'normal',
          animation: false,
          groupPadding: 0.1,
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
       series: [
        {
          name: 'Short',
          data: getData?.map((item) => ({
            y: volumeType === 'Lots' ? -item.totalShortVolLots : -item.totalShortVolNotional,
            averageFillPrice: item.averageFillPriceShort,
            UnrealizedPL: item.totalUnrealizedPL,
            direction: 'Short'
          })),
          color: '#fde642',
        },
        {
          name: 'Long',
          data: getData?.map((item) => ({
            y: volumeType === 'Lots' ? item.totalLongVolLots : item.totalLongVolNotional,
            averageFillPrice: item.averageFillPriceLong,
            UnrealizedPL: item.totalUnrealizedPL,
            direction: 'Long'
          })),
          color: '#a979f7',
        },
        {
          name: 'Net Aggregate',
          type: 'bar',
          data: getData?.map((item) => ({
            y: volumeType === 'Lots'
              ? item?.totalLongVolLots - item?.totalShortVolLots
              : item?.totalLongVolNotional - item?.totalShortVolNotional,
            averageFillPrice: (item.averageFillPriceLong + item.averageFillPriceShort) / 2,
            UnrealizedPL: item.totalUnrealizedPL,
            direction: 'Aggregate'
          })),
          color: '#2563f4',
        },
      ],
    }
    : null;

  return (
    <div className='w-full h-full'>
      <div className='flex justify-start ml-2'>
        <label className='mr-4'>
          <input
            type='radio'
            value='Lots'
            checked={volumeType === 'Lots'}
            onChange={() => setVolumeType('Lots')}
          />
          <span className='ml-1'>Lots</span>
        </label>
        <label>
          <input
            type='radio'
            value='Notional'
            checked={volumeType === 'Notional'}
            onChange={() => setVolumeType('Notional')}
          />
          <span className='ml-1'>Notional</span>
        </label>
      </div>

      {dataset ? (
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default InstrumentsByVolumes;
