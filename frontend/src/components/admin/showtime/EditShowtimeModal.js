import React, { useState } from 'react';
import { Modal, Button } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import AdapterDayjs from '@mui/lab/AdapterDayjs';
import dayjs from 'dayjs';

const EditShowtimeModal = ({ open, onClose, onSave, onRemove, showtime }) => {
    const [updatedShowtime, setUpdatedShowtime] = useState(showtime);
  
    const handleSave = () => {
      onSave(updatedShowtime);
      onClose();
    };
  
    const handleRemove = () => {
      onRemove(showtime);
      onClose();
    };
  
    const handleChange = (field, value) => {
      setUpdatedShowtime((prevShowtime) => ({ ...prevShowtime, [field]: value }));
    };

    return (
        <Modal open={open} onClose={onClose}>
        <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-2xl mb-4">Edit Showtime</h2>
            
            <h2 className="text-2xl mb-4">Edit Showtime</h2>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
                className="mb-3"
                label="Show Date and Time"
                value={updatedShowtime.showDatetime ? dayjs(updatedShowtime.showDatetime) : null}
                onChange={(date) => handleChange('showDatetime', date)}
            />
            </LocalizationProvider>
            
            <div className="flex justify-between">
                <Button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 mr-2">
                    Save
                </Button>
                <Button onClick={handleRemove} className="bg-red-500 text-white px-4 py-2">
                    Remove
                </Button>
                </div>
            </div>
        </Modal>
    );
};

export default EditShowtimeModal;


