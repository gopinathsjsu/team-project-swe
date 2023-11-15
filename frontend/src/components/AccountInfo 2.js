import React from 'react'
import Button from '@mui/material/Button';
const AccountInfo = () => {
  return (
    <div className='flex justify-between mx-10  mt-10 items-center'>
      <div>
        <h1 className='text-2xl'>Hi, Nitya Sunkara</h1>
        <p>nityasunkara002@gmail.com</p>
      </div>
      <div>
      <Button variant="contained">Select Membership</Button>

      </div>
    </div>
  )
}

export default AccountInfo;
