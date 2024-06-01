import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Button } from '@material-tailwind/react';

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

const LatestFeedbacks = () => {
  const [latestFeedbacks, setLatestFeedbacks] = useState([]);

  useEffect(() => {
    const fetchLatestFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/feedbacks/lastFeedbacks');
        setLatestFeedbacks(response.data);
      } catch (error) {
        console.error('Error fetching latest feedbacks:', error);
      }
    };

    fetchLatestFeedbacks();
  }, []);

  return (
    <div className='my-20 max-w-[800px] mx-auto'>
      <h1 className='pb-1 mb-6 text-4xl font-bold text-center'>Latest Feedbacks</h1>
      {latestFeedbacks.length > 0 ? latestFeedbacks.map((feedback) => (
        <div key={feedback._id} className="mb-4 p-4 shadow-lg rounded-lg">
          <h3 className="text-2xl font-bold">{feedback.fbtitle}</h3>
          <p className="text-gray-600">{feedback.fbdescription}</p>
          <div className="mt-2">
            {renderStarRating(feedback.rating)}
          </div>
          <div className="text-sm text-gray-500 mt-2">Given by: {feedback.giverName} on {new Date(feedback.createdAt).toLocaleDateString()}</div>
        </div>
      )) : (
        <p>No recent feedbacks to display.</p>
      )}
      <Link to="/feedback" className="flex justify-center mt-4">
        <Button className="btn btn-primary bg-green-500">View All Feedbacks</Button>
      </Link><br/><br/>
    </div>
  );
};

export default LatestFeedbacks;
