import React from "react";
import { Card, CardContent, Typography, CardActions, Button, CardMedia } from "@mui/material";

// retrieve schedule data from movie schedule
const ScheduleCard = ({ movie }) => {

    const { title, rating, duration, times, genre, description } = movie;

    // map over showtimes and create a button for each
    // that upon selection lead to seat selection page
    const displayShowtimes = () => {
        return times.map((showtime, i) => (
            <Button key={i} size="small">{showtime}</Button>
        ));
    }

    return (
        <div>
            <Card 
                variant="outlined"
            >
                <CardMedia
                    component="img"
                    alt=""
                    height="140"
                    image=""
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Rating: {rating} | Duration: {duration} | Genre: {genre}
                    </Typography>
                    <Typography variant="body3" color="text.primary">
                        {description}
                    </Typography>
                    <CardActions>
                        {displayShowtimes()}
                    </CardActions>
                </CardContent>
            </Card>
        </div>
    );
}

export default ScheduleCard;
