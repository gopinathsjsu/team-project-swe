import React from 'react';
import { useLocation } from 'react-router-dom';
import MembershipPaymentForm from '../components/MembershipPaymentForm';
import TicketPaymentForm from '../components/TicketPaymentForm';

const PaymentPage = () => {
    const location = useLocation();
    
    const editMembership = location.state?.editMembership;
    const purchaseTicket = location.state?.purchaseTicket; // will be sent from seat selection pg

    const handlePayment = () => {
        console.log('Processing payment...');
    };

    if (editMembership) {
        return (
            <div>
                <MembershipPaymentForm key={Date.now()} />
                <button onClick={handlePayment}>Pay</button>
            </div>
        );
    } else if (purchaseTicket) {
        return (
            <div>
                <TicketPaymentForm key={Date.now()} />
                <button onClick={handlePayment}>Pay</button>
            </div>
        );
    }

    return null;
};

export default PaymentPage;
