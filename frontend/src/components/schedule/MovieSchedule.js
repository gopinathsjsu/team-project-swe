import React, {useState, useEffect} from "react";
import { Stack, Button } from "@mui/material";

import ScheduleCard from "./ScheduleCard";
import EditMovieSchedule from "../../components/admin/EditMovieSchedule";

import axios from "axios";

const MovieSchedule = ({multiplexId, isAdmin}) => {

    const [movieSchedules, setMovieSchedules] = useState([]);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedMovieSchedule, setSelectedMovieSchedule] = useState(null);

    useEffect(() => {
        const fetchMovieSchedules = async () => {
            try {
                const response = await axios.get(`/api/schedules/multiplex/${multiplexId}`);
                setMovieSchedules(response.data);
            } catch (error) {
                console.error('Error fetching movie schedules:', error);
            }
        };

        fetchMovieSchedules();
    }, [multiplexId]);

    const handleEditMovieSchedule = (schedule) => {
        setSelectedMovieSchedule(schedule);
        setOpenEditDialog(true);
    };

    const handleSaveMovieSchedule = (updatedSchedule) => {
        // TODO: updating schedule in the backend
        console.log('Saving schedule:', updatedSchedule);
        setOpenEditDialog(false);
    };

    const displaySchedule = () => {
        return movieSchedules.map((schedule, index) => (
            <Stack
                key={index}
                direction="row"
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: '20vh' }}
            >
                <ScheduleCard schedule={schedule} />
                {isAdmin && (
                    <Button onClick={() => handleEditMovieSchedule(schedule)}>Edit</Button>
                )}
            </Stack>
        ));
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

            {isAdmin && <Button onClick={() => setOpenEditDialog(true)}>Add Movie Schedule</Button>}

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
