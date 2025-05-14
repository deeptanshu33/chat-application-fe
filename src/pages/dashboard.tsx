import { useRef } from "react"
import { useWebSocket } from "../contexts/WebSocketContext"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/button"
import { InputBox } from "../components/input_box"
import { ArrowRight } from "../icons/arrow_right"
import codeGenerator from "../utils/code_generator"

function Dashboard(){
    const inputRef = useRef<HTMLInputElement>(null)
    const wsRef = useWebSocket()
    const navigate = useNavigate();

    function handleJoinClick(){
        const ws = wsRef?.current;

        if(!ws || ws.readyState !== WebSocket.OPEN){
            console.warn("Web Socket is not connected");
            return;
        }

        //generate a code for this room
        const room_code = codeGenerator()
        console.log(room_code)

        ws.send(JSON.stringify({
            type: "join",
            payload: {
              roomId: room_code || "unknown"
            }
        }))

        navigate("/chat")
    }

    function handleRoomCodeClick(){
        const ws = wsRef?.current;

        if(!ws || ws.readyState !== WebSocket.OPEN){
            console.warn("Web Socket is not connected");
            return;
        }

        //get room code using ref
        const room_code = inputRef.current?.value
        ws.send(JSON.stringify({
            type: "join",
            payload:{
                roomId: room_code
            }
        }))

        navigate("/chat")
    }

    return(
        <div className="bg-black h-screen flex justify-center items-center">
            <div className="bg-gray-900 min-w-2xl min-h-8/12 h-[1/2] text-white rounded-2xl">
                <div className="flex justify-center mt-40">
                    <Button size="lg" text="Create room" onclick={handleJoinClick}/>
                </div>
                <div className="mt-2 flex justify-center">
                    <InputBox ref={inputRef} placeholder_text="Enter room code" />
                    <Button size="md" icon={<ArrowRight />} onclick={handleRoomCodeClick}/>
                </div>
                
            </div>
        </div>
    )
}

export default Dashboard