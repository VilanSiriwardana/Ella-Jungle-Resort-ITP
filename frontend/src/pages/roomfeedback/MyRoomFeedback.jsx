import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteroomFeedback from "./DeleteRoomFeedback";
import { Button } from '@material-tailwind/react';
import { useSelector } from 'react-redux';

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

const MyRoomFeedback = () => {
  const [roomFeedbacks, setRoomFeedbacks] = useState([]);
  const userInfo = useSelector(state => state.auth.userInfo);

  useEffect(() => {
    const fetchRoomFeedbacks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/roomfeedbacks/feedbacksByGiverId/${userInfo._id}`);
        setRoomFeedbacks(response.data);
      } catch (error) {
        console.error("An error occurred while fetching room feedbacks.", error.message);
      }
    };

    fetchRoomFeedbacks();
  }, [userInfo]);

  const handleDeleteFeedback = async (feedbackId) => {
    try {
      await axios.delete(`http://localhost:5000/api/roomfeedbacks/deletefeedback/${feedbackId}`);
      setRoomFeedbacks(roomFeedbacks.filter(feedback => feedback._id !== feedbackId));
      alert("Feedback deleted successfully!");
    } catch (error) {
      console.error("Error deleting Feedback.", error.message);
      alert("Error deleting feedback. Please try again.");
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
    <div className="container mx-auto relative">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">My Room Feedback</h1>
      </div>
      {roomFeedbacks.length > 0 ? (
        <ul className="list-none p-0">
          {roomFeedbacks.map((feedback) => (
            <li key={feedback._id} className="mb-8 p-10 shadow-md relative">
              <p className="font-bold">{feedback.giverName}</p>
              <p className="text-sm text-gray-500">{formatDate(feedback.createdAt)}</p><br />
              <h3 className="mb-4 font-bold text-2xl">{feedback.fbtitle}</h3>
              <p className="font-bold">{feedback.fbdescription}</p>
              <div className="mt-4">
                {renderStarRating(feedback.rating)}
              </div>
              <div className="flex justify-end space-x-2">
                <DeleteroomFeedback feedbackId={feedback._id} onDeleteFeedback={() => handleDeleteFeedback(feedback._id)} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center">
          <p className="text-xl">You have no Room Feedbacks to display.</p><br/><br/>
        </div>
      )}
    </div>
  );
};

export default MyRoomFeedback;
