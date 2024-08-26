// import React, { useEffect, useRef } from "react";
// import { createChart } from "lightweight-charts";

// export function LineGraphRenderer({ data }) {
//     const chartContainerRef = useRef();
//     const chart = useRef();
//     const lineSeries = useRef();
//     const lastTimestampRef = useRef(null);

//     useEffect(() => {
//         // Initialize the chart
//         chart.current = createChart(chartContainerRef.current, {
//             width: chartContainerRef.current.clientWidth,
//             height: 50,
//             layout: {
//                 backgroundColor: '#000000',
//                 textColor: '#ffffff',
//                 visible:false,
//                 attributionLogo: false
//             },
//             rightPriceScale: {
//                 borderColor: '#888',
//                 // visible:false
//             },
//             timeScale: {
//                 borderColor: '#888',
//                 visible:false

//             },
//         });

//         lineSeries.current = chart.current.addLineSeries({
//             color: '#00ff00',
//             lineWidth: 1,
//         });

//         return () => {
//             chart.current.remove();
//         };
//     }, []);

//     useEffect(() => {
//         if (data) {
//             let tradeTime = new Date(data.E).getTime() / 1000; // Convert milliseconds to seconds

//             // Ensure the time is unique by checking the last timestamp
//             if (lastTimestampRef.current === tradeTime) {
//                 tradeTime += 0.001; // Increment slightly if the timestamp is the same as the last one
//             }

//             lastTimestampRef.current = tradeTime;

//             const askPrice = parseFloat(data.a);

//             // Add new data point to the chart
//             lineSeries.current.update({
//                 time: tradeTime,
//                 value: askPrice,
//             });
//         }
//     }, [data]);

//     return <div ref={chartContainerRef} style={{ position: 'relative', width: '250px', height: '100%' }} />;
// }



// import React, { useEffect, useRef, useState } from "react";
// import { createChart } from "lightweight-charts";

// export function LineGraphRenderer({data}) {
//     const chartContainerRef = useRef();
//     const chart = useRef();
//     const lineSeries = useRef();
//     const [dataPoints, setDataPoints] = useState([]);
//     const lastTimestampRef = useRef(null);
//     const [filteredDataPoints, setFilteredDataPoints] = useState([]);

//     useEffect(() => {
//         // Initialize the chart
//         chart.current = createChart(chartContainerRef.current, {
//             width: chartContainerRef.current.clientWidth,
//             // height: 50,
//             layout: {
//                 backgroundColor: '#000000',
//                 textColor: '#ffffff',
//                 visible: false,
//                 attributionLogo: false,
//             },
//             rightPriceScale: {
//                 borderColor: '#888',
//                 visible: false,
//             },
//             timeScale: {
//                 borderColor: '#888',
//                 visible: false,
//             },
//         });

//         lineSeries.current = chart.current.addLineSeries({
//             color: '#00ff00',
//             lineWidth: 1,
//         });

//         return () => {
//             chart.current.remove();
//         };
//     }, []);


//     useEffect(() => {
//             let tradeTime = new Date(data.E).getTime() / 1000; // Convert milliseconds to seconds
//             const askPrice = parseFloat(data.a);

//             // Ensure the time is unique by checking the last timestamp
//             if (lastTimestampRef.current && lastTimestampRef.current >= tradeTime) {
//                 tradeTime = lastTimestampRef.current + 0.011; // Increment slightly to ensure uniqueness
//             }

//             lastTimestampRef.current = tradeTime;

//             // Create a new data point
//             const newDataPoint = {
//                 time: tradeTime,
//                 value: askPrice,
//             };

//             setFilteredDataPoints((prevDataPoints) => {
//                 // Add the new data point to the existing array
//                 const updatedDataPoints = [...prevDataPoints, newDataPoint];

//                 // Sort the data points by time
//                 updatedDataPoints.sort((a, b) => a.time - b.time);

//                 return updatedDataPoints;
//             });
//     }, [data]);

//     useEffect(() => {
//         if (filteredDataPoints.length > 0) {
//             lineSeries.current.setData(filteredDataPoints);
//         }
//     }, [filteredDataPoints]);

//     return <div ref={chartContainerRef} style={{ position: 'relative', width: '100%', height:'100%' }} />;
// }


import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";

export function LineGraphRenderer({ data }) {

    console.log('Render Fire')

    // console.log('Seventevent',data)
    const chartContainerRef = useRef();
    const chart = useRef();
    const lineSeries = useRef();
    const lastTimestampRef = useRef(null);
    const [filteredDataPoints, setFilteredDataPoints] = useState([]);

    // useEffect(() => {
    //     chart.current = createChart(chartContainerRef.current, {
    //         width: chartContainerRef.current.clientWidth,
    //         height: 150,
    //         layout: {
    //             backgroundColor: '#000000',
    //             textColor: '#ffffff',
    //             visible: false,
    //             attributionLogo: false, 
    //         },
    //         rightPriceScale: {
    //             borderColor: '#888',
    //             // visible: false,
    //         },
    //         timeScale: {
    //             borderColor: '#888',
    //             visible: false,
    //         },
    //     });

    //     lineSeries.current = chart.current.addLineSeries({
    //         color: '#00ff00',
    //         lineWidth: 1,
    //     });


           
    //         console.log('Seventevent', data)
    //         const tradeTime = new Date(data?.E);
    //         const askPrice = parseFloat(data?.a);

    //         console.log('askPrice2', askPrice)

    //         lineSeries.current.update({
    //             time: tradeTime,
    //             value: askPrice,
    //         });
    

    //     return () => {
    //         chart.current.remove();
    //     };
    // }, []);

    // useEffect(() => {
    //     // Initialize the chart
    //     chart.current = createChart(chartContainerRef.current, {
    //         width: chartContainerRef.current.clientWidth,
    //         height: chartContainerRef.current.clientHeight || 50,
    //         layout: {
    //             backgroundColor: '#000000',
    //             textColor: '#ffffff',
    //             visible: false,
    //             attributionLogo: false,
    //         },
    //         rightPriceScale: {
    //             borderColor: '#888',
    //             visible: false,
    //         },
    //         timeScale: {
    //             borderColor: '#888',
    //             visible: false,
    //         },
    //     });

    //     lineSeries.current = chart.current.addLineSeries({
    //         color: '#00ff00',
    //         lineWidth: 1,
    //     });

    //     // Resize chart when container size changes
    //     const resizeObserver = new ResizeObserver(() => {
    //         chart.current.resize(chartContainerRef.current.clientWidth, chartContainerRef.current.clientHeight);
    //     });

    //     resizeObserver.observe(chartContainerRef.current);

    //     return () => {
    //         resizeObserver.disconnect();
    //         chart.current.remove();
    //     };
    // }, []);

    // useEffect(() => {
    //     if (!data) return;

    //     let tradeTime = new Date(data.E).getTime() / 1000; // Convert milliseconds to seconds
    //     const askPrice = parseFloat(data.a);

    //     // Ensure the time is unique by checking the last timestamp
    //     if (lastTimestampRef.current && lastTimestampRef.current >= tradeTime) {
    //         tradeTime = lastTimestampRef.current + 0.011; // Increment slightly to ensure uniqueness
    //     }

    //     lastTimestampRef.current = tradeTime;

    //     // Create a new data point
    //     const newDataPoint = {
    //         time: tradeTime,
    //         value: askPrice,
    //     };

    //     setFilteredDataPoints((prevDataPoints) => {
    //         const updatedDataPoints = [...prevDataPoints, newDataPoint];

    //         updatedDataPoints.sort((a, b) => a.time - b.time);
    //         console.log("Updated Data Points:", updatedDataPoints);

    //         return updatedDataPoints;
    //     });
    // }, [data]);

    // useEffect(() => {
    //     if (filteredDataPoints.length > 0) {
    //         lineSeries.current.setData(filteredDataPoints);
    //         console.log("Filtered Data Points:", filteredDataPoints);
    //     }
    // }, [filteredDataPoints]);

    // return <div ref={chartContainerRef} style={{ position: 'relative', width: '100%', height: '100%' }} />;
}
