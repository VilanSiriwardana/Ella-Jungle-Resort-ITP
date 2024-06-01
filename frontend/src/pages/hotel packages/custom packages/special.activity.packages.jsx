import React, { useEffect, useState } from 'react';
import axios from 'axios';
import img from '../../../assets/tour_landing.jpg';
import { ActivityCard } from './latest/cards/ActivityCards';

function ActivityPackages() {
  const [activities, setActivities] = useState([]); // State to store selected rooms
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get('/SpecialActivity/');
        setActivities(response.data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();
  }, []);


  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='w-[1400px] mx-auto flex flex-wrap justify-around'>
      {activities.map(activity => (
        <ActivityCard
          key={activity._id} 
          activity={activity} 
          img={img} 
          className='w-[30%] mb-4'
        />
      ))}
 
    </div>
  );
}

export default ActivityPackages;
