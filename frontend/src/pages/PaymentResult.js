import React from 'react';
import { useNavigate } from "react-router-dom";

const PaymentResult = () => {
    const navigate = useNavigate();
    return (
        <div className="text-center text-2xl text-green-600">
            Congrats, payment successful, your ticket is now purchased
            < button onClick={()=> navigate("/TicketInfo")}>
            Click here to redirect me to ticket info!
        </button>
        </div>

       
    );
}

export default PaymentResult;

