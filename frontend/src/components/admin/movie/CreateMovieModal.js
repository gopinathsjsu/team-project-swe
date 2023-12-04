import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Modal, TextField, Button, Select, MenuItem } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const CreateMovieModal = ({ open, onClose, onCreateMovie }) => {
  const [newMovie, setNewMovie] = useState({
    title: '',
    rating: null,
    releaseDate: null,
    genre: 'Select Genre',
    duration: '',
    description: '',
  });

  const genreOptions = [
    'Select Genre',
    'Action',
    'Adventure',
    'Comedy',
    'Drama',
    'Horror',
    'Romance',
    'Science Fiction',
    'Fantasy',
    'Historical',
    'Crime',
    'Mystery',
    'Other'
  ];

  const handleAddMovie = () => {
    console.log('New Movie Before Calling onCreateMovie:', newMovie);
    onCreateMovie(newMovie);
    setNewMovie({});
    onClose();
  };

  const handleChange = (field, value) => {
    if (field === 'releaseDate' && dayjs.isDayjs(value)) {
      value = value.toDate();
    }
    // const updatedValue = field === 'rating' ? parseFloat(value) : value;

    setNewMovie((prevMovie) => ({ ...prevMovie, [field]: value }));
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-4 bg-white rounded shadow-md max-w-sm mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-4">Add Movie</h2>
        <TextField
          className="mb-3"
          label="Title"
          required
          value={newMovie.title}
          onChange={(e) => handleChange('title', e.target.value)}
        />
        <TextField
          className="mb-3"
          label="Rating"
          value={newMovie.rating}
          onChange={(e) => handleChange('rating', e.target.value)}
          onBlur={(e) => {
            const floatValue = parseFloat(e.target.value);
            if (!isNaN(floatValue)) {
              handleChange('rating', floatValue);
            }
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
                <DatePicker
                    className="mb-3"
                    label="Release Date"
                    value={newMovie.releaseDate ? dayjs(newMovie.releaseDate) : null}
                    onChange={(date) => handleChange('releaseDate', date)}
                />
            </DemoContainer>
        </LocalizationProvider>

        <Select
            className="mb-3"
            label="Genre"
            required
            value={newMovie.genre}
            onChange={(e) => handleChange('genre', e.target.value)}
        >
            {genreOptions.map((option) => (
                <MenuItem key={option} value={option}>
                    {option}
                </MenuItem>
            ))}
        </Select>
        <TextField
          className="mb-3"
          label="Duration"
          value={newMovie.duration}
          onChange={(e) => handleChange('duration', e.target.value)}
        />
        <TextField
          className="mb-3"
          label="Description"
          value={newMovie.description}
          onChange={(e) => handleChange('description', e.target.value)}
          multiline
        />
        <div className="flex justify-between">
          <Button className="bg-blue-500 text-white hover:bg-blue-700" onClick={handleAddMovie}>
            Add Movie
          </Button>
          <Button className="bg-gray-400 text-white hover:bg-gray-600" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateMovieModal;
