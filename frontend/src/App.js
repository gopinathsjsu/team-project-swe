import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Reg from './pages/Reg';
const App = () => {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} /> 
        <Route path="/reg" exact element={<Reg />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
