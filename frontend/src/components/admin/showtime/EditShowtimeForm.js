import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ShowtimeService from '../../../services/ShowtimeService';

const EditShowtimeForm = ({ isOpen, onClose, onSave, movie, showtime }) => {
  const [editedShowtime, setEditedShowtime] = useState({ ...showtime });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedShowtime((prevShowtime) => ({ ...prevShowtime, [name]: value }));
  };


  const handleCancel = () => {
    onClose();
  }; 

  const handleSave = async () => {
    try {
      ShowtimeService.updateShowtime(movie.movieId, editedShowtime);
      onSave(editedShowtime);
    } catch (error) {
      console.error('Error updating showtime:', error);
    } finally {
      onClose();
    }
  };

  return (
    <Modal open={isOpen} onClose={handleCancel}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <h2>Edit Showtime</h2>

        <TextField label="Showtime" name="time" value={editedShowtime.time} onChange={handleChange} fullWidth />

        <Button variant="outlined" color="primary" onClick={handleCancel}>
            Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
      </Box>
    </Modal>
  );
};

export default EditShowtimeForm;
