// get movie schedule for a specific multiplex
// Add/update/remove: movies, showtimes, and theater assignments in that schedule

// set seating capacity of theaters

// set discount prices for shows before 6pm and for Tuesday shows

import React, { useState } from 'react';
import { Card, CardContent } from '@mui/material';

import EditTheaterCapacity from '../../components/admin/EditTheaterCapacity';
import EditDiscountPrices from '../../components/admin/EditDiscountPrices';
import MovieSchedule from '../../components/schedule/MovieSchedule';
import LocationMultiplexDropdown from '../../components/LocationMultiplexDropdown/LocationMultiplexDropdown';

const AdminDashboard = () => {
    const [location, setAdminLocation] = useState('');
    const [multiplex, setAdminMultiplex] = useState({});

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card>
                <CardContent>
                    {/* pass the set methods to the child, so that we can retrieve the value here in the parent class */}
                    <LocationMultiplexDropdown isAdmin={true} setAdminLocation={setAdminLocation} setAdminMultiplex={setAdminMultiplex} />
                </CardContent>
            </Card>

            <EditTheaterCapacity />
            <EditDiscountPrices />
            {multiplex && <MovieSchedule multiplexId={multiplex.multiplexId} isAdmin={true} />}
        </div>

    );

}

export default AdminDashboard;


    // const handleLocationChange = (e) => {
    //     setLocation(e.target.value);
    //     setMultiplex('');
    // };

    // const handleMultiplexChange = (e) => {
    //     setMultiplex(e.target.value);
    // };

    // const getMultiplexOptions = () => {
    //     switch (location) {
    //         case 'San Jose, CA':
    //             return ['AMC Mercado', 'AMC SJ'];
    //         case 'San Francisco, CA':
    //             return ['AMC SF', 'AMC South SF'];
    //         case 'Fremont, CA':
    //             return ['AMC Fremont', 'AMC Pacific Commons'];
    //         default:
    //             return [];
    //     }
    // };
