import React from 'react'
import ReactDOM from 'react-dom/client'
import { RTMApp } from './RTMApp'
import { BrowserRouter } from 'react-router-dom'
// import { MainApp } from './pages/MainApp'



ReactDOM.createRoot(document.getElementById('root')).render(
   <BrowserRouter>
      <RTMApp />
   </BrowserRouter>
)
