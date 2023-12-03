import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import MovieSchedule from "./components/schedule/MovieSchedule";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MemberDashboard from "./pages/MemberDashboard";
import MemberSelection from "./pages/MemberSelection";
import MovieBooking from "./pages/MovieBooking";
import NewReleasesPage from "./pages/NewReleasesPage";
import Payment from "./pages/PaymentPage";
import PaymentResult from "./pages/PaymentResult";
import Register from "./pages/Register";
import SeatSelect from "./pages/SeatSelect";
import MembershipPage from "./pages/MembershipPage"

import TicketInformation from "./pages/TicketInformation";
import UpcomingMoviesPage from "./pages/UpcomingMoviesPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import MovieSelection from "./pages/movieSelection";
import AuthService from "./services/auth/auth.service";
const App = () => {
  const currentUser = AuthService.getCurrentUser();
  const isAdmin = currentUser && currentUser.role === "ROLE_ADMIN";

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/payment" exact element={<Payment />} />
        {/* isAdmin is false by default */}
        <Route path="/login" exact element={<Login />} />
        <Route path="/payment/result" exact element={<PaymentResult />} />
        <Route path="/member" exact element={<MemberDashboard />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/memberSelection" exact element={<MemberSelection />} />
        <Route path="/movie/:id" exact element={<MovieBooking />} />
        <Route path="/schedule" exact element={<MovieSchedule />} />
        <Route path="/login" exact element={<Login isAdmin={false}/>}/> 
        <Route path="/memberSelection" exact element={<MemberSelection/>}/>
        <Route path='/movie/:type/:id' exact element={<MovieBooking/>}/>
        <Route path="/schedule" exact element={<MovieSchedule/>} />
        <Route path="/admin" exact element={<AdminDashboard />} />
        <Route path="/newreleases" exact element={<NewReleasesPage />} />
        <Route path="/upcomingmovies" exact element={<UpcomingMoviesPage />} />
        <Route path="/seatselect" exact element={<SeatSelect />} />
        <Route path="/membershipPage" exact element={<MembershipPage />} />
        <Route path="/TicketInfo" exact element={<TicketInformation />} />
        <Route path="/movieSelection" exact element={<MovieSelection />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
