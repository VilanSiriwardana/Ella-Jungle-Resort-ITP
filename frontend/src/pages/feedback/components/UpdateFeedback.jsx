import React, { useState } from "react";
import axios from "axios";
import StarRating from "./StarRating";
import { Button } from '@material-tailwind/react';
import { Link } from "react-router-dom";

const UpdateFeedback = ({ feedbackId, currentTitle, currentDescription, currentRating, onUpdateFeedback }) => {
  const [fbTitle, setFbTitle] = useState(currentTitle);
  const [fbDescription, setFbDescription] = useState(currentDescription);
  const [rating, setRating] = useState(currentRating);

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Validation for empty fields
    if (!fbTitle.trim() || !fbDescription.trim() || rating === 0) {
      alert("Please fill in all fields and provide a rating.");
      return;
    }

    try {
      const updatedFeedback = { fbtitle: fbTitle, fbdescription: fbDescription, rating };
      await axios.put(`http://localhost:5000/api/feedbacks/updatefeedback/${feedbackId}`, updatedFeedback);
      onUpdateFeedback(); // Refresh or navigate as needed
      alert("Feedback updated successfully!");
    } catch (error) {
      console.error("Error updating feedback.", error.message);
      alert("Error updating feedback. Please try again.");
    }
  };

  return (
    <div className="container mx-auto relative">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">Update Your Feedback</h1>
      </div>
      <form onSubmit={handleUpdate}>
        <div className="mb-8 p-10 shadow-md relative">
          <div className="mb-4">
            <label htmlFor="title" className="block text-xl font-bold">What's your feedback about?</label>
            <input
              type="text"
              id="title"
              className="block w-full mt-1 p-2 border rounded-md"
              placeholder="Enter Title"
              value={fbTitle}
              onChange={(e) => setFbTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-xl font-bold">Describe your experience</label>
            <input
              type="text"
              id="description"
              className="block w-full mt-1 p-2 border rounded-md"
              placeholder="Enter Your Description"
              value={fbDescription}
              onChange={(e) => setFbDescription(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="rating" className="block text-xl font-bold">Rate your experience</label>
            <StarRating rating={rating} onRatingChange={setRating} />
          </div>
          <div className="flex justify-end space-x-4">
            <Button type="submit" className="btn btn-primary bg-green-500">Update</Button>

            <Link to="/Feedback" className="no-underline">
              <Button className="btn btn-secondary bg-red-500">Cancel</Button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateFeedback;
