import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as validator from 'validator';
import { Button, Input } from '@mui/material';

import AuthService from '../services/auth/auth.service';
import TicketService from '../services/TicketService';

const TicketPaymentForm = ({ tickets, rewardPoints, onSpendRewardPoints, onUpdatePaymentTotal, paymentTotal }) => {
    const navigate = useNavigate();

    const [creditCardError, setCreditCardError] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [formattedCreditCard, setFormattedCreditCard] = useState('');
    const [expirationMonth, setExpirationMonth] = useState('');
    const [expirationYear, setExpirationYear] = useState('');
    const [useRewardPoints, setUseRewardPoints] = useState(false); // do we want to use reward points?
    const [pointsToUse, setPointsToUse] = useState(0); // how many points do we want to use?
    const [newTotalValue, setNewTotalValue] = useState(paymentTotal); // price after applying points


    const [updatePoints, setUpdateRewardPoints] = useState(0); // this is for updating the points after payment

    const validateCreditCard = (creditCardNumber) => {
        return validator.isCreditCard(creditCardNumber);
    };

    const handleCalculateUpdatePoints = () => {
        // based on the ticket price -- round down to number of points to add for user
        // setUpdateRewardPoints(pointsToAdd);
    }

    const handleSubmitTicketPayment = async (e) => {
        e.preventDefault();

        const { id } = AuthService.getCurrentUser();
        const creditCardNumber = e.target.elements.creditCard.value;

        if (!validateCreditCard(creditCardNumber) && !useRewardPoints) {
            setCreditCardError('Invalid credit card number');
            return;
        }

        try {
            setShowPopup(true);

            setTimeout(() => {
                setShowPopup(false);
                navigate('/membershipPage');
            }, 3000);
        } catch (e) {
            console.log(e.message);
        }
    };

    const handlePointsChange = (e) => {
        const parsedPoints = parseInt(e.target.value) || 0;
        setPointsToUse(parsedPoints);
    };

    const handleUpdatePaymentTotal = () => {
        onUpdatePaymentTotal((parseFloat(paymentTotal) - pointsToUse).toFixed(2));
        onSpendRewardPoints(pointsToUse);
    }

    return (
        <div>
            <form
                className="max-w-sm mx-auto mt-8 p-6 bg-white rounded-lg shadow-md"
                onSubmit={handleSubmitTicketPayment}
            >
                {/* Total Summary */}
                <div style={{ marginBottom: '20px', textAlign: 'left' }}>
                    {/* <p>Tickets (2 tickets) = ${paymentTotal} x 2 = ${paymentTotal * 2}</p> */}
                    <p>Total = ${paymentTotal}</p>
                    <p>New Total = ${newTotalValue}</p>
                </div>
                <div style={{ marginBottom: '15px', float: 'right', textAlign: 'right' }}>
                    <p>Your available Reward Points: {rewardPoints || 0} </p>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <label htmlFor='pointsToUse'>Points to Use:</label>
                        <Input
                            type="number"
                            name="pointsToUse"
                            value={pointsToUse}
                            onChange={handlePointsChange}
                            style={{ outline: 'border', margin: '10%' }}
                        />
                        <Button
                            id="useRewardPoints"
                            name="useRewardPoints"
                            onClick={handleUpdatePaymentTotal}
                            className="mt-1 p-2 border rounded-md"
                        >Use {pointsToUse} points </Button>
                    </div>

                </div>
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
                        <p>You'll now be redirected to the member page where you can view your tickets.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TicketPaymentForm;
