import React from 'react';
import { useLocation } from 'react-router-dom';
import MembershipPaymentForm from '../components/MembershipPaymentForm';
import TicketPaymentForm from '../components/TicketPaymentForm';


const Payment = () => {
    const location = useLocation();
    
    const editMembership = location.state?.editMembership;
    const purchaseTicket = location.state?.purchaseTicket; // will be sent from seat selection pg

    if (editMembership) {
        return (
            <div>
                <MembershipPaymentForm key={Date.now()}/>
            </div>
        )
    } else if (purchaseTicket) {
        return (
            <div>
                <TicketPaymentForm key={Date.now()}/>
            </div>
        )
    }

}

export default Payment;
