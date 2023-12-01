import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import AuthService from '../services/auth/auth.service';
import MembershipService from '../services/MembershipService';

const MembershipPaymentForm = () => {
    const navigate = useNavigate();

    const paymentTotal = 2; // temp variable


    const handleSubmit = (e) => {   
        e.preventDefault();
        console.log('Payment submitted');

        const { userId } = AuthService.getCurrentUser();

        try {
            const currentMembership = MembershipService.getMembership(userId);
            
            MembershipService.updateMembership(userId, {
                expirationDate: currentMembership.expirationDate,
                membershipType: 'PREMIUM_MEMBER'
            });

            console.log("Membership updated");
            navigate('/member');

        } catch (e) {
            console.log(e.message);
        }

    }

    return (
        <form className="max-w-sm mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <div className="mb-4 text-xl font-bold">You owe ${paymentTotal}</div>

            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name:</label>
                <input type="text" id="name" name="name" className="mt-1 p-2 border rounded-md w-full" />
            </div>

            <div className="mb-4">
                <label htmlFor="creditCard" className="block text-sm font-medium text-gray-600">Credit Card Number:</label>
                <input type="text" id="creditCard" name="creditCard" className="mt-1 p-2 border rounded-md w-full" />
            </div>

            <div className="mb-4">
                <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-600">Expiration Date:</label>
                <input type="text" id="expirationDate" name="expirationDate" className="mt-1 p-2 border rounded-md w-full" />
            </div>

            <div className="mb-6">
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-600">CVV:</label>
                <input type="text" id="cvv" name="cvv" className="mt-1 p-2 border rounded-md w-full" />
            </div>

            <button 
                type="submit" 
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                onSubmit={handleSubmit}
            >
                Submit Payment
            </button>
        </form>
    );
}

export default MembershipPaymentForm;
