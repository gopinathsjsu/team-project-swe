import React, { useEffect, useState } from 'react'
import NewReleases from '../components/NewReleases';
import NewReleasesService from '../services/NewReleasesService';

const NewReleasesPage = () => {
    const [moviesData, SetMoviesData]=useState([]);
    const fetchNewReleases = async () => {
      try {
        const NewReleasesData = await NewReleasesService.getAllNewReleases();
        SetMoviesData(NewReleasesData);
      } catch (error) {
        console.error('Error fetching new releases:', error);
      }
    };
    useEffect(() => {
      fetchNewReleases();
    }, [])
  return (
    <div>
        <NewReleases moviesData={moviesData} seeAll={false}/>
    </div>
  )
}

export default NewReleasesPage