// select a theater
// display theater occupancy for last 30, 60, or 90 days (drop down) by location or movie (selection)

import React from 'react';
import { useState, useEffect } from 'react';
import api from '../../services/backend-api/api';
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
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('30');
  const [groupBy, setGroupBy] = useState('');

  const [occupancyData, setOccupancyData] = useState(null);

  useEffect(() => {
    const fetchOccupancyData = async () => {
      try {
        let endpoint;
        let selectedId;

        if (groupBy === 'location' && selectedTheater.theaterId) {
          endpoint = `api/theaters/${selectedTheater.theaterId}/occupancyByLocation`;
          selectedId = selectedTheater.theaterId;
        } else if (groupBy === 'movie' && selectedMovie.movieId) {
          endpoint = `api/theaters/occupancyByMovie`;
          selectedId = selectedMovie.movieId;
        }

        let response;
        if (endpoint && selectedId) {
          if (groupBy === 'location') {
            response = await api.get(`${endpoint}?days=${parseInt(selectedTimePeriod)}`);
          } else {
            response = await api.get(`${endpoint}?days=${parseInt(selectedTimePeriod)}&movieId=${selectedId}`);
          }
          setOccupancyData(response.data);
        }
      } catch (error) {
        console.error('Error fetching occupancy data:', error);
      }
    };

    console.log("GROUP BY:", groupBy, "SELECTED THEATER:", selectedTheater, "SELECTED MOVIE:", selectedMovie, "SELECTED TIME PERIOD:", selectedTimePeriod);

    if (groupBy && (selectedTheater || selectedMovie) && selectedTimePeriod) {
      fetchOccupancyData();
    }
  }, [groupBy, selectedTheater, selectedMovie, selectedTimePeriod]);



  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  const handleMultiplexChange = (multiplex) => {
    setSelectedMultiplex(multiplex);
  };

  const handleTheaterChange = (e) => {
    const selectedTheaterId = +e.target.value;
    const selectedTheater = theaterOptions.find(theater => {
      return theater.theaterId === selectedTheaterId;
    });
    setSelectedTheater(selectedTheater || null);
  };
  
  const handleMovieChange = (e) => {
    const selectedMovieId = +e.target.value;
    const selectedMovie = movieOptions.find(movie => movie.movieId === selectedMovieId);
    console.log('Selected Movie:', selectedMovie);
    setSelectedMovie(selectedMovie || null);
  };

  const handleTimePeriodChange = (e) => {
    console.log('Selected Time Period:', e.target.value);
    setSelectedTimePeriod(e.target.value);
  };



  useEffect(() => {
    const getTheatersByMultiplexId = async () => {
      try {
        setSelectedTheater(null);
        const response = await api.get(`api/theaters/getTheatersByMultiplexId/${selectedMultiplex.multiplexId}`);
        setTheaterOptions(response.data);
      } catch (error) {
        console.error('Error fetching theaters by multiplex ID:', error);
      }
    };

    const getMoviesByLocationId = async () => {
      try {
        setSelectedMovie(null);
        const response = await api.get(`api/movies/multiplex/${selectedMultiplex.multiplexId}`);
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
                onChange={handleTimePeriodChange}
              >
                <MenuItem value="30">Last 30 days</MenuItem>
                <MenuItem value="60">Last 60 days</MenuItem>
                <MenuItem value="90">Last 90 days</MenuItem>
              </Select>
            </FormControl>

            <div className="mt-3">
              {groupBy === 'location' && (
                <>
                  <Typography variant="h6">Theater Occupancy by Location</Typography>
                  {theaterOptions && theaterOptions.length > 0 && (
                    <FormControl>
                      <NativeSelect
                        value={selectedTheater ? selectedTheater.theaterId : ""}
                        onChange={handleTheaterChange}
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
                </>
              )}

              {groupBy === 'movie' && (
                <>
                  <Typography variant="h6">Theater Occupancy by Movie</Typography>
                  {movieOptions && movieOptions.length > 0 && (
                    <FormControl>
                    <NativeSelect
                      value={selectedMovie ? selectedMovie.movieId : ""}
                      onChange={handleMovieChange}
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
                </>
              )}
            </div>
          </CardContent>
        </Card>

      )}

      {occupancyData !== null && (selectedTheater || selectedMovie) && (
        <Typography>
          {console.log('Selected Theater:', selectedTheater)}
          {groupBy === 'location'
            ? `${selectedTheater ? selectedTheater.theaterName : 'Unknown Theater'} Occupancy: ${occupancyData}`
            : `${selectedMovie ? selectedMovie.title : 'Unknown Movie'} Occupancy: ${occupancyData}`}
        </Typography>
      )}
    </div>
  );
};

export default AnalyticsDashboard;
