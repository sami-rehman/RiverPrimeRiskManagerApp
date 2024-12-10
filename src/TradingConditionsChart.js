import React, { useState, useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsHeatmap from 'highcharts/modules/heatmap';

HighchartsHeatmap(Highcharts);

const lpData = {
    CMC: {
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
    LMAX: {
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
        "Contract Size": 1,
        "Min. Order Size": 1,
        "Max. Order Size": 95
    },
    "Match-Prime": {
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
    Finalto: {
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
    Marex: {
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
        "Max. Order Size": 100
    }
};

const mtData = {
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
const categoriesY = ['CMC', 'LMAX', 'Match-Prime', 'Finalto', 'Marex'];

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
    const greenColor = { r: 0, g: 226, b: 114 };
    const redColor = { r: 250, g: 75, b: 66 };

    const r = Math.floor(greenColor.r + (redColor.r - greenColor.r) * clampedPercent);
    const g = Math.floor(greenColor.g + (redColor.g - greenColor.g) * clampedPercent);
    const b = Math.floor(greenColor.b + (redColor.b - greenColor.b) * clampedPercent);

    return `rgba(${r}, ${g}, ${b}, 1)`;
}
//3fff00   best   // 2nd best 87ff2a   //   #ff3700                 4th #ff1919        //5th #ff0000
//background: rgb(63,255,0); background: linear-gradient(90deg, rgba(63,255,0,0.8071603641456583) 5%, rgba(255,55,0,1) 100%);
const TradingConditionsChart = () => {
    const [category, setCategory] = useState("Forex");
    const [symbol, setSymbol] = useState("EURUSD");

    const categories = ["Forex", "Crypto", "Metals"];
    const symbols = {
        Forex: ["EURUSD", "USDJPY", "EURONZ", "USDBTC"],
        Crypto: ["BTCUSD", "ETHUSD", "LTCUSD"],
        Metals: ["XAUUSD", "XAGUSD"]
    };

    const chartRef = useRef(null);

    useEffect(() => {
        const data = [];
        categoriesY.forEach((lp, yIndex) => {
            categoriesX.forEach((term, xIndex) => {
                try {
                    let value = lpData[lp][term];
                    let icon = null;
                    // let color = null;
                    let tip = null;
                    let color = getColorForSetting(term, value, lp);

                    // Add icon for Limit, Stop, and Market
                    if (term === 'Limit' || term === 'Stop' || term === 'Market') {
                        icon = value ? '✅' : '❌';
                        color = 'rgba(98, 98, 98, 0.42)';
                        value = icon;
                    }

                    else if (term in mtData) {
                        const mtValue = mtData[term];

                        if (term === "Price (Multiplier)" || term === "Contract Size") {
                            color = value === mtValue ? 'rgba(0, 226, 114, 1)' : 'rgba(250, 75, 66, 1)';
                            tip = value;
                            value = '';
                        } else if (term === "Min. Order Size") {
                            color = value >= mtValue ? 'rgba(0, 226, 114, 1)' : 'rgba(250, 75, 66, 1)';
                            tip = value;
                            value = '';
                        } else if (term === "Max. Order Size") {
                            color = value <= mtValue ? 'rgba(0, 226, 114, 1)' : 'rgba(250, 75, 66, 1)';
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
                style: {
                    fontFamily: "sans-serif",
                },
                plotBorderWidth: 1
            },
            title: {
                text: 'Terms and Trading Conditions',
                style: {
                    fontSize: '1.5em'
                }
            },
            xAxis: {
                categories: categoriesX,
                title: null
            },
            yAxis: {
                categories: categoriesY,
                title: null,
                reversed: true
            },
            colorAxis: {
                visible: false
            },
            legend: {
                enabled: false
            },

            tooltip: {
                formatter: function () {
                    const termDescription = {
                        'Markup': '%',
                        'Spreads': 'pips',
                        'Fees': '',
                        'Commissions': '',
                        'Margins (In.)': '%',
                        'Margins (Ma.)': '%',
                    };

                    const valueWithCurrency = (categoriesX[this.point.x] === 'Fees' || categoriesX[this.point.x] === 'Commissions')
                        ? `$${this.point.value}`
                        : this.point.value;

                    return `<b>${categoriesY[this.point.y]}</b><br>
                ${categoriesX[this.point.x]}: <b> ${valueWithCurrency || this.point.tip}</b>
                <i>${termDescription[categoriesX[this.point.x]] || ''}</i>`;
                }
            },

            series: [{
                name: 'Terms and Trading Conditions',
                borderWidth: 1,
                data: data,
                dataLabels: {
                    enabled: true,
                    // color: '#000000',
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

    return <>
    <div className='w-full h-full'>
    <div className="flex gap-2 mb-2 items-center">
                <div className="flex flex-col align-center">
                    {/* <label className="flex justify-center text-xs font-medium text-gray-600 dark:text-gray-500">Category</label> */}
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border border-gray-300 dark:border-gray-700 rounded px-1 text-xs bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col">
                    {/* <label className="flex justify-center text-xs font-medium text-gray-600 dark:text-gray-500">Symbol</label> */}
                    <select
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value)}
                        className="border border-gray-300 dark:border-gray-700 rounded px-1  text-xs bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {symbols[category].map((sym) => (
                            <option key={sym} value={sym}>{sym}</option>
                        ))}
                    </select>
                </div>
            </div>
    <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
    </div>
    </>
};

export default TradingConditionsChart;
