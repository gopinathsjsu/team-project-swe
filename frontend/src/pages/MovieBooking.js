import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Button from '@mui/material/Button';
import ConfirmationNumberRoundedIcon from '@mui/icons-material/ConfirmationNumberRounded';
import ScheduleCard from "../components/schedule/ScheduleCard";

// TODO: book a SINGLE movie (that which is being displayed on this page)
const MovieBooking = ({ movieId }) => {

  // TODO: get movie by id (axios call)
  // TODO: get title and other properties from movie object retrieved

  // dummy movie object to be passed to ScheduleCard
  const movie = {
    title: "Movie Title",
    rating: "3",
    duration: "1h",
    times: [
      "1:00pm",
      "2:00pm",
      "3:00pm",
      "7:30pm"
    ],
    genre: "Action",
    description: "lorem ipsum",
  };

  const { id } = useParams();
  const [moviesData, SetMoviesData] = useState([]);
  const [movieInformation, SetMovieInformation] = useState([]);
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMTQ5NThhNDY2M2Y4OGFkZmI2MjhkZTI2NWJhZmZkZSIsInN1YiI6IjY1NDE0MzViNmNhOWEwMDBlYmVlODdmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UARFyhM8sMafq8wmQRvRyD1g6niYjzf36xBqImntH-o'
    }
  };

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
      .then(response => response.json())
      .then(response => SetMoviesData(response.results))
      .catch(err => console.error(err));

  }, [])
  useEffect(() => {
    SetMovieInformation(moviesData.filter(data => data.id == id)[0])
  }, [moviesData])
  console.log(movieInformation)

  return (
    <div>
      <NavBar />
      {movieInformation &&
        <div className='bg-[#0F0F0F]'>
          <div className='flex  pt-[100px]'>
            <div className='w-1/4 ml-[40px] '>
              <img src='https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/five-nights-at-freddy-s-et00363275-1693810842.jpg' />
            </div>
            <div className='w-2/3 text-white mr-[40px]'>
              <h1 className='text-4xl font-bold'>{movieInformation.title}</h1>
              <h3>{movieInformation.overview}</h3>
              <Button startIcon={<ConfirmationNumberRoundedIcon />} variant='outlined' color="success">Book Tickets</Button>
              <ScheduleCard movie={movie} />
            </div>
          </div>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/iGKqbWal8UQ?si=tAJLTnWo4kQKvcp1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>

      }

    </div>
  )
}

export default MovieBooking