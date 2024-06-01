import React, { useEffect, useState } from 'react';
import axios from 'axios';
import img from '../../../assets/tour_landing.jpg'; // Assuming this is the correct import path for the image
import { SpaCard } from './latest/cards/SpaCard';

function SpaPackages() {
  const [spas, setSpas] = useState([]); // Initialize spas state as an empty array
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpas = async () => {
      try {
        const response = await axios.get('/api/spa-packages/');
        setSpas(response.data.data); // Assuming response.data is an object with a 'data' property containing the array of spas
      } catch (error) {
        setError(error.message);
        console.error('Error fetching spas:', error);
      }
    };

    fetchSpas();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='w-[1400px] mx-auto flex flex-wrap justify-around'>
      {spas.map(spa => (
        <SpaCard
          key={spa._id} 
          spa={spa} 
          img={img} 
          className='w-[30%] mb-4'
        />
      ))}
    </div>
  );
}

export default SpaPackages;

