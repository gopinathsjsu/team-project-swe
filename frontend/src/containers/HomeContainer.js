import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import api from '../services/backend-api/api';
import axios from 'axios';
import CarouselComponent from '../components/Carousel'
import UpcomingMovies from '../components/UpcomingMovies'
import NewReleases from '../components/NewReleases';
import LocationMultiplexDropdown from '../components/LocationMultiplexDropdown/LocationMultiplexDropdown';
import NewReleasesService from '../services/NewReleasesService';
import UpcomingMoviesService from '../services/UpcomingMoviesService';
import MoviesByMultiplexService from '../services/MoviesByMultiplexService';

const HomeContainer = ({ isAdmin }) => {
  const [moviesData, SetMoviesData] = useState([]);
  const [NewReleasesData, SetNewReleasesData] = useState([]);
  const [multiplex, setMultiplex] = useState({});
  const [location, setLocation] = useState('');
  const [multiplexMovies, SetmultiplexMovies] = useState([]);
  
  const fetchNewReleases = async () => {
    try {
      // const NewReleasesData = await api.get('/api/movies/getNewReleases');
      const NewReleasesData = await axios.get('https://54.176.16.148:8080/api/movies/getNewReleases');
      console.log("New Release Data: ", NewReleasesData.data);
      SetNewReleasesData(NewReleasesData.data);
    } catch (error) {
      console.error('Error fetching new releases:', error);
    }
  };

  const fetchMoviesByMultiplex = async (multiplexId) => {
    try {
      const moviesByMultiplex = await MoviesByMultiplexService.getMoviesByMultiplex(multiplexId);
      if (moviesByMultiplex && Array.isArray(moviesByMultiplex)) {
        console.log("Movies by Multiplex: ", moviesByMultiplex);
        SetmultiplexMovies(moviesByMultiplex);
      } else {
        console.error('Invalid or empty data returned by MoviesByMultiplexService');
      }
    } catch (error) {
      console.error('Error fetching movies by multiplex:', error);
    }
  };
  
  useEffect(() => {
    const today = new Date();
    const upcomingMovies = multiplexMovies.filter(movie => new Date(movie.releaseDate) > today);
    SetMoviesData(upcomingMovies);
    SetNewReleasesData(multiplexMovies.filter(movie => new Date(movie.releaseDate) <= today));
  }, [multiplexMovies]);

  const fetchUpcomingMovies = async () => {
    try {
      const UpcomingMoviesData = await axios.get('https://54.176.16.148:8080/api/movies/getUpcomingMovies');
      SetMoviesData(UpcomingMoviesData.data);
    } catch (error) {
      console.error('Error fetching upcoming movies:', error);
    }
  };

  useEffect(() => {
    fetchNewReleases();
    fetchUpcomingMovies();
  }, [])

  useEffect(() => {
    if (multiplex.multiplexId) {
      fetchMoviesByMultiplex(multiplex.multiplexId)
    }
  }, [multiplex.multiplexId])
  console.log(multiplexMovies)

  const handleSetMultiplex = (multiplex) => {
    setMultiplex(multiplex);
  }

  const handleSetLocation = (location) => {
    setLocation(location);
  }

  return (
    <div>
      {/* <NavBar isAdmin={isAdmin} /> */}
      <CarouselComponent />
      <LocationMultiplexDropdown onSelectLocation={handleSetLocation} onSelectMultiplex={handleSetMultiplex} />
      <NewReleases moviesData={NewReleasesData} seeAll={true} />
      <UpcomingMovies moviesData={moviesData} seeAll={true} />
    </div>
  )
}

export default HomeContainer;
