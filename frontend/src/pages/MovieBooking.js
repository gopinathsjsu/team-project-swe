import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Rating from '@mui/material/Rating';
import ConfirmationNumberRoundedIcon from '@mui/icons-material/ConfirmationNumberRounded';
import ScheduleCard from "../components/schedule/ScheduleCard";
import api from '../services/backend-api/api';
import { Button, ButtonGroup, Container, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import MovieService from '../services/MovieService';
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import axios from 'axios';


const MovieBooking = ({ movieId }) => {
  const navigate = useNavigate();
  const { id, type } = useParams();
  const [moviesData, SetMoviesData] = useState([]);
  const [movieInformation, SetMovieInformation] = useState({});
  const [showtimes, Setshowtimes] = useState([]);
  const [releaseDate, SetReleaseDate] = useState("");
  
  useEffect(() => {
    axios.get(`http://localhost:8080/api/movies/${type}`).then(res => SetMoviesData(res.data)).catch(er => console.log(er))
    fetchShowtimesByMovieId();
  }, [])

  useEffect(() => {
    SetMovieInformation(moviesData.find(data => data.movieId == id))
  }, [moviesData])
  const fetchShowtimesByMovieId = async () => {
    try {
      console.log(id)
      const showTimes = await MovieService.fetchShowtimesByMovieId(id);
      console.log(showTimes)
      Setshowtimes(showTimes);
    } catch (error) {
      console.error('Error fetching show times:', error);
    }
  };

  const handleButtonClick = () => {
    navigate("/seatselect");
  };
  useEffect(() => {
    if (movieInformation && movieInformation.releaseDate) {
      SetReleaseDate(movieInformation.releaseDate);
    }
  }, [movieInformation]);

  return (
    <div>
      
      {movieInformation &&
        <Box pt={5} sx={{ flexGrow: 1, bgcolor: '#0F0F0F', height: '100vh' }}>
          <Grid container spacing={2}>
            <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
              <img style={{ height: '450px' }} src={movieInformation.poster} />
            </Grid>
            <Grid item xs={8} >
              <Typography marginBottom={'5px'} fontSize={'35px'} fontWeight={'600'} color={'white'} variant="h6">{movieInformation.title}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', margin: '6px 0px' }} >
                <Rating
                  name="simple-controlled"
                  value={movieInformation.rating}
                  readOnly
                  precision={0.5}

                />
                <Typography variant='h6' fontWeight={'600'} fontSize={'22px'} color={'white'}>
                  {movieInformation.rating} / 5
                </Typography>
              </Box>
              <Chip label={movieInformation.genre} color="primary" variant="outlined" />
              <Typography marginTop={'7px'} marginLeft={'5px'} variant='h6'  fontSize={'18px'} color={'white'}>
                {movieInformation.duration}
              </Typography>
              <Typography variant='h6' marginTop={'3px'} marginLeft={'5px'} marginBottom={'25px'} fontSize={'18px'} color={'white'}>
                {releaseDate.slice(0, 10)}
              </Typography>

              <Typography fontWeight={'600'} fontSize={'22px'} marginLeft={'5px'} color={'white'} variant="h6" gutterBottom>
                Book Tickets
              </Typography>
              <ButtonGroup  style={{ flexWrap: "wrap", gap: "5px",marginLeft:'5px' }} variant="contained" aria-label="movie schedule">
                {showtimes.map(({ date, time, showtimeId }) => (
                  <Button variant='outlined' key={showtimeId} onClick={() => handleButtonClick()}>
                    <div>
                      <Typography fontSize={'14px'} variant="h6">{date}</Typography>
                      <Typography variant="subtitle1">{time}</Typography>
                    </div>
                  </Button>
                ))}
              </ButtonGroup>

            </Grid>
          </Grid>
          <Grid sx={{padding:'5px 20px',padding:'60px 80px'}} xs={12}>
          <Typography color={'white'} marginBottom={'12px'} fontSize={'26px'} fontWeight={'600'} variant="h2">About the Movie</Typography>
          <Typography color={'white'} fontSize={'17px'} variant="p">{movieInformation.description}</Typography>
          </Grid>
        </Box>
      }

    </div>
  )
}

export default MovieBooking