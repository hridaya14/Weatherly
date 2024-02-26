import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Route , Routes } from "react-router-dom"
import { BrowserRouter } from "react-router-dom"
import {Login, Register } from "./Pages"
import PrivateRoute from "./Pages/Auth/PrivateRoute"
import { RecoilRoot } from 'recoil'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
      <Routes>
        <Route path={'/register'} element={<Register/>}/>
        <Route path={'/login' } element={<Login/>}/>
        <Route element={<PrivateRoute/>}>
          <Route path={'*'} element={<App/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
    
    
)
