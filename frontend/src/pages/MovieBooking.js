import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import NavBar from '../components/NavBar'

import Rating from '@mui/material/Rating';
import ConfirmationNumberRoundedIcon from '@mui/icons-material/ConfirmationNumberRounded';
import ScheduleCard from "../components/schedule/ScheduleCard";
import axios from 'axios';
import { Button, ButtonGroup, Container, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';


import Box from '@mui/material/Box';
import MovieService from '../services/MovieService';

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

  const { id, type } = useParams();
  const [moviesData, SetMoviesData] = useState([]);
  const [movieInformation, SetMovieInformation] = useState([]);
  const [showtimes, Setshowtimes] = useState([])
  useEffect(() => {
    axios.get(`http://localhost:8080/api/movies/${type}`).then(res => SetMoviesData(res.data)).catch(er => console.log(er))
    fetchShowtimesByMovieId();
  }, [])

  useEffect(() => {
    SetMovieInformation(moviesData.find(data => data.movieId == id))
    // fetchShowtimesByMovieId();
    // Setshowtimes(movieInformation.showtimes)
  }, [moviesData])
  const fetchShowtimesByMovieId = async () => {
    try {
      const showTimes = await MovieService.fetchShowtimesByMovieId(id);
      console.log("Nitya", showTimes);
      Setshowtimes(showTimes);
    } catch (error) {
      console.error('Error fetching show times:', error);
    }
  };
  // console.log(movieInformation)
  const handleButtonClick = (day, time) => {
    console.log(`Button clicked for ${day} at ${time}`);
  };

  return (
    <div>
      <NavBar />
      {movieInformation &&
        <div className='bg-[#0F0F0F]'>
          <div className='flex  pt-[100px]'>
            <div className='w-1/4 ml-[40px] '>
              <img src={movieInformation.poster} />
            </div>
            <div className='w-2/3 text-white mr-[40px]'>
              <h1 className='text-4xl font-bold'>{movieInformation.title}</h1>
              <h3>{movieInformation.description}</h3>
              <h5>{movieInformation.releaseDate}</h5>
              {/* <Button startIcon={<ConfirmationNumberRoundedIcon />} variant='outlined' color="success">Book Tickets</Button> */}
              {/* <ScheduleCard movie={movie} /> */}
              <Rating
                name="simple-controlled"
                value={movieInformation.rating}
                readOnly

              />
              <h5>{movieInformation.duration}</h5>
              <Chip label={movieInformation.genre} color="primary" variant="outlined" />
              <Container>
                <Typography variant="h4" gutterBottom>
                  Movie Schedule
                </Typography>
                <ButtonGroup style={{flexWrap:"wrap",gap:"5px"}} variant="contained" aria-label="movie schedule">
                  {showtimes.map(({ date, time, showtimeId }) => (
                    <Button key={showtimeId} onClick={() => handleButtonClick(date, time)}>
                      <div>
                        <Typography variant="h6">{date}</Typography>
                        <Typography variant="subtitle1">{time}</Typography>
                      </div>
                    </Button>
                  ))}
                </ButtonGroup>
              </Container>
            </div>
          </div>

        </div>

      }

    </div>
  )
}

export default MovieBooking