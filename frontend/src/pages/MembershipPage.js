import React, { useState, useEffect } from 'react';
import MembershipAccountInfo from '../components/MembershipAccountInfo';
import TicketInfoPage from '../components/TicketInfo';
import AuthService from '../services/auth/auth.service';
import axios from 'axios';

const MembershipPage = () => {
const [membershipInfo, setMembershipInfo] = useState(null);
  const [moviesWatched, setMoviesWatched] = useState([]);
  const [rewardPoints, setRewardPoints] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {userId}  = AuthService.getCurrentUser();

  useEffect(() => {
    const fetchData = async () => {
  setLoading(true);
        const res = await axios.get(`http://localhost:8080/api/users/getUser?id=${parseInt("48")}`);
      console.log("USER INFO:", res.data);
      setUserInfo(res.data);
setLoading(false);
    };
  
    try{
      fetchData();
    } catch (error) {
      console.error(error);
      // setError(error.message || 'Error fetching information');
      // setLoading(false);
    }

    

  }, [userId]);

// const MembershipPage = () => {
//   const [membershipInfo, setMembershipInfo] = useState(null);
//   const [moviesWatched, setMoviesWatched] = useState([]);
//   const [rewardPoints, setRewardPoints] = useState(null);
//   const [userInfo, setUserInfo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const {userId}  = AuthService.getCurrentUser();

//   useEffect(() => {
//     const fetchData = async (userId) => {
//       try {
//         // Fetch information using MembershipAccountInfo
//         const userData = await MembershipAccountInfo.getUser(userId);
//         const membershipData = await MembershipAccountInfo.getMembership(userId);
//         const ticketData = await MembershipAccountInfo.getTicketData(userData.ticketId);
//         const moviesWatchedData = await MembershipAccountInfo.getMoviesWatched(userId);
//         const rewardPointsData = await MembershipAccountInfo.getRewardPoints(userId);

//         setMembershipInfo(membershipData);
//         setMoviesWatched(moviesWatchedData);
//         setRewardPoints(rewardPointsData);
//         setUserInfo(userData);

//         setLoading(false);
//       } catch (error) {
//         setError(error.message || 'Error fetching information');
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

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
            <p>
              {/* <strong>Name:</strong> {membershipInfo.username} */}
            </p>
            {/* Display other membership information... */}
          </div>

          {/* Display User Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">User Information</h2>
            <p>
              <strong>Username:</strong> {userInfo.username}
            </p>
            {/* Display other user information... */}
          </div>

          {/* Display other information */}
          <div className="mb-8">
            <p>
              <strong>Reward Points:</strong> {rewardPoints !== null ? rewardPoints : 'Loading...'}
            </p>
            <p>
              {/* <strong>Movies Watched:</strong>
              {moviesWatched.length > 0 ? (
                <ul>
                  {moviesWatched.map((movie) => (
                    <li key={movie.id}>{movie.title}</li>
                  ))}
                </ul>
              ) : (
                'No movies watched.'
              )} */}
            </p>
          </div>

          {/* Movie Tickets Purchased */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Movie Tickets Purchased</h2>
            {/* {moviesWatched.length > 0 ? (
              <ul>
                {moviesWatched.map((ticket) => (
                  <li key={ticket.id}>{ticket.movieName}</li>
                ))}
              </ul>
            ) : (
              'No movie tickets purchased.'
            )} */}
          </div>

          {/* Other sections specific to MembershipPage */}
        </div>
      )}
    </div>
  );
};

export default MembershipPage;
