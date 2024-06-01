import React, { useEffect, useState } from 'react';
import axios from 'axios';
import img from '../../../assets/tour_landing.jpg';
import { RoomCard } from './latest/cards/RoomCard';

function RoomPackages() {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('/residence/rooms/');
        setRooms(response.data);
      } catch (error) {
        setError(error.message); 
        console.error('Error fetching rooms:', error);
      }
    };
    fetchRooms();
  }, []);

  if (error) {
    return <div>Error: {error}</div>; 
  }

  return (
    <div className='w-[1400px] mx-auto flex flex-wrap justify-around'>
      {rooms.map(room => (
        <RoomCard
          key={room.id}
          room={room}
          img={img}
          className='w-[30%] mb-4'
        />
      ))}
    </div>
  );
}

export default RoomPackages;
