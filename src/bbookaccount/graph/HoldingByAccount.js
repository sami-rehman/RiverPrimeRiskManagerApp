import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const HoldingByAccount = () => {
  // const getData = [
  //   {
  //     "holdings": {
  //       "long": {
  //         "NDX100": [
  //           {
  //             "volLots": 116.6,
  //             "volNotional": 58300.0
  //           }
  //         ]
  //       },
  //       "short": null
  //     },
  //     "login": 2343
  //   },
  //   {
  //     "holdings": {
  //       "long": null,
  //       "short": {
  //         "Gold": [
  //           {
  //             "volLots": 6.0,
  //             "volNotional": 600.0
  //           }
  //         ],
  //         "WTI": [
  //           {
  //             "volLots": 10.0,
  //             "volNotional": 10000.0
  //           }
  //         ]
  //       }
  //     },
  //     "login": 119733
  //   },
  //   {
  //     "holdings": {
  //       "long": {
  //         "Gold": [
  //           {
  //             "volLots": 201.0,
  //             "volNotional": 20100.0
  //           }
  //         ],
  //         "WTI": [
  //           {
  //             "volLots": 1000.0,
  //             "volNotional": 10000.0
  //           }
  //         ]
  //       },
  //       "short": null
  //     },
  //     "login": 903127
  //   },
  //   {
  //     "holdings": {
  //       "long": {
  //         "GBPNZD": [
  //           {
  //             "volLots": 100.0,
  //             "volNotional": 100.0
  //           }
  //         ]
  //       },
  //       "short": {
  //         "Silver": [
  //           {
  //             "volLots": 50.0,
  //             "volNotional": 100.0
  //           }
  //         ]
  //       }
  //     },
  //     "login": 904495
  //   },
  //   {
  //     "holdings": {
  //       "long": null,
  //       "short": {
  //         "Gold": [
  //           {
  //             "volLots": 8.0,
  //             "volNotional": 800.0
  //           }
  //         ]
  //       }
  //     },
  //     "login": 904642
  //   },
  //   {
  //     "holdings": {
  //       "long": {
  //         "AUDCHF": [
  //           {
  //             "volLots": 100.0,
  //             "volNotional": 100.0
  //           }
  //         ],
  //         "AUDJPY": [
  //           {
  //             "volLots": 1000.0,
  //             "volNotional": 100.0
  //           }
  //         ],
  //         "AUDNZD": [
  //           {
  //             "volLots": 1000.0,
  //             "volNotional": 100.0
  //           }
  //         ],
  //         "CHFJPY": [
  //           {
  //             "volLots": 1000.0,
  //             "volNotional": 100.0
  //           }
  //         ],
  //         "EURAUD": [
  //           {
  //             "volLots": 1000.0,
  //             "volNotional": 100.0
  //           }
  //         ],
  //         "EURJPY": [
  //           {
  //             "volLots": 2000.0,
  //             "volNotional": 200.0
  //           }
  //         ],
  //         "Gold": [
  //           {
  //             "volLots": 1.0,
  //             "volNotional": 100.0
  //           }
  //         ],
  //         "Silver": [
  //           {
  //             "volLots": 50.0,
  //             "volNotional": 100.0
  //           }
  //         ],
  //         "USDJPY": [
  //           {
  //             "volLots": 1000.0,
  //             "volNotional": 100.0
  //           }
  //         ],
  //         "WTI": [
  //           {
  //             "volLots": 10.0,
  //             "volNotional": 100.0
  //           }
  //         ]
  //       },
  //       "short": null
  //     },
  //     "login": 905727
  //   }
  // ];

  const colors = Highcharts.getOptions().colors.map((c, i) =>
    Highcharts.color(Highcharts.getOptions().colors[0])
      .brighten((i - 3) / 20)
      .get()
  );

  const chartHeight = 290;
  const chartOptions = {
    chart: {
      type: 'bar',
      height:chartHeight,
      marginLeft: 10,
      style: {
          fontFamily: "'Arial', sans-serif",
        },
    },
    title: {
      text: `Groups Holdings: Live Holding`,
      align: 'left',
    },

     // Disable the legend
     legend: {
      enabled: false
    },
    
    
    plotOptions: {
      series: {
        cursor: 'pointer',
        colors: colors,
        borderRadius: 5,
        stacking: 'normal',  // Enable stacking globally
        dataLabels: {
          enabled: false
        }
      }
    },

    xAxis: {
      left: '50%',
      categories: ['44253', '44254', '44255', '44256', '44257', '44258', '44259', '4421','4462','4463','4464','4465',],
      lineWidth: 0,
      tickWidth: 0,
      labels: {
        align: 'left',
        x: -18
      },
      title: {
        text: 'Account',
        align: 'high',
        rotation: 0,
        x: 35,
        y:-5,
      }
    },

    yAxis: [{
      left: '55%',
      width: '45%',
      labels: {
        enabled: true
      },
      title: {
        text: "Long",
        align: "high",
        style: {
          fontSize: "10pt",
        },
      },
      gridLineWidth: 1,
      lineWidth: 1,
      minTickInterval: 1,
      plotLines: [{
        value: 0,
        width: 1,
        color: 'black',
        zIndex: 4
      }],
    }, {
      reversed: true,
      width: '45%',
      offset: 0,
      labels: {
        enabled: true
      },
      gridLineWidth: 1,
      lineWidth: 1,
      minTickInterval: 1,
      title: {
        text: "Short",
        align: "low",
        style: {
          fontSize: "10pt",
        },
      },
      plotLines: [{
        value: 0,
        width: 1,
        color: 'black',
        zIndex: 4
      }],
    }],

    series: [
      {
        name: 'Gold.',
        data: [2, 5, 9, 20, 1, 3, 6],
        yAxis: 1,
        stack: 'shortStack',
        color: colors[0]
      },
      {
        name: 'Silver',
        data: [1, 2, 3, 5, 1, 1, 2],
        yAxis: 1,
        stack: 'shortStack',
        color: colors[1]
      },
      {
        name: 'Gold',
        data: [2, 5, 9, 20, 1, 3, 6],
        yAxis: 1,
        stack: 'shortStack',
        color: colors[2]
      },
      {
        name: 'DJ130',
        data: [1, 2, 3, 5, 1, 1, 2],
        yAxis: 1,
        stack: 'shortStack',
        color: colors[3]
      },
      {
        name: 'Gold.',
        data: [1, 3, 5, 8, 9, 4, 15],
        stack: 'longStack',
        color: colors[0]
      },
      {
        name: 'Eur-USD',
        data: [2, 1, 2, 3, 4, 2, 5],
        stack: 'longStack',
        color: colors[1]
      },
      {
        name: 'DJ130',
        data: [1, 3, 5, 8, 9, 4, 15],
        stack: 'longStack',
        color: colors[2]
      },
      {
        name: 'XBC',
        data: [2, 1, 2, 3, 4, 2, 5],
        stack: 'longStack',
        color: colors[3]
      },
      {
        name: 'XBC1',
        data: [2, 1, 2, 3, 4, 2, 5],
        stack: 'longStack',
        color: colors[4]
      },
      {
        name: 'BC1',
        data: [2, 1, 2, 3, 2, 1, 2,],
        stack: 'longStack',
        color: colors[4]
      }
    ],
    // Make the chart responsive
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 400
          },
          chartOptions: {
            chart: {
              height: 300
            },
            xAxis: {
              labels: {
                style: {
                  fontSize: '8px'
                }
              }
            },
            yAxis: {
              labels: {
                style: {
                  fontSize: '8px'
                }
              }
            }
          }
        }
      ]
    }
  };
  return (
  <div className='w-full h-full'>
       <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
      />
    </div>
  );
};

export default HoldingByAccount;
