// AccountInfo.js
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const AccountInfo = () => {
  const [showCancelTicketPopup, setShowCancelTicketPopup] = useState(false);
  const [showTicketCanceledPopup, setShowTicketCanceledPopup] = useState(false);

  const handleShowCancelTicketPopup = () => {
    setShowCancelTicketPopup(true);
  };

  const handleCloseCancelTicketPopup = () => {
    setShowCancelTicketPopup(false);
  };

  const handleCancelTicket = async () => {
    try {
      console.log('Canceling ticket...');

      const serverEndpoint = 'http://localhost:3001/api/tickets'; // Update the server URL
      const ticketId = 123; // Replace with the actual ticket ID

      await fetch(`${serverEndpoint}/${ticketId}`, {
        method: 'DELETE',
      });

      console.log('Ticket canceled successfully!');
      setShowCancelTicketPopup(false); // Close the cancel ticket popup
      setShowTicketCanceledPopup(true); // Show the ticket canceled popup
    } catch (error) {
      console.error('Error canceling ticket:', error);
    }
  };

  const handleCloseTicketCanceledPopup = () => {
    setShowTicketCanceledPopup(false); 
  };

  //ADD IN ACTUAL USER ONCE IT IS FULLY DONE
  let currentUser = "JohnDoe";

  return (
    <div className='flex justify-between mx-10 mt-10 items-center'>
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
        <Button
          variant="contained"
          onClick={handleShowCancelTicketPopup}
          style={{ marginLeft: '10px' }}
        >
          Cancel Ticket
        </Button>
        <Button
          variant="contained"
          component={Link}
          to="/my-tickets"
          style={{ marginLeft: '10px' }}
        >
          My Tickets
        </Button>
      </div>

      {showCancelTicketPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Cancel Ticket</h2>
            <p>Are you sure you want to cancel the ticket?</p>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCancelTicket}
            >
              Confirm Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleCloseCancelTicketPopup}
            >
              Close
            </Button>
          </div>
        </div>
      )}

      {showTicketCanceledPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Ticket Canceled</h2>
            <p>Your ticket has been successfully canceled.</p>
            <Button
              variant="contained"
              onClick={handleCloseTicketCanceledPopup}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountInfo;