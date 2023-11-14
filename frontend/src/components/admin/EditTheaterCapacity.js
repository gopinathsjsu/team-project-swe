import React, { useState } from 'react';
import {
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
} from '@mui/material';

const EditTheaterCapacity = () => {

    // get specific theater

    const [theaterCapacity, setTheaterCapacity] = useState(100);

    const handleSave = () => {
        console.log('Theater Capacity:', theaterCapacity);

        // post updated capacity to database
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">Edit Theater Capacity</Typography>
                <div>
                    <TextField
                        label="Theater Capacity"
                        type="number"
                        variant="outlined"
                        value={theaterCapacity}
                        onChange={(e) => setTheaterCapacity(Number(e.target.value))}
                    />
                </div>
                <div>
                    <Button variant="contained" color="primary" onClick={handleSave}>
                        Save
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default EditTheaterCapacity;
