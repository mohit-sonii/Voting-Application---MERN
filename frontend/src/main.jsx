import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './Context'
import './index.css'

// wrap the whole app under Provider
ReactDOM.createRoot(document.getElementById('root')).render(
     <React.StrictMode>
          
          <AuthProvider>
               <App />
          </AuthProvider>
     </React.StrictMode>,
)
