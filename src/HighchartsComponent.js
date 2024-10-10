import React, { useState, useEffect, useCallback, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import HighchartsMore from "highcharts/highcharts-more"; // For Bubble view
import Exporting from "highcharts/modules/exporting";
import FullScreen from "highcharts/modules/full-screen";
import ExportData from "highcharts/modules/export-data";
import { clusterData } from "./constant";

HighchartsMore(Highcharts);
Exporting(Highcharts);
FullScreen(Highcharts);
ExportData(Highcharts);

const HighchartsComponent = React.memo(() => {
  const chartRef = useRef(null);
  const [chartType, setChartType] = useState("scatter");
  const [clusterDataArr, seTclusterDataArr] = useState(clusterData);
  const dataMapRef = useRef(new Map());

  const updateTable = useCallback((data) => {
    const incomingData = Array.isArray(data) ? data : [data];
    incomingData.forEach((item) => {
      dataMapRef.current.set(item.login, item); // Add data to the map
    });
    seTclusterDataArr(Array.from(dataMapRef.current.values())); // Update dataArray with new values
  }, []);

  useEffect(() => {
    const socket = new WebSocket(
      "ws://192.168.3.164:8081/ws/api/v1/positionsConcentration"
    );

    const handleMessage = (event) => {
      const data = JSON.parse(event.data);
      updateTable(data);
    };

    const sendRequest = () => {
      if (socket.readyState === WebSocket.OPEN) {
        const requestMessage = {
          type: "request",
          requestType: "positionsConcentration",
          accounts: "all",
        };
        socket.send(JSON.stringify(requestMessage));
      }
    };

    socket.onopen = sendRequest;
    socket.addEventListener("message", handleMessage);

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        const unsubscribeMessage = {
          type: "unsubscribe",
          requestType: "accountDailyReport",
          accounts: "all",
        };
        socket.send(JSON.stringify(unsubscribeMessage));
        socket.removeEventListener("message", handleMessage);
        socket.close();
      }
    };
  }, [updateTable]);

  const transformedData = clusterDataArr?.flatMap((account) =>
    account?.positions?.map((pos) => ({
      x: pos?.flag === "short" ? -pos?.volLots : pos?.volLots || 0,
      y: pos?.profit,
      z: Math.abs(pos?.profit),
      symbol: pos?.symbol,
      action: pos?.flag,
      login: account?.login,
    }))
  );

  // console.log(transformedData);

  const options = {
    chart: {
      type: chartType,
      plotBorderWidth: 1,
      zooming: {
        type: "xy",
      },
    },

    title: {
      text: "Positions Concentration",
    },

    legend: {
      enabled: false,
    },

    xAxis: {
      gridLineWidth: 1,
      title: {
        text: "Volume",
      },
      plotLines: [
        {
          color: "black",
          width: 2,
          value: 0,
        },
      ],
      crosshair: {
        color: "black",
        width: 1,
        dashStyle: "ShortDash",
      },
    },

    yAxis: {
      gridLineWidth: 1,
      title: {
        text: "Profit",
      },
      plotLines: [
        {
          color: "black",
          width: 2,
          value: 0,
        },
      ],
      crosshair: {
        color: "black",
        width: 1,
        dashStyle: "ShortDash",
      },
    },

    tooltip: {
      useHTML: true,
      headerFormat: "<table>",
      formatter: function () {
        const { symbol, x, y, action, login } = this?.point;
        return `
      <table>
        <tr><th colspan="2"><h3>${symbol}</h3></th></tr>
        <tr><th>Login: </th><td>${login}</td></tr>
        <tr><th>Volume: </th><td>${Math.abs(x)}</td></tr>
        <tr><th>Profit: </th><td>${y}</td></tr>
        <tr><th>Action: </th><td>${action}</td></tr>
      </table>
    `;
      },
      footerFormat: "",
      followPointer: true,
    },

    plotOptions: {
      series: {
        dataLabels: {
          enabled: false,
          format: "{point.symbol}",
        },
      },
    },

    series: [
      {
        data: transformedData,
        colorByPoint: true,
      },
    ],
    exporting: {
      enabled: true,
      buttons: {
        contextButton: {
          menuItems: [
            "viewFullscreen",
            "printChart",
            "separator",
            "downloadPNG",
            "downloadJPEG",
            "downloadPDF",
            "downloadSVG",
          ],
        },
      },
    },
  };

  //   Trigger reflow when the component is mounted
  useEffect(() => {
    if (chartRef.current && chartRef.current.chart) {
      chartRef.current.chart.reflow();
    }
  }, []);

  return (
    <div className="w-full h-full">
      <div>
        <label className="ml-4">
          <input
            type="radio"
            value="scatter"
            checked={chartType === "scatter"}
            onChange={() => setChartType("scatter")}
          />
          Scatter
        </label>
        <label className="ml-4">
          <input
            type="radio"
            value="bubble"
            checked={chartType === "bubble"}
            onChange={() => setChartType("bubble")}
          />
          Bubble
        </label>
      </div>
      <HighchartsReact
        ref={chartRef}
        highcharts={Highcharts}
        options={options}
      />
    </div>
  );
});

export default HighchartsComponent;
