import React, { useEffect, useState } from "react";
import LocationMultiplexDropdown from "../components/LocationMultiplexDropdown/LocationMultiplexDropdown";
import NewReleases from "../components/NewReleases";
import UpcomingMovies from "../components/UpcomingMovies";
import MoviesByMultiplexService from "../services/MoviesByMultiplexService";
import NewReleasesService from "../services/NewReleasesService";
import UpcomingMoviesService from "../services/UpcomingMoviesService";

const MovieSelectionContainer = () => {
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
      console.error("Error fetching new releases:", error);
    }
  };
  const fetchMoviesByMultiplex = async (multiplexId) => {
    try {
      const MoviesByMultiplex =
        await MoviesByMultiplexService.getMoviesByMultiplex(multiplexId);
      SetmultiplexMovies(MoviesByMultiplex);
    } catch (error) {
      console.error("Error fetching all movies:", error);
    }
  };
  const today = new Date();
  useEffect(() => {
    SetMoviesData(
      multiplexMovies.filter((movie) => new Date(movie.releaseDate) > today)
    );
    SetNewReleasesData(
      multiplexMovies.filter((movie) => new Date(movie.releaseDate) <= today)
    );
  }, [multiplexMovies]);
  const fetchUpcomingMovies = async () => {
    try {
      const UpcomingMoviesData =
        await UpcomingMoviesService.getAllUpcomingMovies();
      SetMoviesData(UpcomingMoviesData);
    } catch (error) {
      console.error("Error fetching upcoming movies:", error);
    }
  };
  useEffect(() => {
    fetchNewReleases();
    fetchUpcomingMovies();
  }, []);
  useEffect(() => {
    fetchMoviesByMultiplex(multiplexId);
  }, [multiplexId]);
  console.log(multiplexMovies);
  const locationMultiplexId = (multiplexId) => {
    SetMultiplexId(multiplexId.multiplexId);
  };
  const locationId = (locationId) => {
    SetLocationDataId(locationId);
  };

  return (
    <div>
      <LocationMultiplexDropdown
        multiplexIdFunction={locationMultiplexId}
        isHome={true}
        locationIdFunction={locationId}
        isAdmin={false}
      />
      <NewReleases moviesData={NewReleasesData} seeAll={true} />
      <UpcomingMovies moviesData={moviesData} seeAll={true} />
    </div>
  );
};

export default MovieSelectionContainer;
