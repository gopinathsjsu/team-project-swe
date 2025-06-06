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
    const [rewardPoints, setRewardPoints] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const [pointsToUse, setPointsToUse] = useState(0);
    const [paymentTotal, setPaymentTotal] = useState("0.00");
    const [newTotal, setNewTotal] = useState("0.00");

    const { id } = AuthService.getCurrentUser();
    const editMembership = location.state?.editMembership;
    const purchaseTicket = location.state?.purchaseTicket;

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

                const ticketRes = await api.get(`api/tickets/getTicket`);
                setUserInfo(ticketRes.data);

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

    useEffect(() => {
        // Update newTotal whenever pointsToUse or paymentTotal changes
        const newTotalValue = (parseFloat(paymentTotal) - pointsToUse).toFixed(2);
        setNewTotal(newTotalValue);
    }, [pointsToUse, paymentTotal]);

    const handlePayment = () => {
        console.log('Processing payment...');
        // Add logic to handle payment
    };

    const handleUseRewardPoints = () => {
        const usePoints = prompt("How many points would you like to use?");
        const parsedPoints = parseInt(usePoints, 10) || 0;
        setPointsToUse(parsedPoints);
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h2>Pay Here!</h2>

            {/* Reward Points Section */}
            <div style={{ marginBottom: '15px', float: 'right', textAlign: 'right' }}>
                <p>Reward Points: {rewardPoints || 0}</p>
                <button
                    style={{ backgroundColor: '#4285f4', color: 'white', padding: '8px', borderRadius: '4px', cursor: 'pointer' }}
                    onClick={handleUseRewardPoints}
                >
                    Use Reward Points
                </button>
            </div>

            {/* Total Summary */}
            <div style={{ marginBottom: '20px', textAlign: 'left' }}>
                <p>Tickets (2 tickets) = ${paymentTotal} x 2 = ${paymentTotal * 2}</p>
                <p>Total = ${paymentTotal}</p>
                <p>Points to Use = {pointsToUse}</p>
                <p>New Total = ${newTotal}</p>
            </div>

            {/* Payment Forms */}
            {editMembership && (
                <MembershipPaymentForm key={Date.now()} userInfo={userInfo} rewardPoints={rewardPoints} />
            )}
            {purchaseTicket && (
                <TicketPaymentForm key={Date.now()} ticketId={purchaseTicket} rewardPoints={rewardPoints} />
            )}

            {/* Card Information */}
            <div style={{ marginBottom: '15px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '4px', padding: '5px' }}>
                <div style={{ marginBottom: '15px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '4px', padding: '5px' }}>
                    <label htmlFor="cardNumber">Card Number:</label>
                    <br />
                    <input type="text" id="cardNumber" name="cardNumber" style={{ width: '300px', padding: '8px', borderRadius: '4px', marginTop: '5px', border: '1px solid #ccc' }} />
                </div>

                <div style={{ marginBottom: '15px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '4px', padding: '5px' }}>
                    <label htmlFor="fullName">Full Name:</label>
                    <br />
                    <input type="text" id="fullName" name="fullName" style={{ width: '300px', padding: '8px', borderRadius: '4px', marginTop: '5px', border: '1px solid #ccc' }} />
                </div>

                <div style={{ marginBottom: '15px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '4px', padding: '5px' }}>
                    <label htmlFor="expirationDate">Expiration Date:</label>
                    <br />
                    <input type="text" id="expirationDate" name="expirationDate" placeholder="MM/YYYY" style={{ width: '100px', padding: '8px', borderRadius: '4px', marginTop: '5px', border: '1px solid #ccc' }} />
                </div>

                <div style={{ marginBottom: '15px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '4px', padding: '5px' }}>
                    <label htmlFor="cvv">CVV:</label>
                    <br />
                    <input type="text" id="cvv" name="cvv" style={{ width: '80px', padding: '8px', borderRadius: '4px', marginTop: '5px', border: '1px solid #ccc' }} />
                </div>

                <div style={{ marginBottom: '15px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '4px', padding: '5px' }}>
                    <label htmlFor="zipCode">ZIP Code:</label>
                    <br />
                    <input type="text" id="zipCode" name="zipCode" style={{ width: '120px', padding: '8px', borderRadius: '4px', marginTop: '5px', border: '1px solid #ccc' }} />
                </div>
            </div>

            <button style={{ marginTop: '20px', backgroundColor: '#4CAF50', color: 'white', padding: '10px', borderRadius: '4px', cursor: 'pointer' }} onClick={handlePayment}>
                Pay
            </button>
        </div>
    );
};

export default PaymentPage;

