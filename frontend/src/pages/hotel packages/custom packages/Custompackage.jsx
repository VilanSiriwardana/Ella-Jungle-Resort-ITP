import React, { useEffect, useState } from 'react';
import axios from 'axios';
import img from '../../../assets/tour_landing.jpg';
import { RoomCard } from './latest/cards/RoomCard';
import { SpaCard } from './latest/cards/SpaCard';
import { ActivityCard } from './latest/cards/ActivityCards';
import { Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function CustomPackage() {
  const [rooms, setRooms] = useState([]);
  const [spas, setSpas] = useState([]);
  const [activities, setActivities] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('rooms');
  const [roomPackageIds, setRoomPackageIds] = useState([]);
  const [spaPackageIds, setSpaPackageIds] = useState([]);
  const [specialActivityIds, setSpecialActivityIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [roomsResponse, spasResponse, activitiesResponse] = await Promise.all([
          axios.get('/residence/rooms/'),
          axios.get('/api/spa-packages/'),
          axios.get('/SpecialActivity/')
        ]);
        setRooms(roomsResponse.data);
        setSpas(spasResponse.data);
        setActivities(activitiesResponse.data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const newTotalPrice = selectedItems.reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(newTotalPrice);
  }, [selectedItems]);

  const addToPackage = (item, section) => {
    const newItem = { ...item, id: item._id };

    if (section === 'rooms') {
      setRoomPackageIds([...roomPackageIds, newItem.id]);
    } else if (section === 'spas') {
      setSpaPackageIds([...spaPackageIds, newItem.id]);
    } else if (section === 'activities') {
      setSpecialActivityIds([...specialActivityIds, newItem.id]);
    }

    setSelectedItems([...selectedItems, newItem]);
  };

  const removeFromPackage = index => {
    const newSelectedItems = [...selectedItems];
    const removedItem = newSelectedItems.splice(index, 1);
    setTotalPrice(totalPrice - removedItem[0].price);
    setSelectedItems(newSelectedItems);
  };

  const { userInfo } = useSelector(state => state.auth);
  const userID = userInfo._id

  const handleCreatePackage = async () => {
    try {
      const packageData = {
        user_id: userID,
        total_price: totalPrice,
        room_package_ids: roomPackageIds,
        spa_package_ids: spaPackageIds,
        special_activity_ids: specialActivityIds
      };

      const response = await axios.post('/custom_packages/add', packageData);

      console.log('Package created:', response.data);

      setSelectedItems([]);
      setTotalPrice(0);
      setRoomPackageIds([]);
      setSpaPackageIds([]);
      setSpecialActivityIds([]);
    } catch (error) {
      console.error('Error creating package:', error);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className='relative mx-[550px] my-[40px]'>
        <Button className='mx-[5px] bg-green-500' onClick={() => setActiveSection('rooms')}>
          Rooms
        </Button>
        <Button className='mx-[5px] bg-green-500' onClick={() => setActiveSection('activities')}>
          Special Activities
        </Button>
        <Button className='mx-[5px] bg-green-500' onClick={() => setActiveSection('spas')}>
          Spa
        </Button>
      </div>

      <div className='mx-auto mb-10'>
        <h1 className='text-2xl mx-[670px] mb-2'>Current Cost</h1>
        <table className='mx-auto border-collapse'>
          <thead>
            <tr>
              <th className='px-4 py-2 border border-gray-400'>Name</th>
              <th className='px-4 py-2 border border-gray-400'>Price</th>
              <th className='px-4 py-2 border border-gray-400'>Action</th>
            </tr>
          </thead>
          <tbody>
            {selectedItems.map((item, index) => (
              <tr key={index} className='border border-gray-400'>
                <td className='px-4 py-2 border border-gray-400'>
                  {item.name || item.roomName || item.packageName}
                </td>
                <td className='px-4 py-2 border border-gray-400'>
                  Rs.{item.price}
                </td>
                <td className='px-4 py-2 border border-gray-400'>
                  <Button className='p-[9px]' color='red' onClick={() => removeFromPackage(index)}>
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className='px-4 py-2 border border-gray-400 text-bold' colSpan='2'>
                Total Price:
              </td>
              <td className='px-4 py-2 border border-gray-400'>
                Rs.{totalPrice}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className='flex justify-center'>
        <Link to='/customcreated'>
          <Button
            className='px-4 py-2 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
            onClick={handleCreatePackage}
          >
            Create Package
          </Button>
        </Link>
      </div>

      <div className='flex justify-center m-10'>
        <Link to='/customcreated'>
          <Button
            className='px-4 py-2 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
          >
            My Custom Packages
          </Button>
        </Link>
      </div>

      {activeSection === 'rooms' && (
        <>
          <h1 className='mx-[700px] text-4xl'>Rooms</h1>
          <div id='rooms' className='w-[1400px] mx-auto flex flex-wrap justify-around'>
            {rooms.map(room => (
              <RoomCard
                key={room._id}
                room={room}
                img={img}
                price={room.price}
                className='w-[30%] mb-4'
                onAddToPackage={(item) => addToPackage(item, 'rooms')}
              />
            ))}
          </div>
        </>
      )}

      {activeSection === 'spas' && (
        <>
          <h1 className='mx-[600px] text-4xl'>Spa Packages</h1>
          <div id='spa' className='w-[1400px] mx-auto flex flex-wrap justify-around'>
            {spas.map(spa => (
              <SpaCard
                key={spa._id}
                spa={spa}
                img={img}
                price={spa.price}
                className='w-[30%] mb-4'
                onAddToPackage={(item) => addToPackage(item, 'spas')}
              />
            ))}
          </div>
        </>
      )}

      {activeSection === 'activities' && (
        <>
          <h1 className='mx-[600px] text-4xl'>Special Activities</h1>
          <div id='activity' className='w-[1400px] mx-auto flex flex-wrap justify-around'>
            {activities.map(activity => (
              <ActivityCard
                key={activity._id}
                activity={activity}
                img={img}
                price={activity.price}
                className='w-[30%] mb-4'
                onAddToPackage={(item) => addToPackage(item, 'activities')}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}
