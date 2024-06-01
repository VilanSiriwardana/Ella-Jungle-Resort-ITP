import React, { useState, useEffect } from "react";
import axios from "axios";
import StarRating from "./StarRating";
import { Button } from '@material-tailwind/react';
import { useSelector } from 'react-redux';

const AddRoomFeedback = () => {
  const userInfo = useSelector(state => state.auth.userInfo);
  const [roomData, setRoomData] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState({});
  const [fbtitle, setTitle] = useState("");
  const [fbdescription, setDescription] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    // Fetch room names and IDs from the backend
    const fetchRoomData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/residence/rooms");
        const roomsData = response.data.map(room => ({
          name: room.roomName,
          id: room._id
        }));
        setRoomData(roomsData);
      } catch (err) {
        console.error("Error fetching room data:", err);
      }
    };

    fetchRoomData();
  }, []);

  function sendData(e) {
    e.preventDefault();

    if (userInfo === null) {
      alert("You must be logged in to submit feedback.");
      return;
    }

    if (!fbtitle.trim() || !fbdescription.trim() || rating === 0 || !selectedRoom.name) {
      alert("Please fill in all fields and provide a rating before submitting.");
      return;
    }

    const newFeedback = {
      fbtitle,
      fbdescription,
      rating,
      giverName: userInfo.name,
      giverId: userInfo._id,
      roomname: selectedRoom.name,
      roomId: selectedRoom.id,
    };

    axios.post("http://localhost:5000/api/roomfeedbacks/addfeedback", newFeedback)
      .then(() => {
        alert("Feedback Added.");
        setTitle("");
        setDescription("");
        setRating(0);
        setSelectedRoom({});
      })
      .catch((err) => {
        alert("Error: " + err);
      });
  }

  return (
    <div className="container mx-auto relative">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">Share Your Feedback about Rooms</h1>
      </div>
      <form onSubmit={sendData}>
        <div className="mb-8 p-10 shadow-md relative">
          <div className="mb-4">
            <label htmlFor="room" className="block text-xl font-bold">Select Room</label>
            <select
              id="room"
              className="block w-full mt-1 p-2 border rounded-md"
              value={selectedRoom.name || ""}
              onChange={(e) => setSelectedRoom(roomData.find(room => room.name === e.target.value))}
            >
              <option value="">Select Room</option>
              {roomData.map(room => (
                <option key={room.id} value={room.name}>{room.name}</option>
              ))}
            </select>
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

export default AddRoomFeedback;
