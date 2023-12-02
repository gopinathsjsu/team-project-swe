import React, { useEffect, useState } from "react";
import LocationMultiplexDropdown from "../components/LocationMultiplexDropdown/LocationMultiplexDropdown";
import NewReleases from "../components/NewReleases";
import UpcomingMovies from "../components/UpcomingMovies";

const MovieSelectionContainer = () => {
  const [moviesData, SetMoviesData] = useState([]);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMTQ5NThhNDY2M2Y4OGFkZmI2MjhkZTI2NWJhZmZkZSIsInN1YiI6IjY1NDE0MzViNmNhOWEwMDBlYmVlODdmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UARFyhM8sMafq8wmQRvRyD1g6niYjzf36xBqImntH-o",
    },
  };

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((response) => SetMoviesData(response.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <LocationMultiplexDropdown isAdmin={false} />
      <NewReleases moviesData={moviesData} seeAll={true} />
      <UpcomingMovies moviesData={moviesData} seeAll={true} />
    </div>
  );
};

export default MovieSelectionContainer;
