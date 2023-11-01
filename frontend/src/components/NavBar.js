import React from 'react'
import Button from '@mui/material/Button';
import { Outlet } from 'react-router-dom';
const NavBar = () => {
  return (
    <div className='bg-[#151515] flex justify-between py-[10px] '>
        <img alt='imdblogo' className='h-[40px]  ml-[40px]' src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/1150px-IMDB_Logo_2016.svg.png"/>
        <div className='flex gap-[40px] mr-[40px] '>
            <Button color="warning">Register</Button>
            <Button color="warning">Login</Button>
        </div>
        <Outlet/>
    </div>
   
  )
}

export default NavBar;
