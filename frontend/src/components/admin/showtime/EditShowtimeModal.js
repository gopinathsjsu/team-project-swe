import React, { useState } from 'react';
import { Modal, Button } from '@mui/material';
import { TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const EditShowtimeModal = ({ open, onClose, onSave, onRemove, showtime }) => {
    const [updatedShowtime, setUpdatedShowtime] = useState({
        time: showtime.time,
    });

    // console.log('Showtime start time:', showtime);
  
    const handleSave = () => {
      onSave(updatedShowtime);
      onClose();
    };
  
    const handleRemove = () => {
      onRemove(showtime);
      onClose();
    };
  
    const handleChange = (field, value) => {
        const formattedTime = value ? dayjs(value).format("HH:mm") : null;
    
        setUpdatedShowtime((prevShowtime) => ({ ...prevShowtime, [field]: formattedTime }));
    };

    return (
        <Modal open={open} onClose={onClose}>
        <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-2xl mb-4">Edit Showtime</h2>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['TimePicker']}>
                <TimePicker 
                    label="Show Time" 
                    value={updatedShowtime.time}
                    onChange={(value) => handleChange('time', value)}
                />
                </DemoContainer>
            </LocalizationProvider>
            
            <div className="flex justify-between">
                <Button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 mr-2">
                    Save
                </Button>
                <Button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 mr-2">
                    Cancel
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


