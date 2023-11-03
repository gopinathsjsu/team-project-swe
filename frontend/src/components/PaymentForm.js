import React from 'react';

const PaymentForm = () => {
    const paymentTotal = 2; //temp variable 

    return (
        <form>
            You owe {paymentTotal}

            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" />

            <label htmlFor="creditCard">Credit Card Number:</label>
            <input type="text" id="creditCard" name="creditCard" />

            <label htmlFor="expirationDate">Expiration Date:</label>
            <input type="text" id="expirationDate" name="expirationDate" />

            <label htmlFor="cvv">CVV:</label>
            <input type="text" id="cvv" name="cvv" />

            <button type="submit">Submit Payment</button>
        </form>
    );
}

export default PaymentForm;
