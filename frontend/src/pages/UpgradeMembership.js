import React, { useState } from "react";

const UpgradeMembership = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const processPayment = () => {
    // Here, you would typically make a secure request to your server
    // to handle the payment processing using a payment gateway.
    // This example only shows a simple front-end interaction.

    // Assuming a successful payment, set paymentSuccess to true.
    setPaymentSuccess(true);
  };

  return (
    <div>
      {!paymentSuccess ? (
        <div id="payment-form">
          <h1>Upgrade Membership - $15</h1>
          {/* Card Information */}
          <div
            style={{
              marginBottom: "15px",
              textAlign: "center",
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "5px",
            }}
          >
            <div
              style={{
                marginBottom: "15px",
                textAlign: "center",
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "5px",
              }}
            >
              <label htmlFor="cardNumber" placeholder="1234 5678 9012 3456">
                Card Number:
              </label>
              <br />
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                style={{
                  width: "300px",
                  padding: "8px",
                  borderRadius: "4px",
                  marginTop: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>

            <div
              style={{
                marginBottom: "15px",
                textAlign: "center",
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "5px",
              }}
            >
              <label htmlFor="fullName">Full Name:</label>
              <br />
              <input
                type="text"
                id="fullName"
                name="fullName"
                style={{
                  width: "300px",
                  padding: "8px",
                  borderRadius: "4px",
                  marginTop: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>

            <div
              style={{
                marginBottom: "15px",
                textAlign: "center",
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "5px",
              }}
            >
              <label htmlFor="expirationDate">Expiration Date:</label>
              <br />
              <input
                type="text"
                id="expirationDate"
                name="expirationDate"
                placeholder="MM/YYYY"
                style={{
                  width: "100px",
                  padding: "8px",
                  borderRadius: "4px",
                  marginTop: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>

            <div
              style={{
                marginBottom: "15px",
                textAlign: "center",
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "5px",
              }}
            >
              <label htmlFor="cvv">CVV:</label>
              <br />
              <input
                type="text"
                id="cvv"
                name="cvv"
                style={{
                  width: "80px",
                  padding: "8px",
                  borderRadius: "4px",
                  marginTop: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>

            <div
              style={{
                marginBottom: "15px",
                textAlign: "center",
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "5px",
              }}
            >
              <label htmlFor="zipCode">ZIP Code:</label>
              <br />
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                style={{
                  width: "120px",
                  padding: "8px",
                  borderRadius: "4px",
                  marginTop: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
          </div>

          <button
            style={{
              marginTop: "20px",
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "10px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={processPayment}
          >
            Pay
          </button>

          <button onClick={processPayment}>Upgrade Now</button>
        </div>
      ) : (
        <div id="success-page">
          <h1>Payment Successful!</h1>
          <p>Thank you for upgrading your membership.</p>
        </div>
      )}
    </div>
  );
};

export default UpgradeMembership;
