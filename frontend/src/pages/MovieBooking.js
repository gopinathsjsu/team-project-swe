import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

const MovieBooking = () => {
    const { id } = useParams();
    const [moviesData, SetMoviesData]=useState([]);
    const [movieInformation, SetMovieInformation]=useState([]);
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMTQ5NThhNDY2M2Y4OGFkZmI2MjhkZTI2NWJhZmZkZSIsInN1YiI6IjY1NDE0MzViNmNhOWEwMDBlYmVlODdmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UARFyhM8sMafq8wmQRvRyD1g6niYjzf36xBqImntH-o'
        }
      };
      
      useEffect(()=>{
        fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
        .then(response => response.json())
        .then(response => SetMoviesData(response.results))
        .catch(err => console.error(err));
   
      },[])
      useEffect(()=>{
        SetMovieInformation(moviesData.filter(data=>data.id==id)[0])
      },[moviesData])
      console.log(movieInformation)
     
  return (
    <div>
        {movieInformation && 
        <div>
            <h1>{movieInformation.title}</h1>
            <h1>{movieInformation.overview}</h1>
            
            <h1>{movieInformation.popularity}</h1>
        </div>}
    </div>
  )
}

export default MovieBooking