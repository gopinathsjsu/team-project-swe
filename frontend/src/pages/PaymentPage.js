import React from 'react';
import { useLocation } from 'react-router-dom';
import MembershipPaymentForm from '../components/MembershipPaymentForm';


const Payment = () => {
    const location = useLocation();
    
    const editMembership = location.state?.editMembership;

    if (editMembership) {
        return (
            <div>
                <MembershipPaymentForm />
            </div>
        )
    }

}

export default Payment;
