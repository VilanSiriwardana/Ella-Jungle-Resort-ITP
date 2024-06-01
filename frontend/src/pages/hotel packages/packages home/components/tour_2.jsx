//home down part - packages home

import React from 'react';
import tour_2 from '../../../../assets/tour_landing_2.jpg';
import { Link } from 'react-router-dom';

export default function Tour_2() {
  return (
    <div className='flex flex-wrap '>
      <div className='flex items-center justify-center w-full lg:w-1/2 rounded-xl'>
        <img
          src={tour_2}
          width='500'
          height='96'
          className='object-cover p-10 rounded-xl' 
          alt='Tour landing Illustration'
          loading='eager'
        />
      </div>
      <div className='flex items-center w-full pl-[130px] lg:w-1/2'>
        <div className='max-w-2xl mx-auto mb-8'>
          <p className='py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300'>
            Curate your Sri Lankan adventure
             with our Ella Jungle resort promotions.
              Escape for a short break to explore
               the island’s highlights, or leisurely
                sample all its wonders.
          </p>
          <h2 className='text-4xl font-bold leading-snug tracking-tight text-black-800 lg:text-4xl lg:leading-tight xl:text-l xl:leading-tight dark:text-white'>
            Create your own package
          </h2>
          <div className='flex flex-col items-start space-y-5 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row'>
            
            <Link
              to='/custom_1' 
              className='px-8 py-4 text-lg font-medium text-center text-white bg-green-600 rounded-md'
            >
              Customize
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
