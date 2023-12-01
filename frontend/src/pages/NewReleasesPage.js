import React, { useEffect, useState } from 'react'
import NewReleases from '../components/NewReleases';
import axios from 'axios';
const NewReleasesPage = () => {
    const [moviesData, SetMoviesData]=useState([]);
    useEffect(() => {
      axios.get("http://localhost:8080/api/movies/getNewReleases").then(res => SetMoviesData(res.data)).catch(er => console.log(er))
    }, [])
  return (
    <div>
        <NewReleases moviesData={moviesData} seeAll={false}/>
    </div>
  )
}

export default NewReleasesPage