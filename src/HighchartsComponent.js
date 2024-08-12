import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Accessibility from 'highcharts/modules/accessibility';

const HighchartsComponent = () => {
    Accessibility(Highcharts);

    useEffect(() => {
        (function (H) {
            const animateSVGPath = (svgElem, animation, callback = void 0) => {
                const length = svgElem?.element?.getTotalLength();
                svgElem?.attr({
                    'stroke-dasharray': length,
                    'stroke-dashoffset': length,
                    opacity: 1,
                });
                svgElem?.animate(
                    {
                        'stroke-dashoffset': 0,
                    },
                    animation,
                    callback
                );
            };

            H.seriesTypes.line.prototype.animate = function (init) {
                const series = this,
                    animation = H.animObject(series.options.animation);
                if (!init) {
                    animateSVGPath(series.graph, animation);
                }
            };

            H.addEvent(H.Axis, 'afterRender', function () {
                const axis = this,
                    chart = axis.chart,
                    animation = H.animObject(chart.renderer.globalAnimation);

                axis.axisGroup
                    .attr({
                        opacity: 0,
                        rotation: -3,
                        scaleY: 0.9,
                    })
                    .animate(
                        {
                            opacity: 1,
                            rotation: 0,
                            scaleY: 1,
                        },
                        animation
                    );

                if (axis.horiz) {
                    axis.labelGroup
                        .attr({
                            opacity: 0,
                            rotation: 3,
                            scaleY: 0.5,
                        })
                        .animate(
                            {
                                opacity: 1,
                                rotation: 0,
                                scaleY: 1,
                            },
                            animation
                        );
                } else {
                    axis.labelGroup
                        .attr({
                            opacity: 0,
                            rotation: 3,
                            scaleX: -0.5,
                        })
                        .animate(
                            {
                                opacity: 1,
                                rotation: 0,
                                scaleX: 1,
                            },
                            animation
                        );
                }

                if (axis.plotLinesAndBands) {
                    axis.plotLinesAndBands.forEach((plotLine) => {
                        const animation = H.animObject(plotLine.options.animation);

                        plotLine?.label?.attr({
                            opacity: 0,
                        });

                        animateSVGPath(plotLine.svgElem, animation, function () {
                            plotLine?.label?.animate({
                                opacity: 1,
                            });
                        });
                    });
                }
            });
        })(Highcharts);
    }, []);

    const data = [
        {
            "Year": "1960",
            "Inflation, consumer prices (annual %)": 1.45,
            "Claims on central government, etc. (% GDP)": 23,
            "Net foreign assets (current LCU)": 172,
            "Net domestic credit (current LCU)": 328
        },
        {
            "Year": "1961",
            "Inflation, consumer prices (annual %)": 1.07072414764754,
            "Claims on central government, etc. (% GDP)": 24.5720047944716,
            "Net foreign assets (current LCU)": 16139899998.3101,
            "Net domestic credit (current LCU)": 359059000000
        },
        {
            "Year": "1962",
            "Inflation, consumer prices (annual %)": 1.19877334820149,
            "Claims on central government, etc. (% GDP)": 23.4191135916207,
            "Net foreign assets (current LCU)": 14111399998.9356,
            "Net domestic credit (current LCU)": 393087000000
        },
        {
            "Year": "1963",
            "Inflation, consumer prices (annual %)": 1.23966942148761,
            "Claims on central government, etc. (% GDP)": 22.4500557465134,
            "Net foreign assets (current LCU)": 12817999998.965,
            "Net domestic credit (current LCU)": 431819000000
        },
        {
            "Year": "1964",
            "Inflation, consumer prices (annual %)": 1.27891156462591,
            "Claims on central government, etc. (% GDP)": 21.6448387551049,
            "Net foreign assets (current LCU)": 11075399999.2306,
            "Net domestic credit (current LCU)": 473935000000
        },
        {
            "Year": "1965",
            "Inflation, consumer prices (annual %)": 1.58516926383662,
            "Claims on central government, etc. (% GDP)": 20.2550229393201,
            "Net foreign assets (current LCU)": 8839999999.396,
            "Net domestic credit (current LCU)": 522383000000
        },
        {
            "Year": "1966",
            "Inflation, consumer prices (annual %)": 3.01507537688433,
            "Claims on central government, etc. (% GDP)": 18.7008454933529,
            "Net foreign assets (current LCU)": 4691699999.6743,
            "Net domestic credit (current LCU)": 553832000000
        }
    ];

    const maxInflation = Math.max(...data.map(item => item['Inflation, consumer prices (annual %)']));

    const options = {
        chart: {
            type: 'spline',
        },
        title: {
            text: "United States of America's Inflation-related statistics",
            align: 'left',
        },
        subtitle: {
            text: 'Source: <a href="https://www.worldbank.org/en/home">The World Bank</a>',
            align: 'left',
        },
        yAxis: [
            {
                title: {
                    text: 'Inflation',
                },
                plotLines: [
                    {
                        color: 'black',
                        width: 3,
                        value: maxInflation,
                        label: {
                            text: 'Max Inflation',
                            align: 'right',
                            x: -10,
                        },
                    },
                ],
            },
            {
                title: {
                    text: 'Claims on central government, etc.',
                },
            },
            {
                opposite: true,
                title: {
                    text: 'Net foreign assets',
                },
            },
            {
                opposite: true,
                title: {
                    text: 'Net domestic credit',
                },
            },
        ],
        plotOptions: {
            series: {
                animation: {
                    duration: 1000,
                },
                marker: {
                    enabled: false,
                },
                lineWidth: 2,
            },
        },
        series: [
            {
                name: 'Inflation, consumer prices (annual %)',
                data: data.map(item => [item.Year, item['Inflation, consumer prices (annual %)']]),
                yAxis: 0,
            },
            {
                name: 'Claims on central government, etc. (% GDP)',
                data: data.map(item => [item.Year, item['Claims on central government, etc. (% GDP)']]),
                yAxis: 1,
                animation: {
                    defer: 1000,
                },
            },
            {
                name: 'Net foreign assets (current LCU)',
                data: data.map(item => [item.Year, item['Net foreign assets (current LCU)']]),
                yAxis: 2,
                animation: {
                    defer: 2000,
                },
            },
            {
                name: 'Net domestic credit (current LCU)',
                data: data.map(item => [item.Year, item['Net domestic credit (current LCU)']]),
                yAxis: 3,
                animation: {
                    defer: 3000,
                },
            },
        ],
        responsive: {
            rules: [
                {
                    condition: {
                        maxWidth: 'fit-content',
                    },
                    chartOptions: {
                        yAxis: [
                            {
                                tickAmount: 2,
                                title: {
                                    x: 15,
                                    reserveSpace: false,
                                },
                            },
                            {
                                tickAmount: 2,
                                title: {
                                    x: 20,
                                    reserveSpace: false,
                                },
                            },
                            {
                                tickAmount: 2,
                                title: {
                                    x: -20,
                                    reserveSpace: false,
                                },
                            },
                            {
                                tickAmount: 2,
                                title: {
                                    x: -20,
                                    reserveSpace: false,
                                },
                            },
                        ],
                    },
                },
            ],
        },
    };

    return (

        <div className='w-full p-2'>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default HighchartsComponent;
