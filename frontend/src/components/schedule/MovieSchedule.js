import React from "react";
import { Stack, Box, Card, Button } from "@mui/material";

import ScheduleCard from "./ScheduleCard";

const MovieSchedule = ({
    multiplexId, 
    movieSchedule,
    isAdmin, 
    onEditMovie, 
    onRemoveMovie,
}) => {

    const displaySchedule = () => {
        if (movieSchedule && movieSchedule.length > 0) {
            const movies = movieSchedule[0].movies;
            if (movies != null) {
                return (
                    <div style={{ overflowY: 'auto', maxHeight: '100vh' }}>
                      <Stack
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        spacing={2}
                        sx={{ minHeight: '20vh', padding: '10px' }}
                      >
                        {movies.map((movie) => (
                          <Card key={movie.movieId} sx={{ minWidth: 300, maxWidth: 400 }}>
                            <ScheduleCard
                                movie={movie}
                                multiplexId={multiplexId}
                                onEditMovie={onEditMovie}
                                onRemoveMovie={onRemoveMovie}
                            />
                            {multiplexId && isAdmin && (
                                <Button variant="outlined" color="secondary" onClick={() => onRemoveMovie(movie)}>
                                    Remove Movie
                                </Button>
                            )}
                          </Card>
                        ))}
                      </Stack>
                    </div>
                  );
            } else {
                return <p>No movies for selected schedule!</p>
            }
        } else {
            return <p>No schedule available!</p>
        }
    };


    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            padding={4}
        >
            {displaySchedule()}
        </Box>
    );
}

export default MovieSchedule;
