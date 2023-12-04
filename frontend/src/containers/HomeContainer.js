import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import CarouselComponent from '../components/Carousel'
import UpcomingMovies from '../components/UpcomingMovies'
import NewReleases from '../components/NewReleases';
import LocationMultiplexDropdown from '../components/LocationMultiplexDropdown/LocationMultiplexDropdown';
import NewReleasesService from '../services/NewReleasesService';
import UpcomingMoviesService from '../services/UpcomingMoviesService';
import MoviesByMultiplexService from '../services/MoviesByMultiplexService';

const HomeContainer = () => {
  const [moviesData, SetMoviesData] = useState([]);
  const [NewReleasesData, SetNewReleasesData] = useState([]);
  const [multiplexId, SetMultiplexId] = useState(null);
  const [locationDataId, SetLocationDataId] = useState(null);
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
      SetmultiplexMovies(MoviesByMultiplex);
    } catch (error) {
      console.error('Error fetching all movies:', error);
    }
  };
  const today = new Date();
  useEffect(() => {
    SetMoviesData(multiplexMovies.filter(movie => new Date(movie.releaseDate) > today))
    SetNewReleasesData(multiplexMovies.filter(movie => new Date(movie.releaseDate) <= today))
  }, [multiplexMovies])
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
    fetchMoviesByMultiplex(multiplexId)
  }, [multiplexId])
  console.log(multiplexMovies)
  const locationMultiplexId = (multiplexId) => {
    SetMultiplexId(multiplexId.multiplexId)
  }
  const locationId = (locationId) => {
    SetLocationDataId(locationId)
  }

  return (
    <div>
<<<<<<< Updated upstream
      <NavBar />
=======
      {/* <NavBar isAdmin={isAdmin} /> */}
>>>>>>> Stashed changes
      <CarouselComponent />
      <LocationMultiplexDropdown multiplexIdFunction={locationMultiplexId} isHome={true} locationIdFunction={locationId} isAdmin={false} />
      <NewReleases moviesData={NewReleasesData} seeAll={true} />
      <UpcomingMovies moviesData={moviesData} seeAll={true} />
    </div>
  )
}

export default HomeContainer;
