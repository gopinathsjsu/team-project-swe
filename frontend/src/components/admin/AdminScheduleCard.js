import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import MovieSchedule from '../schedule/MovieSchedule';

const AdminScheduleCard = ({ 
    multiplexId, 
    movieSchedule,
    onEditMovie, 
    onRemoveMovie,

}) => {

    return (
        <Card>
            <CardContent>
                <Typography variant="h6">Schedule</Typography>
                {multiplexId && (
                    <MovieSchedule
                        multiplexId={multiplexId}
                        movieSchedule={movieSchedule}
                        onEditMovie={onEditMovie}
                        onRemoveMovie={onRemoveMovie}
                        isAdmin={true}
                    />
                )}
            </CardContent>
        </Card>
    );
};

export default AdminScheduleCard;
