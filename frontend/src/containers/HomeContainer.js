import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
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
      const NewReleasesData = await NewReleasesService.getAllNewReleases();
      SetNewReleasesData(NewReleasesData);
    } catch (error) {
      console.error('Error fetching new releases:', error);
    }
  };

  const fetchMoviesByMultiplex = async (multiplexId) => {
    try {
      const MoviesByMultiplex = await MoviesByMultiplexService.getMoviesByMultiplex(multiplexId);
      console.log(MoviesByMultiplex);
      SetmultiplexMovies(MoviesByMultiplex);
    } catch (error) {
      console.error('Error fetching all movies:', error);
    }
  };
  
  useEffect(() => {
    const today = new Date();
    SetMoviesData(multiplexMovies.filter(movie => new Date(movie.releaseDate) > today))
    SetNewReleasesData(multiplexMovies.filter(movie => new Date(movie.releaseDate) <= today))
  }, [multiplexMovies]);

  const fetchUpcomingMovies = async () => {
    try {
      const UpcomingMoviesData = await UpcomingMoviesService.getAllUpcomingMovies();
      SetMoviesData(UpcomingMoviesData);
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
