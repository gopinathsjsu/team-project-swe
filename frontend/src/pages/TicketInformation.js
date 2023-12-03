import React from "react";
import TicketInfo from "../components/TicketInfo";

const TicketInformation = () => {
  return (
    <>
      <div>
        <h2>Your ticket has been booked</h2>
      </div>
      <div>
        <TicketInfo />
      </div>
    </>
  );
};

export default TicketInformation;
