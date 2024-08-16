import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    LineElement,
);

export const LineGraphRenderer = ({symbol, data}) => {
    const filteredData = data.filter(item => item.symbol === symbol);
    console.log('filteredData', filteredData)
    const chartData = {
        // labels: data?.E,
        datasets: [
            {
                label: 'Ask',
                data: data?.a,
                borderColor: 'red',
                backgroundColor: 'black',
                fill: true,
            },

        ],

    };

    const chartOptions = {
        plugins: {
            legend: {
                display: false,
            },
        },

    };

    return (
        <div>
            <Line data={chartData} options={chartOptions} />
        </div>
    );
}
