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
    Modal,
    Checkbox,
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

    const [theaters, setTheaters] = useState([]); // all theaters for selected multiplex
    const [isEditTheaterAssignmentOpen, setIsEditTheaterAssignmentOpen] = useState(false);
    const [availableTheaters, setAvailableTheaters] = useState([]);
    const [selectedTheaterForAssignment, setSelectedTheaterForAssignment] = useState(null);


    // fetch movie schedule for selected multiplex
    // then fetch showtimes for each movie in schedule
    // then fetch theaters 

    const fetchAllTheaters = async () => {
        try {
            setLoading(true);

            const theaterResponse = await api.get(`api/theaters/getTheatersByMultiplexId/${selectedMultiplex.multiplexId}`);
            const theaters = theaterResponse.data || [];

            setTheaters(theaters);

            setLoading(false);
        } catch (error) {
            console.error('Error fetching theaters:', error);
            setLoading(false);
        }
    };

    const fetchMovieData = useCallback(async () => {
        try {
            setLoading(true);

            const movieScheduleResponse = await api.get(`api/schedules/multiplex/${selectedMultiplex.multiplexId}`);
            setMovieSchedule(movieScheduleResponse.data);

            // console.log('Movie Schedule:', movieScheduleResponse.data);

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

    // useEffect to fetch theaters when selectedMultiplex changes
    useEffect(() => {
        if (selectedMultiplex && Object.keys(selectedMultiplex).length > 0) {
            fetchAllTheaters();
        }
    }, [selectedMultiplex]);

    // useEffect to fetch movie data when selectedMultiplex changes
    useEffect(() => {
        if (selectedMultiplex && Object.keys(selectedMultiplex).length > 0) {
            fetchMovieData();
        }
    }, [selectedMultiplex, fetchMovieData]);

    // useEffect to set available theaters when selectedMovie changes
    useEffect(() => {
        if (selectedMovie) {
            const unassignedTheaters = theaters.filter((theater) => !theater.assignedMovie && theater.movieId !== selectedMovie.movieId);
            setAvailableTheaters(unassignedTheaters);
            setSelectedTheaterForAssignment(null);
        }
    }, [theaters, selectedMovie]);

    const [isSavingTheaterAssignment, setIsSavingTheaterAssignment] = useState(false);

    useEffect(() => {
        const saveTheaterAssignment = async () => {
            try {
                console.log('Saving theater assignment...');
                setLoading(true);
        
                const movieId = selectedMovie?.movieId;
        
                if (selectedTheaterForAssignment) {
                    const res = await api.post(`api/theaters/${selectedTheaterForAssignment.theaterId}/assignMovie/${movieId}`);
                    console.log(res.data);
        
                    // Refresh the movie schedule
                    const updatedResponse = await api.get(`api/schedules/multiplex/${selectedMultiplex.multiplexId}`);
                    setMovieSchedule(updatedResponse.data);
                }
        
                setIsSavingTheaterAssignment(false); // Update the state to allow modal to close
                setLoading(false);
                console.log('Theater assignment saved successfully.');
            } catch (error) {
                console.error('Error updating theater assignment:', error);
                setLoading(false);
            }
        };

        if (isSavingTheaterAssignment) {
            saveTheaterAssignment();
        }
    }, [isSavingTheaterAssignment, selectedMultiplex, selectedMovie, selectedTheaterForAssignment, movieSchedule]);

    const handleSaveTheaterAssignment = async () => {
        try {
            setLoading(true);

            setIsSavingTheaterAssignment(true); // Set the state to initiate the saving process

            // No need to manually close the modal here
            // setIsEditTheaterAssignmentOpen(false);

            // The actual closing will happen after the assignment is successfully updated
        } catch (error) {
            console.error('Error initiating theater assignment save:', error);
            setLoading(false);
        }
    };


    //   CALLBACKS

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
            // console.log(response.data);

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
            // console.log(response.data);

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

    const handleEditTheaterAssignment = (movie) => {
        // get all theaters that are not assigned to a movie
        // will create as options for admin to use to assign to movie

        setSelectedMovie(movie);
        // console.log("THEATERS:", theaters);
        const unassignedTheaters = theaters.filter((theater) => !theater.assignedMovie && theater.movieId !== movie.movieId);
        // console.log("Unassigned Theaters:", unassignedTheaters);
        setAvailableTheaters(unassignedTheaters);
        setSelectedTheaterForAssignment(null);

        setIsEditTheaterAssignmentOpen(true);
    };

    const handleTheaterSelection = (theater) => {
        // setSelectedMovie(movie);
        setSelectedTheaterForAssignment(theater);
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

                <Box style={{ maxHeight: '75vh', overflow: 'auto' }} m={2} maxWidth={'50vw'}>
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
                                <Button variant='outlined' color='primary' onClick={() => handleEditTheaterAssignment(movie)}>
                                    Edit Theater Assignment
                                </Button>

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
                                    // console.log("Theater:", theater);
                                    // console.log("Movie:", movie);
                                    if (theater.assignedMovie?.movieId === movie.movieId) {
                                        return (
                                            <div key={theater.theaterId}>
                                                <p>Theater Assignment: {theater.theaterName}</p>
                                                <p>Theater Capacity: {theater.capacity}</p>
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


                <Modal open={isEditTheaterAssignmentOpen} onClose={() => setIsEditTheaterAssignmentOpen(false)}>
                    <Box p={3} maxWidth={400} mx="auto" className="bg-white p-4 rounded-md">
                        <Typography variant="h5" className="mb-2">
                            Edit Theater Assignment
                        </Typography>
                        <Typography>Select a theater for assignment:</Typography>

                        {availableTheaters.map((theater) => (
                            <div key={theater.theaterId} className="flex items-center mb-2">
                                <Checkbox
                                    checked={selectedTheaterForAssignment === theater}
                                    onChange={() => handleTheaterSelection(
                                        selectedTheaterForAssignment === theater ? null : theater
                                    )}
                                    color="primary"
                                    className="mr-2"
                                />
                                <span>{theater.theaterName}</span>
                            </div>
                        ))}

                        <Button variant="contained" color="primary" onClick={handleSaveTheaterAssignment} className="mt-2">
                            Save
                        </Button>
                    </Box>
                </Modal>

            </div>
        </div>
    );
};

export default AdminDashboard;