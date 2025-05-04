import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import Chat from './pages/chat'
import Dashboard from './pages/dashboard'
import { WebSocketProvider } from './contexts/WebSocketContext'

function App() {
 
  return ( 
    <WebSocketProvider>
      <BrowserRouter>
      <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/chat' element={<Chat/>}/>
      </Routes>
    </BrowserRouter>
    </WebSocketProvider>
  )
}

export default App
