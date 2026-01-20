import React from "react";
import App from './App.tsx'
import { AuthProvider } from "./context/AuthContext.tsx";
import { createRoot } from 'react-dom/client'
import './index.css'

createRoot(document.getElementById('root')!).render(
<React.StrictMode>
  <AuthProvider>
    <App />
  </AuthProvider>
</React.StrictMode>
)