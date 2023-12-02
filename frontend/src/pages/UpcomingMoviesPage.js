import React, { useEffect, useState } from 'react'
import UpcomingMovies from '../components/UpcomingMovies';
import UpcomingMoviesService from '../services/UpcomingMoviesService';

const UpcomingMoviesPage = () => {
    const [moviesData, SetMoviesData]=useState([]);
    const fetchUpcomingMovies = async () => {
      try {
        const UpcomingMoviesData = await UpcomingMoviesService.getAllUpcomingMovies();
        SetMoviesData(UpcomingMoviesData);
      } catch (error) {
        console.error('Error fetching upcoming movies:', error);
      }
    };
    useEffect(() => {
      fetchUpcomingMovies();
    }, [])
  return (
    <div>
        <UpcomingMovies moviesData={moviesData} seeAll={false}/>
    </div>
  )
}

export default UpcomingMoviesPage