import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Payment from './pages/payment';
import PaymentResult from './pages/PaymentResult'
import MemberDashboard from './pages/MemberDashboard';
import Register from './pages/Register';
import Login from './pages/Login';

import MemberSelection from './pages/MemberSelection';
import MovieBooking from './pages/MovieBooking';
import MovieSchedule from './components/schedule/MovieSchedule';
import NewReleasesPage from './pages/NewReleasesPage';
import UpcomingMoviesPage from './pages/UpcomingMoviesPage';
const App = () => {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/payment" exact element={<Payment />} />
        <Route path="/payment/result" exact element={<PaymentResult />} />
        <Route path="/member" exact element={<MemberDashboard/>}/>
        <Route path="/register" exact element={<Register/>}/>
        <Route path="/login" exact element={<Login/>}/>
        <Route path="/memberSelection" exact element={<MemberSelection/>}/>
        <Route path='/movie/:id' exact element={<MovieBooking/>}/>
        <Route path="/schedule" exact element={<MovieSchedule/>} />
        <Route path='/newreleases' exact element={<NewReleasesPage/>}/>
        <Route path='/upcomingmovies' exact element={<UpcomingMoviesPage/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
