import React from 'react';
import Button from '@mui/material/Button';

const CancelTicket = () => {
  const handleCancelTicket = () => {
    // Dummy logic for canceling a ticket
    alert('Ticket canceled successfully!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
        <h2 className="text-2xl text-center mb-6">Cancel Ticket</h2>
        <Button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleCancelTicket}
        >
          Cancel Ticket
        </Button>
      </div>
    </div>
  );
};

export default CancelTicket;
