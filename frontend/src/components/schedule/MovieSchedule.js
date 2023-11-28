import React, {useState, useEffect} from "react";
import { Stack, Button } from "@mui/material";

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
                return movies.map((movie, index) => (
                    <Stack
                        key={index}
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                        sx={{ minHeight: '20vh' }}
                    >
                        <ScheduleCard movie={movie}
                            multiplexId={multiplexId}
                            isAdmin={isAdmin}
                            onEditMovie={onEditMovie}
                            onRemoveMovie={onRemoveMovie}
                            onEditTheater={onEditTheater}
                            onEditShowtime={onEditShowtime}
                            onDeleteShowtime={onDeleteShowtime}
                         />
                    </Stack>
                ));
            } else {
                return <p>No movies for selected schedule!</p>
            }
        } else {
            return <p>No schedule available!</p>
        }
    };


    return (
        <div>
            {displaySchedule()}
        </div>
    );
}

export default MovieSchedule;
