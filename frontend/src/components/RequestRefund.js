import React, { useState } from 'react';
import Button from '@mui/material/Button';

const RequestRefund = () => {
  const [refundReason, setRefundReason] = useState('');

  const handleRequestRefund = () => {
    // Add in dummy logic for requesting a refund
    alert('Refund requested successfully with reason: ' + refundReason);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
        <h2 className="text-2xl text-center mb-6">Request Refund</h2>
        <label htmlFor="refundReason">Reason for Refund:</label>
        <input
          type="text"
          id="refundReason"
          name="refundReason"
          value={refundReason}
          onChange={(e) => setRefundReason(e.target.value)}
        />
        <br />
        <Button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleRequestRefund}
        >
          Request Refund
        </Button>
      </div>
    </div>
  );
};

export default RequestRefund;
