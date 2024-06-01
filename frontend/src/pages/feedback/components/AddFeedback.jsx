import React, { useState } from "react";
import axios from "axios";
import StarRating from "./StarRating";
import { Button } from '@material-tailwind/react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const AddFeedback = () => {
  const userInfo = useSelector(state => state.auth.userInfo);
  const [fbtitle, setTitle] = useState("");
  const [fbdescription, setDescription] = useState("");
  const [rating, setRating] = useState(0);

  function sendData(e) {
    e.preventDefault();

    if (userInfo === null) {
      alert("You must be logged in to submit feedback.");
      return;
    }

    // Check if any of the fields are empty
    if (!fbtitle.trim() || !fbdescription.trim() || rating === 0) {
      alert("Please fill in all fields and provide a rating before submitting.");
      return;
    }

    const newFeedback = {
      fbtitle,
      fbdescription,
      rating,
      giverName: userInfo.name,
      giverId: userInfo._id
    };

    axios.post("http://localhost:5000/api/feedbacks/addfeedback", newFeedback)
      .then(() => {
        alert("Feedback Added.");
        setTitle("");
        setDescription("");
        setRating(0);
      })
      .catch((err) => {
        alert("Error: " + err);
      });
  }

  return (
    <div className="container mx-auto relative">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">Share Your Feedback</h1>
      </div>
      <form onSubmit={sendData}>
        <div className="mb-8 p-10 shadow-md relative">
          <div className="mb-4">
            <label htmlFor="title" className="block text-xl font-bold">What's your feedback about?</label>
            <input
              type="text"
              id="title"
              className="block w-full mt-1 p-2 border rounded-md"
              placeholder="Enter Title"
              value={fbtitle}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-xl font-bold">Describe your experience</label>
            <input
              type="text"
              id="description"
              className="block w-full mt-1 p-2 border rounded-md"
              placeholder="Enter Your Description"
              value={fbdescription}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="rating" className="block text-xl font-bold">Rate your experience</label>
            <StarRating rating={rating} onRatingChange={setRating} />
          </div>
          <div className="flex justify-end space-x-4">
            <Button type="submit" className="btn btn-primary bg-green-500">Submit</Button>
            <Link to="/myagencyfeedback" className="no-underline">
              <Button className="btn btn-secondary bg-red-500">Cancel</Button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddFeedback;
