// import React, { useState, useEffect } from 'react';
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement } from 'chart.js';

// ChartJS.register(
//     Title,
//     Tooltip,
//     Legend,
//     CategoryScale,
//     LinearScale,
//     LineElement,
//     PointElement // Register PointElement
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
//             {
//                 label: 'Bid',
//                 data: filteredData.map(item => item.bid),
//                 borderColor: 'red',
//                 backgroundColor: 'rgba(130, 202, 157, 0.2)',
//                 fill: true,
//             },
//             {
//                 label: 'High',
//                 data: filteredData.map(item => item.high),
//                 borderColor: '#ff7300',
//                 backgroundColor: 'rgba(255, 115, 0, 0.2)',
//                 fill: true,
//             },
//             {
//                 label: 'Low',
//                 data: filteredData.map(item => item.low),
//                 borderColor: '#ff0000',
//                 backgroundColor: 'rgba(255, 0, 0, 0.2)',
//                 fill: true,
//             },
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


import React, { useState } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement
} from 'chart.js';

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement
);

const ChartSwitcher = ({ chartType }) => {
    const [currentChartType, setCurrentChartType] = useState(chartType);

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
            {
                label: 'Sample Data',
                data: [65, 59, 80, 81, 56],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        return `${context.dataset.label}: ${context.raw}`;
                    },
                },
            },
        },
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-full p-2 border-2 border-gray-300 rounded">
            <div className="flex justify-center space-x-1">
                <button
                    className={`px-2 py-1 text-sm rounded-l ${currentChartType === 'line' ? 'bg-blue-600 text-white' : 'bg-blue-400 text-white'}`}
                    onClick={() => setCurrentChartType('line')}
                >
                    Line Chart
                </button>
                <button
                    className={`px-2 py-1 text-sm ${currentChartType === 'bar' ? 'bg-blue-700 text-white' : 'bg-blue-400 text-white'}`}
                    onClick={() => setCurrentChartType('bar')}
                >
                    Bar Chart
                </button>
                <button
                    className={`px-2 py-1 text-sm rounded-r ${currentChartType === 'pie' ? 'bg-blue-700 text-white' : 'bg-blue-400 text-white'}`}
                    onClick={() => setCurrentChartType('pie')}
                >
                    Pie Chart
                </button>
            </div>

            <div className="w-full h-full">
                {currentChartType === 'line' && <Line data={data} options={options} />}
                {currentChartType === 'bar' && <Bar data={data} options={options} />}
                {currentChartType === 'pie' && <Pie data={data} options={options} />}
            </div>
        </div>
    );
};

export default ChartSwitcher;