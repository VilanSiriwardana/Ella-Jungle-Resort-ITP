//room info - custom
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardComponent_Custom_Summary from './custom.summary.card'; // Import the custom summary card component
import img from '../../../../assets/tour_landing.jpg';

const CardComponent_room = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null); // State to store the selected room
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("/residence/rooms/");
        setRooms(response.data);
      } catch (error) {
        setError(error.message); // Update state with the error message
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  const handleRoomSelect = (room) => {
    setSelectedRoom(room); // Set the selected room when a room is selected
  };

  if (error) {
    return <div>Error: {error}</div>; // Display error message if there's an error
  }

  return (
    <div>
      {rooms.map((room) => (
        <div key={room._id} className="mx-4 mb-8 overflow-hidden bg-gray-100 rounded-lg shadow-lg">
          <div className="flex items-center">
            <div className="w-1/3">
              <img src={img} alt="Image" className="w-full h-auto" />
            </div>
            <div className="w-2/3 p-4">
              <h3 className="mb-2 text-xl font-bold">{room.roomName}</h3>
              <p className="mb-4 text-lg text-gray-700">
                Room Type : {room.roomType}<br/>
                Maximum count : {room.maxCount}<br/>
                Description : {room.description}<br />
                Rs.{room.price} per person<br />
              </p>
              <div className="flex justify-between">
                <button
                  className="px-4 py-2 font-semibold text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline"
                  onClick={() => handleRoomSelect(room)} // Call handleRoomSelect when button is clicked
                >
                  Select
                </button>
                <button className="px-4 py-2 font-semibold text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline">
                  View More
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}


      
    </div>

    
  );

  
};



export default CardComponent_room;
