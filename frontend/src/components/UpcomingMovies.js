import React from 'react'
import Button from '@mui/material/Button';
import MovieCard from './MovieCard';
import { useNavigate } from 'react-router-dom';
const UpcomingMovies = ({moviesData,seeAll}) => {
  const navigate = useNavigate()
  const handleSeeAll =()=>{
    navigate("/upcomingmovies")
  }
    // console.log("myData ",moviesData)
    // const data=[
    //     {
    //         moviename:"Taylor Swift: The Eras Tour",
    //         thumbnail:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/taylor-swift-the-eras-tour-et00372543-1697113108.jpg"
    //     },
    //     {
    //         moviename:"Killers of the Flower Moon",
    //         thumbnail:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/killers-of-the-flower-moon-et00365290-1697536530.jpg"
    //     },
    //     {
    //         moviename:"The Exorcist: Believer",
    //         thumbnail:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/the-exorcist-believer-et00365534-1696398220.jpg"
    //     },
    //     {
    //         moviename:"Five Nights at Freddy`s",
    //         thumbnail:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/five-nights-at-freddy-s-et00363275-1693810842.jpg"
    //     },
    //     {
    //         moviename:"Avatar: The Way of Water",
    //         thumbnail:"https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/avatar-the-way-of-water-et00037264-1670850986.jpg"
    //     }
    // ]
  return (
    <div className='bg-[#0F0F0F]'>
        <div className='flex px-[50px] justify-between py-[20px] items-center'>
            <h1 className='text-white text-xl'>Upcoming Movies</h1>
            {seeAll && <Button onClick={handleSeeAll} variant="outlined" size="medium">See All</Button>}
        </div>
        <div className='grid grid-cols-5 gap-[10px] px-[50px] '>
            {moviesData.map((data)=><MovieCard thumbnail="https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/five-nights-at-freddy-s-et00363275-1693810842.jpg" MovieName={data.original_title} />)}
        </div>
    </div>
  )
}

export default UpcomingMovies