import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { setAuthToken } from "./utils/api";
import './index.css'
import App from './App.jsx'

const tk = localStorage.getItem("token");
if (tk) setAuthToken(tk);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
