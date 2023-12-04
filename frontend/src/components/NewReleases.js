import React from 'react'
import Button from '@mui/material/Button';
import MovieCard from './MovieCard';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NewReleases = ({moviesData,seeAll}) => {
  const navigate = useNavigate();
  const handleSeeAll =()=>{
    navigate('/newreleases')
  }
    
  return (
    <div className='bg-[#0F0F0F]'>
        <div className='flex px-[50px] justify-between py-[20px] items-center'>
            <h1 className='text-white text-xl font-semibold'>New Releases</h1>
            {seeAll && <Button onClick={handleSeeAll} variant="outlined" size="medium">See All</Button>}
        </div>
        <div className='grid grid-cols-5 gap-[10px] px-[50px] '>
          {/* {JSON.stringify(moviesData)} */}
          {console.log("MOVIES DATA:" , moviesData)}
            {/* {moviesData.slice(0,seeAll?10:undefined).map((data) =>
                <Link to={{pathname:'/movie/'+"getNewReleases"+"/"+data.movieId}}>
                <MovieCard key={data.movieId}
                    movieData={data}
                />
            </Link>)} */}
        </div>
    </div>
  )
}

export default NewReleases;