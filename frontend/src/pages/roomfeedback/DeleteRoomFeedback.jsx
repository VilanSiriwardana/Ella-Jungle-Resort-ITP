import React from "react";
import axios from "axios";
import { Button } from '@material-tailwind/react';

const DeleteroomFeedback = ({ feedbackId, onDeleteFeedback }) => {

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/roomfeedbacks/deletefeedback/${feedbackId}`);
      onDeleteFeedback();
      alert("Feedback deleted successfully!");
    } catch (error) {
      console.error("Error deleting Feedback.", error.message);
      alert("Error deleting feedback. Please try again.");
    }
  };

  return (
    <div className="flex justify-end">
      <Button
        type="button"
        className="btn btn-secondary bg-red-500"
        onClick={handleDelete}
      >
        Delete
      </Button>
    </div>
  );
};

export default DeleteroomFeedback;
