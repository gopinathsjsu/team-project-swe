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
        const selectedMultiplex = getMultiplexOptions().find(option => option.locationName === e.target.value);
        console.log('Selected Multiplex:', selectedMultiplex);
        setMultiplex(selectedMultiplex);
    
        if (isAdmin) {
            console.log('Admin Multiplex:', selectedMultiplex);
            setAdminMultiplex(selectedMultiplex);
        }
    };

    const getMultiplexOptions = () => {
        switch (location) {
            case 'San Jose, CA':
                return [{multiplexId: 5, location: 'San Jose, CA', locationName: 'AMC SJ'}];
            case 'New York, NY':
                return [{multiplexId: 6, location: 'New York, NY', locationName: 'Regal Times Square'}];
            case 'Los Angeles, CA':
                return [{multiplexId: 7, location: 'Los Angeles, CA', locationName: 'Cineplex LA'}];
            case 'Chicago, IL':
                return [{multiplexId: 8, location: 'Chicago, IL', locationName: 'Cineplex LA'}];
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
                            <option value="New York, NY">New York, NY</option>
                            <option value="Los Angeles, CA">Los Angeles, CA</option>
                            <option value="Chicago, IL">Chicago, IL</option>
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
                                <option key={option.multiplexId} value={option.locationName}>
                                    {option.locationName}
                                </option>
                            ))}
                        </NativeSelect>
                    </FormControl>
                
        </div>)
}

export default LocationMultiplexDropdown
