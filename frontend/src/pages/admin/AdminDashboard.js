// get movie schedule for a specific multiplex
// Add/update/remove: movies, showtimes, and theater assignments in that schedule

// set seating capacity of theaters

// set discount prices for shows before 6pm and for Tuesday shows

import React, {useState} from 'react';
import Grid from '@mui/material/Grid';
import AdminScheduleCard from '../../components/admin/AdminScheduleCard';
import AdminDiscountPricesCard from '../../components/admin/AdminDiscountPriceCard';
import LocationMultiplexDropdown from '../../components/LocationMultiplexDropdown/LocationMultiplexDropdown';
import EditMovieForm from '../../components/admin/movie/EditMovieForm';
import EditTheaterForm from '../../components/admin/theater/EditTheaterForm';
import EditShowtimeForm from '../../components/admin/showtime/EditShowtimeForm';
import RemoveMovieModal from '../../components/admin/movie/RemoveMovieModal';

import ScheduleService from '../../services/ScheduleService';
import RemoveShowtimeModal from '../../components/admin/showtime/RemoveShowtimeModal';
import ShowtimeService from '../../services/ShowtimeService';
import AddShowtimeModal from '../../components/admin/showtime/AddShowtimeForm';

const AdminDashboard = () => {
    
    // states for dropdown
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedMultiplex, setSelectedMultiplex] = useState({});
    
    // states for capacity and discount cards
    const [capacity, setCapacity] = useState(100);
    const [discountPricesData, setDIscountPricesData] = useState({});


    // states to be passed to editing modals
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedTheater, setSelectedTheater] = useState(null);
    const [selectedShowtime, setSelectedShowtime] = useState(null);

    // open/closed states for editing modals
    const [isEditMovieOpen, setEditMovieOpen] = useState(false);
    const [isRemoveMovieOpen, setRemoveMovieOpen] = useState(false);
    const [isAddMovieOpen, setAddMovieOpen] = useState(false);
    const [isEditShowtimeOpen, setEditShowtimeOpen] = useState(false);
    const [isRemoveShowtimeOpen, setRemoveShowtimeOpen] = useState(false);
    const [isAddShowtimeOpen, setAddShowtimeOpen] = useState(false);
    const [isEditTheaterOpen, setEditTheaterOpen] = useState(false);
    

    const handleEditMovie = (movie) => {
        setSelectedMovie(movie);
        setEditMovieOpen(true);
        console.log('Editing movie:', movie);
    };

    const handleRemoveMovie = (movie) => {
        setRemoveMovieOpen(true);
        console.log('Removing movie from schedule:', movie);
    };

    const addMovieToSchedule = (movie) => {
        setSelectedMovie(movie);
        setAddMovieOpen(true);
        console.log('Adding movie to schedule:', movie);
    };

    const handleEditTheater = (movie, theater) => {
        setSelectedTheater(theater);
        setEditTheaterOpen(true);
        console.log('Editing theater:', movie, theater);
    };

    const handleEditShowtime = (movie, showtime) => {
        setSelectedShowtime(showtime);
        setEditShowtimeOpen(true);
        console.log('Editing showtime:', movie, showtime);
    };

    const handleDeleteShowtime = (movie, showtime) => { 
        setSelectedShowtime(showtime);
        setRemoveShowtimeOpen(true);
        console.log('Removing showtime:', movie, showtime);
    };

    const handleAddShowtime = (movie, showtime, theater) => {
        setSelectedShowtime(showtime);
        setSelectedMovie(movie);
        setSelectedTheater(theater);
        setAddShowtimeOpen(true);
        console.log('Adding showtime:', movie, showtime);
    };

    const handleLocationChange = (location) => {
        setSelectedMultiplex({});

        console.log('Selected Location:', location);
        setSelectedLocation(location);
        
    };

    const handleMultiplexChange = (multiplex) => {
        console.log('Selected Multiplex:', multiplex);
        setSelectedMultiplex(multiplex);
    };

    const handleDiscountPricesUpdate = (newDiscountPrices) => {
        console.log('Updating discount prices:', newDiscountPrices);
        setDIscountPricesData(newDiscountPrices);
    };

    const onRemoveMovieConfirm = (movie) => {
        console.log('Removing movie:', movie);
        ScheduleService.removeMovieFromSchedule(movie.movieId, selectedMultiplex.multiplexId);
    }

    const onAddMovieConfirm = (movie) => {
        console.log('Adding movie:', movie);
        ScheduleService.addMovieToSchedule(movie.movieId, selectedMultiplex.multiplexId);
    }

    const onRemoveShowtimeConfirm = (showtime) => {
        console.log('Removing showtime:', showtime);
        ShowtimeService.removeShowtime(showtime.showtimeId);
    }

    return (
        <div>
            <LocationMultiplexDropdown
                isAdmin={true}
                setAdminLocation={handleLocationChange}
                setAdminMultiplex={handleMultiplexChange}
            />
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <AdminScheduleCard 
                        multiplexId={selectedMultiplex.multiplexId} 
                        onEditMovie={handleEditMovie}
                        onRemoveMovie={handleRemoveMovie}
                        onEditTheater={handleEditTheater}
                        onEditShowtime={handleEditShowtime}
                        onDeleteShowtime={handleDeleteShowtime}
                    />
                </Grid>
                {/* <Grid item xs={12} sm={6} md={4}>
                    <AdminCapacityCard capacity={capacity} onUpdateCapacity={handleCapacityUpdate} />
                </Grid> */}
                <Grid item xs={12} sm={6} md={4}>
                    <AdminDiscountPricesCard
                        discountPrices={discountPricesData}
                        onUpdateDiscountPrices={handleDiscountPricesUpdate}
                    />
                </Grid>
            </Grid>
            <EditMovieForm isOpen={isEditMovieOpen} onClose={() => setEditMovieOpen(false)} onSave={() => {}} movie={selectedMovie} />
            <EditTheaterForm isOpen={isEditTheaterOpen} onClose={() => setEditTheaterOpen(false)} onSave={() => {}} theater={selectedTheater} />
            <EditShowtimeForm isOpen={isEditShowtimeOpen} onClose={() => setEditShowtimeOpen(false)} onSave={() => {}} showtime={selectedShowtime} />
            <RemoveMovieModal isOpen={isRemoveMovieOpen} onClose={() => setRemoveMovieOpen(false)} onConfirm={onRemoveMovieConfirm} movie={selectedMovie} />
            <RemoveShowtimeModal isOpen={isRemoveShowtimeOpen} onClose={() => {}} onConfirm={onRemoveShowtimeConfirm} showtime={selectedShowtime} />
            {/* <AddMovieForm isOpen={isAddMovieOpen} onClose={() => setAddMovieOpen(false)} onConfirm={onAddMovieConfirm} /> */}
            {/* <AddShowtimeModal isOpen={isAddShowtimeOpen}
                onClose={() => setAddShowtimeOpen(false)} 
                onSave={handleAddShowtime} 
                movieId={selectedMovie.movieId} 
                theaterId={selectedTheater.theaterId}
                multiplexId={selectedMultiplex.multiplexId}
            /> */}
        </div>
    );
};

export default AdminDashboard;
