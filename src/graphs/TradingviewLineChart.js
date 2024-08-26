import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

const BINANCE_WS_URL = "wss://stream.binance.com:9443/ws/btcusdt@trade";

export function TradingviewLineChart() {
    const chartContainerRef = useRef();
    const chart = useRef();
    const lineSeries = useRef();

    useEffect(() => {
        chart.current = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: 50,
            layout: {
                backgroundColor: '#000000',
                textColor: '#ffffff',
                visible: false,
                attributionLogo: false, 
            },
            rightPriceScale: {
                borderColor: '#888',
                visible: false,
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

        const ws = new WebSocket(BINANCE_WS_URL);

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            // console.log('eventevent', message)
            const tradeTime = new Date(message.T);
            const askPrice = parseFloat(message.p);

            // console.log('askPrice2', askPrice)

            lineSeries.current.update({
                time: tradeTime.getTime() / 1000,
                value: askPrice,
            });
        };

        return () => {
            ws.close();
            chart.current.remove();
        };
    }, []);

    return <div ref={chartContainerRef} style={{ position: 'relative', width: '250px' }} />;
}
