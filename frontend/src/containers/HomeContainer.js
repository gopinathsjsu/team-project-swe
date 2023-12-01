import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import CarouselComponent from '../components/Carousel'
import UpcomingMovies from '../components/UpcomingMovies'
import NewReleases from '../components/NewReleases';
// import LocationHome from '../components/LocationHome';
import LocationMultiplexDropdown from '../components/LocationMultiplexDropdown/LocationMultiplexDropdown';
import axios from 'axios';
import NewReleasesService from '../services/NewReleasesService';
import UpcomingMoviesService from '../services/UpcomingMoviesService';

const HomeContainer = () => {
  const [moviesData, SetMoviesData] = useState([]);
  const [NewReleasesData, SetNewReleasesData] = useState([]);
  const [multiplexId, SetMultiplexId] = useState(null);
  const [locationDataId, SetLocationDataId] = useState(null);
  const [UpcomingMoviesDataByMultiplex, SetUpcomingMoviesDataByMultiplex] = useState([]);
  const [UpcomingMoviesFinalData, SetUpcomingMoviesFinalData] = useState([]);
  const fetchNewReleases = async () => {
    try {
      const NewReleasesData = await NewReleasesService.getAllNewReleases();
      // console.log("Nitya", NewReleasesData);
      SetNewReleasesData(NewReleasesData);
    } catch (error) {
      console.error('Error fetching new releases:', error);
    }
  };
  const fetchUpcomingMovies = async () => {
    try {
      const UpcomingMoviesData = await UpcomingMoviesService.getAllUpcomingMovies();
      // console.log("Nitya", UpcomingMoviesData);
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
    axios.get(`http://localhost:8080/api/multiplexes/get/${locationDataId}`).then(res => SetUpcomingMoviesDataByMultiplex(res.data)).catch(er => console.log(er))
  }, [locationDataId])
  useEffect(() => {
    const data = UpcomingMoviesDataByMultiplex.find(data => data.multiplexId === multiplexId.multiplexId)
    // console.log("myMultiplexId",multiplexId)
    // console.log(data?.theaters)

  }, [multiplexId])
  const locationMultiplexId = (multiplexId) => {
    SetMultiplexId(multiplexId)
  }
  const locationId = (locationId) => {
    SetLocationDataId(locationId)
  }
  // console.log("multiplexId",multiplexId)
  // console.log("locationId",locationDataId)
  return (
    <div>
      <NavBar />
      <CarouselComponent />
      {/* <LocationHome/> */}
      <LocationMultiplexDropdown multiplexIdFunction={locationMultiplexId} isHome={true} locationIdFunction={locationId} isAdmin={false} />
      <NewReleases moviesData={NewReleasesData} seeAll={true} />
      <UpcomingMovies moviesData={moviesData} seeAll={true} />
    </div>
  )
}

export default HomeContainer;
