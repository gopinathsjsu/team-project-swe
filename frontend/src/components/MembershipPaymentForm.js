import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as validator from 'validator';

import AuthService from '../services/auth/auth.service';
import MembershipService from '../services/MembershipService';

const MembershipPaymentForm = () => {
    const navigate = useNavigate();
    const [creditCardError, setCreditCardError] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [formattedCreditCard, setFormattedCreditCard] = useState('');
    const [expirationMonth, setExpirationMonth] = useState('');
    const [expirationYear, setExpirationYear] = useState('');

    const paymentTotal = "15.00";

    const validateCreditCard = (creditCardNumber) => {
        return validator.isCreditCard(creditCardNumber);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { id } = AuthService.getCurrentUser();
        const creditCardNumber = e.target.elements.creditCard.value; 

        if (!validateCreditCard(creditCardNumber)) {
            setCreditCardError('Invalid credit card number');
            return;
        }

        try {
            const currentMembership = await MembershipService.getMembership(id);

            MembershipService.updateMembership(id, {
                expirationDate: currentMembership.expirationDate,
                membershipType: 'PREMIUM_MEMBER',
            });

            setShowPopup(true);

            setTimeout(() => {
                setShowPopup(false);
                navigate('/membershipPage');
            }, 3000); 
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <div>
            <form 
                className="max-w-sm mx-auto mt-8 p-6 bg-white rounded-lg shadow-md"
                onSubmit={handleSubmit}
            >
                <div className="mb-4 text-xl font-bold">You owe ${paymentTotal}</div>

                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                        Name:
                    </label>
                    <input type="text" id="name" name="name" className="mt-1 p-2 border rounded-md w-full" />
                </div>

                <div className="mb-4 relative">
                    <label htmlFor="creditCard" className="block text-sm font-medium text-gray-600">
                        Credit Card Number:
                    </label>
                    <input
                        type="text"
                        id="creditCard"
                        name="creditCard"
                        value={formattedCreditCard}
                        onChange={(e) => {
                            const inputCreditCard = e.target.value.replace(/\D/g, '');
                            setFormattedCreditCard(inputCreditCard);
                            const isValid = validateCreditCard(inputCreditCard);
                            if (!isValid) {
                                setCreditCardError('Invalid credit card number');
                            } else {
                                setCreditCardError(null);
                            }
                        }}
                        className={`mt-1 p-2 border rounded-md w-full ${creditCardError ? 'border-red-500' : ''}`}
                    />
                </div>
                {creditCardError && (
                    <p className="text-red-500 text-sm absolute bottom-0 left-0">{creditCardError}</p>
                )}

                <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-600">
                        Expiration Date:
                </label>
                <div className="flex">
                    <select
                        value={expirationMonth}
                        onChange={(e) => setExpirationMonth(e.target.value)}
                        className="mr-2 p-2 border rounded-md"
                    >
                        <option value="" disabled>Month</option>
                        {Array.from({ length: 12 }, (_, i) => {
                            const month = (i + 1).toString().padStart(2, '0');
                            return <option key={i} value={month}>{month}</option>;
                        })}
                    </select>
                    <select
                        value={expirationYear}
                        onChange={(e) => setExpirationYear(e.target.value)}
                        className="p-2 border rounded-md"
                    >
                        <option value="" disabled>Year</option>
                        {Array.from({ length: 10 }, (_, i) => {
                            const year = (new Date().getFullYear() + i).toString();
                            return <option key={i} value={year}>{year}</option>;
                        })}
                    </select>
                </div>

                <div className="mb-6">
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-600">
                        CVV:
                    </label>
                    <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        maxLength="3"
                        onChange={(e) => {
                            const inputCVV = e.target.value.replace(/\D/g, '');
                            // Use inputCVV here or remove the declaration if not needed
                        }}
                        className="mt-1 p-2 border rounded-md w-full"
                    />

                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                >
                    Submit Payment
                </button>
            </form>

            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                    <div className="bg-white p-8 rounded-md shadow-md">
                        <p className="text-lg font-semibold mb-4">Payment Submitted Successfully!</p>
                        <p>Your membership has been updated.</p>
                    </div>
                </div>
            )}
        </div>

    );
};

export default MembershipPaymentForm;
