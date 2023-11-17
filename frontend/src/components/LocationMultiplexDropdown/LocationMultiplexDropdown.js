import React, { useState } from 'react';
import NativeSelect from '@mui/material/NativeSelect';
import FormControl from '@mui/material/FormControl';


const LocationMultiplexDropdown = ({ isAdmin, setAdminLocation, setAdminMultiplex }) => {
    const [location, setLocation] = useState('');
    const [multiplex, setMultiplex] = useState({});

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
        setMultiplex({});

        if (isAdmin) {
            setAdminLocation(e.target.value)
            setAdminMultiplex({});
        }
       
    };

    const handleMultiplexChange = (e) => {
        setMultiplex(e.target.value);
        if (isAdmin) {
            setAdminMultiplex(e.target.value)
        }
        
    };

    const getMultiplexOptions = () => {
        switch (location) {
            case 'San Jose, CA':
                return [{multiplexId: 0, location: 'San Jose, CA', name: 'AMC Mercado'}, {multiplexId: 1, location: 'San Jose, CA', name: 'AMC SJ'}];
            case 'San Francisco, CA':
                return [{multiplexId: 2, location: 'San Francisco, CA', name: 'AMC SF'}, {multiplexId: 3, location: 'San Francisco, CA', name: 'AMC South SF'}];
            case 'Fremont, CA':
                return [{multiplexId: 4, location: 'Fremont, CA', name: 'AMC Fremont'}, {multiplexId: 5, location: 'Fremont, CA', name: 'AMC Pacific Commons'}];
            default:
                return [];
        }
    };

    return (
        <div className='flex gap-[30px] pl-[40px]  py-[25px]'>
                    <FormControl  size='medium' sx={{ marginBottom: '0rem' }}>
                        <NativeSelect
                            variant='filled'
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

                    <FormControl sx={{ marginBottom: '0rem' }}>
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
                                <option key={option.multiplexId} value={option.name}>
                                    {option.name}
                                </option>
                            ))}
                        </NativeSelect>
                    </FormControl>
                
        </div>)
}

export default LocationMultiplexDropdown
