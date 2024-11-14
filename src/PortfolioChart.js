// import React from 'react';
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import Sunburst from 'highcharts/modules/sunburst';

// Sunburst(Highcharts); // Initialize the sunburst module

// const PortfolioChart = () => {
//     const data = [
//         { id: '0.0', parent: '', name: 'Portfolio (Books)' },
//         { id: '1.1', parent: '0.0', name: 'CMS' },
//         { id: '1.2', parent: '0.0', name: 'LMAX' },
//         { id: '1.3', parent: '0.0', name: 'Match-Prime' },
//         { id: '2.1', parent: '1.1', name: 'A Book' },
//         { id: '3.1', parent: '2.1', name: 'EuroUSD', value: 100 },
//         { id: '3.2', parent: '2.1', name: 'ZNUSD', value: 200 },
//         { id: '3.3', parent: '2.1', name: 'GBPUSD', value: 150 },
//         { id: '2.2', parent: '1.1', name: 'C Book' },
//         { id: '3.4', parent: '2.2', name: 'USDJPY', value: 120 },
//         { id: '3.5', parent: '2.2', name: 'AUDUSD', value: 180 },
//         { id: '2.3', parent: '1.2', name: 'A Book' },
//         { id: '3.6', parent: '2.3', name: 'NZDUSD', value: 130 },
//         { id: '3.7', parent: '2.3', name: 'USDCAD', value: 140 },
//         { id: '2.4', parent: '1.2', name: 'C Book' },
//         { id: '3.8', parent: '2.4', name: 'EURJPY', value: 160 },
//         { id: '3.9', parent: '2.4', name: 'GBPJPY', value: 170 },
//         { id: '2.5', parent: '1.3', name: 'A Book' },
//         { id: '3.10', parent: '2.5', name: 'CHFUSD', value: 110 },
//         { id: '3.11', parent: '2.5', name: 'SGDUSD', value: 115 },
//         { id: '2.6', parent: '1.3', name: 'C Book' },
//         { id: '3.12', parent: '2.6', name: 'HKDUSD', value: 105 },
//         { id: '3.13', parent: '2.6', name: 'MXNUSD', value: 125 }
//     ];

//     const colors = Highcharts.getOptions().colors.map((c, i) =>
//         Highcharts.color(Highcharts.getOptions().colors[0])
//             .brighten((i - 3.5) / 15)
//             .get()
//     );

//     const options = {
//         chart: {
//             height: '45%',
//             content:'fit',
//             style: {
//                 fontFamily: "'Arial', sans-serif",
//             },
//         },
//         colors,
//         // colors: ['transparent'].concat(Highcharts.getOptions().colors),
//     title: {
//         text: 'Placeholder for Title',
//     },
//         series: [{
//             type: 'sunburst',
//             data: data,
//             name: 'Root',
//             allowTraversingTree: true,
//             borderRadius: 2,
//             cursor: 'pointer',
//             dataLabels: {
//                 format: '{point.name}',
//                 filter: {
//                     property: 'innerArcLength',
//                     operator: '>',
//                     value: 12
//                 }
//             },
//             levels: [{
//                 level: 1,
//                 levelIsConstant: false,
//                 dataLabels: {
//                     filter: {
//                         property: 'outerArcLength',
//                         operator: '>',
//                         value: 64
//                     }
//                 }
//             }, {
//                 level: 2,
//                 colorByPoint: true
//             }, {
//                 level: 3,
//                 colorVariation: {
//                     key: 'brightness',
//                     to: -0.3
//                 }
//             }, {
//                 level: 4,
//                 colorVariation: {
//                     key: 'brightness',
//                     to: 0.3
//                 }
//             }]
//         }],
//         tooltip: {
//             headerFormat: '',
//             pointFormat: 'The Volume of <b>{point.name}</b> is <b>{point.value}</b>'
//         }
//     };

//     return (
//         <div className='flex-grow w-full'>
//             <HighchartsReact
//                 highcharts={Highcharts}
//                 options={options}
//             />
//         </div>
//     );
// };

// export default PortfolioChart;


// import React from 'react';
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import Sunburst from 'highcharts/modules/sunburst';

// Sunburst(Highcharts); // Initialize the sunburst module

// const PortfolioChart = () => {
//     const data = [
//         { id: '0.0', parent: '', name: 'Portfolio (Books)' },
//         { id: '1.1', parent: '0.0', name: 'CMS', pl: 300 },
//         { id: '1.2', parent: '0.0', name: 'LMAX', pl: -200 },
//         { id: '1.3', parent: '0.0', name: 'Match-Prime', pl: 150 },
//         { id: '2.1', parent: '1.1', name: 'A Book', pl: 100 },
//         { id: '3.1', parent: '2.1', name: 'EuroUSD', value: 100 },
//         { id: '3.2', parent: '2.1', name: 'ZNUSD', value: 200 },
//         { id: '3.3', parent: '2.1', name: 'GBPUSD', value: 150 },
//         { id: '2.2', parent: '1.1', name: 'C Book', pl: -50 },
//         { id: '3.4', parent: '2.2', name: 'USDJPY', value: 120 },
//         { id: '3.5', parent: '2.2', name: 'AUDUSD', value: 180 },
//         { id: '2.3', parent: '1.2', name: 'A Book', pl: 80 },
//         { id: '3.6', parent: '2.3', name: 'NZDUSD', value: 130 },
//         { id: '3.7', parent: '2.3', name: 'USDCAD', value: 140 },
//         { id: '2.4', parent: '1.2', name: 'C Book', pl: -100 },
//         { id: '3.8', parent: '2.4', name: 'EURJPY', value: 160 },
//         { id: '3.9', parent: '2.4', name: 'GBPJPY', value: 170 },
//         { id: '2.5', parent: '1.3', name: 'A Book', pl: 50 },
//         { id: '3.10', parent: '2.5', name: 'CHFUSD', value: 110 },
//         { id: '3.11', parent: '2.5', name: 'SGDUSD', value: 115 },
//         { id: '2.6', parent: '1.3', name: 'C Book', pl: -20 },
//         { id: '3.12', parent: '2.6', name: 'HKDUSD', value: 105 },
//         { id: '3.13', parent: '2.6', name: 'MXNUSD', value: 125 }
//     ];

//     // Define colors for profit and loss
//     const getColor = (pl) => {
//         if (pl > 0) return '#00A572'; // Green for profit
//         if (pl < 0) return '#FF4C4C'; // Red for loss
//         return Highcharts.getOptions().colors[0]; // Default color for neutral
//     };

//     const options = {
//         chart: {
//             height: '45%',
//             style: {
//                 fontFamily: "'Arial', sans-serif",
//             },
//         },
//         title: {
//             text: 'Portfolio with Profit & Loss',
//         },
//         series: [{
//             type: 'sunburst',
//             data: data.map((item) => ({
//                 ...item,
//                 color: item.pl != null ? getColor(item.pl) : undefined, // Apply custom colors for items with P&L
//             })),
//             name: 'Root',
//             allowTraversingTree: true,
//             cursor: 'pointer',
//             dataLabels: {
//                 format: '{point.name}',
//                 filter: {
//                     property: 'innerArcLength',
//                     operator: '>',
//                     value: 12
//                 }
//             },
//             levels: [{
//                 level: 1,
//                 levelIsConstant: false,
//                 dataLabels: {
//                     filter: {
//                         property: 'outerArcLength',
//                         operator: '>',
//                         value: 64
//                     }
//                 }
//             }, {
//                 level: 2,
//                 colorByPoint: true
//             }, {
//                 level: 3,
//                 colorVariation: {
//                     key: 'brightness',
//                     to: -0.3
//                 }
//             }, {
//                 level: 4,
//                 colorVariation: {
//                     key: 'brightness',
//                     to: 0.3
//                 }
//             }]
//         }],
//         tooltip: {
//             headerFormat: '',
//             pointFormat: 'The Volume of <b>{point.name}</b> is <b>{point.value}</b><br/> P&L: <b>{point.pl}</b>'
//         }
//     };

//     return (
//         <div className='flex-grow w-full'>
//             <HighchartsReact
//                 highcharts={Highcharts}
//                 options={options}
//             />
//         </div>
//     );
// };

// export default PortfolioChart;



// import React from 'react';
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import Sunburst from 'highcharts/modules/sunburst';

// Sunburst(Highcharts); // Initialize the sunburst module

// const PortfolioChart = () => {
//     const data = [
//         { id: '0.0', parent: '', name: 'Portfolio (Books)' },
//         { id: '1.1', parent: '0.0', name: 'CMS', pl: 0 },
//         { id: '1.2', parent: '0.0', name: 'LMAX', pl: 0 },
//         { id: '1.3', parent: '0.0', name: 'Match-Prime', pl: 0 },
//         { id: '2.1', parent: '1.1', name: 'A Book', pl: 100 },
//         { id: '3.1', parent: '2.1', name: 'EuroUSD', value: 100, pl: 30 },
//         { id: '3.2', parent: '2.1', name: 'ZNUSD', value: 200, pl: 20 },
//         { id: '3.3', parent: '2.1', name: 'GBPUSD', value: 150, pl: 50 },
//         { id: '2.2', parent: '1.1', name: 'C Book', pl: -50 },
//         { id: '3.4', parent: '2.2', name: 'USDJPY', value: 120, pl: -20 },
//         { id: '3.5', parent: '2.2', name: 'AUDUSD', value: 180, pl: -30 },
//         { id: '2.3', parent: '1.2', name: 'A Book', pl: 80 },
//         { id: '3.6', parent: '2.3', name: 'NZDUSD', value: 130, pl: 40 },
//         { id: '3.7', parent: '2.3', name: 'USDCAD', value: 140, pl: 40 },
//         { id: '2.4', parent: '1.2', name: 'C Book', pl: -100 },
//         { id: '3.8', parent: '2.4', name: 'EURJPY', value: 160, pl: -50 },
//         { id: '3.9', parent: '2.4', name: 'GBPJPY', value: 170, pl: -50 },
//         { id: '2.5', parent: '1.3', name: 'A Book', pl: 50 },
//         { id: '3.10', parent: '2.5', name: 'CHFUSD', value: 110, pl: 25 },
//         { id: '3.11', parent: '2.5', name: 'SGDUSD', value: 115, pl: 25 },
//         { id: '2.6', parent: '1.3', name: 'C Book', pl: -20 },
//         { id: '3.12', parent: '2.6', name: 'HKDUSD', value: 105, pl: -10 },
//         { id: '3.13', parent: '2.6', name: 'MXNUSD', value: 125, pl: -10 }
//     ];

//     // Helper function to calculate cumulative P&L
//     const calculateCumulativePL = (nodeId) => {
//         const children = data.filter(d => d.parent === nodeId);
//         const plFromChildren = children.reduce((acc, child) => acc + (child.pl || 0) + calculateCumulativePL(child.id), 0);
//         const node = data.find(d => d.id === nodeId);
//         if (node) {
//             node.pl = (node.pl || 0) + plFromChildren;
//         }
//         return node ? node.pl : 0;
//     };

//     // Calculate P&L for the root node
//     calculateCumulativePL('0.0');

//     // Define colors for profit and loss
//     const getColor = (pl) => {
//         if (pl > 0) return '#00A572'; // Green for profit
//         if (pl < 0) return '#FF4C4C'; // Red for loss
//         return Highcharts.getOptions().colors[0]; // Default color for neutral
//     };

//     const options = {
//         chart: {
//             height: '45%',
//             style: {
//                 fontFamily: "'Arial', sans-serif",
//             },
//         },
//         title: {
//             // text: 'Portfolio with Cumulative Profit & Loss',
//             text: 'Placeholder for Title',
//         },
//         series: [{
//             type: 'sunburst',
//             data: data.map((item) => ({
//                 ...item,
//                 color: getColor(item.pl), // Apply color based on P&L
//             })),
//             name: 'Root',
//             allowTraversingTree: true,
//             cursor: 'pointer',
//             dataLabels: {
//                 format: '{point.name}',
//                 filter: {
//                     property: 'innerArcLength',
//                     operator: '>',
//                     value: 12
//                 }
//             },
//             levels: [{
//                 level: 1,
//                 levelIsConstant: false,
//                 dataLabels: {
//                     filter: {
//                         property: 'outerArcLength',
//                         operator: '>',
//                         value: 64
//                     }
//                 }
//             }, {
//                 level: 2,
//                 colorByPoint: true
//             }, {
//                 level: 3,
//                 colorVariation: {
//                     key: 'brightness',
//                     to: -0.3
//                 }
//             }, {
//                 level: 4,
//                 colorVariation: {
//                     key: 'brightness',
//                     to: 0.3
//                 }
//             }]
//         }],
//         tooltip: {
//             headerFormat: '',
//             pointFormat: 'The Volume of <b>{point.name}</b> is <b>{point.value}</b><br/> Cumulative P&L: <b>{point.pl}</b>'
//         }
//     };

//     return (
//         <div className='flex-grow w-full'>
//             <HighchartsReact
//                 highcharts={Highcharts}
//                 options={options}
//             />
//         </div>
//     );
// };

// export default PortfolioChart;


import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Sunburst from 'highcharts/modules/sunburst';

Sunburst(Highcharts); // Initialize the sunburst module

const PortfolioChart = () => {
    const data = [
        { id: '0.0', parent: '', name: 'Portfolio (Books)', pl: 300 },
        { id: '1.1', parent: '0.0', name: 'CMS', pl: 80 },
        { id: '1.2', parent: '0.0', name: 'LMAX', pl: 160 },
        { id: '1.3', parent: '0.0', name: 'Match-Prime', pl: 60 },
        
        // CMS Book Structure
        { id: '2.1', parent: '1.1', name: 'A Book', pl: 150 },
        { id: '3.1', parent: '2.1', name: 'EUR/USD', value: 100, pl: 30 },
        { id: '3.2', parent: '2.1', name: 'USD/JPY', value: 150, pl: 50 },
        { id: '3.3', parent: '2.1', name: 'GBP/USD', value: 120, pl: 40 },
        { id: '3.4', parent: '2.1', name: 'AUD/USD', value: 80, pl: 30 },

        { id: '2.2', parent: '1.1', name: 'C Book', pl: -70 },
        { id: '3.5', parent: '2.2', name: 'NZD/USD', value: 110, pl: -20 },
        { id: '3.6', parent: '2.2', name: 'CAD/JPY', value: 140, pl: -30 },
        { id: '3.7', parent: '2.2', name: 'EUR/GBP', value: 90, pl: -20 },

        // LMAX Book Structure
        { id: '2.3', parent: '1.2', name: 'A Book', pl: 90 },
        { id: '3.8', parent: '2.3', name: 'USD/CHF', value: 130, pl: 20 },
        { id: '3.9', parent: '2.3', name: 'AUD/NZD', value: 100, pl: 10 },
        { id: '3.10', parent: '2.3', name: 'GBP/JPY', value: 120, pl: 30 },
        { id: '3.11', parent: '2.3', name: 'EUR/CHF', value: 110, pl: 30 },

        { id: '2.4', parent: '1.2', name: 'C Book', pl: 70 },
        { id: '3.12', parent: '2.4', name: 'EUR/CAD', value: 140, pl: -20 },
        { id: '3.13', parent: '2.4', name: 'USD/MXN', value: 90, pl: -10 },
        { id: '3.14', parent: '2.4', name: 'GBP/AUD', value: 80, pl: 100 },

        // Match-Prime Book Structure
        { id: '2.5', parent: '1.3', name: 'A Book', pl: 120 },
        { id: '3.15', parent: '2.5', name: 'USD/SGD', value: 115, pl: 40 },
        { id: '3.16', parent: '2.5', name: 'EUR/SGD', value: 130, pl: 30 },
        { id: '3.17', parent: '2.5', name: 'AUD/CAD', value: 120, pl: 25 },
        { id: '3.18', parent: '2.5', name: 'GBP/CAD', value: 110, pl: 25 },

        { id: '2.6', parent: '1.3', name: 'C Book', pl: -60 },
        { id: '3.19', parent: '2.6', name: 'USD/HKD', value: 105, pl: -15 },
        { id: '3.20', parent: '2.6', name: 'EUR/HKD', value: 125, pl: -25 },
        { id: '3.21', parent: '2.6', name: 'NZD/CAD', value: 95, pl: -20 }
    ];

    // Helper function to calculate cumulative P&L
    // const calculateCumulativePL = (nodeId) => {
    //     const children = data.filter(d => d.parent === nodeId);
    //     const plFromChildren = children.reduce((acc, child) => acc + (child.pl || 0) + calculateCumulativePL(child.id), 0);
    //     const node = data.find(d => d.id === nodeId);
    //     if (node) {
    //         node.pl = (node.pl || 0) + plFromChildren;
    //     }
    //     return node ? node.pl : 0;
    // };

    // // Calculate P&L for the root node
    // calculateCumulativePL('0.0');

    // Define colors for profit and loss
    const getColor = (pl) => {
        if (pl > 0) return '#00A572'; // Green for profit
        if (pl < 0) return '#FF4C4C'; // Red for loss
        return Highcharts.getOptions().colors[0]; // Default color for neutral
    };

    const options = {
        chart: {
            height: '45%',
            style: {
                fontFamily: "sans-serif",
            },
        },
        title: {
            // text: 'Portfolio with Cumulative Profit & Loss',
            text: ''
        },
        series: [{
            type: 'sunburst',
            data: data.map((item) => ({
                ...item,
                color: getColor(item.pl), // Apply color based on P&L
            })),
            name: 'Root',
            allowTraversingTree: true,
            cursor: 'pointer',
            dataLabels: {
                format: '{point.name}',
                filter: {
                    property: 'innerArcLength',
                    operator: '>',
                    value: 12
                }
            },
            levels: [{
                level: 1,
                levelIsConstant: false,
                dataLabels: {
                    filter: {
                        property: 'outerArcLength',
                        operator: '>',
                        value: 64
                    }
                }
            }, {
                level: 2,
                colorByPoint: true
            }, {
                level: 3,
                colorVariation: {
                    key: 'brightness',
                    to: -0.3
                }
            }, {
                level: 4,
                colorVariation: {
                    key: 'brightness',
                    to: 0.3
                }
            }]
        }],
        tooltip: {
            headerFormat: '',
            pointFormat: 'The Volume of <b>{point.name}</b> is <b>{point.value}</b><br/> Cumulative P&L: <b>{point.pl}</b>'
        }
    };

    return (
        <div className='flex-grow w-full'>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    );
};

export default PortfolioChart;
