import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MovieService from '../../../services/MovieService';

const EditMovieForm = ({ isOpen, onClose, onSave, movie }) => {
	const [editedMovie, setEditedMovie] = useState(movie ? { ...movie } : {});
	const [key, setKey] = useState(0);

	useEffect(() => {
		setEditedMovie(movie ? { ...movie } : {});
	}, [movie, isOpen, key]);

	const handleCancel = () => {
		onClose();
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setEditedMovie((prevMovie) => ({ ...prevMovie, [name]: value }));
	};

	const handleSave = async () => {
		try {
			const res = await MovieService.updateMovie(editedMovie);
			if (res.status === 200) {
				onSave(res.data);
				setKey((prevKey) => prevKey + 1);
			} else {
				console.error('Error updating movie:', res.data);
			}
		} catch (error) {
			console.error('Error updating movie:', error);
		} finally {
			onClose();
		}
	};

	return (
		<Modal key={key} open={isOpen} onClose={handleCancel}>
			<Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
				<h2>Edit Movie</h2>
				<TextField label="Title" name="title" value={editedMovie.title} onChange={handleChange} fullWidth margin='normal' />
				<TextField label="Rating" name="rating" value={editedMovie.rating} onChange={handleChange} fullWidth margin='normal' />
				<TextField label="Duration" name="duration" value={editedMovie.duration} onChange={handleChange} fullWidth margin='normal' />
				<TextField label="Genre" name="genre" value={editedMovie.genre} onChange={handleChange} fullWidth margin='normal' />
				<TextField label="Description" name="description" value={editedMovie.description} onChange={handleChange} fullWidth margin='normal' multiline={true} />
				<Button variant="outlined" color="primary" onClick={handleCancel}>
					Cancel
				</Button>
				<Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
			</Box>
		</Modal>
	);
};

export default EditMovieForm;
