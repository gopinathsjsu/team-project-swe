import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MovieSchedule from '../schedule/MovieSchedule';

const AdminScheduleCard = ({ multiplexId, 
    onEditMovie, 
    onRemoveMovie,
    onEditTheater,
    onEditShowtime,
    onDeleteShowtime

}) => {

    return (
        <Card>
            <CardContent>
                <Typography variant="h6">Schedule</Typography>
                {multiplexId && (
                    <MovieSchedule
                        multiplexId={multiplexId}
                        isAdmin={true} 
                        onEditMovie={onEditMovie}
                        onRemoveMovie={onRemoveMovie}
                        onEditTheater={onEditTheater}
                        onEditShowtime={onEditShowtime}
                        onDeleteShowtime={onDeleteShowtime}
                    />
                )}
            </CardContent>
        </Card>
    );
};

export default AdminScheduleCard;
