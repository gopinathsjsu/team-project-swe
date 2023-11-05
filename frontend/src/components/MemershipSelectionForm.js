import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';

function MembershipSelection() {
  const history = useHistory();

  const handlePremiumMembershipClick = () => {
    history.push('/payment');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
        <form className="bg-white shadow-md rounded px-8 pt-6  pb-8 mb-4" id="MembershipSelectionForm">
      <h1 className="text-2xl text-center mb-6">Membership Selection</h1>
      <p>Choose your membership type:</p>

      <div className="mb-4 block text-gray-700 text-sm font-bold mb-2">
        <input className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="radio" id="regular" name="RegulaMembership" value="regular" />
        <label htmlFor="regular">Regular Member</label>
        <ul>
          <li>Accumulate rewards points (1 point per dollar)</li>
        </ul>
      </div>

      <div>
        <input className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="radio" id="premium" name="PremiumMembership" value="premium" />
        <label htmlFor="premium">Premium Member</label>
        <ul>
          <li>Accumulate rewards points (1 point per dollar)</li>
          <li>Online service fee waived for any booking</li>
        </ul>
      </div>
        <div className="mb-6 text-center">
        <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
         type="submit" onClick={handlePremiumMembershipClick} color="warning" value="PremiumMemberpayment">
            Pay $15 </Button>
            {/* <button onClick={handlePremiumMembershipClick}>Select Premium Membership</button> */}
        </div>
      {/* <div>
        <h2>Membership Benefits</h2>
        <p>Regular Member:</p>
        <ul>
          <li>Accumulate rewards points (1 point per dollar)</li>
        </ul>
      </div>

      <div>
        <h2>Premium Member (Annual Fee: $15)</h2>
        <p>Benefits:</p>
        <ul>
          <li>Accumulate rewards points (1 point per dollar)</li>
          <li>Online service fee waived for any booking</li>
        </ul>
      </div> */}
      </form>
    </div>
  );
}

export default MembershipSelection;
