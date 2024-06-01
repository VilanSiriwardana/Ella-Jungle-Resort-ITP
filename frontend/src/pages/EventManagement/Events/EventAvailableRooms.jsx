import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EventAvailableRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [allRooms, setAllRooms] = useState([]);
    const [roomcheckIn, setCheckIn] = useState('');
    const [roomcheckOut, setCheckOut] = useState('');
    const [roomType, setRoomType] = useState('chalet'); // Set default room type to 'chalet'
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(8);

    //Vilan
    const { eventId } = useParams();

    useEffect(() => {
        fetchAvailableRooms();
        fetchAllRooms();
    }, [roomcheckIn, roomcheckOut, roomType]);

    const fetchAvailableRooms = async () => {
        try {
            const response = await axios.get('/reservation/available-rooms', {
                params: { roomcheckIn, roomcheckOut, roomType }
            });
            setRooms(response.data);
        } catch (error) {
            console.log('Error fetching rooms:', error);
        }
    };

    const fetchAllRooms = async () => {
        try {
            const response = await axios.get('/residence/rooms');
            setAllRooms(response.data);
        } catch (error) {
            console.log('Error fetching rooms:', error);
        }
    };

    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = allRooms.filter(room => rooms.some(availRoom => availRoom._id === room._id)).slice(indexOfFirstRoom, indexOfLastRoom);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className='flex flex-row justify-center space-x-4 pb-10'>
                <label className='mt-2 font-bold'>Check-in:</label>
                <input
                    type="date"
                    value={roomcheckIn}
                    onChange={e => setCheckIn(e.target.value)}
                    className='py-2 px-20  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
                <label className='mt-2 font-bold pl-10'>Check-out:</label>
                <input
                    type="date"
                    value={roomcheckOut}
                    onChange={e => setCheckOut(e.target.value)}
                    className='py-2 px-20 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
                <label className='mt-2 font-bold pl-10'>Room-Type</label>
                <select
                    value={roomType}
                    onChange={e => setRoomType(e.target.value)}
                    className='py-2 px-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                >
                    <option value="chalet">Chalet</option>
                    <option value="cottage">Cottage</option>
                    <option value="cabin">Cabin</option>
                </select>
                <button onClick={fetchAvailableRooms} hidden>Search</button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {currentRooms.map(room => (
                    <div key={room.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                        {room.image && (
                            <img src={require(`../../../assets/${room.image}`)} alt={room.roomName} className="w-full h-64 object-cover" />
                        )}
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{room.roomName}</h2>
                            <p className="text-gray-700 mb-2">Type: {room.roomType}</p>
                            <p className="text-gray-700 mb-2">Max Count: {room.maxCount}</p>
                            <p className="text-gray-700 mb-2">Price: ${room.price}</p>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded" 
                            onClick={() => {
                                if (eventId) {
                                    window.location.href = `/reservationForm/${room._id}/${eventId}`;
                                } else {
                                    window.location.href = `/Booking/${room._id}`;
                                }
                            }}  >Book Now</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-4">
                <ul className="pagination" >
                    {Array.from({ length: Math.ceil(allRooms.filter(room => rooms.some(availRoom => availRoom._id === room._id)).length / roomsPerPage) }, (_, i) => (
                        <li key={i} style={{ display: 'inline', padding: '0 5px'}} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                            <button onClick={() => paginate(i + 1)} className="page-link">
                                {i + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default EventAvailableRooms;
