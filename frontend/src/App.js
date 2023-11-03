import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Payment from './pages/Payment';
import PaymentResult from './pages/PaymentResult'


const App = () => {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/" exact element={<Payment />} />
        <Route path="/" exact element={<PaymentResult />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
