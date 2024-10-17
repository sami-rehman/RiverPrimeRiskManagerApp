import { useEffect, useState, useRef } from "react";

export const useStockWebSocket = (url, requestMessage) => {
   
  const baseUrl= 'ws://192.168.3.164:8081/ws/api/v1/';
  const cookedUrl =baseUrl+url;
    
  const [data, setData] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = new WebSocket(cookedUrl);
    socketRef.current = socket;
    let isSocketOpen = false;
  
    const handleMessage = (event) => {
      const receivedData = JSON.parse(event?.data);
      setData(receivedData);
    };
    
    const sendRequest = () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(requestMessage));
      }
    };
    
    socket.addEventListener("message", handleMessage);
    socket.onopen = () => {
      isSocketOpen = true;
      sendRequest();
    };

    return () => {
      if (isSocketOpen && socket.readyState === WebSocket.OPEN) {
        const unsubscribeMessage = {
          type: "unsubscribe",
          requestType: requestMessage.requestType,
          accounts: "all",
        };
        socket.send(JSON.stringify(unsubscribeMessage));
      }
      socket.removeEventListener("message", handleMessage);
      socket.close();
    };
  }, [cookedUrl, requestMessage]);

  return data;
};
