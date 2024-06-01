import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BookingCard } from './cards'; // Assuming this is the correct path to your BookingCard component
const images = require.context('../../../../assets', false, /\.(png|jpe?g|svg)$/);

export function BookingCardsContainer() {
  const [allPackages, setPackages] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const packagesResponse = await axios.get("/hotel_packages/");
        const roomsResponse = await axios.get("/residence/rooms");
        const activitiesResponse = await axios.get("/SpecialActivity");
        const spasResponse = await axios.get("/api/spa-packages");

        const packages = packagesResponse.data;
        const rooms = roomsResponse.data.reduce((acc, room) => ({ ...acc, [room._id]: room.roomName }), {});
        const activities = activitiesResponse.data.reduce((acc, activity) => ({ ...acc, [activity._id]: activity.name }), {});
        const spas = spasResponse.data.reduce((acc, spa) => ({ ...acc, [spa._id]: spa.packageName }), {});

        const updatedPackages = packages.map(pack => ({
          ...pack,
          room_name: rooms[pack.room_id],
          SActivity_name: activities[pack.SActivity_id],
          spa_name: spas[pack.spa_id],
        }));

        setPackages(updatedPackages);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error, such as displaying an error message to the user
      }
    };

    fetchData();
  }, []);

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const filteredPackages = allPackages.filter((pack) => {
    const packPrice = parseFloat(pack.price);
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);
    return (!minPrice || packPrice >= min) && (!maxPrice || packPrice <= max);
  });

  const getPackImage = (imageName) => {
    try {
      return images(`./${imageName}`);
    } catch (error) {
      console.error('Error loading image:', error);
      return null; // Return null if the image cannot be loaded
    }
  };


  return (
    <div>
      <div className="flex justify-center my-4 space-x-4">
  <input
    type="number"
    placeholder="Min Price"
    value={minPrice}
    onChange={handleMinPriceChange}
    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
  />
  <input
    type="number"
    placeholder="Max Price"
    value={maxPrice}
    onChange={handleMaxPriceChange}
    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
  />
</div>

      <div className="grid grid-cols-1 gap-1 pl-6 mx-20 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPackages.map((pack) => (
          <div key={pack._id}>
            <BookingCard
              id={pack._id}
              package_img={getPackImage(pack.package_img)}
              package_name={pack.package_name}
              room_name={pack.room_name}
              SActivity_name={pack.SActivity_name}
              spa_name={pack.spa_name}
              package_des={pack.package_des}
              price={pack.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
