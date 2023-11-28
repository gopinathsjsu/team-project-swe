import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const RemoveShowtimeModal = ({ isOpen, onClose, onConfirm, showtime }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <Typography variant="h6" component="div" gutterBottom>
          Remove Showtime
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Are you sure you want to remove the showtime at {showtime}?
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button variant="outlined" color="primary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={onConfirm}>
            Remove
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default RemoveShowtimeModal;
