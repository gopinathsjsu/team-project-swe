import React, {useState, useEffect} from "react";
import { Stack, Box, Card } from "@mui/material";

import ScheduleCard from "./ScheduleCard";

import axios from "axios";

const MovieSchedule = ({multiplexId, 
    isAdmin, 
    onEditMovie, 
    onRemoveMovie,
    onEditTheater,
    onEditShowtime,
    onDeleteShowtime
}) => {

    const [movieSchedule, setMovieSchedule] = useState([]);

    useEffect(() => {
        const fetchMovieSchedule = async () => {
            try {
                const response = await axios.get(`/api/schedules/multiplex/${multiplexId}`);
                setMovieSchedule(response.data);
            } catch (error) {
                console.error('Error fetching movie schedules:', error);
            }
        };

        // Fetch movie schedules only if multiplexId is available
        if (multiplexId !== undefined) {
            fetchMovieSchedule();
        }
    }, [multiplexId]);

    const displaySchedule = () => {
        if (movieSchedule.length > 0) {
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
                        {movies.map((movie, index) => (
                          <Card key={index} sx={{ minWidth: 300, maxWidth: 400 }}>
                            <ScheduleCard
                              movie={movie}
                              multiplexId={multiplexId}
                              isAdmin={isAdmin}
                              onEditMovie={onEditMovie}
                              onRemoveMovie={onRemoveMovie}
                              onEditTheater={onEditTheater}
                              onEditShowtime={onEditShowtime}
                              onDeleteShowtime={onDeleteShowtime}
                            />
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
