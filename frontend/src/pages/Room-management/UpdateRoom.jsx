import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';

const UpdateRoomForm = () => {
    const { id } = useParams(); // Extract room ID from URL parameters
    const [roomDetails, setRoomDetails] = useState({
      roomName: '',
      roomType: '',
      maxCount: '',
      description: '',
      price: ''
    });

    useEffect(() => {
        fetchRoomDetails(id); // Pass room ID to fetchRoomDetails function
      }, [id]);  // Ensure useEffect re-runs when id changes

  const fetchRoomDetails = async (roomId) => {
    try {
      const response = await axios.get(`/residence/rooms/${roomId}`);
      const room = response.data;
      setRoomDetails(room);
    } catch (error) {
      console.error('Error fetching room details:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
    console.log('Form data updated:', name, value); // Add this line for logging
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { roomName, roomType, maxCount, description, price } = roomDetails; // Destructure needed properties
    const updatedRoom = { roomName, roomType, maxCount, description, price }; // Create a new object with only the needed properties
    await axios.patch(`/residence/rooms/${id}`, updatedRoom); // Use the updatedRoom object for the patch request
    console.log('Room updated successfully');
    // Optionally, redirect to a different page or show a success message
    } catch (error) {
      console.error('Error updating room:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-green-200 rounded-lg p-12 shadow-lg w-96">
        <h1 className="text-4xl text-center font-sans font-bold pb-8 text-black">Update Room</h1>
        <form onSubmit={handleSubmit}>
          {/* Form fields */}
          <div className="mb-6">
            <label htmlFor="roomName" className="block text-sm font-medium text-gray-700">Room Name</label>
            <input type="text" id="roomName" name="roomName" value={roomDetails.roomName} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <div className="mb-6">
            <label htmlFor="roomType" className="block text-sm font-medium text-gray-700">Room Type</label>
            <input type="text" id="roomType" name="roomType" value={roomDetails.roomType} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <div className="mb-6">
            <label htmlFor="maxCount" className="block text-sm font-medium text-gray-700">Max Count</label>
            <input type="number" id="maxCount" name="maxCount" value={roomDetails.maxCount} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="description" name="description" value={roomDetails.description} onChange={handleChange} rows="3" className="mt-1 p-2 border border-gray-300 rounded-md w-full"></textarea>
          </div>
          <div className="mb-6">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
            <input type="text" id="price" name="price" value={roomDetails.price} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          {/* Other form fields */}
          <button type="submit" className="bg-green-700 hover:bg-black text-white font-semibold py-2 px-4 rounded transition-colors ease-in-out duration-300" onClick={() => window.location.href = '/RoomPage'}>Update Room</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateRoomForm;
