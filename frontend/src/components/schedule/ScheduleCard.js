import React, {useState, useEffect} from "react";
import { Card, CardContent, Typography, CardActions, Button, CardMedia } from "@mui/material";

import MovieService from "../../services/MovieService";

const ScheduleCard = ({ movie }) => {

    const { movieId, title, rating, duration, genre, description } = movie;

    const [showtimes, setShowtimes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const data = await MovieService.fetchShowtimesByMovieId(movieId);
            setShowtimes(data);
        } finally {
            setLoading(false);
        }
        };

        fetchData();
    }, [movieId]);
    

    // map over showtimes and create a button for each
    // that upon selection lead to seat selection page
    const displayShowtimes = () => {
        return showtimes.map((showtime, i) => (
            <Button key={i} size="small">{showtime.startTime}</Button>
        ));
    }

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
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
        )}
        </div>
    );
}

export default ScheduleCard;
