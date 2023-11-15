// get movie schedule for a specific multiplex
// Add/update/remove: movies, showtimes, and theater assignments in that schedule

// set seating capacity of theaters

// set discount prices for shows before 6pm and for Tuesday shows

import React, { useState } from 'react';
import { FormControl, InputLabel, NativeSelect, Card, CardContent } from '@mui/material';

import EditTheaterCapacity from '../../components/admin/EditTheaterCapacity';
import EditDiscountPrices from '../../components/admin/EditDiscountPrices';
// import EditMovieSchedule from '../../components/admin/EditMovieSchedule';
import MovieSchedule from '../../components/schedule/MovieSchedule';

const AdminDashboard = () => {
    const [location, setLocation] = useState('');
    const [multiplex, setMultiplex] = useState('');

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
        setMultiplex('');
    };

    const handleMultiplexChange = (e) => {
        setMultiplex(e.target.value);
    };

    const getMultiplexOptions = () => {
        switch (location) {
            case 'San Jose, CA':
                return ['AMC Mercado', 'AMC SJ'];
            case 'San Francisco, CA':
                return ['AMC SF', 'AMC South SF'];
            case 'Fremont, CA':
                return ['AMC Fremont', 'AMC Pacific Commons'];
            default:
                return [];
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card>
                <CardContent>
                    <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
                        <NativeSelect
                            value={location}
                            onChange={handleLocationChange}
                            inputProps={{
                                name: 'location',
                                id: 'location-select',
                            }}
                        >
                            <option value="">Select Location</option>
                            <option value="San Jose, CA">San Jose, CA</option>
                            <option value="San Francisco, CA">San Francisco, CA</option>
                            <option value="Fremont, CA">Fremont, CA</option>
                        </NativeSelect>
                    </FormControl>

                    <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
                        <NativeSelect
                            value={multiplex}
                            onChange={handleMultiplexChange}
                            inputProps={{
                                name: 'multiplex',
                                id: 'multiplex-select',
                            }}
                            disabled={!location}
                        >
                            <option value="">Select Multiplex</option>
                            {getMultiplexOptions().map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </NativeSelect>
                    </FormControl>
                </CardContent>
            </Card>

            <EditTheaterCapacity />
            <EditDiscountPrices />
            {multiplex && <MovieSchedule multiplexId={multiplex.multiplexId} isAdmin={true} />}
        </div>

    );

}

export default AdminDashboard;
