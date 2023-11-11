import React from "react";
import { Stack } from "@mui/material";

import ScheduleCard from "./ScheduleCard";

const MovieSchedule = ({theaterId}) => {

    // TODO: get specific movie schedule data for a specific theater

    // dummy movie schedule data
    const dummyScheduleData = [
        {
            title: "Movie Title",
            rating: "3",
            duration: "1h",
            times: [
                "1:00pm",
                "2:00pm",
                "3:00pm",
                "7:30pm"
            ],
            genre: "Action",
            description: "lorem ipsum",
        }, 
        {
            title: "Movie Title",
            rating: "4.5",
            duration: "2h",
            times: [
                "1:30pm",
                "2:00pm",
                "3:45pm",
                "7:30pm"
            ],
            genre: "Mystery",
            description: "lorem ipsum",
        },
        {
            title: "Movie Title",
            rating: "2.4",
            duration: "2h",
            times: [
                "1:30pm",
                "2:00pm",
                "3:45pm",
                "7:30pm"
            ],
            genre: "Romance",
            description: "lorem ipsum",
        },
        {
            title: "Movie Title",
            rating: "3.6",
            duration: "1h30m",
            times: [
                "1:30pm",
                "2:00pm",
                "3:45pm",
                "7:30pm"
            ],
            genre: "Horror",
            description: "lorem ipsum",
        }
    ];

    // get movies for specific movieId

    // create ScheduleCard objects for each movie 

    // temp map function
    // for displaying ALL movie showtimes
    // for a specific theater
    const displaySchedule = () => {
        return dummyScheduleData.map((item, index) => (
            <Stack 
                key={index} 
                direction="row" 
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: '20vh' }}
            >
                <ScheduleCard data={item} />
            </Stack>
        ));
    }

    return (
        <div>
            {/* map through ScheduleCards and display them in Schedule */}
            {displaySchedule()}
        </div>
    );
}

export default MovieSchedule;
