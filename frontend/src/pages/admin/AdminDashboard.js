// get movie schedule for a specific multiplex
// Add/update/remove: movies, showtimes, and theater assignments in that schedule

// set seating capacity of theaters

// set discount prices for shows before 6pm and for Tuesday shows

import React, { useCallback, useEffect, useState } from 'react';

import api from '../../services/backend-api/api';

import { useNavigate } from 'react-router-dom';
import {
    Button,
    Box,
    CircularProgress,
    Typography,
    Card,
    Snackbar,
    Alert,
} from '@mui/material';

import LocationMultiplexDropdown from '../../components/LocationMultiplexDropdown/LocationMultiplexDropdown';
import EditMovieModal from '../../components/admin/movie/EditMovieModal';
import AddMovieModal from '../../components/admin/movie/AddMovieModal';
import CreateMovieModal from '../../components/admin/movie/CreateMovieModal';
import RemoveMovieModal from '../../components/admin/movie/RemoveMovieModal';
import EditShowtimeModal from '../../components/admin/showtime/EditShowtimeModal';
import TicketPricingCard from '../../components/admin/ticketPricing/TicketPricingCard';

import MovieService from '../../services/MovieService';
import ScheduleService from '../../services/ScheduleService';
import ShowtimeService from '../../services/ShowtimeService';
import convertTime from '../../common/convertTime';
import formatReleaseDate from '../../common/convertDate';


const AdminDashboard = () => {

    const navigate = useNavigate();

    // states for dropdown
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedMultiplex, setSelectedMultiplex] = useState({});

    // states for ticket pricing
    const [ticketPricing, setTicketPricing] = useState({});
    const [multiplexes, setMultiplexes] = useState([]);

    const [regularPrice, setRegularPrice] = useState(12);
    const [tuesdayDiscountedPrice, setTuesdayDiscountedPrice] = useState(6);
    const [before6pmDiscountedPrice, setBefore6pmDiscountedPrice] = useState(10);


    // states for schedule
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
                    const theaterResponse = await api.get(`api/theaters/getTheaterByMovieIdAndMultiplexId/${parseInt(movie.movieId)}/${selectedMultiplex.multiplexId}`);
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

            const movieScheduleResponse = await api.get(`api/schedules/multiplex/${selectedMultiplex.multiplexId}`);
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

    const handleGetMultiplexes = (multiplexList) => {
        const multiplexesWithPricing = multiplexList.map((multiplex) => ({
            ...multiplex,
            ticketPricing: {
                regularPrice: 10, // Default values, you can set them as needed
                tuesdayDiscountedPrice: 8,
                before6pmDiscountedPrice: 9,
            },
        }));

        setMultiplexes(multiplexesWithPricing);
    };

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleSaveTicketPricing = (newPrices) => {
        const selectedMultiplexId = selectedMultiplex.multiplexId;

        const updatedMultiplexes = multiplexes.map((multiplex) =>
            multiplex.multiplexId === selectedMultiplexId
                ? {
                    ...multiplex,
                    ticketPricing: {
                        regularPrice,
                        tuesdayDiscountedPrice,
                        before6pmDiscountedPrice,
                    },
                }
                : multiplex
        );

        setMultiplexes(updatedMultiplexes);

        setAlertMessage(`Successfully saved ticket pricing details for ${selectedMultiplex.locationName}.`);
        setShowAlert(true);

        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
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

            const updatedResponse = await api.get(`api/schedules/multiplex/${selectedScheduleId}`);
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

            const updatedResponse = await api.get(`api/schedules/multiplex/${selectedMultiplex.multiplexId}`);
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

            const updatedResponse = await api.get(`api/schedules/multiplex/${selectedMultiplex.multiplexId}`);
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
        <div className="flex">
            <div className="flex-3">
                <div className='flex-4'>
                    <Typography variant="h4" className="mb-4">
                        Admin Dashboard
                    </Typography>
                    <Button variant='outlined' onClick={() => navigate('/admin/analytics')}>Analytics Dashboard</Button>
                </div>
                <Card maxWidth={'50vw'}>
                    <LocationMultiplexDropdown
                        onSelectLocation={handleLocationSelect}
                        onSelectMultiplex={handleMultiplexSelect}
                        onGetMultiplexes={handleGetMultiplexes}
                    />
                </Card>
                
                <Box style={{maxHeight: '75vh', overflow: 'auto'}} m={2} maxWidth={'50vw'}>
                    <Typography variant="h5">Movie Schedule for {selectedMultiplex.locationName}</Typography>

                    {loading ? <CircularProgress /> : null}

                    {Object.keys(movieSchedule).length > 0 &&
                        movieSchedule[0].movies?.map((movie) => (
                            <Card key={movie.movieId} className="mb-4">
                                <Typography variant="h6">{movie.title}</Typography>
                                <Typography variant='body1' style={{ fontWeight: 'bold' }}>Rating: {movie.rating}</Typography>
                                <Typography variant='body1' style={{ fontStyle: 'italic' }}>Release Date: {formatReleaseDate(movie.releaseDate)}</Typography>
                                <Typography variant='body1'>Genre: {movie.genre}</Typography>
                                <Typography variant='body1'>Duration: {movie.duration}</Typography>
                                <Typography variant='body1' style={{ color: 'gray' }}>Description: {movie.description}</Typography>


                                <p>Showtimes:</p>
                                {Array.isArray(showtimes) && showtimes.length > 0 ? (
                                    showtimes
                                        .filter((data) => data.movieId === movie.movieId)
                                        .map((movieShowtimes) =>
                                            movieShowtimes.showtimes.map((showtime) => (
                                                <Button
                                                    key={showtime.showtimeId}
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
                                            <div key={theater.theaterInfo.theaterId}>
                                                <p>Theater: {theater.theaterInfo.theaterName}</p>
                                                <p>Theater Capacity: {theater.theaterInfo.capacity}</p>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}

                                <Button variant='outlined' color='success' onClick={() => handleEditMovie(movie)}>Edit Movie</Button>
                                <Button variant='outlined' color='warning' onClick={() => handleRemoveMovie(movie)}>Remove Movie</Button>
                            </Card>
                        ))}

                    <EditMovieModal open={isEditMovieOpen} onClose={handleCloseEditMovie} onSave={handleUpdateMovie} movie={selectedMovie} />
                    <AddMovieModal
                        open={isAddMovieOpen}
                        onClose={() => setIsAddMovieOpen(false)}
                        onAddMovie={handleAddMovie}
                        selectedMultiplexId={selectedMultiplex.multiplexId}
                        schedule={movieSchedule[0]?.movies || []}
                    />
                    <CreateMovieModal open={isCreateMovieOpen} onClose={() => setIsCreateMovieOpen(false)} onCreateMovie={handleCreateMovie} />
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
                </Box>
                {Object.keys(movieSchedule).length > 0 && (
                    <Button variant='outlined' onClick={() => setIsAddMovieOpen(true)}>Add Movie to Schedule</Button>
                )}
            </div>

            <div className="flex-1 ml-4">
                {selectedMultiplex.multiplexId ? (
                    <Box mt={3} maxWidth={'25vw'}>
                        {multiplexes.map((multiplex) => {
                            if (multiplex.multiplexId === selectedMultiplex.multiplexId) {
                                return (
                                    <TicketPricingCard
                                        key={multiplex.multiplexId}
                                        regularPrice={multiplex.ticketPricing.regularPrice}
                                        tuesdayDiscountedPrice={multiplex.ticketPricing.tuesdayDiscountedPrice}
                                        before6pmDiscountedPrice={multiplex.ticketPricing.before6pmDiscountedPrice}
                                        onSave={handleSaveTicketPricing}
                                    />
                                );
                            }
                            return null;
                        })}
                    </Box>
                ) : (
                    <Box mt={3} maxWidth={'30vw'}>
                        <Typography variant="h5">Ticket Pricing for {selectedMultiplex.locationName}</Typography>
                        <Card mt={3}>
                            <Typography>Please select a multiplex to view/edit movie schedule.</Typography>
                        </Card>
                    </Box>
                )}

                {showAlert && (
                    <Snackbar open={showAlert} autoHideDuration={3000} onClose={() => setShowAlert(false)}>
                        <Alert onClose={() => setShowAlert(false)} severity="success">
                            {alertMessage}
                        </Alert>
                    </Snackbar>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;