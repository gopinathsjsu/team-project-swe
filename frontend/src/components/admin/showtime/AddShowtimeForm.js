import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

const AddShowtimeModal = ({ isOpen, onClose, onSave, movieId, theaterId, multiplexId }) => {
  const [showtime, setShowtime] = useState('');
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const handleSave = () => {
    if (selectedDateTime) {
        const showDateTime = new Date(selectedDateTime);
        const showtime = {
            movieId: movieId,
            showDateTime: showDateTime,
            theaterId: theaterId,
            multiplexId: multiplexId
        }
      setShowtime(showtime);
      onSave(showtime);
      onClose();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
        <Modal open={isOpen} onClose={handleCancel}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <Typography variant="h6" component="div" gutterBottom>
                        Add Showtime
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        renderInput={(props) => <TextField {...props} label="Select Date and Time" />}
                        value={selectedDateTime}
                        onChange={(showDatetime) => setSelectedDateTime(showDatetime)}
                    />
                    </LocalizationProvider>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Button variant="outlined" color="primary" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleSave}>
                            Add Showtime
                        </Button>
                    </Box>
            </Box>
        </Modal>
    );
};

export default AddShowtimeModal;
