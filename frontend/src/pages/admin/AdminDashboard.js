// get movie schedule for a specific multiplex
// Add/update/remove: movies, showtimes, and theater assignments in that schedule

// set seating capacity of theaters

// set discount prices for shows before 6pm and for Tuesday shows

import React, {useState, useEffect, useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import LocationMultiplexDropdown from '../../components/LocationMultiplexDropdown/LocationMultiplexDropdown';
import EditMovieModal from '../../components/admin/movie/EditMovieModal';
import AddMovieModal from '../../components/admin/movie/AddMovieModal';
import CreateMovieModal from '../../components/admin/movie/CreateMovieModal';
import RemoveMovieModal from '../../components/admin/movie/RemoveMovieModal';

import EditShowtimeModal from '../../components/admin/showtime/EditShowtimeModal';

import axios from 'axios';

import { Alert, Button } from '@mui/material';
import MovieService from '../../services/MovieService';
import ScheduleService from '../../services/ScheduleService';
import ShowtimeService from '../../services/ShowtimeService';
import convertTime from '../../common/convertTime';
import { Movie } from '@mui/icons-material';


const AdminDashboard = () => {

    const navigate = useNavigate();
    
    // states for dropdown
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedMultiplex, setSelectedMultiplex] = useState({});

    const [selectedMovie, setSelectedMovie] = useState({});
    const [selectedTheater, setSelectedTheater] = useState({});

    const [movieSchedule, setMovieSchedule] = useState([]);
    const [loading, setLoading] = useState(false);

    const [showtimes, setShowtimes] = useState([]);
    

    // const fetchTheaterInfo = async (movieId, multiplexId) => {
    //     try {
    //         const response = await axios.get(`http://localhost:8080/api/theaters/getTheaterByMovieIdAndMultiplexId/${movieId}/${multiplexId}`);
    //         console.log("Theater Info:", response.data);
    //         setSelectedTheater(response.data);
    //     } catch (error) {
    //         console.error('Error fetching theater information:', error);
    //         return null;
    //     }
    // };

    // fetch movie schedule for selected multiplex
    // then fetch showtimes for each movie in schedule

    const fetchMovieData = useCallback(async () => {
        try {
            setLoading(true);
    
            const movieScheduleResponse = await axios.get(`http://localhost:8080/api/schedules/multiplex/${selectedMultiplex.multiplexId}`);
            setMovieSchedule(movieScheduleResponse.data);
    
            console.log('Movie Schedule:', movieScheduleResponse.data);
    
            // Fetch showtimes and theater details for each movie in the schedule
            const movieDetailsPromises = movieScheduleResponse.data[0].movies.map(async (movie) => {
                const showtimeResponse = await MovieService.fetchShowtimesByMovieId(movie.movieId);
                // const theaterDetailsResponse = await axios.get(`http://localhost:8080/api/theaters/getTheaterByMovieIdAndMultiplexId/${movie.movieId}/${selectedMultiplex.multiplexId}`);
    
                return {
                    movieId: movie.movieId,
                    showtimes: showtimeResponse,
                    // theaterDetails: theaterDetailsResponse.data,
                };
            });
    
            const movieDetailsData = await Promise.all(movieDetailsPromises);
    
            // Update the states
            setShowtimes(movieDetailsData);
            // setMovieTheaterDetails(movieDetailsData.reduce((acc, movie) => {
            //     acc[movie.movieId] = movie.theaterDetails;
            //     return acc;
            // }, {}));
    
            setLoading(false);
        } catch (error) {
            console.error('Error fetching movie data:', error);
            setLoading(false);
        }
    }, [selectedMultiplex]);

    useEffect(() => {
        if (selectedMultiplex && Object.keys(selectedMultiplex).length > 0) {
            fetchMovieData();
        }
    }, [fetchMovieData, selectedMultiplex]);
    
    // callback to set multiplex and location from dropdown
    const handleMultiplexSelect = (multiplex) => {
        setSelectedMultiplex(multiplex);
    };

    const handleLocationSelect = (location) => {
        setSelectedLocation(location);
    };

    // states for modals
    const [isEditMovieOpen, setIsEditMovieOpen] = useState(false); // edit existing movie
    const [isAddMovieOpen, setIsAddMovieOpen] = useState(false); // select an existing movie to add to schedule
    const [isCreateMovieOpen, setIsCreateMovieOpen] = useState(false); // add brand new movie to database
    const [isRemoveMovieOpen, setIsRemoveMovieOpen] = useState(false); // remove movie from schedule

    const [isEditShowtimeOpen, setIsEditShowtimeOpen] = useState(false); // edit existing showtime

    const [selectedRemoveMovie, setSelectedRemoveMovie] = useState({});
    const [selectedShowtime, setSelectedShowtime] = useState({});

    const handleEditMovie = (movie) => {
        setSelectedMovie(movie);
        setIsEditMovieOpen(true);
    };

    const handleCloseEditMovie = () => {
        setIsEditMovieOpen(false);
    };

    const handleUpdateMovie = async (newMovie) => {
        try {
            setLoading(true);

            const selectedScheduleId = movieSchedule[0].scheduleId;
            const res = await MovieService.updateMovie(newMovie);
            console.log(res.data);

            const updatedResponse = await axios.get(`http://localhost:8080/api/schedules/multiplex/${selectedScheduleId}`);
            setMovieSchedule(updatedResponse.data);
    
            setIsEditMovieOpen(false);
            setLoading(false);
        } catch (error) {
            console.error('Error updating movie:', error);
            setLoading(false);
        }
    };

    const handleAddMovie = async (selectedMovieId) => {
        try {
          setLoading(true);

          const selectedScheduleId = movieSchedule[0].scheduleId;
      
          const response = await ScheduleService.addMovieToSchedule(selectedMovieId, selectedScheduleId);
          console.log(response.data);
          
          const updatedResponse = await axios.get(`http://localhost:8080/api/schedules/multiplex/${selectedMultiplex.multiplexId}`);
          setMovieSchedule(updatedResponse.data);
      
          setIsAddMovieOpen(false);
          setSelectedMovie({});
          setLoading(false);
      
        } catch (error) {
          console.error('Error adding movie:', error);
          setLoading(false);
        }
      };

    const handleCreateMovie = async (newMovie) => {

        try {
            const response = await MovieService.createMovie(newMovie);
            console.log("Successfully added movie:", response.data);
            setIsCreateMovieOpen(false);

        } catch (error) {
          console.error('Error adding movie:', error);
          setLoading(false);
        }
    }

    const handleRemoveMovie = (movie) => {
        setSelectedRemoveMovie(movie);
        setIsRemoveMovieOpen(true);
    };

    const handleConfirmRemoveMovie = async () => {
        try {
          setLoading(true);

          const selectedScheduleId = movieSchedule[0].scheduleId;
    
          const res = await ScheduleService.removeMovieFromSchedule(selectedRemoveMovie.movieId, selectedScheduleId);
          console.log(res.data);
    
          const updatedResponse = await axios.get(`http://localhost:8080/api/schedules/multiplex/${selectedMultiplex.multiplexId}`);
          setMovieSchedule(updatedResponse.data);
    
          setIsRemoveMovieOpen(false);
          setSelectedRemoveMovie({});
          setLoading(false);
    
        } catch (error) {
          console.error('Error removing movie:', error);
          setLoading(false);
        }
      };

      const handleShowtimeClick = (movie, showtime) => {
        setSelectedMovie(movie);
        setSelectedShowtime(showtime);
        setIsEditShowtimeOpen(true);
      };

      const handleUpdateShowtime = async (updatedShowtime) => {
        try {
            setLoading(true);
            const response = await ShowtimeService.updateShowtime(selectedMovie.movieId, updatedShowtime);
            console.log(response.data);

            setShowtimes((prevMovieShowtimes) => {
                const movieIndex = prevMovieShowtimes.findIndex((data) => data.movieId === selectedMovie.movieId);
                if (movieIndex !== -1) {
                    const updatedMovieShowtimes = [...prevMovieShowtimes];
                    updatedMovieShowtimes[movieIndex].showtimes = updatedMovieShowtimes[movieIndex].showtimes.map((showtime) =>
                        showtime.showtimeId === updatedShowtime.showtimeId ? updatedShowtime : showtime
                    );
                    return updatedMovieShowtimes;
                }
                return prevMovieShowtimes;
            });

            setIsEditShowtimeOpen(false);
            setLoading(false);

            fetchMovieData();
        } catch (error) {
            console.error('Error updating showtime:', error);
            setLoading(false);
        }
    };
    
    const handleRemoveShowtime = async (showtime) => {
        try {
            setLoading(true);
    
            const response = await MovieService.removeShowtimeFromMovie(selectedMovie.movieId, showtime.showtimeId);
            console.log(response.data);

            setShowtimes((prevMovieShowtimes) => {
                const movieIndex = prevMovieShowtimes.findIndex((data) => data.movieId === selectedMovie.movieId);
                if (movieIndex !== -1) {
                    const updatedMovieShowtimes = [...prevMovieShowtimes];
                    updatedMovieShowtimes[movieIndex].showtimes = updatedMovieShowtimes[movieIndex].showtimes.filter(
                        (st) => st.showtimeId !== showtime.showtimeId
                    );
                    return updatedMovieShowtimes;
                }
                return prevMovieShowtimes;
            });
    
            setIsEditShowtimeOpen(false);
            setLoading(false);

            fetchMovieData();
        } catch (error) {
            console.error('Error removing showtime:', error);
            setLoading(false);
        }
    };
    


    return (
        <div>
            <Button onClick={() => navigate('/admin/analytics')}>Analytics Dashboard</Button>
            <LocationMultiplexDropdown 
                onSelectLocation={handleLocationSelect}
                onSelectMultiplex={handleMultiplexSelect}
            />
            <Button onClick={() => setIsCreateMovieOpen(true)}>Create Movie</Button>
            {selectedMultiplex && (
            <div>
                {/* Display Movie Schedule here */}
                <h2>Movie Schedule for {selectedMultiplex.locationName}</h2>
                    {loading && <p>Loading...</p>}
                    {Object.keys(movieSchedule).length > 0 && movieSchedule[0].movies?.map((movie) => (
                        <div key={movie.movieId}>
                        <h3>{movie.title}</h3>
                        <p>Rating: {movie.rating}</p>
                        <p>Release Date: {movie.releaseDate}</p>
                        <p>Genre: {movie.genre}</p>
                        <p>Duration: {movie.duration}</p>
                        <p>Description: {movie.description}</p>

                        
                           
                        <p>Showtimes:</p>
                        {Array.isArray(showtimes) && showtimes.length > 0 ? (
                        showtimes
                            .filter((data) => data.movieId === movie.movieId)
                            .map((movieShowtimes) =>
                                movieShowtimes.showtimes.map((showtime) => (
                                    <button key={showtime.showtimeId} onClick={() => handleShowtimeClick(movie, showtime)}>
                                        {convertTime(showtime.time)}
                                    </button>
                                ))
                                )
                            ) : (
                            <h2>No showtimes found</h2>
                        )}
                           
                     
                        


                        {/* Implement CRUD operations for movie update and removal */}
                        <button onClick={() => handleEditMovie(movie)}>Edit Movie</button>
                        <button onClick={() => handleRemoveMovie(movie)}>Remove Movie</button>
                        {/* Add a button to delete the movie */}
                        </div>
                    ))}
                    {Object.keys(movieSchedule).length > 0 && <button onClick={() => setIsAddMovieOpen(true)}>Add Movie to Schedule</button>}
                    {/* Modal for editing movie details */}
                     {selectedMovie && (
                        <EditMovieModal
                            open={isEditMovieOpen}
                            onClose={handleCloseEditMovie}
                            onSave={handleUpdateMovie}
                            movie={selectedMovie}
                        />
                    )}
                    <AddMovieModal
                        open={isAddMovieOpen}
                        onClose={() => setIsAddMovieOpen(false)}
                        onAddMovie={handleAddMovie}
                        selectedMultiplexId={selectedMultiplex.multiplexId}
                        schedule={movieSchedule[0]?.movies || []}
                    />
                    <CreateMovieModal
                        open={isCreateMovieOpen}
                        onClose={() => setIsCreateMovieOpen(false)}
                        onCreateMovie={handleCreateMovie}
                    />
                    <RemoveMovieModal
                        open={isRemoveMovieOpen}
                        onClose={() => setIsRemoveMovieOpen(false)}
                        onConfirmRemove={handleConfirmRemoveMovie}
                        movie={selectedRemoveMovie}
                    />

                    <EditShowtimeModal
                        open={isEditShowtimeOpen}
                        onClose={() => setIsEditShowtimeOpen(false)}
                        onSave={handleUpdateShowtime}
                        onRemove={handleRemoveShowtime}
                        showtime={selectedShowtime}
                    />
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
