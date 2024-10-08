import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import "./index.css"
import {Route, Routes} from "react-router-dom"
import Add from "./pages/Add/Add.jsx";
import List from "./pages/List/List.jsx"
import Order from "./pages/Orders/Orders.jsx"
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const url = "https://foodi-8jfb.onrender.com";
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path='/add' element={<Add url={url}/>}></Route>
          <Route path='/list' element={<List url={url}/>}></Route>
          <Route path='/orders' element={<Order url={url}/>}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
