import React, { useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import MultiplexService from '../../services/MultiplexService';
import LocationService from '../../services/LocationService';

const LocationMultiplexDropdown = ({ isAdmin, isHome, setAdminLocation, setAdminMultiplex, multiplexIdFunction, locationIdFunction }) => {
    const [locations, setLocations] = useState([]);
    const [multiplexOptions, setMultiplexOptions] = useState([]);
    const [locationName, setLocationName] = useState('');
    const [multiplex, setMultiplex] = useState({});
console.log(multiplex)
    const fetchLocationOptions = async () => {
        try {
            const locationData = await LocationService.getAllLocations();
            const options = locationData.map((locationObj) => ({
                locationId: locationObj.locationId,
                location: locationObj.location,
            }));
            setLocations(options);
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };

    const fetchMultiplexOptions = async (locationName) => {
        try {
            const locationNameData = await LocationService.getLocationByName(locationName);
            const locationId = locationNameData.locationId;
            locationIdFunction(locationId);
            const multiplexes = await MultiplexService.getMultiplexesByLocationId(locationId);
            const options = multiplexes.map((multiplex) => ({
                multiplexId: multiplex.multiplexId,
                location: locationNameData.location,
                locationName: multiplex.multiplexName,
            }));
            setMultiplexOptions(options);
        } catch (error) {
            console.error('Error fetching multiplex options:', error);
        }
    };

    const handleLocationChange = (e) => {
        setLocationName(e.target.value);
        setMultiplex({});
        fetchMultiplexOptions(e.target.value);
        if (isAdmin) {
            setAdminLocation(e.target.value);
            setAdminMultiplex({});
        }
    };

    const handleMultiplexChange = (e) => {
        const selectedMultiplex = multiplexOptions.find(option => option.locationName === e.target.value);
        setMultiplex(selectedMultiplex.locationName);
        setMultiplex(selectedMultiplex);
        multiplexIdFunction(selectedMultiplex);
        if (isAdmin) {
            console.log('Admin Multiplex:', selectedMultiplex);
            setAdminMultiplex(selectedMultiplex);
        }
    };

    useEffect(() => {
        fetchLocationOptions();
    }, []);

    return (
        <div className='flex gap-[30px] pl-[40px]  py-[25px]'>
            <FormControl size='medium' sx={{ marginBottom: '0rem' }}>
                <NativeSelect
                    variant='filled'
                    value={locationName}
                    onChange={handleLocationChange}
                    inputProps={{
                        name: 'locationName',
                        id: 'location-select',
                    }}
                >
                    <option value="">Select Location</option>
                    {locations.map((option) => (
                        <option key={option.locationId} value={option.location}>
                            {option.location}
                        </option>
                    ))}
                </NativeSelect>
            </FormControl>
            <FormControl sx={{ marginBottom: '0rem' }}>
                <NativeSelect
                    value={multiplex.locationName}
                    onChange={handleMultiplexChange}
                    inputProps={{
                        name: 'multiplex',
                        id: 'multiplex-select',
                    }}
                    disabled={!locationName}
                >
                    <option value="">Select Multiplex</option>
                    {multiplexOptions.map((option) => (
                        <option key={option.multiplexId} value={option.locationName}>
                            {option.locationName}
                        </option>
                    ))}
                </NativeSelect>
            </FormControl>
        </div>
    );
}

export default LocationMultiplexDropdown;
