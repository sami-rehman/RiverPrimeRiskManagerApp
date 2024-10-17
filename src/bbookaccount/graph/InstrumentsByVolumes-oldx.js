import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const InstrumentsByVolumes = () => {
  const nbr = 5;
  const [volumeType, setVolumeType] = useState('Notional');

  const financialData = [
    {
      averageFillPriceLong: 2652.720446722824,
      averageFillPriceShort: 2571.143055573134,
      symbol: 'Gold.',
      totalLongVolLots: 3650736770,
      totalShortVolLots: 3354541600,
      totalLongVolNotional: 56041000,
      totalShortVolNotional: 35638500,
      totalUnrealizedPL: '-10614581.960000',
      totalVolNots: 91679500,
      totalVollots: 7005278370
    },
    {
      averageFillPriceLong: 41757.58105981567,
      averageFillPriceShort: 41515.95062498265,
      symbol: 'DJI30',
      totalLongVolLots: 41008538070,
      totalShortVolLots: 161765130,
      totalLongVolNotional: 87491100,
      totalShortVolNotional: 302800,
      totalUnrealizedPL: '24282572.310000',
      totalVolNots: 87793900,
      totalVollots: 41170303200
    },
    {
      averageFillPriceLong: 19561.65237444786,
      averageFillPriceShort: 19869.800732244094,
      symbol: 'NDX100',
      totalLongVolLots: 44393242860,
      totalShortVolLots: 11518700,
      totalLongVolNotional: 16378600,
      totalShortVolNotional: 2091800,
      totalUnrealizedPL: '17506262.950000',
      totalVolNots: 18470400,
      totalVollots: 44404761560
    },
    {
      averageFillPriceLong: 2644.2912323409073,
      averageFillPriceShort: 2622.7083399748476,
      symbol: 'Gold',
      totalLongVolLots: 777220,
      totalShortVolLots: 659990,
      totalLongVolNotional: 7683600,
      totalShortVolNotional: 4102400,
      totalUnrealizedPL: '-1273659.400000',
      totalVolNots: 11786000,
      totalVollots: 1437210
    },
    {
      averageFillPriceLong: 20244.1423046574,
      averageFillPriceShort: 20234.453933027668,
      symbol: 'NQZ24',
      totalLongVolLots: 67747510,
      totalShortVolLots: 704470,
      totalLongVolNotional: 2089000,
      totalShortVolNotional: 6266200,
      totalUnrealizedPL: '-2314255.170000',
      totalVolNots: 8355200,
      totalVollots: 68451980
    }
  ];

  const getData = financialData
  ?.sort((a, b) => {
    if (volumeType === 'lots') {
      return b?.totalVollots - a?.totalVollots; // Sort by totalVolLots
    } else {
      return b?.totalVolNots - a?.totalVolNots; // Sort by totalVolNots
    }
  })
  .slice(0, nbr);

console.log('XgetData', getData)

  // Extract symbols (xAxis categories), totalShortVolLots, and totalLongVolNotional dynamically
  const categories = getData.map(item => item.symbol);
  const totalShortVolNotional = getData.map(item =>
    //  -item.totalShortVolNotional
    volumeType === 'Lots' ? -item.totalShortVolLots : -item.totalShortVolNotional
    );
  const totalLongVolNotional = getData.map(item =>
    // item.totalLongVolNotional
    volumeType === 'Lots' ? item.totalLongVolLots : item.totalLongVolNotional
  );
  const netAggregate=  getData.map(item =>
    // item.totalLongVolNotional-item.totalShortVolNotional
    volumeType === 'Lots'
    ? item?.totalLongVolLots - item?.totalShortVolLots 
    : item?.totalLongVolNotional - item?.totalShortVolNotional
  )

  const chartOptions = {
    chart: {
      type: 'column',
      style: {
      fontFamily: "'Arial', sans-serif",
      },
      inverted: true // Inverted if you want to flip the axes
    },
      title: {
        text: `Total Volume by ${volumeType}`,
        align: 'left',
    },
    xAxis: {
      categories, // Use dynamically extracted symbols
      title: {
        text: 'Instruments',
      },
      plotBands: financialData.map((_, index) => ({
        from: index - 0.5,
        to: index + 0.5,
        color: index % 2 === 0 ? '#232730' : '#292e37',
      })),
    },
    // yAxis: {
    //   title: {
    //     text: 'Volume/Notional'
    //   }
    // },
    yAxis: {
          labels: {
            formatter: function () {
              const value = Math.abs(this.value); // Use absolute value
    
              // Helper function to format the number and remove trailing .0
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
    credits: {
      enabled: false
    },
    // plotOptions: {
    //   column: {
    //     borderRadius: '25%'
    //   }
    // },
    plotOptions: {
          series: {
            // stacking: 'normal',
            animation: false,
            groupPadding: 0.1,
            pointPadding: 0.1,
            borderWidth: 0,
            // dataSorting: {
            //   enabled: true,
            //   matchByName: true,
            // },
          },
        },
    series: [
      {
        name: 'Total Short Vol Notional',
        data: totalShortVolNotional,
        color: '#fde642',
      },
      {
        name: 'Total Long Vol Notional',
        data: totalLongVolNotional,
        color: '#a979f7',
      },
      {
        name: 'Net Aggregate',
        data: netAggregate,
        color: '#2563f4',
      }
    ]
  };

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
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
      />
    </div>
  );
};

export default InstrumentsByVolumes;
