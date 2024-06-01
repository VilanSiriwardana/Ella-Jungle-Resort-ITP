//myReservation
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const MyReservation = () => {
  const { userInfo } = useSelector(state => state.auth);
  const [reservations, setReservations] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('/reservation/bookings');
        setReservations(response.data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    const fetchRooms = async () => {
      try {
        const response = await axios.get('/residence/rooms');
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchReservations();
    fetchRooms();
  }, []);

  const formatDate = dateString => {
    return dateString.substring(0, 10); // Extract first 10 characters (YYYY-MM-DD)
  };

  return (
    <div className='container mx-auto my-10'>
      <h1 className='my-20 text-3xl font-bold text-center'>My Reservations</h1>
      <div className='flex flex-wrap justify-center mr-10'>
        {reservations.map(reservation => {
          // Filter reservations based on user ID
          if (reservation.userID !== userInfo._id) return null;

          const room = rooms.find(room => room._id === reservation.roomID);
          if (!room) return null; // Skip if room details are not found

          return (
            <div
              key={reservation.id}
              className='flex flex-row items-center p-10 mx-5 my-10 transition duration-75 ease-in bg-white rounded-lg shadow-md hover:shadow-2xl hover:scale-110'
            >
              {/* Room photo */}
              <div className='flex-shrink-0 mr-4'>
                <img
                  src={require(`../../../assets/${room.image}`)}
                  alt={room.roomName}
                  className='object-cover w-full h-64 rounded-lg '
                />
              </div>
              {/* Room details */}
              <div className='ml-10'>
                <label htmlFor='RoomName'> Room Name : </label>
                <h2 className='pb-2 font-bold'>{room.roomName}</h2>

                <label htmlFor='Room Type'> Room Type : </label>
                <p className='pb-2 font-bold'>{room.roomType}</p>

                <label htmlFor='max guest'> Max guests : </label>
                <p className='pb-2 font-bold'>{room.maxCount} Guests</p>

                <label htmlFor='price'> Room Price : </label>
                <p className='pb-2 font-bold'>Price: {room.price}</p>

                <label htmlFor='checkIn'> Check In : </label>
                <p className='pb-2 font-bold'>
                  {formatDate(reservation.checkIn)}
                </p>

                <label htmlFor='checkOut'> Check Out : </label>
                <p className='pb-2 font-bold'>
                  {formatDate(reservation.checkOut)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyReservation;
