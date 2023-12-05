import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MembershipPaymentForm from '../components/MembershipPaymentForm';
import TicketPaymentForm from '../components/TicketPaymentForm';
import AuthService from '../services/auth/auth.service';
import api from '../services/backend-api/api';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState([]);
  const [ticketInfo, setTicketInfo] = useState([]);
  const [rewardPoints, setRewardPoints] = useState(0);
  const [loading, setLoading] = useState(false);

  const [paymentTotal, setPaymentTotal] = useState("0.00");
  const [newTotal, setNewTotal] = useState("0.00");

  const { id } = AuthService.getCurrentUser();


  // TODO: grab ticket info that was passed from seat selection page 
  const purchaseTicket = location.state?.purchaseTicket; // first item done for you, tells payment page to render the TicketPaymentForm
  setTicketInfo(location.state?.tickets); // getting the tickets from the seat selection page
  
  const editMembership = location.state?.editMembership; // tells MembershipPaymentForm to render

  useEffect(() => {
    if (!id) {
      navigate('/login', { replace: true });
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const userRes = await api.get(`api/users/getUser?id=${id}`);
        setUserInfo(userRes.data);

        const rewardPointsRes = await api.get(`api/users/${id}/getRewardPoints`);
        setRewardPoints(rewardPointsRes.data);

        // const setPointsRes = await api.get(`api/users/${id}/incrementRewardPoints?rewardPoints=${updatePoints}`);
        // setUpdateRewardPoints(setPointsRes.data);


        // TODO: remove this req
        // bc we are getting the list of ticket objects from seat select
        // const ticketRes = await api.get(`api/tickets/getTicket?ticketId=5`); // already got ticketId from parent
        // setTicketInfo(ticketRes.data);

        // Assuming `paymentTotal` is coming from your ticket information
        setPaymentTotal(ticketRes.data.price.toString());
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  // TODO: fix this
  const handlePayment = () => {
    console.log('Processing payment...');
    // Add logic to handle payment
    navigate('/membershipPage', { replace: true });
  };

  const handleUpdatePaymentTotal = (newTotal) => {
    console.log('Updating payment total...');
    setPaymentTotal(newTotal);
  };

  const handleSpendRewardPoints = (pointsSpent) => {
    console.log('Spending reward points...');
    setRewardPoints(rewardPoints - pointsSpent);
  }

  // const handleUseRewardPoints = () => {
  //     let usePoints =  prompt("How many points would you like to use?");
  //     while (usePoints > rewardPoints) {  
  //         usePoints =  prompt("How many points would you like to use?");
  //     }
  //     const parsedPoints = parseInt(usePoints, 10) || 0;
  //     setPointsToUse(parsedPoints); 
  // };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Pay Here!</h2>

      <div className="mb-4 text-xl font-bold">You owe ${paymentTotal}</div>

     

      {/* Payment Forms */}
      {editMembership && <MembershipPaymentForm key={Date.now()} userInfo={userInfo} rewardPoints={rewardPoints} />}
      {purchaseTicket && <TicketPaymentForm 
        key={Date.now()} 
        tickets={ticketInfo} 
        rewardPoints={rewardPoints} 
        onSpendRewardPoints={handleSpendRewardPoints}
        onUpdatePaymentTotal={handleUpdatePaymentTotal}   
        paymentTotal={paymentTotal}  
    />}

      
    </div>
  );
};

export default PaymentPage;
