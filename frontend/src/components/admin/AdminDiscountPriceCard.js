import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const AdminDiscountPricesCard = ({ discountPrices, onUpdateDiscountPrices }) => {
    const [before6pmDiscount, setBefore6pmDiscount] = useState(discountPrices.before6pm || 0);
    const [tuesdayDiscount, setTuesdayDiscount] = useState(discountPrices.tuesday || 0);

    const handleSave = () => {
        const updatedDiscountPrices = {
            before6pm: before6pmDiscount,
            tuesday: tuesdayDiscount,
        };

        onUpdateDiscountPrices(updatedDiscountPrices);
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h6">Discount Prices</Typography>
                <div>
                    <TextField
                        label="Price for shows before 6pm"
                        type="number"
                        variant="outlined"
                        fullWidth
                        value={before6pmDiscount}
                        onChange={(e) => setBefore6pmDiscount(Number(e.target.value))}
                    />
                </div>
                <div>
                    <TextField
                        label="Price for Tuesday shows"
                        type="number"
                        variant="outlined"
                        fullWidth
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

export default AdminDiscountPricesCard;
