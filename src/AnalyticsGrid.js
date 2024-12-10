import React, {
    useState,
} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { TrendIcon } from "./grid/TrendIcon";

export const AnalyticsGrid = () => {
    const [selectedDate, setSelectedDate] = useState('Last Month');
    const dateOptions = ['Today', 'Yesterday', 'This Week', 'Last Week', 'This Month', 'Last Month', '3 Months', '6 Months', '12 Months'];
    const [activeTabIndex, setActiveTabIndex] = useState(2);


    const tabsData = [
        {
            label: 'EURO/USD'
        },
        {
            label: 'GBP/USD',
        },

        {
            label: 'EURO/JPY'
        },
        {
            label: 'BTC/USD',
        },

        {
            label: 'EURO/USD'
        },
        {
            label: 'GBP/USD',
        },

        {
            label: 'EURO/JPY'
        },
        {
            label: 'BTC/USD',
        },


    ];


    const rowData = [{
        'Date': '25/11/2024',
        'Open': 2716.899902,
        'High': 2723.199951,
        'Low': 2616.600098,
        'Close': 2618.5,
        'Predicted High': 2674.121582,
        'Predicted Low': 2601.573975,
        'PredictedTrend': 'down',
        'spd': '2657.030518',
        'smd': '2650.305176',
        'sld': '2661.931641',
        'Predicted Range': 72.54760742,
        'Predicted Strength': 9.046386719
    },
    {
        'Date': '22/11/2024',
        'Open': 2672.0,
        'High': 2718.5,
        'Low': 2670.100098,
        'Close': 2712.199951,
        'Predicted High': 2730.668701,
        'Predicted Low': 2693.12207,
        'PredictedTrend': 'up',
        'spd': '2682.720947',
        'smd': '2653.364502',
        'sld': '2664.335449',
        'Predicted Range': 37.54663086,
        'Predicted Strength': 5.910644531
    },
    {
        'Date': '21/11/2024',
        'Open': 2653.5,
        'High': 2676.5,
        'Low': 2651.600098,
        'Close': 2674.899902,
        'Predicted High': 2688.299805,
        'Predicted Low': 2656.461914,
        'PredictedTrend': 'up',
        'spd': '2653.463623',
        'smd': '2637.931641',
        'sld': '2658.879395',
        'Predicted Range': 31.83789063,
        'Predicted Strength': -16.90771484
    },
    {
        'Date': '20/11/2024',
        'Open': 2635.800049,
        'High': 2659.0,
        'Low': 2621.899902,
        'Close': 2651.699951,
        'Predicted High': 2667.013428,
        'Predicted Low': 2634.125244,
        'PredictedTrend': 'up',
        'spd': '2633.678711',
        'smd': '2627.475586',
        'sld': '2656.881592',
        'Predicted Range': 32.88818359,
        'Predicted Strength': -36.48754883
    },
    {
        'Date': '19/11/2024',
        'Open': 2616.300049,
        'High': 2643.399902,
        'Low': 2614.199951,
        'Close': 2631.0,
        'Predicted High': 2657.847168,
        'Predicted Low': 2620.428467,
        'PredictedTrend': 'up',
        'spd': '2616.480957',
        'smd': '2622.414551',
        'sld': '2658.016846',
        'Predicted Range': 37.41870117,
        'Predicted Strength': -55.32519531
    },
    {
        'Date': '18/11/2024',
        'Open': 2571.5,
        'High': 2619.5,
        'Low': 2568.5,
        'Close': 2614.600098,
        'Predicted High': 2627.996338,
        'Predicted Low': 2601.458252,
        'PredictedTrend': 'up',
        'spd': '2596.53418',
        'smd': '2618.597412',
        'sld': '2660.601563',
        'Predicted Range': 26.53808594,
        'Predicted Strength': -73.29760742
    },
    {
        'Date': '15/11/2024',
        'Open': 2570.399902,
        'High': 2580.800049,
        'Low': 2558.899902,
        'Close': 2570.100098,
        'Predicted High': 2577.8125,
        'Predicted Low': 2549.447266,
        'PredictedTrend': 'down',
        'spd': '2578.381104',
        'smd': '2620.707764',
        'sld': '2666.387451',
        'Predicted Range': 28.36523438,
        'Predicted Strength': -84.11694336
    },
    {
        'Date': '14/11/2024',
        'Open': 2578.100098,
        'High': 2585.800049,
        'Low': 2541.5,
        'Close': 2572.899902,
        'Predicted High': 2591.296631,
        'Predicted Low': 2554.286865,
        'PredictedTrend': 'down',
        'spd': '2590.98291',
        'smd': '2636.913086',
        'sld': '2678.105469',
        'Predicted Range': 37.00976563,
        'Predicted Strength': -80.33422852
    },
    {
        'Date': '13/11/2024',
        'Open': 2604.699951,
        'High': 2625.0,
        'Low': 2578.100098,
        'Close': 2586.5,
        'Predicted High': 2601.07959,
        'Predicted Low': 2558.664307,
        'PredictedTrend': 'down',
        'spd': '2609.183594',
        'smd': '2657.118896',
        'sld': '2690.94458',
        'Predicted Range': 42.4152832,
        'Predicted Strength': -70.63720703
    },
    {
        'Date': '12/11/2024',
        'Open': 2625.699951,
        'High': 2633.399902,
        'Low': 2595.699951,
        'Close': 2606.300049,
        'Predicted High': 2628.500977,
        'Predicted Low': 2584.769043,
        'PredictedTrend': 'down',
        'spd': '2636.268555',
        'smd': '2679.268066',
        'sld': '2703.923096',
        'Predicted Range': 43.73193359,
        'Predicted Strength': -54.70849609
    },
    {
        'Date': '11/11/2024',
        'Open': 2692.100098,
        'High': 2693.399902,
        'Low': 2617.100098,
        'Close': 2617.699951,
        'Predicted High': 2661.880127,
        'Predicted Low': 2611.977539,
        'PredictedTrend': 'down',
        'spd': '2665.98291',
        'smd': '2700.69751',
        'sld': '2715.130615',
        'Predicted Range': 49.90258789,
        'Predicted Strength': -40.62646484
    },
    {
        'Date': '22/11/2024',
        'Open': 2672.0,
        'High': 2718.5,
        'Low': 2670.100098,
        'Close': 2712.199951,
        'Predicted High': 2730.668701,
        'Predicted Low': 2693.12207,
        'PredictedTrend': 'up',
        'spd': '2682.720947',
        'smd': '2653.364502',
        'sld': '2664.335449',
        'Predicted Range': 37.54663086,
        'Predicted Strength': 5.910644531
    },
    {
        'Date': '21/11/2024',
        'Open': 2653.5,
        'High': 2676.5,
        'Low': 2651.600098,
        'Close': 2674.899902,
        'Predicted High': 2688.299805,
        'Predicted Low': 2656.461914,
        'PredictedTrend': 'up',
        'spd': '2653.463623',
        'smd': '2637.931641',
        'sld': '2658.879395',
        'Predicted Range': 31.83789063,
        'Predicted Strength': -16.90771484
    },
    {
        'Date': '20/11/2024',
        'Open': 2635.800049,
        'High': 2659.0,
        'Low': 2621.899902,
        'Close': 2651.699951,
        'Predicted High': 2667.013428,
        'Predicted Low': 2634.125244,
        'PredictedTrend': 'up',
        'spd': '2633.678711',
        'smd': '2627.475586',
        'sld': '2656.881592',
        'Predicted Range': 32.88818359,
        'Predicted Strength': -36.48754883
    },
    {
        'Date': '19/11/2024',
        'Open': 2616.300049,
        'High': 2643.399902,
        'Low': 2614.199951,
        'Close': 2631.0,
        'Predicted High': 2657.847168,
        'Predicted Low': 2620.428467,
        'PredictedTrend': 'up',
        'spd': '2616.480957',
        'smd': '2622.414551',
        'sld': '2658.016846',
        'Predicted Range': 37.41870117,
        'Predicted Strength': -55.32519531
    },
    {
        'Date': '18/11/2024',
        'Open': 2571.5,
        'High': 2619.5,
        'Low': 2568.5,
        'Close': 2614.600098,
        'Predicted High': 2627.996338,
        'Predicted Low': 2601.458252,
        'PredictedTrend': 'up',
        'spd': '2596.53418',
        'smd': '2618.597412',
        'sld': '2660.601563',
        'Predicted Range': 26.53808594,
        'Predicted Strength': -73.29760742
    },
    {
        'Date': '15/11/2024',
        'Open': 2570.399902,
        'High': 2580.800049,
        'Low': 2558.899902,
        'Close': 2570.100098,
        'Predicted High': 2577.8125,
        'Predicted Low': 2549.447266,
        'PredictedTrend': 'down',
        'spd': '2578.381104',
        'smd': '2620.707764',
        'sld': '2666.387451',
        'Predicted Range': 28.36523438,
        'Predicted Strength': -84.11694336
    },
    {
        'Date': '14/11/2024',
        'Open': 2578.100098,
        'High': 2585.800049,
        'Low': 2541.5,
        'Close': 2572.899902,
        'Predicted High': 2591.296631,
        'Predicted Low': 2554.286865,
        'PredictedTrend': 'down',
        'spd': '2590.98291',
        'smd': '2636.913086',
        'sld': '2678.105469',
        'Predicted Range': 37.00976563,
        'Predicted Strength': -80.33422852
    },
    {
        'Date': '13/11/2024',
        'Open': 2604.699951,
        'High': 2625.0,
        'Low': 2578.100098,
        'Close': 2586.5,
        'Predicted High': 2601.07959,
        'Predicted Low': 2558.664307,
        'PredictedTrend': 'down',
        'spd': '2609.183594',
        'smd': '2657.118896',
        'sld': '2690.94458',
        'Predicted Range': 42.4152832,
        'Predicted Strength': -70.63720703
    },
    {
        'Date': '12/11/2024',
        'Open': 2625.699951,
        'High': 2633.399902,
        'Low': 2595.699951,
        'Close': 2606.300049,
        'Predicted High': 2628.500977,
        'Predicted Low': 2584.769043,
        'PredictedTrend': 'down',
        'spd': '2636.268555',
        'smd': '2679.268066',
        'sld': '2703.923096',
        'Predicted Range': 43.73193359,
        'Predicted Strength': -54.70849609
    },
    {
        'Date': '11/11/2024',
        'Open': 2692.100098,
        'High': 2693.399902,
        'Low': 2617.100098,
        'Close': 2617.699951,
        'Predicted High': 2661.880127,
        'Predicted Low': 2611.977539,
        'PredictedTrend': 'down',
        'spd': '2665.98291',
        'smd': '2700.69751',
        'sld': '2715.130615',
        'Predicted Range': 49.90258789,
        'Predicted Strength': -40.62646484
    },
    {
        'Date': '22/11/2024',
        'Open': 2672.0,
        'High': 2718.5,
        'Low': 2670.100098,
        'Close': 2712.199951,
        'Predicted High': 2730.668701,
        'Predicted Low': 2693.12207,
        'PredictedTrend': 'up',
        'spd': '2682.720947',
        'smd': '2653.364502',
        'sld': '2664.335449',
        'Predicted Range': 37.54663086,
        'Predicted Strength': 5.910644531
    },
    {
        'Date': '21/11/2024',
        'Open': 2653.5,
        'High': 2676.5,
        'Low': 2651.600098,
        'Close': 2674.899902,
        'Predicted High': 2688.299805,
        'Predicted Low': 2656.461914,
        'PredictedTrend': 'up',
        'spd': '2653.463623',
        'smd': '2637.931641',
        'sld': '2658.879395',
        'Predicted Range': 31.83789063,
        'Predicted Strength': -16.90771484
    },
    {
        'Date': '20/11/2024',
        'Open': 2635.800049,
        'High': 2659.0,
        'Low': 2621.899902,
        'Close': 2651.699951,
        'Predicted High': 2667.013428,
        'Predicted Low': 2634.125244,
        'PredictedTrend': 'up',
        'spd': '2633.678711',
        'smd': '2627.475586',
        'sld': '2656.881592',
        'Predicted Range': 32.88818359,
        'Predicted Strength': -36.48754883
    },
    {
        'Date': '19/11/2024',
        'Open': 2616.300049,
        'High': 2643.399902,
        'Low': 2614.199951,
        'Close': 2631.0,
        'Predicted High': 2657.847168,
        'Predicted Low': 2620.428467,
        'PredictedTrend': 'up',
        'spd': '2616.480957',
        'smd': '2622.414551',
        'sld': '2658.016846',
        'Predicted Range': 37.41870117,
        'Predicted Strength': -55.32519531
    },
    {
        'Date': '18/11/2024',
        'Open': 2571.5,
        'High': 2619.5,
        'Low': 2568.5,
        'Close': 2614.600098,
        'Predicted High': 2627.996338,
        'Predicted Low': 2601.458252,
        'PredictedTrend': 'up',
        'spd': '2596.53418',
        'smd': '2618.597412',
        'sld': '2660.601563',
        'Predicted Range': 26.53808594,
        'Predicted Strength': -73.29760742
    },
    {
        'Date': '15/11/2024',
        'Open': 2570.399902,
        'High': 2580.800049,
        'Low': 2558.899902,
        'Close': 2570.100098,
        'Predicted High': 2577.8125,
        'Predicted Low': 2549.447266,
        'PredictedTrend': 'down',
        'spd': '2578.381104',
        'smd': '2620.707764',
        'sld': '2666.387451',
        'Predicted Range': 28.36523438,
        'Predicted Strength': -84.11694336
    },
    {
        'Date': '14/11/2024',
        'Open': 2578.100098,
        'High': 2585.800049,
        'Low': 2541.5,
        'Close': 2572.899902,
        'Predicted High': 2591.296631,
        'Predicted Low': 2554.286865,
        'PredictedTrend': 'down',
        'spd': '2590.98291',
        'smd': '2636.913086',
        'sld': '2678.105469',
        'Predicted Range': 37.00976563,
        'Predicted Strength': -80.33422852
    },
    {
        'Date': '13/11/2024',
        'Open': 2604.699951,
        'High': 2625.0,
        'Low': 2578.100098,
        'Close': 2586.5,
        'Predicted High': 2601.07959,
        'Predicted Low': 2558.664307,
        'PredictedTrend': 'down',
        'spd': '2609.183594',
        'smd': '2657.118896',
        'sld': '2690.94458',
        'Predicted Range': 42.4152832,
        'Predicted Strength': -70.63720703
    },
    {
        'Date': '12/11/2024',
        'Open': 2625.699951,
        'High': 2633.399902,
        'Low': 2595.699951,
        'Close': 2606.300049,
        'Predicted High': 2628.500977,
        'Predicted Low': 2584.769043,
        'PredictedTrend': 'down',
        'spd': '2636.268555',
        'smd': '2679.268066',
        'sld': '2703.923096',
        'Predicted Range': 43.73193359,
        'Predicted Strength': -54.70849609
    },
    {
        'Date': '11/11/2024',
        'Open': 2692.100098,
        'High': 2693.399902,
        'Low': 2617.100098,
        'Close': 2617.699951,
        'Predicted High': 2661.880127,
        'Predicted Low': 2611.977539,
        'PredictedTrend': 'down',
        'spd': '2665.98291',
        'smd': '2700.69751',
        'sld': '2715.130615',
        'Predicted Range': 49.90258789,
        'Predicted Strength': -40.62646484
    },
    {
        'Date': '22/11/2024',
        'Open': 2672.0,
        'High': 2718.5,
        'Low': 2670.100098,
        'Close': 2712.199951,
        'Predicted High': 2730.668701,
        'Predicted Low': 2693.12207,
        'PredictedTrend': 'up',
        'spd': '2682.720947',
        'smd': '2653.364502',
        'sld': '2664.335449',
        'Predicted Range': 37.54663086,
        'Predicted Strength': 5.910644531
    },
    {
        'Date': '21/11/2024',
        'Open': 2653.5,
        'High': 2676.5,
        'Low': 2651.600098,
        'Close': 2674.899902,
        'Predicted High': 2688.299805,
        'Predicted Low': 2656.461914,
        'PredictedTrend': 'up',
        'spd': '2653.463623',
        'smd': '2637.931641',
        'sld': '2658.879395',
        'Predicted Range': 31.83789063,
        'Predicted Strength': -16.90771484
    },
    {
        'Date': '20/11/2024',
        'Open': 2635.800049,
        'High': 2659.0,
        'Low': 2621.899902,
        'Close': 2651.699951,
        'Predicted High': 2667.013428,
        'Predicted Low': 2634.125244,
        'PredictedTrend': 'up',
        'spd': '2633.678711',
        'smd': '2627.475586',
        'sld': '2656.881592',
        'Predicted Range': 32.88818359,
        'Predicted Strength': -36.48754883
    },
    {
        'Date': '19/11/2024',
        'Open': 2616.300049,
        'High': 2643.399902,
        'Low': 2614.199951,
        'Close': 2631.0,
        'Predicted High': 2657.847168,
        'Predicted Low': 2620.428467,
        'PredictedTrend': 'up',
        'spd': '2616.480957',
        'smd': '2622.414551',
        'sld': '2658.016846',
        'Predicted Range': 37.41870117,
        'Predicted Strength': -55.32519531
    },
    {
        'Date': '18/11/2024',
        'Open': 2571.5,
        'High': 2619.5,
        'Low': 2568.5,
        'Close': 2614.600098,
        'Predicted High': 2627.996338,
        'Predicted Low': 2601.458252,
        'PredictedTrend': 'up',
        'spd': '2596.53418',
        'smd': '2618.597412',
        'sld': '2660.601563',
        'Predicted Range': 26.53808594,
        'Predicted Strength': -73.29760742
    },
    {
        'Date': '15/11/2024',
        'Open': 2570.399902,
        'High': 2580.800049,
        'Low': 2558.899902,
        'Close': 2570.100098,
        'Predicted High': 2577.8125,
        'Predicted Low': 2549.447266,
        'PredictedTrend': 'down',
        'spd': '2578.381104',
        'smd': '2620.707764',
        'sld': '2666.387451',
        'Predicted Range': 28.36523438,
        'Predicted Strength': -84.11694336
    },
    {
        'Date': '14/11/2024',
        'Open': 2578.100098,
        'High': 2585.800049,
        'Low': 2541.5,
        'Close': 2572.899902,
        'Predicted High': 2591.296631,
        'Predicted Low': 2554.286865,
        'PredictedTrend': 'down',
        'spd': '2590.98291',
        'smd': '2636.913086',
        'sld': '2678.105469',
        'Predicted Range': 37.00976563,
        'Predicted Strength': -80.33422852
    },
    {
        'Date': '13/11/2024',
        'Open': 2604.699951,
        'High': 2625.0,
        'Low': 2578.100098,
        'Close': 2586.5,
        'Predicted High': 2601.07959,
        'Predicted Low': 2558.664307,
        'PredictedTrend': 'down',
        'spd': '2609.183594',
        'smd': '2657.118896',
        'sld': '2690.94458',
        'Predicted Range': 42.4152832,
        'Predicted Strength': -70.63720703
    },
    {
        'Date': '12/11/2024',
        'Open': 2625.699951,
        'High': 2633.399902,
        'Low': 2595.699951,
        'Close': 2606.300049,
        'Predicted High': 2628.500977,
        'Predicted Low': 2584.769043,
        'PredictedTrend': 'down',
        'spd': '2636.268555',
        'smd': '2679.268066',
        'sld': '2703.923096',
        'Predicted Range': 43.73193359,
        'Predicted Strength': -54.70849609
    },
    {
        'Date': '11/11/2024',
        'Open': 2692.100098,
        'High': 2693.399902,
        'Low': 2617.100098,
        'Close': 2617.699951,
        'Predicted High': 2661.880127,
        'Predicted Low': 2611.977539,
        'PredictedTrend': 'down',
        'spd': '2665.98291',
        'smd': '2700.69751',
        'sld': '2715.130615',
        'Predicted Range': 49.90258789,
        'Predicted Strength': -40.62646484
    },
    {
        'Date': '08/11/2024',
        'Open': 2713.600098,
        'High': 2717.800049,
        'Low': 2687.300049,
        'Close': 2694.800049,
        'Predicted High': 2712.724854,
        'Predicted Low': 2662.748779,
        'PredictedTrend': 'down',
        'spd': '2701.449219',
        'smd': '2720.613525',
        'sld': '2724.663574',
        'Predicted Range': 49.97607422,
        'Predicted Strength': -24.79516602
    },
    {
        'Date': '07/11/2024',
        'Open': 2667.699951,
        'High': 2718.300049,
        'Low': 2650.300049,
        'Close': 2705.800049,
        'Predicted High': 2735.154785,
        'Predicted Low': 2686.316895,
        'PredictedTrend': 'down',
        'spd': '2712.80542',
        'smd': '2730.126465',
        'sld': '2728.389404',
        'Predicted Range': 48.83789063,
        'Predicted Strength': -17.20776367
    },
    {
        'Date': '06/11/2024',
        'Open': 2752.600098,
        'High': 2758.800049,
        'Low': 2660.699951,
        'Close': 2676.300049,
        'Predicted High': 2714.741455,
        'Predicted Low': 2649.662598,
        'PredictedTrend': 'down',
        'spd': '2716.499023',
        'smd': '2735.133545',
        'sld': '2729.832275',
        'Predicted Range': 65.07885742,
        'Predicted Strength': -12.66967773
    },
    {
        'Date': '05/11/2024',
        'Open': 2746.0,
        'High': 2759.5,
        'Low': 2733.399902,
        'Close': 2749.699951,
        'Predicted High': 2764.880371,
        'Predicted Low': 2741.253174,
        'PredictedTrend': 'down',
        'spd': '2752.796387',
        'smd': '2751.502197',
        'sld': '2735.520752',
        'Predicted Range': 23.62719727,
        'Predicted Strength': 6.745605469
    },
    {
        'Date': '04/11/2024',
        'Open': 2743.5,
        'High': 2757.5,
        'Low': 2739.399902,
        'Close': 2746.199951,
        'Predicted High': 2764.653809,
        'Predicted Low': 2736.443115,
        'PredictedTrend': 'down',
        'spd': '2753.621582',
        'smd': '2752.716553',
        'sld': '2734.139404',
        'Predicted Range': 28.21069336,
        'Predicted Strength': 13.64916992
    },
    {
        'Date': '01/11/2024',
        'Open': 2754.0,
        'High': 2772.399902,
        'Low': 2742.600098,
        'Close': 2749.199951,
        'Predicted High': 2764.235596,
        'Predicted Low': 2727.221436,
        'PredictedTrend': 'down',
        'spd': '2758.140625',
        'smd': '2753.809814',
        'sld': '2732.527588',
        'Predicted Range': 37.01416016,
        'Predicted Strength': 21.87402344
    },
    {
        'Date': '31/10/2024',
        'Open': 2799.100098,
        'High': 2801.199951,
        'Low': 2741.800049,
        'Close': 2749.300049,
        'Predicted High': 2778.309326,
        'Predicted Low': 2735.911133,
        'PredictedTrend': 'down',
        'spd': '2769.370605',
        'smd': '2756.830811',
        'sld': '2731.105469',
        'Predicted Range': 42.39819336,
        'Predicted Strength': 32.11987305
    },
    {
        'Date': '30/10/2024',
        'Open': 2786.899902,
        'High': 2801.800049,
        'Low': 2782.399902,
        'Close': 2800.800049,
        'Predicted High': 2815.591553,
        'Predicted Low': 2787.508301,
        'PredictedTrend': 'up',
        'spd': '2784.216797',
        'smd': '2756.959717',
        'sld': '2728.264893',
        'Predicted Range': 28.08325195,
        'Predicted Strength': 42.75390625
    },
    {
        'Date': '29/10/2024',
        'Open': 2754.300049,
        'High': 2787.699951,
        'Low': 2752.0,
        'Close': 2781.100098,
        'Predicted High': 2797.380859,
        'Predicted Low': 2772.292969,
        'PredictedTrend': 'up',
        'spd': '2767.122803',
        'smd': '2745.127197',
        'sld': '2719.842773',
        'Predicted Range': 25.08789063,
        'Predicted Strength': 41.12744141
    },
    {
        'Date': '28/10/2024',
        'Open': 2749.199951,
        'High': 2758.300049,
        'Low': 2736.899902,
        'Close': 2755.899902,
        'Predicted High': 2762.703857,
        'Predicted Low': 2736.605469,
        'PredictedTrend': 'up',
        'spd': '2750.64502',
        'smd': '2733.731689',
        'sld': '2712.23999',
        'Predicted Range': 26.09838867,
        'Predicted Strength': 38.43139648
    }];

    // Column definitions
    const [columnDefs, setColumnDefs] = useState([
        { field: "Date", sortable: true, filter: true },
        { field: "Open", sortable: true, filter: true },
        { field: "High", sortable: true, filter: true },
        { field: "Low", sortable: true, filter: true },
        { field: "Close", sortable: true, filter: true },
        { headerName: 'P. High', field: "Predicted High", sortable: true, filter: true },
        { headerName: 'P. Low', field: "Predicted Low", sortable: true, filter: true },
        {
            headerName: 'P. Trend', field: "PredictedTrend", sortable: true, filter: true,
            cellRenderer: TrendIcon,
        },
        // {
        //     headerName: 'Triple Cross',
        //     children: [
        //         { field: "spd", sortable: true, filter: true },
        //         { field: "smd", sortable: true, filter: true },
        //         { field: "sld", sortable: true, filter: true },
        //     ]
        // },
        { headerName: 'P. Range', field: "Predicted Range", sortable: true, filter: true },
        { headerName: 'P. Strength', field: "Predicted Strength", sortable: true, filter: true },
    ]);
    return (
        <div className="flex flex-col h-full w-full">
            <header
                className="flex items-center justify-between border-b-4"
                style={{
                    borderColor: "black",
                    height: "40px",
                    margin: 0,
                    padding: "0 8px",
                }}
            >
                <div className="flex space-x-3">
                    {tabsData.map((tab, idx) => {
                        return (
                            <button
                                key={idx}
                                className={`py-0 border-b-2 text-sm transition-colors duration-300 ${idx === activeTabIndex
                                        ? 'border-[#47FFA6] text-[#47FFA6] font-semibold'
                                        : 'border-transparent hover:border-gray-200'
                                    }`}
                                onClick={() => setActiveTabIndex(idx)}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

            </header>

            <header
                className="flex items-center justify-between border-b-4"
                style={{
                    borderColor: "black",
                    height: "30px",
                    margin: 0,
                    padding: "0 8px",
                }}
            >
                <div className="relative w-28">
                    <select
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className={`appearance-none text-sm w-full h-5 text-gray-300 bg-[#2D2D2D] rounded-md border border-gray-300 focus:outline-none pl-2 pr-4 }`}
                    >
                        {dateOptions.map((date) => (
                            <option key={date} value={date}>
                                {date}
                            </option>
                        ))}
                    </select>
                    {/* Custom arrow */}
                    <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="#47FFA6"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </div>
                </div>
                <div className="text-xs"> EUR/USD (Euro / US Dollar): 20/10/2024 - 20/11/2024</div>
                <div className="flex space-x-2">
                    <button className="p-1 hover:bg-[#2D2D2D] hover:rounded-full hover:bg-[#4C4C4C]">
                        <svg
                            width="13"
                            height="12"
                            viewBox="0 0 13 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M0 0V12.01H12.86V0H0ZM11.79 11.16H4.38V0.830002H11.79V11.16Z"
                                fill="white"
                            />
                        </svg>
                    </button>

                    <button className="p-1 hover:bg-[#2D2D2D] hover:rounded-full hover:bg-[#4C4C4C]">
                        <svg
                            width="14"
                            height="12"
                            viewBox="0 0 14 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M0.189941 0V12.01H13.0499V0H0.189941ZM1.25994 0.839996H8.66994V11.17H1.25994V0.839996Z"
                                fill="white"
                            />
                        </svg>
                    </button>
                    <button className="p-1 hover:bg-[#2D2D2D] hover:rounded-full hover:bg-[#4C4C4C]">
                        <svg
                            width="12"
                            height="11"
                            viewBox="0 0 12 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M4.67009 7.58002L6.81009 9.72002L7.12009 9.41002C7.99009 8.54002 8.33009 7.28001 8.03009 6.09001L7.92009 5.65002L8.83009 4.74002L8.92009 4.83002C9.37009 5.30002 10.1001 5.37002 10.6401 5.00002C11.2301 4.58002 11.3701 3.76002 10.9501 3.17002C10.9101 3.11002 10.8601 3.06002 10.8101 3.00002L8.6601 0.850016C8.2101 0.380016 7.48009 0.310018 6.94009 0.680018C6.35009 1.10002 6.2101 1.92002 6.6301 2.51002C6.6701 2.57002 6.7201 2.62002 6.7701 2.68002L6.90009 2.81002L5.9901 3.72002L5.56009 3.61002C4.37009 3.30002 3.10009 3.64002 2.23009 4.51002L1.92009 4.82002L4.06009 6.96002L0.850098 10.17L1.47009 10.79L4.68008 7.58002H4.67009ZM5.3501 4.46002L6.2701 4.68002L8.15009 2.80002L7.40009 2.06002C7.23009 1.89002 7.23009 1.61002 7.40009 1.44002C7.42009 1.42002 7.4401 1.41002 7.4601 1.39002C7.6501 1.27002 7.90009 1.31002 8.05009 1.47002L10.2001 3.62002C10.3701 3.79002 10.3701 4.07002 10.2001 4.24002C10.1801 4.26002 10.1601 4.27002 10.1401 4.29002C9.95009 4.41002 9.70009 4.37002 9.55009 4.21002L8.84009 3.50002L6.9601 5.38002L7.19009 6.30002C7.38009 7.04002 7.24009 7.83002 6.80009 8.46002L3.20009 4.86002C3.83009 4.42002 4.62009 4.27002 5.36009 4.47002L5.3501 4.46002Z"
                                fill="white"
                            />
                        </svg>
                    </button>
                </div>
            </header>

            <div className="ag-theme-balham-dark w-full h-full py-1">
                <AgGridReact
                    defaultColDef={{
                        flex: 1,
                        // floatingFilter: true,
                        // enableRowGroup: true,
                        enableValue: true,
                        enablePivot: true,
                        sortable: true,
                        resizable: true,
                        minWidth: 110,
                    }}

                    rowData={rowData}
                    columnDefs={columnDefs}
                    rowDragManaged={true}
                    rowSelection={"multiple"}
                    sideBar={{
                        toolPanels: [
                            {
                                id: "columns",
                                labelDefault: "Columns",
                                toolPanel: "agColumnsToolPanel",
                            },
                            {
                                id: "filters",
                                labelDefault: "Filters",
                                toolPanel: "agFiltersToolPanel",
                            },
                        ],
                        hiddenByDefault: false,
                    }}
                    rowHeight={19}
                />
            </div>
        </div>
    );
};