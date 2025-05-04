import { useRef } from "react"
import { useWebSocket } from "../contexts/WebSocketContext"
import { useNavigate } from "react-router-dom"

function Dashboard(){
    const redRef = useRef<HTMLButtonElement>(null)
    const greenRef = useRef<HTMLButtonElement>(null)
    const wsRef = useWebSocket()
    const navigate = useNavigate();

    function handleJoinClick(buttonRef: React.RefObject<HTMLButtonElement | null>){
        const ws = wsRef?.current;

        if(!ws || ws.readyState !== WebSocket.OPEN){
            console.warn("Web Socket is not connected");
            return;
        }

        ws.send(JSON.stringify({
            type: "join",
            payload: {
              roomId: buttonRef.current?.textContent || "unknown"
            }
        }))

        navigate("/chat")
    }

    return(
        <div className="bg-black h-screen flex justify-center items-center">
            <div className="bg-blue-900 min-w-2xl min-h-8/12 h-[1/2] text-white rounded-2xl">
                <div className="flex justify-center p-4 text-2xl">Join Room</div>
                <div className="flex flex-col md:flex-row justify-around items-center p-5 mt-6 gap-3">
                    <button ref={redRef} className="bg-red-400 rounded p-4 text-xl min-w-40 hover:bg-red-900 hover:cursor-pointer"
                    onClick={() => handleJoinClick(redRef)}>
                        Red</button>
                    <button ref={greenRef} className="bg-green-400 rounded p-4 text-xl min-w-55 hover:bg-green-800 hover:cursor-pointer"
                    onClick={() => handleJoinClick(greenRef)}>
                        Green</button>
                </div>
                
            </div>
        </div>
    )
}

export default Dashboard