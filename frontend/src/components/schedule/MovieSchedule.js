import React, {useState, useEffect} from "react";
import { Stack, Button } from "@mui/material";

import ScheduleCard from "./ScheduleCard";
import EditMovieSchedule from "../../components/admin/EditMovieSchedule";

import axios from "axios";

const MovieSchedule = ({multiplexId, isAdmin}) => {

    const [movieSchedule, setMovieSchedule] = useState([]);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedMovieSchedule, setSelectedMovieSchedule] = useState(null);

    useEffect(() => {
        console.log(multiplexId);
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

    // const handleEditMovieSchedule = (schedule) => {
    //     setSelectedMovieSchedule(schedule);
    //     setOpenEditDialog(true);
    // };

    const handleSaveMovieSchedule = (updatedSchedule) => {
        // TODO: updating schedule in the backend
        console.log('Saving schedule:', updatedSchedule);
        setOpenEditDialog(false);
    };

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
                        <ScheduleCard movie={movie} />
                    </Stack>
                ));
            } else {
                return <p>No movies for selected schedule!</p>
            }
        } else {
            return <p>No schedule available!</p>
        }
    };


    // // dummy movie schedule data
    // const dummyScheduleData = [
    //     {
    //         title: "Movie Title",
    //         rating: "3",
    //         duration: "1h",
    //         times: [
    //             "1:00pm",
    //             "2:00pm",
    //             "3:00pm",
    //             "7:30pm"
    //         ],
    //         genre: "Action",
    //         description: "lorem ipsum",
    //     }, 
    //     {
    //         title: "Movie Title",
    //         rating: "4.5",
    //         duration: "2h",
    //         times: [
    //             "1:30pm",
    //             "2:00pm",
    //             "3:45pm",
    //             "7:30pm"
    //         ],
    //         genre: "Mystery",
    //         description: "lorem ipsum",
    //     },
    //     {
    //         title: "Movie Title",
    //         rating: "2.4",
    //         duration: "2h",
    //         times: [
    //             "1:30pm",
    //             "2:00pm",
    //             "3:45pm",
    //             "7:30pm"
    //         ],
    //         genre: "Romance",
    //         description: "lorem ipsum",
    //     },
    //     {
    //         title: "Movie Title",
    //         rating: "3.6",
    //         duration: "1h30m",
    //         times: [
    //             "1:30pm",
    //             "2:00pm",
    //             "3:45pm",
    //             "7:30pm"
    //         ],
    //         genre: "Horror",
    //         description: "lorem ipsum",
    //     }
    // ];

    return (
        <div>
            {displaySchedule()}

            {isAdmin && <Button onClick={() => setOpenEditDialog(true)}>Edit Movie Schedule</Button>}

            <EditMovieSchedule
                open={openEditDialog}
                handleClose={() => setOpenEditDialog(false)}
                onSave={handleSaveMovieSchedule}
                initialData={selectedMovieSchedule || {}}
            />
        </div>
    );
}

export default MovieSchedule;
