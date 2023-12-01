import React, { useEffect, useState } from 'react'
import UpcomingMovies from '../components/UpcomingMovies';
import axios from 'axios';
const UpcomingMoviesPage = () => {
    const [moviesData, SetMoviesData]=useState([]);
    useEffect(() => {
      axios.get("http://localhost:8080/api/movies/getUpcomingMovies").then(res => SetMoviesData(res.data)).catch(er => console.log(er))
    }, [])
  return (
    <div>
        <UpcomingMovies moviesData={moviesData} seeAll={false}/>
    </div>
  )
}

export default UpcomingMoviesPage