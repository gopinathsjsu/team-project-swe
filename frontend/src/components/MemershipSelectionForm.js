import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

function MembershipSelection() {
  const navigate = useNavigate();
  const [selectedMembership, setSelectedMembership] = useState('REGULAR_MEMBER');

  const handlePremiumMembershipClick = () => {
    setSelectedMembership('PREMIUM_MEMBER');
    navigate('/paymentPage', { state: { editMembership: true } } );
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="bg-white shadow-md rounded px-8 pt-6  pb-8 mb-4" id="MembershipSelectionForm">
      <h1 className="text-2xl text-center mb-6"> Premium Membership Payment Page</h1>
      <p> Upgrade membership:</p>

      <div className="mb-4 block text-gray-700 text-sm font-bold mb-2">
        <input
          type="radio"
          id="premium"
          name="premiummembership"
          value="premium"
          checked={selectedMembership === 'premium'}
          onChange={() => setSelectedMembership('premium')}
        />
        <label htmlFor="premium">Premium Member (Annual Fee: $15)</label>
    
          <div>
            <p>Benefits:</p>
            <ul>
              <li>Online service fee waived for any booking</li>
              <li>Accumulate rewards points (1 point per dollar)</li>
              <li>Cancel previous tickets before showtime and request refund</li>
            </ul>
          </div>
       
        {selectedMembership === 'premium' && (
              <div className="mb-6 text-center">
              <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
               type="submit" onClick={handlePremiumMembershipClick} color="warning" value="PremiumMemberpayment">
                  Pay $15 </Button>
              </div>
            
        ) } 
      </div>
      </form>
    </div>
  );
}

export default MembershipSelection;
