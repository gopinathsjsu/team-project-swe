import React from 'react'
import Button from '@mui/material/Button';
import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

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
        <Link to={{pathname:'/'}}><img alt='imdblogo' className='h-[40px]  ml-[40px]' src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/1150px-IMDB_Logo_2016.svg.png"/></Link>
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
