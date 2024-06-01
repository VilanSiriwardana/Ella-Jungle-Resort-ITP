import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoomPage = () => {
  const [rooms, setRooms] = useState([]);

  const fetchRooms = async () => {
    try {
      const response = await axios.get('/residence/rooms');
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);



  const handleDelete = async (roomId) => {
    try {
      // Make DELETE request to backend to delete the room
      await axios.delete(`/residence/rooms/${roomId}`);
      // After successful deletion, refetch rooms
      fetchRooms();
      console.log(`Deleting room: ${roomId}`);
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };

  return (
    <div className="container mx-auto my-10">
      <div className="flex justify-between py-10">
        <h1 className="mb-4 text-3xl font-semibold">All Rooms</h1>
        <button className="px-4 py-2 mr-2 font-bold text-white bg-green-500 rounded hover:bg-black" onClick={() => window.location.href = '/AddRoom'}>Add Rooms</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Max Count</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map(room => (
              <tr key={room._id}>
                <td className="px-4 py-2 border">{room.roomName}</td>
                <td className="px-4 py-2 border">{room.description}</td>
                <td className="px-4 py-2 border">{room.roomType}</td>
                <td className="px-4 py-2 border">{room.maxCount}</td>
                <td className="px-4 py-2 border">LKR.{room.price}</td>
                <td className="px-4 py-2 border">
                  <button onClick={() => window.location.href = `/UpdateRoom/${room._id}`} className="px-4 py-2 mb-5 mr-2 font-bold text-white bg-green-500 rounded hover:bg-black">
                    Update
                  </button>
                  <button onClick={() => handleDelete(room._id)} className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-black">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomPage;
