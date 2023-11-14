import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

const EditMovieSchedule = ({ open, handleClose, onSave, initialData }) => {
    const [formData, setFormData] = useState(initialData);

    const handleChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleSave = () => {
        onSave(formData);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{initialData ? 'Edit Movie' : 'Add Movie'}</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label="Movie Title"
                    value={formData.title ? formData.title : ""}
                    onChange={(e) => handleChange('title', e.target.value)}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Rating"
                    value={formData.rating ? formData.rating : ""}
                    onChange={(e) => handleChange('rating', e.target.value)}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Duration"
                    value={formData.duration ? formData.duration : ""}
                    onChange={(e) => handleChange('duration', e.target.value)}
                    margin="normal"
                />
            {/*    TODO: add additional movie fields to be edited.*/}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditMovieSchedule;
