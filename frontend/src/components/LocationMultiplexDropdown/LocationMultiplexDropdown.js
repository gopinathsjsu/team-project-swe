import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import NativeSelect from '@mui/material/NativeSelect';
import FormControl from '@mui/material/FormControl';


const LocationMultiplexDropdown = () => {
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
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </NativeSelect>
                    </FormControl>
                
        </div>)
}

export default LocationMultiplexDropdown