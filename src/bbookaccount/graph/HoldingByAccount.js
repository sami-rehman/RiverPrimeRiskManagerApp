import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const HoldingByAccount = () => {
  const getData = [
    {
      "holdings": {
        "long": {
          "NDX100": [
            {
              "volLots": 116.6,
              "volNotional": 58300.0
            }
          ]
        },
        "short": null
      },
      "login": 2343
    },
    {
      "holdings": {
        "long": null,
        "short": {
          "Gold": [
            {
              "volLots": 6.0,
              "volNotional": 600.0
            }
          ],
          "WTI": [
            {
              "volLots": 10.0,
              "volNotional": 10000.0
            }
          ]
        }
      },
      "login": 119733
    },
    {
      "holdings": {
        "long": {
          "Gold": [
            {
              "volLots": 201.0,
              "volNotional": 20100.0
            }
          ],
          "WTI": [
            {
              "volLots": 1000.0,
              "volNotional": 10000.0
            }
          ]
        },
        "short": null
      },
      "login": 903127
    },
    {
      "holdings": {
        "long": {
          "GBPNZD": [
            {
              "volLots": 100.0,
              "volNotional": 100.0
            }
          ]
        },
        "short": {
          "Silver": [
            {
              "volLots": 50.0,
              "volNotional": 100.0
            }
          ]
        }
      },
      "login": 904495
    },
    {
      "holdings": {
        "long": null,
        "short": {
          "Gold": [
            {
              "volLots": 8.0,
              "volNotional": 800.0
            }
          ]
        }
      },
      "login": 904642
    },
    {
      "holdings": {
        "long": {
          "AUDCHF": [
            {
              "volLots": 100.0,
              "volNotional": 100.0
            }
          ],
          "AUDJPY": [
            {
              "volLots": 1000.0,
              "volNotional": 100.0
            }
          ],
          "AUDNZD": [
            {
              "volLots": 1000.0,
              "volNotional": 100.0
            }
          ],
          "CHFJPY": [
            {
              "volLots": 1000.0,
              "volNotional": 100.0
            }
          ],
          "EURAUD": [
            {
              "volLots": 1000.0,
              "volNotional": 100.0
            }
          ],
          "EURJPY": [
            {
              "volLots": 2000.0,
              "volNotional": 200.0
            }
          ],
          "Gold": [
            {
              "volLots": 1.0,
              "volNotional": 100.0
            }
          ],
          "Silver": [
            {
              "volLots": 50.0,
              "volNotional": 100.0
            }
          ],
          "USDJPY": [
            {
              "volLots": 1000.0,
              "volNotional": 100.0
            }
          ],
          "WTI": [
            {
              "volLots": 10.0,
              "volNotional": 100.0
            }
          ]
        },
        "short": null
      },
      "login": 905727
    }
  ];

  // Extract long and short holdings into separate arrays
  const extractPositions = (data) => {
    const loginMap = {};

    data.forEach(account => {
      const { login, holdings } = account;

      if (!loginMap[login]) {
        loginMap[login] = { long: [], short: [] };
      }

      // Extract long positions
      if (holdings.long) {
        for (const [symbol, volumes] of Object.entries(holdings.long)) {
          volumes.forEach(volume => {
            loginMap[login].long.push({ symbol, volLots: volume.volLots });
          });
        }
      }

      // Extract short positions
      if (holdings.short) {
        for (const [symbol, volumes] of Object.entries(holdings.short)) {
          volumes.forEach(volume => {
            loginMap[login].short.push({ symbol, volLots: volume.volLots });
          });
        }
      }
    });

    return loginMap;
  };

  const loginMap = extractPositions(getData);

  // Prepare data for chart
  const categories = Object.keys(loginMap);
  const longData = categories.map(login => 
    loginMap[login].long.map(pos => pos.volLots)
  ).flat();

  const shortData = categories.map(login => 
    loginMap[login].short.map(pos => pos.volLots)
  ).flat();

  const chartOptions = {
    chart: {
      type: 'bar',
      height: 290,
      width: 550,
      reflow: false,
    },
    title: {
      text: `Volume by Login`,
      align: 'left',
    },
    xAxis: {
      categories: categories,
      title: {
        text: 'Login',
      }
    },
    yAxis: {
      title: {
        text: 'Volume Lots'
      }
    },
    series: [
      {
        name: 'Long Volume Lots',
        data: longData,
      },
      {
        name: 'Short Volume Lots',
        data: shortData,
      },
    ],
  };

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </>
  );
};

export default HoldingByAccount;
