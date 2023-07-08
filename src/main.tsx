import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {CitiesProvider} from "./context/CitiesContext.tsx";
import {BrowserRouter as Router} from 'react-router-dom'
import {AuthProvider} from "./context/FakeAuthContext.tsx";
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>

          <AuthProvider>
              <CitiesProvider>
              <Router>
                  <App />
              </Router>


      </CitiesProvider>
          </AuthProvider>


  </React.StrictMode>,
)
