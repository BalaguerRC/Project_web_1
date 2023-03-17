import React from 'react'
import ReactDOM from 'react-dom/client'
//import "tailwindcss"
import { BrowserRouter } from 'react-router-dom';
import App from './App'
import './index.css'


   //{/*<App />*/}      <BrowserRouter>
        /*<App></App>
      </BrowserRouter>*/
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <App></App>
  </React.StrictMode>,
)
