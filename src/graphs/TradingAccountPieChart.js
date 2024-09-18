// import React, { useEffect, useRef, useState } from "react";
// import * as echarts from "echarts";
// import { rawDataPiechartEquity } from "../constant";

// const TopEquityPieChart = () => {
//   const chartRef = useRef(null);
//   const dataMapRef = useRef(new Map());

//   const [chartData, setChartData] = useState([]);
//   const [selectedSection, setSelectedSection] = useState("equity");
//   const [topRecords, setTopRecords] = useState(5);
//   const [dataArray, setDataArray] = useState(rawDataPiechartEquity);

//   useEffect(() => {
//     const socket = new WebSocket("ws://192.168.3.164:8081/ws/api/v1/accountConcentration");
//     let isSocketOpen = false;

//     const handleMessage = (event) => {
//       const data = JSON.parse(event.data);
//       throttleUpdateTable(data);
//     };

//     const sendRequest = (section) => {
//       if (socket.readyState === WebSocket.OPEN) {
//         const requestMessage = {
//           type: "request",
//           requestType: section, // Send selected section (volume/equity)
//           accounts: "all",
//         };
//         socket.send(JSON.stringify(requestMessage));
//       }
//     };

//     socket.addEventListener("message", handleMessage);

//     socket.onopen = () => {
//       isSocketOpen = true;
//       sendRequest(selectedSection); // Send request for the initial section
//     };

//     return () => {
//       if (isSocketOpen) {
//         const unsubscribeMessage = {
//           type: "unsubscribe",
//           requestType: "accountDailyReport",
//           accounts: "all",
//         };
//         socket.send(JSON.stringify(unsubscribeMessage));
//         socket.removeEventListener("message", handleMessage);
//         socket.close();
//       }
//     };
//   }, [selectedSection]);

//   const throttleUpdateTable = (data) => {
//     const incomingData = Array.isArray(data) ? data : [data];
//     incomingData.forEach((item) => {
//       dataMapRef.current.set(item.login, item);
//     });
//     const aggregatedData = Array.from(dataMapRef.current.values());

//     setDataArray([...aggregatedData]);
//   };

//   useEffect(() => {
//     const rawData = dataArray;
//     const sortedData = rawData?.sort((a, b) => b[selectedSection] - a[selectedSection])
//       ?.slice(0, topRecords)
//       ?.map((item) => ({
//         value: item[selectedSection],
//         name: `LoginID_${item.login?.toString()}`,
//       }));

//     setChartData(sortedData);
//   }, [selectedSection, topRecords, dataArray]);

//   useEffect(() => {
//     if (chartData?.length > 0) {
//       const chartInstance = echarts.init(chartRef.current);

//       const option = {
//         tooltip: {
//           trigger: "item",
//           backgroundColor: "#eee",
//           borderColor: "#777",
//           borderWidth: 1,
//           borderRadius: 4,
//           padding: 0,
//           formatter: function (params) {
//             return `
//               <div style="font-family: sans-serif;">
//                 <div style="background-color: #333; color: #eee; text-align: center; padding: 5px; border-top-left-radius: 4px; border-top-right-radius: 4px;">
//                   ${params.name}
//                 </div>
//                 <div style=" background-color: #eee; border: 1px solid #777; border-top: none; border-bottom-left-radius: 4px; border-bottom-right-radius: 4px;">
//                   <table style="width: 100%; border-collapse: collapse;">
//                     <thead style="background-color: #ddd;">
//                       <tr>
//                         <th style="text-align: left; padding: 5px;">Icon</th>
//                         <th style="text-align: center; padding: 5px;">${selectedSection}</th>
//                         <th style="text-align: right; padding: 5px;">Percent</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <td style="display: flex; align-items: center; padding: 5px;">
//                          <img style="width: 24px; height: 24px; margin-right: 5px;">
//                         </td>
//                         <td style="text-align: center; padding: 0px ;">${params.value.toFixed(2)}</td>
//                         <td style="text-align: right; padding: 0px">${params.percent}%</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             `;
//           },
//         },

//         series: [
//           {
//             name: `Top ${topRecords} by ${selectedSection}`,
//             type: "pie",
//             radius: "70%",
//             data: chartData,
//             emphasis: {
//               itemStyle: {
//                 shadowBlur: 10,
//                 shadowOffsetX: 0,
//                 shadowColor: "rgba(0, 0, 0, 0.5)",
//               },
//             },
//           },
//         ],
//       };

//       chartInstance.setOption(option);

//       return () => {
//         chartInstance.dispose();
//       };
//     }
//   }, [chartData, topRecords, selectedSection]);

//   return (
//     <div className="h-full w-full flex flex-col">
//       <div className="flex space-x-4 items-center ml-2">
//         <div>
//           <label htmlFor="section-select" className="text-sm">
//             Concentration:
//           </label>
//           <select
//             id="section-select"
//             value={selectedSection}
//             onChange={(e) => setSelectedSection(e.target.value)}
//             className="p-1 text-xs border border-gray-300 rounded ml-1"
//           >
//             <option value="equity">Equity</option>
//             <option value="volume">Volume</option>
//           </select>
//         </div>

//         <div>
//           <label htmlFor="top-records-select" className="text-sm">
//             Top Records:
//           </label>
//           <select
//             id="top-records-select"
//             value={topRecords}
//             onChange={(e) => setTopRecords(Number(e.target.value))}
//             className="p-1 text-xs border border-gray-300 rounded ml-1"
//           >
//             <option value={20}>20</option>
//             <option value={15}>15</option>
//             <option value={10}>10</option>
//             <option value={5}>5</option>
//           </select>
//         </div>
//       </div>
//       <div ref={chartRef} className="flex-grow w-full" />
//     </div>

//   );
// };

// export default TopEquityPieChart;


import React, { useEffect, useRef, useState, useCallback } from "react";
import * as echarts from "echarts";
import { rawDataPiechartEquity } from "../constant";
import debounce from "lodash.debounce";

const TopEquityPieChart = () => {
  const chartRef = useRef(null);
  const dataMapRef = useRef(new Map());
  const chartInstanceRef = useRef(null);

  const [chartData, setChartData] = useState([]);
  const [selectedSection, setSelectedSection] = useState("equity");
  const [topRecords, setTopRecords] = useState(5);
  const [dataArray, setDataArray] = useState(rawDataPiechartEquity);

  useEffect(() => {
    const socket = new WebSocket("ws://192.168.3.164:8081/ws/api/v1/accountConcentration");
    let isComponentUnmounted = false;

    const handleMessage = (event) => {
      const data = JSON.parse(event.data);
      throttleUpdateTable(data);
    };

    const sendRequest = debounce((section) => {
      if (socket.readyState === WebSocket.OPEN) {
        const requestMessage = {
          type: "request",
          requestType: section, 
          accounts: "all",
        };
        socket.send(JSON.stringify(requestMessage));
      }
    }, 300);

    socket.onopen = () => {
      if (!isComponentUnmounted) {
        sendRequest(selectedSection);
      }
    };

    socket.addEventListener("message", handleMessage);

    return () => {
      isComponentUnmounted = true;
      const unsubscribeMessage = {
        type: "unsubscribe",
        requestType: "accountDailyReport",
        accounts: "all",
      };
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(unsubscribeMessage));
        socket.close();
      }
      socket.removeEventListener("message", handleMessage);
    };
  }, [selectedSection]);

  const throttleUpdateTable = useCallback(
    debounce((data) => {
      const incomingData = Array.isArray(data) ? data : [data];
      incomingData.forEach((item) => {
        dataMapRef.current.set(item.login, item);
      });
      setDataArray(Array.from(dataMapRef.current.values()));
    }, 200),
    []
  );

  useEffect(() => {
    const rawData = dataArray;
    const sortedData = rawData?.sort((a, b) => b[selectedSection] - a[selectedSection])
      ?.slice(0, topRecords)
      ?.map((item) => ({
        value: item[selectedSection],
        name: `LoginID_${item.login?.toString()}`,
      }));

    setChartData(sortedData);
  }, [selectedSection, topRecords, dataArray]);

  useEffect(() => {
    if (chartData?.length > 0) {
      if (!chartInstanceRef.current) {
        chartInstanceRef.current = echarts.init(chartRef.current);
      }

      const option = {
        tooltip: {
          trigger: "item",
          backgroundColor: "#eee",
          borderColor: "#777",
          borderWidth: 1,
          borderRadius: 4,
          padding: 0,
          formatter: function (params) {
            return `
              <div style="font-family: sans-serif;">
                <div style="background-color: #333; color: #eee; text-align: center; padding: 5px; border-top-left-radius: 4px; border-top-right-radius: 4px;">
                  ${params.name}
                </div>
                <div style=" background-color: #eee; border: 1px solid #777; border-top: none; border-bottom-left-radius: 4px; border-bottom-right-radius: 4px;">
                  <table style="width: 100%; border-collapse: collapse;">
                    <thead style="background-color: #ddd;">
                      <tr>
                        <th style="text-align: left; padding: 5px;">Icon</th>
                        <th style="text-align: center; padding: 5px;">${selectedSection}</th>
                        <th style="text-align: right; padding: 5px;">Percent</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style="display: flex; align-items: center; padding: 5px;">
                         <img style="width: 24px; height: 24px; margin-right: 5px;">
                        </td>
                        <td style="text-align: center; padding: 0px ;">${params.value.toFixed(2)}</td>
                        <td style="text-align: right; padding: 0px">${params.percent}%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            `;
          },
        },

        series: [
          {
            name: `Top ${topRecords} by ${selectedSection}`,
            type: "pie",
            radius: "70%",
            data: chartData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      chartInstanceRef.current.setOption(option);
      chartInstanceRef.current.resize();

      return () => {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.dispose();
          chartInstanceRef.current = null;
        }
      };
    }
  }, [chartData, topRecords, selectedSection]);

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex space-x-4 items-center ml-2">
        <div>
          <label htmlFor="section-select" className="text-sm">
            Concentration:
          </label>
          <select
            id="section-select"
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="p-1 text-xs border border-gray-300 rounded ml-1"
          >
            <option value="equity">Equity</option>
            <option value="volume">Volume</option>
          </select>
        </div>

        <div>
          <label htmlFor="top-records-select" className="text-sm">
            Top Records:
          </label>
          <select
            id="top-records-select"
            value={topRecords}
            onChange={(e) => setTopRecords(Number(e.target.value))}
            className="p-1 text-xs border border-gray-300 rounded ml-1"
          >
            <option value={20}>20</option>
            <option value={15}>15</option>
            <option value={10}>10</option>
            <option value={5}>5</option>
          </select>
        </div>
      </div>
      <div ref={chartRef} className="flex-grow w-full" />
    </div>
  );
};

export default TopEquityPieChart;
