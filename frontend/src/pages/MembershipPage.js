import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MembershipAccountInfo from '../components/MembershipAccountInfo';
import TicketInfoPage from '../components/TicketInfo';
import AuthService from '../services/auth/auth.service';
import axios from 'axios';

const MembershipPage = () => {
  const navigate = useNavigate();

  const [membershipInfo, setMembershipInfo] = useState([]);
  const [moviesWatched, setMoviesWatched] = useState([]);
  const [rewardPoints, setRewardPoints] = useState(null);
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tickets, setTicketInfo] = useState([]);


  const { id } = AuthService.getCurrentUser();
  console.log("USERID: " + id); // Add this line to log the id

  useEffect(() => {
    // redirect to login if no id is provided
    if (!id) {
      navigate('/login', { replace: true });
    }

    console.log("USERID" + id);
    const fetchData = async () => {
      setLoading(true);
      const userRes = await axios.get(`http://localhost:8080/api/users/getUser?id=${id}`);
      console.log("USER INFO:", userRes.data);
      setUserInfo(userRes.data);
      console.log("Updated userInfo:", userInfo); 
      // setLoading(false);

      // setLoading(true);
      const membershipRes = await axios.get(`http://localhost:8080/api/memberships/getMembership/user?userId=${id}`);
      console.log("MEMBERSHIP INFO:", membershipRes.data);
      setMembershipInfo(membershipRes.data);
      // setLoading(false);

      // setLoading(true);
      const ticketRes = await axios.get(`http://localhost:8080/api/tickets/user/${id}`);
      console.log("TICKET INFO:", ticketRes.data);
      setTicketInfo(ticketRes.data);
      // setLoading(false);

      // setLoading(true);
      const moviesWatchedRes = await axios.get(`http://localhost:8080/api/tickets/watched/${id}`);
      console.log("MOVIES WATCHED - 30 DAYS :", moviesWatchedRes.data);
      setMoviesWatched(moviesWatchedRes.data);
      setLoading(false);

      // setLoading(true);
      const rewardPointsRes = await axios.get(`http://localhost:8080/api/users/${id}/getRewardPoints`);
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
              <strong>Date of Birth:</strong> {userInfo.dob}
            </p>
            <p>
              <strong>Email:</strong> {userInfo.email}
            </p>
            <p>
              <strong>Phone:</strong> {userInfo.phone? userInfo.phone : "N/A"}
            </p>
            {/* <p>
              <strong>Membership Type:</strong> {userInfo.phone? userInfo.phone : "N/A"}
            </p> */}
        </div>

        {/* Display Reward Points */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Reward Points</h2>
          <p>
            <strong>Reward Points:</strong> {rewardPoints !== null ? rewardPoints : 'Loading...'}
          </p>
        </div>

        {/* Display Movies Watched */}
        <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Movies Watched</h2>
        {moviesWatched.length > 0 ? (
          <ul>
            {moviesWatched.map((movie) => (
              <li key={movie.id}>
                <p>
                  <strong>Title:</strong> {movie.title}
                </p>
                <p>
                  <strong>Genre:</strong> {movie.genre}
                </p>
                {/* Add more movie information as needed */}
              </li>
            ))}
          </ul>
        ) : (
          'No movies watched.'
        )}
      </div>

        {/* Other sections specific to MembershipPage */}
      </div>
    )} 
  </div> 
);
};

export default MembershipPage; 



