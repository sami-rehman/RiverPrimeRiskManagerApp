// import React, { useState, useEffect } from 'react';
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(
//     Title,
//     Tooltip,
//     Legend,
//     CategoryScale,
//     LinearScale,
//     LineElement,
// );

// const ChartSwitcher = () => {
//     const symbol = 'BTCUSDT';
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         const ws = new WebSocket('wss://stream.binance.com:9443/ws/!ticker@arr');
    
//         ws.onmessage = (event) => {
//             const message = JSON.parse(event.data);
            
//             // Debug: Log the incoming message to inspect its structure
//             console.log('WebSocket message:', message);
    
//             // Ensure that the incoming data is an array and map it to the desired structure
//             const newData = Array.isArray(message) ? message.map(item => ({
//                 symbol: item.s,
//                 ask: parseFloat(item.a),
//                 bid: parseFloat(item.b),
//                 high: parseFloat(item.h),
//                 low: parseFloat(item.l),
//                 time: new Date(item.E).toLocaleTimeString(),
//             })) : [];
    
//             // Safely update the state with the new data and keep the previous records
//             setData(prevData => {
//                 const updatedData = [...prevData, ...newData];
//                 return updatedData; // Keep the last 100 data points
//             });
//         };
    
//         return () => {
//             ws.close();
//         };
//     }, []);

//     // Debug: Log the entire data array before filtering
//     console.log('Complete data:', data);

//     const filteredData = data.filter(item => item.symbol === symbol);

//     // Debug: Log the filtered data array
//     console.log('Filtered data for symbol', symbol, ':', filteredData);

//     const chartData = {
//         labels: filteredData.map(item => item.time), // Use appropriate time data
//         datasets: [
//             {
//                 label: 'Ask',
//                 data: filteredData.map(item => item.ask),
//                 borderColor: '#8884d8',
//                 backgroundColor: 'rgba(136, 132, 216, 0.2)',
//                 // fill: true,
//             },
//             // {
//             //     label: 'Bid',
//             //     data: filteredData.map(item => item.bid),
//             //     borderColor: 'red',
//             //     backgroundColor: 'rgba(130, 202, 157, 0.2)',
//             //     fill: true,
//             // },
//             // {
//             //     label: 'High',
//             //     data: filteredData.map(item => item.high),
//             //     borderColor: '#ff7300',
//             //     backgroundColor: 'rgba(255, 115, 0, 0.2)',
//             //     fill: true,
//             // },
//             // {
//             //     label: 'Low',
//             //     data: filteredData.map(item => item.low),
//             //     borderColor: '#ff0000',
//             //     backgroundColor: 'rgba(255, 0, 0, 0.2)',
//             //     fill: true,
//             // },
//         ],

//     };

//     const chartOptions = {
//         plugins: {
//             legend: {
//                 display: false, // Disable the legend labels
//             },
//         },

//     };

//     return (
//         <div>
//             <Line data={chartData} options={chartOptions} />
//         </div>
//     );
// }

// export default ChartSwitcher;


import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, registerables } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(...registerables, zoomPlugin);

const ChartSwitcher = () => {
    const symbol = 'BTCUSDT';
    const [data, setData] = useState([]);

    useEffect(() => {
        const ws = new WebSocket('wss://stream.binance.com:9443/ws/!ticker@arr');
    
        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
    
            const newData = Array.isArray(message) ? message.map(item => ({
                symbol: item.s,
                ask: parseFloat(item.a),
                bid: parseFloat(item.b),
                high: parseFloat(item.h),
                low: parseFloat(item.l),
                time: new Date(item.E).toLocaleTimeString(),
            })) : [];
    
            setData(prevData => {
                const updatedData = [...prevData, ...newData];
                return updatedData;
            });
        };
    
        return () => {
            ws.close();
        };
    }, []);

    const filteredData = data.filter(item => item.symbol === symbol);

    const chartData = {
        labels: filteredData.map(item => item.time),
        datasets: [
            {
                label: 'Ask',
                data: filteredData.map(item => item.ask),
                borderColor: '#8884d8',
                backgroundColor: 'rgba(136, 132, 216, 0.2)',
                fill: true,
            },
            {
                label: 'Bid',
                data: filteredData.map(item => item.bid),
                borderColor: 'red',
                backgroundColor: 'rgba(130, 202, 157, 0.2)',
                fill: true,
            },
            // {
            //     label: 'High',
            //     data: filteredData.map(item => item.high),
            //     borderColor: '#ff7300',
            //     backgroundColor: 'rgba(255, 115, 0, 0.2)',
            //     fill: true,
            // },
            // {
            //     label: 'Low',
            //     data: filteredData.map(item => item.low),
            //     borderColor: '#ff0000',
            //     backgroundColor: 'rgba(255, 0, 0, 0.2)',
            //     fill: true,
            // },
        ],
    };

    const chartOptions = {
        plugins: {
            legend: {
                display: false, // Disable the legend labels
            },
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true, // Enable zooming with mouse wheel
                    },
                    pinch: {
                        enabled: true, // Enable zooming with pinch gesture
                    },
                    mode: 'xy', // Allow zooming on both x and y axes
                },
                pan: {
                    enabled: true, // Enable panning
                    mode: 'y', // Only allow panning on the y-axis
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                suggestedMin: Math.min(...filteredData.map(item => item.low)) * 0.95,
                suggestedMax: Math.max(...filteredData.map(item => item.high)) * 1.05,
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                },
            },
        },
    };

    return (
        <div>
            <h2>{symbol} Real-Time Line Chart</h2>
            <Line data={chartData} options={chartOptions} />
        </div>
    );
}

export default ChartSwitcher;
