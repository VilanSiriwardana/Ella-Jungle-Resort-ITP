import React, { useState, useEffect } from "react";
import axios from "axios";
import StarRating from "./StarRating";
import { Button } from '@material-tailwind/react';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

const AddagencyFeedback = () => {
  const userInfo = useSelector(state => state.auth.userInfo);
  const { agencyId: paramAgencyId } = useParams(); // Get agencyId from URL params
  const [selectedAgency, setSelectedAgency] = useState({});
  const [fbtitle, setTitle] = useState("");
  const [fbdescription, setDescription] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    // Fetch agency details based on agencyId from URL params
    const fetchAgencyDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/agencies/get/${paramAgencyId}`);
        setSelectedAgency(response.data);
      } catch (err) {
        console.error("Error fetching agency details:", err);
      }
    };

    if (paramAgencyId) {
      fetchAgencyDetails();
    }
  }, [paramAgencyId]);

  function sendData(e) {
    e.preventDefault();

    if (userInfo === null) {
      alert("You must be logged in to submit feedback.");
      return;
    }

    if (!fbtitle.trim() || !fbdescription.trim() || rating === 0 || !selectedAgency.agencyName) {
      alert("Please fill in all fields and provide a rating before submitting.");
      return;
    }

    const newFeedback = {
      fbtitle,
      fbdescription,
      rating,
      giverName: userInfo.name,
      giverId: userInfo._id,
      agencyname: selectedAgency.agencyName,
      agencyId: selectedAgency._id,
    };

    axios.post("http://localhost:5000/api/agencyfeedbacks/addfeedback", newFeedback)
      .then(() => {
        alert("Feedback Added.");
        setTitle("");
        setDescription("");
        setRating(0);
        setSelectedAgency({});
      })
      .catch((err) => {
        alert("Error: " + err);
      });
  }

  return (
    <div className="container mx-auto relative">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">Share Your Feedback about agencies</h1>
      </div>
      <form onSubmit={sendData}>
        <div className="mb-8 p-10 shadow-md relative">
          <div className="mb-4">
            <label htmlFor="agency" className="block text-xl font-bold">Select Agency</label>
            <input
              type="text"
              id="agency"
              className="block w-full mt-1 p-2 border rounded-md"
              value={selectedAgency.agencyName || ""}
              readOnly
            />
          </div>
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
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddagencyFeedback;
