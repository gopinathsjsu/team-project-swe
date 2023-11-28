import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import TheaterService from '../../../services/TheaterService';

const EditTheaterForm = ({ isOpen, onClose, onSave, movie, theater }) => {
  const [editedTheater, setEditedTheater] = useState({ ...theater });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTheater((prevTheater) => ({ ...prevTheater, [name]: value }));
  };

  const handleCancel = () => { 
    onClose();
  }

  const handleSave = async () => {
    try {
      await TheaterService.assignTheaterToMovie(editedTheater.theaterId, movie.movieId);
      await TheaterService.updateTheaterCapacity(editedTheater.theaterId, editedTheater.capacity);
      onSave(editedTheater);
    } catch (error) {
      console.error('Error updating theater assignment:', error);
    } finally {
      onClose();
    }
  };

  return (
    <Modal open={isOpen} onClose={handleCancel}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <h2>Edit Theater</h2>
        <TextField label="Theater Number" name="theaterNumber" value={editedTheater.theaterNumber} onChange={handleChange} fullWidth />
        <TextField label="Capacity" name="capacity" value={editedTheater.capacity} onChange={handleChange} fullWidth />
        <Button variant="outlined" color="primary" onClick={handleCancel}>
            Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
      </Box>
    </Modal>
  );
};

export default EditTheaterForm;
