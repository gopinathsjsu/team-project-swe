import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MemberDashboard from './pages/MemberDashboard';

const App = () => {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/member" exact Component={MemberDashboard}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
