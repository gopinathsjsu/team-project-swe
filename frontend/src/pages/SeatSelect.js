import React from "react";
import SeatSelection from "../components/SeatSelection";

const SeatSelect = () => {
  return (
    <>
      <div>Please select at max 8 seats</div>
      <div>
        <SeatSelection />
      </div>
    </>
  );
};

export default SeatSelect;
