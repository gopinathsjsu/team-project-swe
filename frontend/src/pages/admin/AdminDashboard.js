// get movie schedule for a specific multiplex
// Add/update/remove: movies, showtimes, and theater assignments in that schedule

// set seating capacity of theaters

// set discount prices for shows before 6pm and for Tuesday shows

import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Box,
    CircularProgress,
    Typography,
} from '@mui/material';

import LocationMultiplexDropdown from '../../components/LocationMultiplexDropdown/LocationMultiplexDropdown';
import EditMovieModal from '../../components/admin/movie/EditMovieModal';
import AddMovieModal from '../../components/admin/movie/AddMovieModal';
import CreateMovieModal from '../../components/admin/movie/CreateMovieModal';
import RemoveMovieModal from '../../components/admin/movie/RemoveMovieModal';
import EditShowtimeModal from '../../components/admin/showtime/EditShowtimeModal';
import MovieService from '../../services/MovieService';
import ScheduleService from '../../services/ScheduleService';
import ShowtimeService from '../../services/ShowtimeService';
import convertTime from '../../common/convertTime';


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

    const [theaters, setTheaters] = useState([]);

    // fetch movie schedule for selected multiplex
    // then fetch showtimes for each movie in schedule
    // then fetch theaters 

    const fetchTheaterData = useCallback(async () => {
        try {
            setLoading(true);

            console.log('Movie Schedule:', movieSchedule);
            const theaterPromises = movieSchedule.map(async (schedule) => {
                const movies = schedule.movies || [];

                const moviePromises = movies.map(async (movie) => {
                    const theaterResponse = await axios.get(`http://localhost:8080/api/theaters/getTheaterByMovieIdAndMultiplexId/${parseInt(movie.movieId)}/${selectedMultiplex.multiplexId}`);
                    return {
                        movieId: movie.movieId,
                        theaterInfo: theaterResponse.data,
                    };
                });

                return Promise.all(moviePromises);
            });

            const theaterData = await Promise.all(theaterPromises);

            const theaters = theaterData.flat();

            setTheaters(theaters);

            setLoading(false);
        } catch (error) {
            console.error('Error fetching theater data:', error);
            setLoading(false);
        }
    }, [movieSchedule]);

    useEffect(() => {
        if (movieSchedule.length > 0) {
            fetchTheaterData();
        }
    }, [fetchTheaterData, movieSchedule]);

    const fetchMovieData = useCallback(async () => {
        try {
            setLoading(true);

            const movieScheduleResponse = await axios.get(`http://localhost:8080/api/schedules/multiplex/${selectedMultiplex.multiplexId}`);
            setMovieSchedule(movieScheduleResponse.data);

            console.log('Movie Schedule:', movieScheduleResponse.data);

            const movieDetailsPromises = movieScheduleResponse.data[0].movies.map(async (movie) => {
                const showtimeResponse = await MovieService.fetchShowtimesByMovieId(movie.movieId);

                return {
                    movieId: movie.movieId,
                    showtimes: showtimeResponse,
                };
            });

            const movieDetailsData = await Promise.all(movieDetailsPromises);

            // Update the states
            setShowtimes(movieDetailsData);

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
            <Box m={2}>
                <Button onClick={() => navigate('/admin/analytics')} variant="outlined" color="primary">
                    Analytics Dashboard
                </Button>
            </Box>

            <Box m={2}>
                <LocationMultiplexDropdown
                    onSelectLocation={handleLocationSelect}
                    onSelectMultiplex={handleMultiplexSelect}
                />
            </Box>

            <Box m={2}>
                <Button onClick={() => setIsCreateMovieOpen(true)} variant="contained" color="primary">
                    Create Movie
                </Button>
            </Box>

            {selectedMultiplex && (
                <Box m={2}>
                    <div>
                        <Typography variant="h5">
                            Movie Schedule for {selectedMultiplex.locationName}
                        </Typography>

                        {loading && <CircularProgress />}

                        {Object.keys(movieSchedule).length > 0 && movieSchedule[0].movies?.map((movie) => (
                            <Box key={movie.movieId} mt={3} p={3} border={1} borderColor="grey.300" borderRadius={4}>
                                <Typography variant="h6">
                                    {movie.title}
                                </Typography>

                                {/* ... (other movie details) */}

                                <Typography variant="h6">
                                    Showtimes:
                                </Typography>

                                {Array.isArray(showtimes) && showtimes.length > 0 ? (
                                    showtimes
                                        .filter((data) => data.movieId === movie.movieId)
                                        .map((movieShowtimes) =>
                                            movieShowtimes.showtimes.map((showtime) => (
                                                <Button
                                                    key={showtime.showtimeId}
                                                    variant="outlined"
                                                    color="primary"
                                                    onClick={() => handleShowtimeClick(movie, showtime)}
                                                >
                                                    {convertTime(showtime.time)}
                                                </Button>
                                            ))
                                        )
                                ) : (
                                    <Typography variant="h6">No showtimes found</Typography>
                                )}

                                {theaters.map((theater) => {
                                    if (theater.movieId === movie.movieId) {
                                        return (
                                            <Box key={theater.theaterInfo.theaterId} mt={2}>
                                                <Typography variant="subtitle1">
                                                    Theater: {theater.theaterInfo.theaterName}
                                                </Typography>
                                                <Typography variant="subtitle1">
                                                    Theater Capacity: {theater.theaterInfo.capacity}
                                                </Typography>
                                            </Box>
                                        );
                                    }
                                    return null;
                                })}

                                <Box mt={2}>
                                    <Button onClick={() => handleEditMovie(movie)} variant="outlined" color="primary">
                                        Edit Movie
                                    </Button>

                                    <Button onClick={() => handleRemoveMovie(movie)} variant="outlined" color="secondary">
                                        Remove Movie
                                    </Button>
                                </Box>
                            </Box>
                        ))}

                        {Object.keys(movieSchedule).length > 0 && (
                            <Box mt={2}>
                                <Button onClick={() => setIsAddMovieOpen(true)} variant="contained" color="primary">
                                    Add Movie to Schedule
                                </Button>
                            </Box>
                        )}
                    </div>
                </Box>
            )}

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
    )
};

export default AdminDashboard;
