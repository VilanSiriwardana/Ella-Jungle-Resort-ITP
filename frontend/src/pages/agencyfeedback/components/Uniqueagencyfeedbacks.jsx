import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from '@material-tailwind/react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

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



const Uniqueagencyfeedback = () => {
  const [allFeedback, setFeedback] = useState([]);
  const userInfo = useSelector(state => state.auth.userInfo);
  const { id } = useParams();
  const user = useSelector(state => state.auth.userInfo);

  useEffect(() => {
    const giverId = userInfo ? userInfo._id : null;
    if (giverId) {
      fetchFeedbacks(giverId);
    } else {
      setFeedback([]);
    }
  }, [userInfo]);

  const fetchFeedbacks = async (giverId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/agencyfeedbacks/feedbacksByAgencyId/${id}`);
      setFeedback(response.data);
    } catch (error) {
      console.error("An error occurred while fetching feedbacks.", error.message);
    }
  };


  // Function to format the createdAt date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container relative mx-auto">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl">Agency Feedback</h1>
      </div>
      {allFeedback.length > 0 ? (
        <ul className="p-0 list-none">
          {allFeedback.map((feedback) => (
            <li key={feedback._id} className="relative p-10 mb-8 shadow-md">
              <p className="font-bold">Agency : {feedback.agencyname}</p><br/>
              <p className="font-bold">{feedback.giverName}</p>
              <p className="text-sm text-gray-500">{formatDate(feedback.createdAt)}</p><br />
              <h3 className="mb-4 text-2xl font-bold">{feedback.fbtitle}</h3>
              <p className="font-bold">{feedback.fbdescription}</p>
              <div className="mt-4">
                {renderStarRating(feedback.rating)}
              </div>

              <br/>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center">
          <p className="text-xl">No Feedback to display.</p><br/><br/>
        </div>
      )}
    </div>


  );
};

export default Uniqueagencyfeedback;
