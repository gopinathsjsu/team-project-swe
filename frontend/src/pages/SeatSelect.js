// import { default as React, useEffect, useReducer, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import OneSeatSelection from "../components/OneSeatSelection";
// import SeatSelection from "../components/SeatSelection";
// import AuthService from "../services/auth/auth.service";

// const initialState = {
//   currentUser: AuthService.getCurrentUser(),
//   membership: {},
//   error: null,
// };

// const SeatSelect = () => {
//   const navigate = useNavigate();
//   const [state] = useReducer(initialState);

//   // useEffect(() => {
//   //   if (!state.currentUser) {
//   //     navigate("/oneSeatSelect");
//   //   } else {
//   //     navigate("/SeatSelect");
//   //   }
//   // }, [navigate]);

//   return (
//     <>
//       <div>Please select at max 8 seats if you are a registered user</div>
//       <div>Non - Registered users can only book 1 seat</div>
//       {/* <p>{state.currentUser?.email}</p> */}
//       <div>{state.membership ? <SeatSelection /> : <OneSeatSelection />}</div>
//       {/* <div>{isUserRegistered ? <SeatSelection /> : <OneSeatSelection />}</div> */}
//     </>
//   );
// };

// export default SeatSelect;

import React from "react";
import SeatSelection from "../components/SeatSelection";

const SeatSelect = () => {
  return (
    <>
      <div>
        <br></br>
        <h2 className=" bold text-center ">You can select at max 8 seats</h2>
        <br></br>
      </div>
      <div></div>

      <div>
        <SeatSelection />
      </div>

      <div>
        <br></br> <br></br>
        <h1 className=" text-center ">Screen this way</h1>
      </div>
    </>
  );
};

export default SeatSelect;
