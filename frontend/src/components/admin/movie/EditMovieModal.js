import React, { useState, useEffect } from 'react';
import { Modal, TextField, Button } from '@mui/material';

const EditMovieModal = ({ open, onClose, onSave, movie }) => {

    const [updatedMovie, setUpdatedMovie] = useState(movie);

    useEffect(() => {
        setUpdatedMovie(movie);
    }, [movie]);

    const handleSave = async () => {
        await onSave(updatedMovie);
        onClose();
    };

    const handleChange = (field, value) => {
        setUpdatedMovie((prevMovie) => ({ ...prevMovie, [field]: value }));
    };

    return (
        <Modal open={open} onClose={onClose}>
        <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-2xl mb-4">Edit Movie</h2>
            <TextField
            label="Title"
            value={updatedMovie.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="mb-4 w-full"
            />
            <TextField
            label="Rating"
            value={updatedMovie.rating}
            onChange={(e) => handleChange('rating', e.target.value)}
            className="mb-4 w-full"
            />
            <TextField
            label="Release Date"
            value={updatedMovie.releaseDate}
            onChange={(e) => handleChange('releaseDate', e.target.value)}
            className="mb-4 w-full"
            />
            <TextField
            label="Genre"
            value={updatedMovie.genre}
            onChange={(e) => handleChange('genre', e.target.value)}
            className="mb-4 w-full"
            />
            <TextField
            label="Duration"
            value={updatedMovie.duration}
            onChange={(e) => handleChange('duration', e.target.value)}
            className="mb-4 w-full"
            />
            <TextField
            label="Description"
            value={updatedMovie.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="mb-4 w-full"
            multiline
            />
            <Button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 mr-2">
            Save
            </Button>
            <Button onClick={onClose} className="bg-gray-500 text-white px-4 py-2">
            Cancel
            </Button>
        </div>
        </Modal>
    );
};

export default EditMovieModal;
