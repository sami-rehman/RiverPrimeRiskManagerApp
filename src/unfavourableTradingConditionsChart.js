import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsHeatmap from 'highcharts/modules/heatmap';

HighchartsHeatmap(Highcharts);

const lpData = {
    EUROUSD: {
        Lp: 'CMC',
        Markup: 22,
        Spreads: 2,
        Fees: 20,
        Commissions: 45,
        "Margins (In.)": 10,
        "Margins (Ma.)": 5,
        Leverage: 50,
        Limit: true,
        Stop: true,
        Market: true,
        "Price (Multiplier)": 1000,
        "Contract Size": 1,
        "Min. Order Size": 2,
        "Max. Order Size": 90
    },
    USDJPY: {
        Lp: 'Prime',
        Markup: 5,
        Spreads: 0.8,
        Fees: 8,
        Commissions: 25,
        "Margins (In.)": 2,
        "Margins (Ma.)": 1,
        Leverage: 200,
        Limit: true,
        Stop: false,
        Market: true,
        "Price (Multiplier)": 100,
        "Contract Size": 0.1,
        "Min. Order Size": 0.5,
        "Max. Order Size": 200
    },
    "Sliver": {
        Lp: 'LMAX',
        Markup: 15,
        Spreads: 3,
        Fees: 50,
        Commissions: 35,
        "Margins (In.)": 8,
        "Margins (Ma.)": 6,
        Leverage: 160,
        Limit: true,
        Stop: true,
        Market: true,
        "Price (Multiplier)": 1000,
        "Contract Size": 10,
        "Min. Order Size": 1,
        "Max. Order Size": 80
    },
    Gold: {
        Lp: 'Marex',
        Markup: 25,
        Spreads: 10,
        Fees: 15,
        Commissions: 10,
        "Margins (In.)": 50,
        "Margins (Ma.)": 30,
        Leverage: 30,
        Limit: false,
        Stop: true,
        Market: false,
        "Price (Multiplier)": 10,
        "Contract Size": 10,
        "Min. Order Size": 0.5,
        "Max. Order Size": 120
    },
    DJ130: {
        Lp: 'Finalto',
        Markup: 24,
        Spreads: 1.5,
        Fees: 24,
        Commissions: 40,
        "Margins (In.)": 10,
        "Margins (Ma.)": 8,
        Leverage: 190,
        Limit: true,
        Stop: true,
        Market: true,
        "Price (Multiplier)": 100,
        "Contract Size": 1,
        "Min. Order Size": 1,
        "Max. Order Size": 1000
    },
    EUROUSD1: {
        Lp: 'CMC',
        Markup: 22,
        Spreads: 2,
        Fees: 20,
        Commissions: 45,
        "Margins (In.)": 10,
        "Margins (Ma.)": 5,
        Leverage: 50,
        Limit: true,
        Stop: true,
        Market: true,
        "Price (Multiplier)": 1000,
        "Contract Size": 1,
        "Min. Order Size": 2,
        "Max. Order Size": 90
    },
    USDJPY1: {
        Lp: 'Prime',
        Markup: 5,
        Spreads: 0.8,
        Fees: 8,
        Commissions: 25,
        "Margins (In.)": 2,
        "Margins (Ma.)": 1,
        Leverage: 200,
        Limit: true,
        Stop: false,
        Market: true,
        "Price (Multiplier)": 100,
        "Contract Size": 0.1,
        "Min. Order Size": 0.5,
        "Max. Order Size": 200
    },
    "Sliver1": {
        Lp: 'LMAX',
        Markup: 15,
        Spreads: 3,
        Fees: 50,
        Commissions: 35,
        "Margins (In.)": 8,
        "Margins (Ma.)": 6,
        Leverage: 160,
        Limit: true,
        Stop: true,
        Market: true,
        "Price (Multiplier)": 1000,
        "Contract Size": 10,
        "Min. Order Size": 1,
        "Max. Order Size": 80
    },
    Gold1: {
        Lp: 'Marex',
        Markup: 25,
        Spreads: 10,
        Fees: 15,
        Commissions: 10,
        "Margins (In.)": 50,
        "Margins (Ma.)": 30,
        Leverage: 30,
        Limit: false,
        Stop: true,
        Market: false,
        "Price (Multiplier)": 10,
        "Contract Size": 10,
        "Min. Order Size": 0.5,
        "Max. Order Size": 120
    },
    DJ1301: {
        Lp: 'Finalto',
        Markup: 24,
        Spreads: 1.5,
        Fees: 24,
        Commissions: 40,
        "Margins (In.)": 10,
        "Margins (Ma.)": 8,
        Leverage: 190,
        Limit: true,
        Stop: true,
        Market: true,
        "Price (Multiplier)": 100,
        "Contract Size": 1,
        "Min. Order Size": 1,
        "Max. Order Size": 1000
    },
    EUROUSD2: {
        Lp: 'CMC',
        Markup: 22,
        Spreads: 2,
        Fees: 20,
        Commissions: 45,
        "Margins (In.)": 10,
        "Margins (Ma.)": 5,
        Leverage: 50,
        Limit: true,
        Stop: true,
        Market: true,
        "Price (Multiplier)": 1000,
        "Contract Size": 1,
        "Min. Order Size": 2,
        "Max. Order Size": 90
    },
    USDJPY2: {
        Lp: 'Prime',
        Markup: 5,
        Spreads: 0.8,
        Fees: 8,
        Commissions: 25,
        "Margins (In.)": 2,
        "Margins (Ma.)": 1,
        Leverage: 200,
        Limit: true,
        Stop: false,
        Market: true,
        "Price (Multiplier)": 100,
        "Contract Size": 0.1,
        "Min. Order Size": 0.5,
        "Max. Order Size": 200
    },
    "Sliver2": {
        Lp: 'LMAX',
        Markup: 15,
        Spreads: 3,
        Fees: 50,
        Commissions: 35,
        "Margins (In.)": 8,
        "Margins (Ma.)": 6,
        Leverage: 160,
        Limit: true,
        Stop: true,
        Market: true,
        "Price (Multiplier)": 1000,
        "Contract Size": 10,
        "Min. Order Size": 1,
        "Max. Order Size": 80
    },
    Gold2: {
        Lp: 'Marex',
        Markup: 25,
        Spreads: 10,
        Fees: 15,
        Commissions: 10,
        "Margins (In.)": 50,
        "Margins (Ma.)": 30,
        Leverage: 30,
        Limit: false,
        Stop: true,
        Market: false,
        "Price (Multiplier)": 10,
        "Contract Size": 10,
        "Min. Order Size": 0.5,
        "Max. Order Size": 120
    },
    DJ1302: {
        Lp: 'Finalto',
        Markup: 24,
        Spreads: 1.5,
        Fees: 24,
        Commissions: 40,
        "Margins (In.)": 10,
        "Margins (Ma.)": 8,
        Leverage: 190,
        Limit: true,
        Stop: true,
        Market: true,
        "Price (Multiplier)": 100,
        "Contract Size": 1,
        "Min. Order Size": 1,
        "Max. Order Size": 1000
    },
    EUROUSD3: {
        Lp: 'CMC',
        Markup: 22,
        Spreads: 2,
        Fees: 20,
        Commissions: 45,
        "Margins (In.)": 10,
        "Margins (Ma.)": 5,
        Leverage: 50,
        Limit: true,
        Stop: true,
        Market: true,
        "Price (Multiplier)": 1000,
        "Contract Size": 1,
        "Min. Order Size": 2,
        "Max. Order Size": 90
    },
    USDJPY3: {
        Lp: 'Prime',
        Markup: 5,
        Spreads: 0.8,
        Fees: 8,
        Commissions: 25,
        "Margins (In.)": 2,
        "Margins (Ma.)": 1,
        Leverage: 200,
        Limit: true,
        Stop: false,
        Market: true,
        "Price (Multiplier)": 100,
        "Contract Size": 0.1,
        "Min. Order Size": 0.5,
        "Max. Order Size": 200
    },
    "Sliver3": {
        Lp: 'LMAX',
        Markup: 15,
        Spreads: 3,
        Fees: 50,
        Commissions: 35,
        "Margins (In.)": 8,
        "Margins (Ma.)": 6,
        Leverage: 160,
        Limit: true,
        Stop: true,
        Market: true,
        "Price (Multiplier)": 1000,
        "Contract Size": 10,
        "Min. Order Size": 1,
        "Max. Order Size": 80
    },
    Gold3: {
        Lp: 'Marex',
        Markup: 25,
        Spreads: 10,
        Fees: 15,
        Commissions: 10,
        "Margins (In.)": 50,
        "Margins (Ma.)": 30,
        Leverage: 30,
        Limit: false,
        Stop: true,
        Market: false,
        "Price (Multiplier)": 10,
        "Contract Size": 10,
        "Min. Order Size": 0.5,
        "Max. Order Size": 120
    },
    DJ1303: {
        Lp: 'Finalto',
        Markup: 24,
        Spreads: 1.5,
        Fees: 24,
        Commissions: 40,
        "Margins (In.)": 10,
        "Margins (Ma.)": 8,
        Leverage: 190,
        Limit: true,
        Stop: true,
        Market: true,
        "Price (Multiplier)": 100,
        "Contract Size": 1,
        "Min. Order Size": 1,
        "Max. Order Size": 1000
    },
    EUROUSD4: {
        Lp: 'CMC',
        Markup: 22,
        Spreads: 2,
        Fees: 20,
        Commissions: 45,
        "Margins (In.)": 10,
        "Margins (Ma.)": 5,
        Leverage: 50,
        Limit: true,
        Stop: true,
        Market: true,
        "Price (Multiplier)": 1000,
        "Contract Size": 1,
        "Min. Order Size": 2,
        "Max. Order Size": 90
    },
    USDJPY4: {
        Lp: 'Prime',
        Markup: 5,
        Spreads: 0.8,
        Fees: 8,
        Commissions: 25,
        "Margins (In.)": 2,
        "Margins (Ma.)": 1,
        Leverage: 200,
        Limit: true,
        Stop: false,
        Market: true,
        "Price (Multiplier)": 100,
        "Contract Size": 0.1,
        "Min. Order Size": 0.5,
        "Max. Order Size": 200
    },
    "Sliver4": {
        Lp: 'LMAX',
        Markup: 15,
        Spreads: 3,
        Fees: 50,
        Commissions: 35,
        "Margins (In.)": 8,
        "Margins (Ma.)": 6,
        Leverage: 160,
        Limit: true,
        Stop: true,
        Market: true,
        "Price (Multiplier)": 1000,
        "Contract Size": 10,
        "Min. Order Size": 1,
        "Max. Order Size": 80
    },
    Gold4: {
        Lp: 'Marex',
        Markup: 25,
        Spreads: 10,
        Fees: 15,
        Commissions: 10,
        "Margins (In.)": 50,
        "Margins (Ma.)": 30,
        Leverage: 30,
        Limit: false,
        Stop: true,
        Market: false,
        "Price (Multiplier)": 10,
        "Contract Size": 10,
        "Min. Order Size": 0.5,
        "Max. Order Size": 120
    },
    DJ1304: {
        Lp: 'Finalto',
        Markup: 24,
        Spreads: 1.5,
        Fees: 24,
        Commissions: 40,
        "Margins (In.)": 10,
        "Margins (Ma.)": 8,
        Leverage: 190,
        Limit: true,
        Stop: true,
        Market: true,
        "Price (Multiplier)": 100,
        "Contract Size": 1,
        "Min. Order Size": 1,
        "Max. Order Size": 1000
    },
    EUROUSD5: {
        Lp: 'CMC',
        Markup: 22,
        Spreads: 2,
        Fees: 20,
        Commissions: 45,
        "Margins (In.)": 10,
        "Margins (Ma.)": 5,
        Leverage: 50,
        Limit: true,
        Stop: true,
        Market: true,
        "Price (Multiplier)": 1000,
        "Contract Size": 1,
        "Min. Order Size": 2,
        "Max. Order Size": 90
    },
    USDJPY5: {
        Lp: 'Prime',
        Markup: 5,
        Spreads: 0.8,
        Fees: 8,
        Commissions: 25,
        "Margins (In.)": 2,
        "Margins (Ma.)": 1,
        Leverage: 200,
        Limit: true,
        Stop: false,
        Market: true,
        "Price (Multiplier)": 100,
        "Contract Size": 0.1,
        "Min. Order Size": 0.5,
        "Max. Order Size": 200
    },
    "Sliver5": {
        Lp: 'LMAX',
        Markup: 15,
        Spreads: 3,
        Fees: 50,
        Commissions: 35,
        "Margins (In.)": 8,
        "Margins (Ma.)": 6,
        Leverage: 160,
        Limit: true,
        Stop: true,
        Market: true,
        "Price (Multiplier)": 1000,
        "Contract Size": 10,
        "Min. Order Size": 1,
        "Max. Order Size": 80
    },
    Gold5: {
        Lp: 'Marex',
        Markup: 25,
        Spreads: 10,
        Fees: 15,
        Commissions: 10,
        "Margins (In.)": 50,
        "Margins (Ma.)": 30,
        Leverage: 30,
        Limit: false,
        Stop: true,
        Market: false,
        "Price (Multiplier)": 10,
        "Contract Size": 10,
        "Min. Order Size": 0.5,
        "Max. Order Size": 120
    },
    DJ1305: {
        Lp: 'Finalto',
        Markup: 24,
        Spreads: 1.5,
        Fees: 24,
        Commissions: 40,
        "Margins (In.)": 10,
        "Margins (Ma.)": 8,
        Leverage: 190,
        Limit: true,
        Stop: true,
        Market: true,
        "Price (Multiplier)": 100,
        "Contract Size": 1,
        "Min. Order Size": 1,
        "Max. Order Size": 1000
    },
};

const mtData = {
    "Lp": "MT",
    "Markup": 10,
    "Spreads": 1,
    "Fees": 15,
    "Commissions": 30,
    "Margins (In.)": 5,
    "Margins (Ma.)": 3,
    "Leverage": 100,
    "Limit": true,
    "Stop": true,
    "Market": true,
    "Price (Multiplier)": 100,
    "Contract Size": 1,
    "Min. Order Size": 1,
    "Max. Order Size": 100
};

const categoriesX = [
    'Limit', 'Stop', 'Market',
    'Markup', 'Spreads', 'Fees', 'Commissions', 'Margins (In.)',
    'Margins (Ma.)', 'Leverage', 
    'Price (Multiplier)', 'Contract Size', 'Min. Order Size', 'Max. Order Size'
];
const categoriesY = ['EUROUSD', 'USDJPY', 'Sliver', 'Gold', 'DJ130',
                    'EUROUSD1', 'USDJPY1', 'Sliver1', 'Gold1', 'DJ1301',
                    'EUROUSD2', 'USDJPY2', 'Sliver2', 'Gold2', 'DJ1302',
                    'EUROUSD3', 'USDJPY3', 'Sliver3', 'Gold3', 'DJ1303',
                    'EUROUSD4', 'USDJPY4', 'Sliver4', 'Gold4', 'DJ1304',
                    'EUROUSD5', 'USDJPY5', 'Sliver5', 'Gold5', 'DJ1305',
                    'EUROUSD5', 'USDJPY5', 'Sliver5', 'Gold5', 'DJ1305',
                    'EUROUSD5', 'USDJPY5', 'Sliver5', 'Gold5', 'DJ1305',
                    'EUROUSD5', 'USDJPY5', 'Sliver5', 'Gold5', 'DJ1305',
                    'EUROUSD5', 'USDJPY5', 'Sliver5', 'Gold5', 'DJ1305',
                    'EUROUSD4', 'USDJPY4', 'Sliver4', 'Gold4', 'DJ1304',
                    'EUROUSD5', 'USDJPY5', 'Sliver5', 'Gold5', 'DJ1305',
                    'EUROUSD5', 'USDJPY5', 'Sliver5', 'Gold5', 'DJ1305',
                    'EUROUSD5', 'USDJPY5', 'Sliver5', 'Gold5', 'DJ1305',
                    'EUROUSD5', 'USDJPY5', 'Sliver5', 'Gold5', 'DJ1305',
                    'EUROUSD5', 'USDJPY5', 'Sliver5', 'Gold5', 'DJ1305',
                    'EUROUSD4', 'USDJPY4', 'Sliver4', 'Gold4', 'DJ1304',
                    'EUROUSD5', 'USDJPY5', 'Sliver5', 'Gold5', 'DJ1305',
                    'EUROUSD5', 'USDJPY5', 'Sliver5', 'Gold5', 'DJ1305',
                    'EUROUSD5', 'USDJPY5', 'Sliver5', 'Gold5', 'DJ1305',
                    'EUROUSD5', 'USDJPY5', 'Sliver5', 'Gold5', 'DJ1305',
                    'EUROUSD5', 'USDJPY5', 'Sliver5', 'Gold5', 'DJ1305',
                    'EUROUSD4', 'USDJPY4', 'Sliver4', 'Gold4', 'DJ1304',
                    'EUROUSD5', 'USDJPY5', 'Sliver5', 'Gold5', 'DJ1305',
                    'EUROUSD5', 'USDJPY5', 'Sliver5', 'Gold5', 'DJ1305',
                    'EUROUSD5', 'USDJPY5', 'Sliver5', 'Gold5', 'DJ1305',
                    'EUROUSD5', 'USDJPY5', 'Sliver5', 'Gold5', 'DJ1305',
                    'EUROUSD5', 'USDJPY5', 'Sliver5', 'Gold5', 'DJ1305',
                ];

const columnMinMax = {};
categoriesX.forEach(term => {
    const values = categoriesY.map(lp => lpData[lp][term]);
    columnMinMax[term] = { min: Math.min(...values), max: Math.max(...values) };
});


function getColorForSetting(term, value, lp) {
    const { min, max } = columnMinMax[term] || {};
    return getColorForValue(value, min, max);
}

function getColorForValue(value, min, max) {
    const percent = (value - min) / (max - min);
    const clampedPercent = Math.min(1, Math.max(0, percent));
    return clampedPercent > 0.33 ? `rgba(${250}, ${75}, ${66}, ${clampedPercent})` : `rgba(255, 181, 176, 1)`;
}

const UnfavourableTradingConditions = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        const data = [];
        categoriesY.forEach((lp, yIndex) => {
            categoriesX.forEach((term, xIndex) => {
                try {
                    let value = lpData[lp][term];
                    let icon = null;
                    let name = lpData[lp].Lp;
                    let tip = null;
                    let tipTitle = null;
                    let color = getColorForSetting(term, value, lp);

                    if (term === 'Markup' || term === 'Spreads' || term === 'Fees' || term === 'Commissions'
                        || term === 'Margins (In.)' || term === 'Margins (Ma.)' || term === 'Leverage'
                    ) {
                        tip = value;
                        value = name;
                        tipTitle = name;
                    }
                    else if (term === 'Limit' || term === 'Stop' || term === 'Market') {
                        icon = value ? '✅' : '❌';
                        color = 'rgba(98, 98, 98, 0.42)';
                        value = icon;
                        tip = name;
                        tipTitle = name;

                    }
                    else if (term in mtData) {
                        const mtValue = mtData[term];

                        if (term === "Price (Multiplier)" || term === "Contract Size") {
                            color = value === mtValue ? 'rgba(0, 226, 114, 1)' : 'rgba(250, 75, 66, 1)';
                            tipTitle = name;
                            tip = value;
                            value = '';
                        } else if (term === "Min. Order Size") {
                            color = value >= mtValue ? 'rgba(0, 226, 114, 1)' : 'rgba(250, 75, 66, 1)';
                            tipTitle = name;
                            tip = value;
                            value = '';
                        } else if (term === "Max. Order Size") {
                            color = value <= mtValue ? 'rgba(0, 226, 114, 1)' : 'rgba(250, 75, 66, 1)';
                            tipTitle = name;
                            tip = value;
                            value = '';
                        }
                    }
                    else {
                        const { min, max } = columnMinMax[term];
                        color = getColorForValue(value, min, max);
                    }

                    data.push({
                        x: xIndex,
                        y: yIndex,
                        value: value,
                        tip: tip,
                        tipTitle: tipTitle,
                        color: color
                    });
                } catch (error) {
                    console.error(`Error processing term "${term}" for LP "${lp}":`, error);
                }
            });
        });

        Highcharts.chart(chartRef.current, {
            chart: {
                type: 'heatmap',
                scrollablePlotArea: {
                    minHeight: 40*categoriesY.length,
                },
               
                style: {
                    fontFamily: "sans-serif",
                },
                plotBorderWidth: 1,
            },
            title: {
                text: 'Unfavourable Terms and Trading Conditions',
                style: {
                    fontSize: '1.5rem'
                }
            },
            xAxis: {
                categories: categoriesX,
                title: null,
            },
            yAxis: {
                categories: categoriesY,
                title: null,
                reversed: true,
                min: 0,
                max: categoriesY.length-1,
            },
            legend: {
                enabled: false
            },

            tooltip: {
                formatter: function () {
                    console.log('tooltip', this.point);

                    const termDescription = {
                        'Markup': '%',
                        'Spreads': 'pips',
                        'Fees': '',
                        'Commissions': '',
                        'Margins (In.)': '%',
                        'Margins (Ma.)': '%',
                    };

                    const valueWithCurrency = (categoriesX[this.point.x] === 'Fees' || categoriesX[this.point.x] === 'Commissions')
                        ? `$${this.point.tip}`
                        : null;

                    const iconTip = (categoriesX[this.point.x] === 'Limit' || categoriesX[this.point.x] === 'Stop' || categoriesX[this.point.x] === 'Market')
                        ? `${this.point.value}`
                        : null;

                    return `
                    <b>${this.point.tipTitle}</b><br>${categoriesX[this.point.x]}: <b> ${valueWithCurrency || iconTip || this.point.tip || this.point.value}</b>
                    <i>${termDescription[categoriesX[this.point.x]] || ''}</i>
                    `;
                }
            },

            series: [{
                name: 'Terms and Trading Conditions',
                borderWidth: 2,
                data: data,
                dataLabels: {
                    enabled: true,
                    format: '{point.value}',
                    style: {
                        textOutline: 'none',
                        fontWeight: 'normal',
                        fontSize: '1rem'
                    },
                },
                states: {
                    hover: {
                        color: '#cccccc'
                    }
                }
            }]
        });
    }, []);

    return <div ref={chartRef} className=' w-full h-full' />;
};

export default UnfavourableTradingConditions;
