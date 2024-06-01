import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DisplayCustomPackages = () => {
  const [customPackages, setCustomPackages] = useState([]);
  const { userInfo } = useSelector(state => state.auth);
  const userID = userInfo._id

  const fetchData = async () => { // Define fetchData function
    try {
      const response = await axios.get(
        '/custom_packages'
      );
      setCustomPackages(response.data);
    } catch (error) {
      console.error('Error fetching custom packages:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Call fetchData function inside useEffect
  }, []);

  const handleDelete = async (packageId) => {
    try {
      await axios.delete(`/custom_packages/delete/${packageId}`);
      fetchData(); // Fetch updated package list after deletion
    } catch (error) {
      console.error('Error deleting custom package:', error);
    }
  };

  // Filter customPackages based on userID
  const filteredPackages = customPackages.filter(customPackage => userID === customPackage.user_id );


  return (
    <div className='container py-8 mx-auto'>
      <h1 className='mb-6 text-3xl font-bold'>Custom Packages</h1>
      <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
        
        {filteredPackages.map(customPackage => (
          <div
            key={customPackage._id}
            className='p-4 border rounded-lg shadow-md'
          >
            <h2 className='mb-2 text-lg font-bold' hidden>
              User ID: {customPackage.user_id}
            </h2>
            <h2 className='mb-2 text-lg font-bold' hidden>
              Package ID: {customPackage._id}
            </h2>
            <div>
              <h3 className='mb-2 text-lg font-semibold'>Spa Packages</h3>
              <ul>
                {customPackage.spa_package_ids.map(spaPackage => (
                  <li key={spaPackage._id} className='mb-2'>
                    <h4 className='text-lg font-semibold'>
                      {spaPackage.packageName}
                    </h4>
                    <p className='text-gray-600' hidden>
                      Description: {spaPackage.description}
                    </p>
                    <p className='text-gray-600'>Price: {spaPackage.price}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className='mb-2 text-lg font-semibold'>Special Activities</h3>
              <ul>
                {customPackage.special_activity_ids.map(activity => (
                  <li key={activity._id} className='mb-2'>
                    <h4 className='text-lg font-semibold'>{activity.name}</h4>
                    <p className='text-gray-600'>
                      Description: {activity.description}
                    </p>
                    <p className='text-gray-600'>Price: {activity.price}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className='mb-2 text-lg font-semibold'>Room Packages</h3>
              <ul>
                {customPackage.room_package_ids.map(room => (
                  <li key={room._id} className='mb-2'>
                    <h4 className='text-lg font-semibold'>{room.roomName}</h4>
                    <p className='text-gray-600'>Type: {room.roomType}</p>
                    <p className='text-gray-600'>Max Count: {room.maxCount}</p>
                    <p className='text-gray-600'>Price: {room.price}</p>
                  </li>
                ))}
              </ul>
            </div>
            <p className='mt-4 text-lg font-semibold'>
              Total Price: {customPackage.total_price}
            </p>
            <Button
              className='mx-10 bg-red-500'
              onClick={() => handleDelete(customPackage._id)}
            >
              Delete
            </Button>
            <Link to={`/cus/${customPackage._id}/${customPackage.total_price}`}>
              <Button className='bg-green-500'>Book Now</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayCustomPackages;
