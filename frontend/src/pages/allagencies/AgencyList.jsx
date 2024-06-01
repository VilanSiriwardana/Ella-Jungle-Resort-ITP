import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HorizontalCard } from './components/agencyCard';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const images = require.context('../../assets', false, /\.(png|jpe?g|svg)$/);

const AgencyList = () => {
  const [allAgencies, setAllAgencies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { userInfo } = useSelector(state => state.auth);

  useEffect(() => {
    const getAgencies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/agencies/');
        setAllAgencies(response.data);
      } catch (error) {
        console.error('Error fetching agencies:', error);
      }
    };

    getAgencies();
  }, []);

  const filteredAgencies = allAgencies.filter(agency =>
    agency.agencyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAgencyImage = (imageName) => {
    try {
      return images(`./${imageName}`);
    } catch (error) {
      console.error('Error loading image:', error);
      return null; // Return null if the image cannot be loaded
    }
  };

  return (
    <div className='mx-[400px]'>
      <input
        type='text'
        placeholder='Search by Agency Name'
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className='flex-1 w-[200px] px-4 py-2 bg-gray-100 rounded-l-md focus:outline-none focus:bg-grey focus:ring-0 ml-[180px]'
      />
      <button
        type='submit'
        className='flex-shrink-0 px-4 py-2 text-white bg-green-500 rounded-r-md hover:bg-green-600 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500'
      >
        Search
      </button>

      {userInfo && (
        <Link to='/agencyregister'>
          <button
            type='submit'
            className='flex-shrink-0 px-4 py-2 mx-10 text-white bg-green-500 rounded'
          >
            Register Agency
          </button>
        </Link>
      )}

      <ul>
        {filteredAgencies.map(agency => (
          <HorizontalCard
            key={agency._id}
            img={getAgencyImage(agency.img)}
            name={agency.agencyName}
            description={agency.description}
            mail={agency.businessMail}
            id={agency._id}
          />
        ))}
      </ul>
    </div>
  );
};

export default AgencyList;