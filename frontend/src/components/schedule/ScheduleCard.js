import React, {useState, useEffect} from "react";
import { Card, CardContent, Typography, CardActions, Button, CardMedia, Modal, Box } from "@mui/material";

import MovieService from "../../services/MovieService";
import convertTime from "../../common/convertTime";
import TheaterService from "../../services/TheaterService";

const ScheduleCard = ({ 
    movie, 
    multiplexId, 
    isAdmin, 
    onEditMovie, 
    
}) => {

    const { movieId, title, rating, duration, genre, description } = movie;

    const [showtimes, setShowtimes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [assignedTheater, setAssignedTheater] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const showtimeData = await MovieService.fetchShowtimesByMovieId(movieId);
                const theaterData = await TheaterService.getTheaterByMovieIdAndMultiplexId(movieId, multiplexId);
                setShowtimes(showtimeData);
                setAssignedTheater(theaterData);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [movieId, multiplexId]);

    const handleEditShowtime = (showtime) => {
        <Modal>
            <Box sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
            }}>
                <Button>Edit Showtime</Button>
                <Button>Delete Showtime</Button>
            </Box>
        </Modal>
    }
    

    // map over showtimes and create a button for each
    // that upon selection lead to seat selection page
    const displayShowtimes = () => {
        const sortedShowtimes = showtimes.sort((a, b) => {
            return a.time > b.time ? 1 : -1;
        });

        return sortedShowtimes.map((showtime, i) => (
            <Button key={i} size="small" onClick={handleEditShowtime}>
                {convertTime(showtime.time)}
            </Button>
        ));
    }

    return (
        <div style={{ textAlign: "center" }}>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Card 
                    variant="outlined" 
                    style={{ width: '100%', display: 'flex', flexDirection: 'column' }}
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
                        {isAdmin && (
                            <CardActions>
                                <Button size="small" onClick={() => onEditMovie(movie)}>Edit Movie</Button>
                                <Button>Remove Movie</Button>
                            </CardActions>
                        )}
                        <Typography variant="body2" color="text.secondary">
                            Assigned Theater: {assignedTheater.theaterName}
                            Theater Capacity: {assignedTheater.capacity}
                            {isAdmin && (
                                <CardActions>
                                    <Button size="small">Edit Theater Assignment</Button>
                                </CardActions>
                            )}
                        </Typography>
                        <Typography variant="body3" color="text.primary" component="p" className="whitespace-pre-wrap">
                            {description}
                        </Typography>
                        <CardActions>
                            <div className="whitespace-pre-wrap">
                                {displayShowtimes()}
                            </div>
                            
                        </CardActions>
                        

                    </CardContent>
                </Card>
        )}
        </div>
    );
}

export default ScheduleCard;
