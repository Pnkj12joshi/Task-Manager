import React from 'react'
import { Routes, Route } from "react-router-dom"; 
import Login from './component/Login';
import Dashboard from './component/Dashboard';
import Auth from './component/middleware/Auth';
import Tasklist from './component/Tasklist';
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path = "/dashboard" element= {
          <Auth>
            <Dashboard/>
          </Auth>
           }/>
           <Route path='/tasklist' element= { 
            <Auth>
              <Tasklist/>
            </Auth>
           }/>
      </Routes>
    </div>
  );
}

export default App
