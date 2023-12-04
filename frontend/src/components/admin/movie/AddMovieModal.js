import React, { useState, useEffect } from "react";
import { Modal, Button, Select, MenuItem } from "@mui/material";
import MovieService from "../../../services/MovieService";

const AddMovieModal = ({ open, onClose, onAddMovie, schedule }) => {
  const [availableMovies, setAvailableMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState('');

  useEffect(() => {
    const fetchAvailableMovies = async () => {
      try {
        const response = await MovieService.fetchAllMovies();
        const filteredMovies = response.filter(movie => !schedule.some(scheduleMovie => scheduleMovie.movieId === movie.movieId));
        setAvailableMovies(filteredMovies);
      } catch (error) {
        console.error('Error fetching available movies:', error);
      }
    };

    fetchAvailableMovies();
  }, [schedule]);

  const handleAddMovie = () => {
    onAddMovie(selectedMovieId);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-4 bg-white rounded shadow-md max-w-sm mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-4">Add Movie</h2>
        
        <Select
          className="mb-3"
          label="Select Movie"
          value={selectedMovieId}
          onChange={(e) => setSelectedMovieId(e.target.value)}
        >
          {availableMovies.map((movie) => (
            <MenuItem key={movie.movieId} value={movie.movieId}>
              {movie.title}
            </MenuItem>
          ))}
        </Select>
        
        <div className="flex justify-between">
          <Button className="bg-blue-500 text-white hover:bg-blue-700" onClick={() => handleAddMovie(selectedMovieId)}>
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

export default AddMovieModal;
