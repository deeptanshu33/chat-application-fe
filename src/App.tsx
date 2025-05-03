import { useEffect, useState, useRef } from 'react'

import './App.css'

function App() {
  const [messages, setMessages] = useState(['hi there', "hello"])
  const inputRef = useRef<HTMLInputElement>(null)
  const wsRef = useRef<WebSocket>(null)
  const chatLastMsgRef = useRef<HTMLDivElement>(null)
  function sendMessage() {
    const message = inputRef.current?.value;
    if(message==='') return;
    wsRef.current?.send(JSON.stringify({
      type: "chat",
      payload: { 
        message: message 
      }
    }) )
    if(inputRef.current){
      inputRef.current.value=''
    }
  }

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

  useEffect(()=>{
    chatLastMsgRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [messages])
 
  return ( 
    <div className="h-screen bg-black">

      {/* chat section */}
     <div className='h-93/100 overflow-y-auto'>
      
      {messages.map(message => <div className='mt-8 mb-8 ml-4'>
        <span className='bg-amber-50 rounded p-4'>{message}</span>
      </div>)} 
      <div ref={chatLastMsgRef} />
     </div>

     {/* input box and button */}
      <div className='w-full bg-white flex justify-around'>
        <input 
        onKeyDown={(e)=>{
          if(e.key==='Enter'){
            sendMessage()
          }
        }}  
        ref={inputRef} className='w-full p-4' type="text" />
        <button className='bg-purple-600 text-white' 
        onClick={()=>{
          sendMessage()
        }}>Send Message</button>
      </div>
    </div>
  )
}

export default App
