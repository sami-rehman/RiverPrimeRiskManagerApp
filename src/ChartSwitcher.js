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
