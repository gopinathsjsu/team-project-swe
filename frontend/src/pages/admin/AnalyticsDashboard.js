// select a theater
// display theater occupancy for last 30, 60, or 90 days (drop down) by location or movie (selection)

import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  Typography,
} from '@mui/material';

import LocationMultiplexDropdown from "../../components/LocationMultiplexDropdown/LocationMultiplexDropdown";

const AnalyticsDashboard = () => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedMultiplex, setSelectedMultiplex] = useState({});
  const [theaterOptions, setTheaterOptions] = useState([]);
  const [movieOptions, setMovieOptions] = useState([]);
  const [selectedTheater, setSelectedTheater] = useState('');
  const [selectedMovie, setSelectedMovie] = useState('');
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('30');
  const [groupBy, setGroupBy] = useState('');
  const [theaterOccupancy, setTheaterOccupancy] = useState(null);

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  const handleMultiplexChange = (multiplex) => {
    setSelectedMultiplex(multiplex);
  };

  useEffect(() => {
    const getTheatersByMultiplexId = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/theaters/getTheatersByMultiplexId/${selectedMultiplex.multiplexId}`);
        setTheaterOptions(response.data);
      } catch (error) {
        console.error('Error fetching theaters by multiplex ID:', error);
      }
    };

    const getMoviesByLocationId = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/movies/multiplex/${selectedMultiplex.multiplexId}`);
        setMovieOptions(response.data);
      } catch (error) {
        console.error('Error fetching movies by location ID:', error);
      }
    };

    if (selectedMultiplex.multiplexId) {
      getTheatersByMultiplexId();
      getMoviesByLocationId();
    }
  }, [selectedMultiplex]);

  useEffect(() => {
    const getTheaterOccupancyByLocation = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/theaters/${selectedTheater}/occupancyByLocation`, {
          params: {
            days: parseInt(selectedTimePeriod),
          },
        });
        console.log('PRINTING OCCUPANCY:', response.data);
        setTheaterOccupancy(response.data);
      } catch (error) {
        console.error('Error fetching theater occupancy by location:', error);
      }
    };

    if (selectedLocation.locationId && selectedTheater.theaterId && selectedTimePeriod) {
      getTheaterOccupancyByLocation();
    }
  }, [selectedLocation, selectedTheater, selectedTimePeriod]);

  useEffect(() => {
    const getTheaterOccupancyByMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/theaters/occupancyByMovie`, {
          params: {
            movieId: selectedMovie.movieId,
            days: parseInt(selectedTimePeriod),
          },
        });
        console.log('PRINTING OCCUPANCY:', response.data);
        setTheaterOccupancy(response.data);
      } catch (error) {
        console.error('Error fetching theater occupancy by movie:', error);
      }
    };

    if (selectedLocation.locationId && selectedTheater.theaterId && selectedTimePeriod) {
      getTheaterOccupancyByMovie();
    }
  }, [selectedLocation, selectedTheater, selectedMovie, selectedTimePeriod]);

  return (
    <div className="p-6">
      <Card className="mb-4">
        <CardContent>
          <Typography variant="h5">Analytics Dashboard</Typography>
          <Typography variant="p">View Theater occupancy by Location or Movie</Typography>
        </CardContent>

        <CardContent>
          <LocationMultiplexDropdown
            onSelectLocation={handleLocationChange}
            onSelectMultiplex={handleMultiplexChange}
          />
        </CardContent>
      </Card>

      {selectedMultiplex && selectedMultiplex.multiplexId && (
        <Card className="mb-4">
          <CardContent>
            <Typography variant="h6">Group by:</Typography>
            <ButtonGroup color="secondary">
              <Button onClick={() => setGroupBy('location')}>By Location</Button>
              <Button onClick={() => setGroupBy('movie')}>By Movie</Button>
            </ButtonGroup>
            <FormControl className="mt-3">
              <InputLabel>Time Period</InputLabel>
              <Select
                value={selectedTimePeriod}
                onChange={(e) => {
                  console.log('selected time period:', e.target.value);
                  setSelectedTimePeriod(e.target.value);
                }}
              >
                <MenuItem value="30">Last 30 days</MenuItem>
                <MenuItem value="60">Last 60 days</MenuItem>
                <MenuItem value="90">Last 90 days</MenuItem>
              </Select>
            </FormControl>

            {groupBy === 'location' && (
              <>
                <div className="mt-3">
                  <Typography variant="h6">Theater Occupancy by Location</Typography>
                  {theaterOptions && theaterOptions.length > 0 && (
                    <FormControl>
                      <NativeSelect
                        value=""
                        onChange={(e) => {
                          console.log('selected theater:', e.target.value);
                          setSelectedTheater(theaterOptions.find((theater) => theater.theaterId === e.target.value) || {});
                        }}
                      >
                        <option value="" disabled>
                          Select a theater
                        </option>
                        {theaterOptions.map((theater) => (
                          <option key={theater.theaterId} value={theater.theaterId}>
                            {theater.theaterName}
                          </option>
                        ))}
                      </NativeSelect>
                    </FormControl>
                  )}
                </div>
                {selectedTheater && (
                  <>
                    {theaterOccupancy ? (
                      <Typography>
                        {selectedTheater.theaterName} Occupancy: {theaterOccupancy}
                      </Typography>
                    ) : (
                      <Typography>
                        {selectedTheater.theaterName} Occupancy: 0
                      </Typography>
                    )}
                  </>
                  
                )}
                
              </>
            )}

            {groupBy === 'movie' && (
              <>
                <div className="mt-3">
                  <Typography variant="h6">Theater Occupancy by Movie</Typography>
                  {movieOptions && movieOptions.length > 0 && (
                    <FormControl>
                      <NativeSelect
                        value=""
                        onChange={(e) => {
                          console.log('selected movie:', e.target.value);
                          setSelectedMovie(movieOptions.find((movie) => movie.movieId === e.target.value) || {});
                        }}
                      >
                        <option value="" disabled>
                          Select a movie
                        </option>
                        {movieOptions.map((movie) => (
                          <option key={movie.movieId} value={movie.movieId}>
                            {movie.title}
                          </option>
                        ))}
                      </NativeSelect>
                    </FormControl>
                  )}
                </div>
                {selectedMovie && (
                  <>
                    {theaterOccupancy ? (
                      <Typography>
                        {selectedTheater.theaterName} Occupancy: {theaterOccupancy}
                      </Typography>
                    ) : (
                      <Typography>
                        {selectedTheater.theaterName} Occupancy: 0
                      </Typography>
                    )}
                  </>
                  
                )}
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AnalyticsDashboard;

