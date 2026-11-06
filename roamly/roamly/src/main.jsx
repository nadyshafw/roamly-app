import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="80445533115-rfotlqhevosi0nfc4p14nqclihrl9kc7.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>;
  </StrictMode>,
)
