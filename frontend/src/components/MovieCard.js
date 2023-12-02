import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

const MovieCard = ({ movieData }) => {
  const { title, poster, rating } = movieData;

  return (
    <Card sx={{
      maxWidth: 240, maxHeight: 390, backgroundColor: '#0F0F0F', border: '1px solid grey', transition: 'box-shadow 0.3s',
      '&:hover': {
        boxShadow: '0px 0px 7px skyblue',
      },
    }}>
      <CardMedia
        sx={{ height: 300 }}
        image={poster}
        title={title}
      />
      <CardContent>
        <Typography fontSize={'18px'} color={'white'} mt={0} gutterBottom variant="h6" component="">
          {title}
        </Typography>
        <Rating name="read-only" precision={0.5} size='small' value={rating} readOnly />
      </CardContent>
    </Card>
  )
}

export default MovieCard