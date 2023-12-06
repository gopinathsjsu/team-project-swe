import React, { useState, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import TicketInfoPage from '../components/TicketInfo';
import AuthService from '../services/auth/auth.service';
import api from '../services/backend-api/api';

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

const MembershipPage = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  const [membershipInfo, setMembershipInfo] = useState([]);
  const [moviesWatched, setMoviesWatched] = useState([]);
  const [rewardPoints, setRewardPoints] = useState(null);
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tickets, setTicketInfo] = useState([]);
  const [showUpgradePopup, setShowUpgradePopup] = useState(false);


  const id = state.currentUser?.id;

  useEffect(() => {
    console.log("Memebership page mounted");
  }, []);

  useEffect(() => {
    // redirect to login if no id is provided
    if (!id) {
      navigate('/login', { replace: true });
    }

    console.log("USERID" + id);
    const fetchData = async () => {
      setLoading(true);
      const userRes = await api.get(`api/users/getUser?id=${id}`);
      console.log("USER INFO:", userRes.data);
      setUserInfo(userRes.data);
      console.log("Updated userInfo:", userInfo); 
      // setLoading(false);

      // setLoading(true);
      const membershipRes = await api.get(`api/memberships/getMembership/user?userId=${id}`);
      console.log("MEMBERSHIP INFO:", membershipRes.data);
      setMembershipInfo(membershipRes.data);
      // setLoading(false);

      // setLoading(true);
      const ticketRes = await api.get(`api/tickets/user/${id}`);
      console.log("TICKET INFO:", ticketRes.data);
      setTicketInfo(ticketRes.data);
      // setLoading(false);

      // setLoading(true);
      const moviesWatchedRes = await api.get(`api/tickets/watched/${id}`);
      console.log("MOVIES WATCHED - 30 DAYS :", moviesWatchedRes.data);
      setMoviesWatched(moviesWatchedRes.data);
      setLoading(false);

      // setLoading(true);
      const rewardPointsRes = await api.get(`api/users/${id}/getRewardPoints`);
      console.log("REWARD POINT INFO :", rewardPointsRes.data);
      setRewardPoints(rewardPointsRes.data);
      setLoading(false);
    };

    try{
      fetchData();
    } catch (error) {
      console.log(error);
      setLoading(false);  
    } 
 
   
  }, [id]);


  const handleMembershipChange = () => {
    setShowUpgradePopup(true);
  };

  const handleUpgradeConfirm = () => {
      navigate('/paymentPage', { replace: true });
    setShowUpgradePopup(false);
    //alert("Congrats! You are now a Premium Member.");
    
  };

  const handleDowngradeConfirm = () => {
    setShowUpgradePopup(false);
    alert("Thank you. Membership is still valid until the end of the month. You are now a Regular Member");
  };

  const handleCancel = () => {
    setShowUpgradePopup(false);
  };

  return (
    <div className="container mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}
      {!loading && !error && (
        <div>
          <h1 className="text-3xl font-bold mb-4">View Members Page</h1>

          {/* Display Membership Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Membership Information</h2>
            <strong>Name:</strong> {userInfo.firstName} {userInfo.lastName}
            <p>
              <strong>Username:</strong> {userInfo.username}
            </p>
            <p>
              <strong>Date of Birth:</strong> {userInfo.dateOfBirth}
            </p>
            <p>
              <strong>Email:</strong> {userInfo.email}
            </p>
            <p>
              <strong>Phone:</strong> {userInfo.phone ? userInfo.phone : "N/A"}
            </p>
            <p>
              <strong>Membership Type:</strong> {membershipInfo.getMembershipType}
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
                onClick={handleMembershipChange}
              >
                Change Membership
              </button>
            </p>

            {/* Upgrade/Downgrade Popup */}
            {showUpgradePopup && (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
                <div className="bg-white p-6 rounded-md shadow-md">
                  <p>
                    To Upgrade Membership, it will be an additional $15 per month.
                  </p>
                  <p>
                    To Downgrade Membership, membership change will be made at the end of each month, and all purchases will have an added $1.5 service fee.
                  </p>
                  <div className="flex justify-between mt-4">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-md"
                      onClick={handleUpgradeConfirm}
                    >
                      Upgrade Membership
                    </button>
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                      onClick={handleDowngradeConfirm}
                    >
                      Downgrade Membership
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Display Reward Points */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Reward Points</h2>
            <p>
              <strong>Reward Points:</strong> {rewardPoints !== null ? rewardPoints : 'Loading...'}
            </p>
          </div>

          {/* Display Tickets in the Last 30 Days */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Tickets in the Last 30 Days</h2>
            {tickets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tickets.map((ticket) => (
                  <div key={ticket.id} className="bg-white p-4 rounded-md shadow-md">
                    <h3 className="text-xl font-semibold mb-2">Ticket #{ticket.id}</h3>
                    <p className="text-gray-600">Date: {ticket.date}</p>
                    {/* Add more ticket information as needed */}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No tickets in the last 30 days.</p>
            )}
          </div>

          {/* Display Movies Watched */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Movies Watched in the Last 30 Days</h2>
            {moviesWatched.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {moviesWatched.map((movie) => (
                  <div key={movie.id} className="bg-white p-4 rounded-md shadow-md">
                    <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
                    <p className="text-gray-600">{movie.genre}</p>
                    {/* Add more movie information as needed */}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No movies watched in the last 30 days.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MembershipPage;
