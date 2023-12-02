import Button from "@mui/material/Button";
import React, { useEffect, useReducer, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import MembershipService from "../services/MembershipService";
import AuthService from "../services/auth/auth.service";

const initialState = {
  currentUser: AuthService.getCurrentUser(),
  membership: {},
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_MEMBERSHIP":
      return { ...state, membership: action.payload, error: null };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const AccountInfo = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showCancelTicketPopup, setShowCancelTicketPopup] = useState(false);
  const [showTicketCanceledPopup, setshowTicketCanceledPopup] = useState(false);

  useEffect(() => {
    const fetchMembership = async () => {
      try {
        const membershipData = await MembershipService.getMembership(
          state.currentUser?.id
        );
        dispatch({ type: "SET_MEMBERSHIP", payload: membershipData });
      } catch (error) {
        console.error(error);
        dispatch({ type: "SET_ERROR", payload: error.message });
      }
    };

    if (!state.currentUser) {
      navigate("/login");
    } else {
      fetchMembership();
    }
  }, [state.currentUser, navigate]);

  const handleSelectMembership = () => {
    navigate("/memberSelection");
  };
  const handleMemberTicketBooking = () => {
    navigate("/movieSelection");
  };

  const handleCancelTicket = () => {
    setShowCancelTicketPopup(true);
  };

  const handleCloseCanceledTicketPopup = () => {
    setshowTicketCanceledPopup(true);
  };

  return (
    <div className="flex justify-between mx-10 mt-10 items-center">
      <div>
        <h3 className="text-2xl">
          Hi, {state.currentUser?.firstName} {state.currentUser?.lastName}!
        </h3>
        <p>{state.currentUser?.email}</p>
        <p>Your role is currently: {state.currentUser?.role}</p>
        <p>
          <strong>Token:</strong>{" "}
          {state.currentUser?.accessToken?.substring(0, 20)} ...{" "}
          {state.currentUser?.accessToken?.substr(
            state.currentUser?.accessToken?.length - 20
          )}
        </p>

        <Link to={{ pathname: "/" }}></Link>

        <Button variant="contained" onClick={handleMemberTicketBooking}>
          Book tickets here
        </Button>

        <Outlet />
      </div>

      <div>
        {state.membership &&
        state.membership.membershipType === "REGULAR_MEMBER" ? (
          <Button variant="contained" onClick={handleSelectMembership}>
            Upgrade Membership
          </Button>
        ) : null}
      </div>

      {showCancelTicketPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Cancel Ticket</h2>
            <p>Are you sure you want to cancel the ticket?</p>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCancelTicket}
            >
              Confirm Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleCloseCanceledTicketPopup}
            >
              Close
            </Button>
          </div>
        </div>
      )}

      {showTicketCanceledPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Ticket Canceled</h2>
            <p>Your ticket has been successfully canceled.</p>
            <Button
              variant="contained"
              onClick={handleCloseCanceledTicketPopup}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountInfo;
