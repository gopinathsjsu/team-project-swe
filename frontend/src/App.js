import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MemberDashboard from './pages/MemberDashboard';
import Register from './pages/Register';
import Login from './pages/Login';
const App = () => {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/member" exact element={<MemberDashboard/>}/>
        <Route path="/register" exact element={<Register/>}/>
        <Route path="/login" exact element={<Login/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
