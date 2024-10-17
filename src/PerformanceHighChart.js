import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import exporting from 'highcharts/modules/exporting';
import exportData from 'highcharts/modules/export-data';
import accessibility from 'highcharts/modules/accessibility';
import seriesLabel from 'highcharts/modules/series-label';

exporting(Highcharts);
exportData(Highcharts);
accessibility(Highcharts);
seriesLabel(Highcharts);

const PerformanceHighChart = ({ loginID }) => {
  const [optionDataPerformanceChart, setOptionDataPerformanceChart] = useState({
    "pnl&vol": [
      {
        "month": "2024-10",
        "totalProfit": -480040,
        "totalVolume": 100000,
      },
      {
        "month": "2024-03",
        "totalProfit": 56966.59,
        "totalVolume": 1750000,
      },
      {
        "month": "2024-04",
        "totalProfit": 182770,
        "totalVolume": 1800000,
      },
      {
        "month": "2024-05",
        "totalProfit": 1010,
        "totalVolume": 100000,
      },
      {
        "month": "2024-07",
        "totalProfit": 21940,
        "totalVolume": 100000,
      },
      {
        "month": "2024-08",
        "totalProfit": 880040,
        "totalVolume": 1000000,
      },
    ],
    transactions: [
      {
        action: "deposit",
        amount: 300000.0,
        dateTime: "2024-04-05 12:15:48",
      },
      {
        action: "withdrawal",
        amount: 1170000.0,
        dateTime: "2024-08-30 12:15:48",
      },
      {
        action: "deposit",
        amount: 2000000.0,
        dateTime: "2024-08-30 12:15:48",
      },
    ],
  });

  useEffect(() => {
    const socket = new WebSocket(
      "ws://192.168.3.164:8081/ws/api/v1/account/accountPositionsProfit"
    );

    const handleMessage = (event) => {
      const data = JSON.parse(event.data);
      if (data?.data) {
        setOptionDataPerformanceChart(data?.data);
      }
    };

    const sendRequest = () => {
      if (socket.readyState === WebSocket.OPEN) {
        const requestMessage = {
          type: "request",
          requestType: "accountPositionsPNLhistory",
          accounts: loginID,
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
      }
      socket.removeEventListener("message", handleMessage);
      socket.close();
    };
  }, [loginID]);

  // Create a list of unique months from both pnl&vol and transactions
  const uniqueMonths = [
    ...new Set([
      ...optionDataPerformanceChart['pnl&vol']?.map((item) => item.month),
      ...optionDataPerformanceChart?.transactions?.map((t) => t.dateTime.slice(0, 7)),
    ]),
  ].sort();

  // Create data for each month, handling missing entries
  const monthlyData = uniqueMonths?.map((month) => {
    const pnlVol = optionDataPerformanceChart['pnl&vol']?.find((item) => item.month === month) || {
      totalProfit: 0,
      totalVolume: 0,
    };

    const deposits = optionDataPerformanceChart?.transactions
      .filter((t) => t.action === 'deposit' && t.dateTime.slice(0, 7) === month)
      .reduce((sum, t) => sum + t.amount, 0);

    const withdrawals = optionDataPerformanceChart.transactions
      .filter((t) => t.action === 'withdrawal' && t.dateTime.slice(0, 7) === month)
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      month,
      totalProfit: pnlVol.totalProfit,
      totalVolume: pnlVol.totalVolume,
      deposits,
      withdrawals,
    };
  });

  const chartOptions = optionDataPerformanceChart
    ? {
        chart: {
          height: 290,
          style: {
            fontFamily: "'Arial', sans-serif",
        },
        },
        title: {
          text: '',
        },
        xAxis:{
            categories: monthlyData?.map((item) => item.month),
            crosshair: true,
            plotBands: monthlyData.map((_, index) => ({
            from: index - 0.5, // Adjust for correct positioning
            to: index + 0.5,
            color: index % 2 === 0 ? '#232730' : '#292e37', // Alternating colors for bands
          })),
          },
        yAxis:
          {
            labels: {
              // format: '{value}',
              style: {
                // color: Highcharts.getOptions().colors[2],
              },
            },
            title: {
              text: '',
            },
            opposite: false,
          },
        tooltip: {
          shared: true,
        },
        legend: {
        enabled: true, // Enable the legend
        layout: 'horizontal', // Horizontal layout
        align: 'center', // Center the legend horizontally
        verticalAlign: 'top', // Place the legend at the bottom
        itemStyle: {
          fontSize: '11px', // Adjust font size of legend items
        },
        itemMarginBottom: 10, // Add space between legend items
        itemWidth: 100, // Set a fixed width to each item to control row fit
        symbolPadding: 0, // Space between the symbol and text in legend
        floating: false, // Ensure the legend stays inside the chart
        width: '100%', // Make sure legend takes full width of chart
        useHTML: true, // Enable HTML rendering for better layout control
      },
        series: [
          {
            name: 'Total Profit',
            type: 'column',
            yAxis: 0,
            data: monthlyData?.map((item) => item.totalProfit),
            color: '#2caffe',
          tooltip: {
              valueSuffix: ' $',
            },
          },
          {
            name: 'Deposits',
            type: 'column',
            yAxis: 0,
            data: monthlyData?.map((item) => item.deposits),
            color: '#00e272',
            tooltip: {
              valueSuffix: ' $',
            },
          },
          {
            name: 'Withdrawals',
            type: 'column',
            yAxis: 0,
            data: monthlyData?.map((item) => item.withdrawals),
            color: '#FF0000',
            tooltip: {
              valueSuffix: ' $',
            },
          },
          {
            name: 'Total Volume',
            type: 'spline',
            yAxis: 0,
            data: monthlyData?.map((item) => item.totalVolume),
            color: '#eaeef0',
            marker: {
              enabled: false,
            },
            dashStyle: 'line',
            tooltip: {
              valueSuffix: ' Lots',
            },
            // showInLegend: true,
          },
        ],
        plotOptions: {
        series: {
          label: {
            enabled: false, // Enable automatic labels for all series
          },
        },
      },
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 300,
              },
            },
          ],
        },
      }
    : {};

  return (
    <div className="w-full h-full">
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default PerformanceHighChart;
