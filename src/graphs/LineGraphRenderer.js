import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";

export function LineGraphRenderer({ data }) {
    const chartContainerRef = useRef();
    const chart = useRef();
    const lineSeries = useRef();
    const [dataPoints, setDataPoints] = useState([]);
    const lastTimestampRef = useRef(null);
    const [filteredDataPoints, setFilteredDataPoints] = useState([]);

    useEffect(() => {
        // Initialize the chart
        chart.current = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            // height: 50,
            layout: {
                backgroundColor: '#000000',
                textColor: '#ffffff',
                visible: false,
                attributionLogo: false,
            },
            rightPriceScale: {
                borderColor: '#888',
                // visible: false,
            },
            timeScale: {
                borderColor: '#888',
                visible: false,
            },
        });

        lineSeries.current = chart.current.addLineSeries({
            color: '#00ff00',
            lineWidth: 1,
        });

        return () => {
            chart.current.remove();
        };
    }, []);


    useEffect(() => {
            let tradeTime = new Date(data.E).getTime() / 1000; // Convert milliseconds to seconds
            const askPrice = parseFloat(data.a);

            // Ensure the time is unique by checking the last timestamp
            if (lastTimestampRef.current && lastTimestampRef.current >= tradeTime) {
                tradeTime = lastTimestampRef.current + 0.001; // Increment slightly to ensure uniqueness
            }

            lastTimestampRef.current = tradeTime;

            // Create a new data point
            const newDataPoint = {
                time: tradeTime,
                value: askPrice,
            };

            setFilteredDataPoints((prevDataPoints) => {
                // Add the new data point to the existing array
                const updatedDataPoints = [...prevDataPoints, newDataPoint];

                // Sort the data points by time
                updatedDataPoints.sort((a, b) => a.time - b.time);

                return updatedDataPoints;
            });
    }, [data]);

    useEffect(() => {
        if (filteredDataPoints.length > 0) {
            lineSeries.current.setData(filteredDataPoints);
        }
    }, [filteredDataPoints]);

    return <div ref={chartContainerRef} style={{ position: 'relative', width: '100%', height:'100%' }} />;
}
