import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from '@material-tailwind/react';
import { useSelector } from 'react-redux'; // Import useSelector

import { Link } from "react-router-dom";
import DeleteFeedback from "./DeleteFeedback";


const starStyles = {
  marginRight: "3px",
  color: "#ffc107",
  fontSize: "1.5rem",
};

const renderStarRating = (rating) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(<span key={i} style={starStyles}>★</span>);
    } else {
      stars.push(<span key={i} style={starStyles}>☆</span>);
    }
  }
  return stars;
};

const AllFeedback = () => {
  const [allFeedback, setFeedback] = useState([]);
  const [selectedRating, setSelectedRating] = useState(""); // State to store selected rating
  const user = useSelector(state => state.auth.userInfo); // `userInfo` may be null or contain `isAdmin`

  useEffect(() => {
    function getFeedback() {
      let url = "http://localhost:5000/api/feedbacks/";
      if (selectedRating && selectedRating !== "all") {
        url = `http://localhost:5000/api/feedbacks/feedbacksByRating/${selectedRating}`;
      }
      axios.get(url)
        .then((res) => {
          setFeedback(res.data);
        })
        .catch((err) => {
          console.error("Error fetching Feedbacks.", err.message);
        });
    }
  
    getFeedback();
  }, [selectedRating]); // Fetch feedbacks when selectedRating changes
  

  
  const handleDeleteFeedback = async (feedbackId) => {
    try {
      await axios.delete(`http://localhost:5000/api/feedbacks/deletefeedback/${feedbackId}`);
      setFeedback(allFeedback.filter(feedback => feedback._id !== feedbackId));
      alert("Feedback deleted successfully!");
    } catch (error) {
      console.error("Error deleting Feedback.", error.message);
      alert("Error deleting feedback. Please try again.");
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container relative mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl">All Feedback</h1>
        {/* Adjust the condition to check if user is NOT an admin */}
        {user && !user.isAdmin && (
          <div>
            <Link to="/MyFeedback" className="mr-2 no-underline">
              <Button className="bg-green-500 btn btn-primary">My Feedback</Button>
            </Link>
            <Link to="/AddFeedback" className="no-underline">
              <Button className="bg-green-500 btn btn-primary">Enter Feedback</Button>
            </Link>
          </div>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="rating" className="block text-gray-700">Filter by Rating:</label>
        <select
          id="rating"
          name="rating"
          className="border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={selectedRating}
          onChange={(e) => setSelectedRating(e.target.value)}
        >
          <option value="">All</option>
          {[1, 2, 3, 4, 5].map((rating) => (
            <option key={rating} value={rating}>{rating}</option>
          ))}
        </select>
      </div>
      {allFeedback.length > 0 ? (
        <ul className="p-0 list-none">
          {allFeedback.map((feedback) => (
            <li key={feedback._id} className="relative p-10 mb-8 shadow-md">
              <p className="font-bold">{feedback.giverName}</p>
              <p className="text-sm text-gray-500">{formatDate(feedback.createdAt)}</p><br />
              <h3 className="mb-4 text-2xl font-bold">{feedback.fbtitle}</h3>
              <p className="font-bold">{feedback.fbdescription}</p>
              <div className="mt-4">
                {renderStarRating(feedback.rating)}
              </div>
              {user && user.isAdmin && <DeleteFeedback feedbackId={feedback._id} onDeleteFeedback={() => handleDeleteFeedback(feedback._id)} />}
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center">
          <p className="text-xl">No Feedbacks to display.</p><br /><br />
        </div>
      )}
    </div>
  );
};

export default AllFeedback;
