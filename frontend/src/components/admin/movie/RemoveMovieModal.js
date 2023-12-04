import React from 'react';
import { Modal, Button } from '@mui/material';

const RemoveMovieModal = ({ open, onClose, onConfirmRemove, movie }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-4 bg-white rounded shadow-md max-w-sm mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-4">Remove Movie</h2>
        
        <p>Are you sure you want to remove the movie "{movie.title}" from the schedule?</p>

        <div className="flex justify-between mt-4">
          <Button className="bg-red-500 text-white hover:bg-red-700" onClick={onConfirmRemove}>
            Confirm Removal
          </Button>
          <Button className="bg-gray-400 text-white hover:bg-gray-600" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default RemoveMovieModal;