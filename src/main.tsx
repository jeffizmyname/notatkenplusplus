import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider } from 'next-themes'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dasboard'
import ErrorPage from './Error'
import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom';
import './index.css'
import Files from './pages/Dasboard/Options/Files'
import Blank from './pages/Dasboard/Options/Blank/Blank'
import Paint from './pages/Dasboard/Options/Paint/Paint'
import ToDo from './pages/Dasboard/Options/ToDo'
import Chart from './pages/Dasboard/Options/Chart'
import Calendar from './pages/Dasboard/Options/Calendar/CalendarMain'
import BlankFiles from './pages/Dasboard/FilesSites/BlankFiles/BlankFiles'
import PaintFiles from './pages/Dasboard/FilesSites/PaintFiles/PaintFiles'
import ToDoFiles from './pages/Dasboard/FilesSites/ToDoFiles/ToDoFiles'
import ChartFiles from './pages/Dasboard/FilesSites/ChartFiles/ChartFiles'
import Settings from './pages/Dasboard/Settings/Settings'

function App() {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <ThemeProvider themes={['pink', 'red', 'blue', 'light', 'dark']}>
      {<></>}
      <Routes>
        <Route path="/" index element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path='/dashboard' element={<Dashboard/>} >
          <Route path="Settings" element={<Settings/>} />
          <Route path='ToDo/:todoID' element={<ToDo/>}/>
          <Route path="Blank/:blankID" element={<Blank/>}/>
          {/* <Route path="Chart" element={<Chart/>}/> */}
          <Route path='MyThings' index element={<Files/>}/>
          <Route path="Calendar" element={<Calendar/>} />
          <Route path='BlankFiles' element={<BlankFiles/>}/>  
          <Route path='PaintFiles' element={<PaintFiles/>}/>
          <Route path='ToDoFiles' element={<ToDoFiles/>}/>
          <Route path='ChartFiles' element={<ChartFiles/>}/>
          <Route path="*" element={<ErrorPage/>} />
        </Route>
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
        <div className="w-screen h-screen text-foreground bg-gradient-to-t from-primary-100 to-default-0 to-50%">
          <App/>
        </div>
      </BrowserRouter>
    </NextUIProvider>
  </React.StrictMode>,
)

// 