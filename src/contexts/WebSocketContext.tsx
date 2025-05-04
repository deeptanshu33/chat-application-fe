import { createContext, useContext, useRef } from "react";

const WebSocketContext = createContext<React.MutableRefObject<WebSocket | null> | null>(null);

export const WebSocketProvider: React.FC<{children : React.ReactNode}> = ({children}) => {
    const wsRef = useRef<WebSocket>(null);
    wsRef.current = new WebSocket("http://localhost:8000");
    return(
        <WebSocketContext.Provider value={wsRef}>
            {children}
        </WebSocketContext.Provider>
    );
};

//custom hook to access the WebSocket from any component
export const useWebSocket = () => {
    const context = useContext(WebSocketContext)
    return context;
}