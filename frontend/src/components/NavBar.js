import React from 'react'
import Button from '@mui/material/Button';
import { Outlet, useNavigate } from 'react-router-dom';
const NavBar = () => {
    const navigate = useNavigate();
  return (
    <div className='bg-[#151515] flex justify-between py-[10px] '>
        <img className='h-[50px] ml-[40px]' src="https://assets.stickpng.com/images/613f661716381700041030fc.png"/>
        <div className='flex gap-[40px] mr-[40px] '>
            <Button color="warning">Register</Button>
            <Button color="warning">Login</Button>
        </div>
        <Outlet/>
    </div>
   
  )
}

export default NavBar