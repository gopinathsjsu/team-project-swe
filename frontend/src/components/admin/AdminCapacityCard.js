import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const AdminCapacityCard = ({ capacity, onUpdateCapacity }) => {
    const [localCapacity, setLocalCapacity] = useState(capacity);

    const handleCapacityUpdate = () => {
        onUpdateCapacity(localCapacity);
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h6">Theater Capacity</Typography>
                <TextField
                    label="Theater Capacity"
                    variant="outlined"
                    fullWidth
                    value={localCapacity}
                    onChange={(e) => setLocalCapacity(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={handleCapacityUpdate}>
                    Update Capacity
                </Button>
            </CardContent>
        </Card>
    );
};

export default AdminCapacityCard;
