import React  from 'react';
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

const PerformanceHighChart = () => {
  const chartOptions = {
    chart: {
      zooming: {
        type: 'xy',
      },
      height: 290,
      style: {
        width: '100%',
        height: '100%',
      }

    },
    title: {
      text: '',
    },
    xAxis: [
      {
        categories: [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
        ],
        crosshair: true,
      },
    ],
    yAxis: [
      {
        // Primary yAxis
        labels: {
          format: '{value}',
          style: {
            color: Highcharts.getOptions().colors[2],
          },
        },
        title: {
          text: '',
        },
        opposite: true,
      },
      {
        // Secondary yAxis
        gridLineWidth: 0,
        title: {
          text: '',
        },
      
      },
      {
        // Tertiary yAxis
        gridLineWidth: 0,
        title: {
          text: '',
        
        },
        
        opposite: true,
      },
    ],
    tooltip: {
      shared: true,
    },
    legend: {
        enabled: false,
    },
    series: [
      {
        name: 'Equity',
        type: 'column',
        yAxis: 1,
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
        color: '#2caffe',
        tooltip: {
        },
      },
      {
        name: 'Deposits',
        type: 'column',
        yAxis: 1,
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
        color:'#00e272',
        tooltip: {
          valueSuffix: ' $',
        },
      },
      {
        name: 'Withdrawals',
        type: 'column',
        yAxis: 1,
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
        color: '#FF0000',
        tooltip: {
          valueSuffix: ' $',
        },
      },
      {
        name: 'Trading Volume',
        type: 'spline',
        yAxis: 1,
        data: [50, 70, 109, 145, 149, 176, 186, 158.5, 226, 199, 95.6, 54.4],
        color: '#2d3417',
        marker: {
          enabled: false,
        },
        dashStyle: 'line',
        tooltip: {
          valueSuffix: ' Lots',
        },
        showInLegend: false,
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 300,
          },
        },
      ],
    },
  };

  return (
  
    <div className='w-full h-full'>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default PerformanceHighChart;
