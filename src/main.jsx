import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, } from "react-router";
import { router } from './router/Router';
import AuthProvider from './context/AuthProvider/AuthProvider';
import ThemeProvider from './context/ThemeContext/ThemeProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
