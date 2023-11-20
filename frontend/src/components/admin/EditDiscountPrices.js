import React, { useState } from 'react';
import {
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
} from '@mui/material';

const EditDiscountPrices = () => {

    const [before6pmDiscount, setBefore6pmDiscount] = useState(2);
    const [tuesdayDiscount, setTuesdayDiscount] = useState(4);

    const handleSave = () => {
        console.log('Before 6pm Price:', before6pmDiscount);
        console.log('Tuesday Price:', tuesdayDiscount);

        // post updated prices to backend
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">Early and Tuesday Show Discounts</Typography>
                <div>
                    <TextField
                        label="Price for shows before 6pm"
                        type="number"
                        variant="outlined"
                        value={before6pmDiscount}
                        onChange={(e) => setBefore6pmDiscount(Number(e.target.value))}
                    />
                </div>
                <div>
                    <TextField
                        label="Price for Tuesday shows"
                        type="number"
                        variant="outlined"
                        value={tuesdayDiscount}
                        onChange={(e) => setTuesdayDiscount(Number(e.target.value))}
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

export default EditDiscountPrices;
