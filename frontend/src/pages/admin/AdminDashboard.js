// get movie schedule for a specific multiplex
// Add/update/remove: movies, showtimes, and theater assignments in that schedule

// set seating capacity of theaters

// set discount prices for shows before 6pm and for Tuesday shows

import React, {useState, useEffect} from 'react';
import dayjs from 'dayjs';
import LocationMultiplexDropdown from '../../components/LocationMultiplexDropdown/LocationMultiplexDropdown';
import EditMovieModal from '../../components/admin/movie/EditMovieModal';
import AddMovieModal from '../../components/admin/movie/AddMovieModal';
import CreateMovieModal from '../../components/admin/movie/CreateMovieModal';
import RemoveMovieModal from '../../components/admin/movie/RemoveMovieModal';

import axios from 'axios';

import { Alert, Button } from '@mui/material';
// import ScheduleService from '../../services/ScheduleService';
import MovieService from '../../services/MovieService';

import ScheduleService from '../../services/ScheduleService';


const AdminDashboard = () => {
    
    // states for dropdown
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedMultiplex, setSelectedMultiplex] = useState({});
    const [movieSchedule, setMovieSchedule] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("Selected Multiplex:", selectedMultiplex);
        const fetchMovieSchedule = async () => {
            try {
                setLoading(true);

                const response = await axios.get(`http://localhost:8080/api/schedules/multiplex/${selectedMultiplex.multiplexId}`);
                setMovieSchedule(response.data);

                console.log('Movie Schedule:', response.data);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching movie schedules:', error);
                setLoading(false);
            }
        };

        // Fetch movie schedules only if multiplexId is available
        if (selectedMultiplex.multiplexId !== undefined) {
            fetchMovieSchedule();
        }
    }, [selectedMultiplex]);
    
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

    const [selectedMovie, setSelectedMovie] = useState({});
    const [selectedRemoveMovie, setSelectedRemoveMovie] = useState({});

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
    


    return (
        <div>
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

                        {/* Display showtimes for the selected movie and multiplex */}
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
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
