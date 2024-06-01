import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from '@material-tailwind/react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import DeleteroomFeedback from "./DeleteRoomFeedback";


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

const AllRoomFeedback = () => {
  const [roomFeedbacks, setRoomFeedbacks] = useState([]);
  const userInfo = useSelector(state => state.auth.userInfo);

  useEffect(() => {
    const fetchRoomFeedbacks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/roomfeedbacks/`);
        setRoomFeedbacks(response.data);
      } catch (error) {
        console.error("An error occurred while fetching room feedbacks.", error.message);
      }
    };

    fetchRoomFeedbacks();
  }, []);

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
        <h1 className="text-4xl">All Room Feedback</h1>
        {userInfo && !userInfo.isAdmin && (
          <div>
            <Link to="/myroomfeedback" className="no-underline mr-2">
              <Button className="btn btn-primary bg-green-500">My Feedback</Button>
            </Link>
            <Link to="/addroomfeedback" className="no-underline">
              <Button className="btn btn-primary bg-green-500">Enter Feedback</Button>
            </Link>
          </div>
        )}
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
              {userInfo && userInfo.isAdmin && <DeleteroomFeedback feedbackId={feedback._id} onDeleteFeedback={() => handleDeleteFeedback(feedback._id)} />}
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center">
          <p className="text-xl">No Room Feedbacks to display.</p><br /><br />
        </div>
      )}
    </div>
  );
};

export default AllRoomFeedback;
