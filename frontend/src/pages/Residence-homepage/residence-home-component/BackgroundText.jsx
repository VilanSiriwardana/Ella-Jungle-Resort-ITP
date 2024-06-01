//homepage
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'

function BackgroundText() {
  const { userInfo } = useSelector(state => state.auth);

  const navigate = useNavigate(); // Access navigate object for redirection

  navigate('/available'); // Replace '/roomPage' with your actual room details page path

  return (
    <div
      className='relative h-screen bg-center bg-cover'
      style={{
        backgroundImage:
          "url('https://www.ellajungleresort.lk/wp-content/uploads/2019/06/home_004.jpg')",
      }}
    >
      <div className='absolute inset-0 bg-black opacity-50'></div>
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='text-center text-white'>
          <h1 className='mb-4 font-mono text-5xl font-bold '>
            Luxury in the middle of the jungle
          </h1>
          <p className='text-lg justify-normal'>
            Immerse yourself in nature's embrace at our jungle hotel, where
            luxury meets the wild. Wake up to the sounds of exotic birds and
            lush greenery outside your window.{' '}
          </p>
          <button
            onClick={() => (window.location.href = '/available')}
            className='px-4 py-2 mt-20 font-bold transition duration-300 ease-in-out bg-white rounded-full text-1xl bg-opacity-30 text-cyan-500 hover:bg-opacity-70 hover:text-black'
          >
            Book Now !
          </button>
          <button
            onClick={() =>
              (window.location.href = `/myReservations/${userInfo._id}`)
            }
            className='px-4 py-2 mt-20 ml-10 font-bold transition duration-300 ease-in-out bg-white rounded-full text-1xl bg-opacity-30 text-cyan-500 hover:bg-opacity-70 hover:text-black'
          >
            My Reservations!
          </button>

          <Link to='/allroomfeedback'>
            <button className='px-4 py-2 mt-20 ml-10 font-bold transition duration-300 ease-in-out bg-white rounded-full text-1xl bg-opacity-30 text-cyan-500 hover:bg-opacity-70 hover:text-black'>
              Room Feedbacks
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BackgroundText;
