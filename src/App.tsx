import { useEffect, useState, useRef } from 'react'

import './App.css'

function App() {
  const [messages, setMessages] = useState(['hi there', "hello"])
  const inputRef = useRef<HTMLInputElement>(null)
  const wsRef = useRef<WebSocket>(null)
  useEffect(()=>{
    const ws = new WebSocket("http://localhost:8000")
    ws.onmessage = (event) => {
      setMessages(m => [...m, event.data])
    }
    wsRef.current = ws;
    //join the room once connection with the websocket has been established
    ws.onopen = ()=>{
      ws.send(JSON.stringify({
        type: "join",
        payload: {
          roomId: "red"
        }
      }))
    }
    return ()=>{
      ws.close()
    }
  }, [])
 
  return ( 
    <div className="h-screen bg-black">
      
     <div className='h-[95vh]'>
      {messages.map(message => <div className='m-8'>
        <span className='bg-amber-50 rounded p-4'>{message}</span>
      </div>)} 
     </div>
     <div className='w-full bg-white flex justify-around'>
      <input ref={inputRef} className='w-full p-4' type="text" />
      <button className='bg-purple-600 text-white' onClick={()=>{
        const message = inputRef.current?.value;
        wsRef.current?.send(JSON.stringify({
          type: "chat",
          payload: { 
            message: message 
          }
        }) )
      }}>Send Message</button>
     </div>
    </div>
  )
}

export default App
