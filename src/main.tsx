import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider } from 'next-themes'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ErrorPage from './Error'
import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom';
import './index.css'

function App() {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <ThemeProvider themes={['pink', 'red', 'blue', 'light', 'dark']}>
      {<></>}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="*" element={<ErrorPage/>} />
      </Routes>
      </ThemeProvider>
    </NextUIProvider>
  );
}


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <NextUIProvider>
      <BrowserRouter>
        <div className="w-screen h-screen bg-gradient-to-tr from-primary-100 to-primary-300">
          <App/>
        </div>
      </BrowserRouter>
    </NextUIProvider>
  </React.StrictMode>,
)

// 