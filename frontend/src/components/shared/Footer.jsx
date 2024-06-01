import React from 'react';
import {
  FaWhatsappSquare,
  FaFacebookSquare,
  FaInstagramSquare,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='bottom-0 grid w-full gap-8 px-10 py-16 text-gray-300 bg-black md:grid-cols-2'>
      <div className=''>
        <h3 className='text-2xl font-bold text-green-400'>
          Ella Jungle Resort
        </h3>
        <p className='py-4'>
          Our tree planting program ShakaSanga provides individuals and
          organizations an opportunity to help us keep Sri Lanka green
        </p>
        <div>
          <p className='text-green-400'>Tel (Office): +94 [0] 11 - 432 7575</p>
          <p className='text-green-400'>Email: info@ellajungleresort.lk</p>
        </div>
        <div className='flex justify-start gap-10 md:w-[75%] my-6'>
          <FaWhatsappSquare size={30} />
          <FaFacebookSquare size={30} />
          <FaInstagramSquare size={30} />
        </div>
      </div>
      <div className='flex flex-col justify-start mt-5 md:flex-row md:justify-around'>
        <div>
          <h6 className='font-bold text-green-400'>Our Services</h6>
          <ul className='mt-2 font-light'>
            <li className='py-2 text-sm'>Tour Packages</li>
            <li className='py-2 text-sm'>Travel Agencies</li>
            <li className='py-2 text-sm'>Restaurants</li>
            <li className='py-2 text-sm'>Events</li>
          </ul>
        </div>
        <div className='mt-4 md:mt-0 md:ml-8'>
          <h6 className='font-bold text-green-400'>Support</h6>
          <ul className='mt-2 font-light'>
            <li className='py-2 text-sm'>Customer Care</li>
            <li className='py-2 text-sm'>About us</li>
            <li className='py-2 text-sm'>Contact us</li>{' '}
            {/* Changed "About us" to "Contact us" */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
