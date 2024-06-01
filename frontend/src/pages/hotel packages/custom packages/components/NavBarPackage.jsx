//customerize packages - NavBar

import React from 'react';
import { Link } from 'react-router-dom';

const NavBarComponent = () => {
  return (
    <div className='mx-4 mb-8 overflow-hidden bg-gray-100 rounded-lg shadow-lg'>
      <div className='flex justify-between px-4 py-4 bg-white'>
        <Link
          to='/custom/spa'
          className='px-4 py-2 mr-2 font-semibold text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline'
        >
          Spa
        </Link>
        <Link
          to='/custom/special'
          className='px-4 py-2 mx-2 font-semibold text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline'
        >
          Special Activities
        </Link>
        <Link
          to='/custom/room'
          className='px-4 py-2 mx-2 font-semibold text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline'
        >
          Rooms
        </Link>
        {/* <Link to="/custom_summary" className="px-4 py-2 ml-2 font-semibold text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline">
          Summary
        </Link> */}
      </div>
    </div>
  );
};

export default NavBarComponent;
