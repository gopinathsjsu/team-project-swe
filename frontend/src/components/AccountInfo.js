import React from 'react'
import Button from '@mui/material/Button';
import AuthService from '../services/auth/auth.service';

const AccountInfo = () => {

  const currentUser = AuthService.getCurrentUser();

  return (
    <div className='flex justify-between mx-10  mt-10 items-center'>
      <div>
        <h3 className='text-2xl'>Hi, {currentUser.firstName} {currentUser.lastName}!</h3>
        <p>{currentUser.email}</p>
        <p>Your role is currently: {currentUser.role}</p>
        <p>
          <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      </div>
      <div>
      <Button variant="contained">Select Membership</Button>

      </div>
    </div>
  )
}

export default AccountInfo;
