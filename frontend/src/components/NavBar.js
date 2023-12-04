import React from 'react'
import Button from '@mui/material/Button';
import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"
const NavBar = ({ isAdmin }) => {
  const navigate = useNavigate();
  const handleRegister = () =>{
    navigate("/register")
  }
  const handleLogin = () =>{
    navigate("/login")
  }
  return (
    <div className='bg-[#151515] flex justify-between py-[10px] sticky top-0'>
      <div className='text-[#E9DCC9] flex items-center gap-[5px] font-extrabold text-[26px] italic  bg-[#151515]'>
        <Link to={{pathname:'/'}}><img alt='imdblogo' className='h-[40px]  ml-[40px]' src={logo}/></Link>
      <h3>Book My Movie</h3>
        </div>
        <div className='flex gap-[40px] mr-[40px] '>
            <Button onClick={handleRegister} color="warning">Register</Button>
            <Button onClick={handleLogin} color="warning">Login</Button>
            {isAdmin && (
              <Button component={Link} to="/admin" color="warning">Admin Dashboard</Button>
            )}
        </div>
        <Outlet/>
    </div>
   
  )
}

export default NavBar;
