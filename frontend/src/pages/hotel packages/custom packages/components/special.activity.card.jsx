import React, { useEffect, useState } from 'react';
import axios from 'axios';
import img from '../../../../assets/tour_landing_2.jpg';

const CardComponent_activity = () => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get("/SpecialActivity/");
        setActivities(response.data);
      } catch (error) {
        setError(error.message); // Update state with the error message
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();
  }, []);

  if (error) {
    return <div>Error: {error}</div>; // Display error message if there's an error
  }

  return (
    <div>
      {activities.map((activity) => (
        <div key={activity._id} className="bg-gray-100 rounded-lg overflow-hidden shadow-lg mb-8 mx-4 w-[300px]">
          <div className="flex items-center">
            <div className="w-1/3">
              <img src={img} alt="Image" className="w-full h-auto" />
            </div>
            <div className="w-2/3 p-4">
              <h3 className="mb-2 text-xl font-bold">{activity.name}</h3>
              <p className="mb-4 text-lg text-gray-700">
                Description : {activity.description}<br />
                Price : Rs.{activity.price} per person<br />
               
              </p>
              <div className="flex justify-between">
                <button className="px-4 py-2 font-semibold text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline">
                  Select
                </button>
                <button className="px-4 py-2 font-semibold text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline">
                  View More
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardComponent_activity;
