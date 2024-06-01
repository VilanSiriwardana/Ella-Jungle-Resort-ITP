import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
//get user info
import { useSelector } from 'react-redux';

function ReservationForm() {
    //get user info
  const { userInfo } = useSelector(state => state.auth);

  const { id } = useParams();
  const [reservationDetails, setreservationDetails] = useState({
    roomID: '',
    userID: userInfo._id,
    fullName: userInfo.name,
    email: userInfo.email,
    contactNumber: userInfo.mobile,
    checkIn: '',
    checkOut: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setreservationDetails(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const formData = { ...reservationDetails, roomID: id };
      await axios.post('/reservation/booking', formData);
      alert('Reservation added succefully');
      //reset form fields
      setreservationDetails({
        roomID: '',
        userID: '',
        fullName: '',
        email: '',
        contactNumber: '',
        checkIn: '',
        checkOut: '',
      });
    } catch (error) {
      console.error('Error adding data', error);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className='p-6 my-10 overflow-hidden bg-green-200 rounded-lg mx-60'>
      <h2 className='pt-5 pb-10 mb-4 font-sans text-5xl font-bold text-center'>
        Book your room
      </h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <input
            type='text'
            name='roomID'
            value={id}
            onChange={handleChange}
            className='w-full p-2 border border-gray-400 rounded'
            required
            readOnly
            hidden
          />
        </div>
        <div>
          <label className='block mb-1'>Full Name:</label>
          <input
            type='text'
            name='fullName'
            value={reservationDetails.fullName}
            onChange={handleChange}
            className='w-full p-2 border border-gray-400 rounded'
            required
            readOnly
          />
        </div>
        <div>
          <label className='block mb-1'>Email:</label>
          <input
            type='email'
            name='email'
            value={reservationDetails.email}
            onChange={handleChange}
            className='w-full p-2 border border-gray-400 rounded'
            required
            readOnly
          />
        </div>
        <div>
          <label className='block mb-1'>Contact Number:</label>
          <input
            type='text'
            name='contactNumber'
            value={reservationDetails.contactNumber}
            onChange={handleChange}
            className='w-full p-2 border border-gray-400 rounded'
            required
            readOnly
          />
        </div>
        <div className='flex space-x-4'>
          <div>
            <label className='block mb-1'>Check-in Date:</label>
            <input
              type='date'
              name='checkIn'
              value={reservationDetails.checkIn}
              onChange={handleChange}
              className='w-full p-2 border border-gray-400 rounded'
              required
              min={today}
            />
          </div>
          <div>
            <label className='block mb-1'>Check-out Date:</label>
            <input
              type='date'
              name='checkOut'
              value={reservationDetails.checkOut}
              onChange={handleChange}
              className='w-full p-2 border border-gray-400 rounded'
              required
              min = {reservationDetails.checkIn}
            />
          </div>
        </div>
        <div>
          <button
            type='submit'
            className='px-4 py-2 text-white transition ease-in-out bg-green-500 rounded hover:bg-black text-cyan'
            onClick={() => window.location.href = `/myReservations/${userInfo._id}`}
          >
            Proceed
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
