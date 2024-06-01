import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AvailableRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [allRooms, setAllRooms] = useState([]);
    const [roomcheckIn, setCheckIn] = useState('');
    const [roomcheckOut, setCheckOut] = useState('');
    const [roomType, setRoomType] = useState('chalet'); // Set default room type to 'chalet'
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(8);
    const [errors, setErrors] = useState({}); // State for validation errors

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

    const today = new Date().toISOString().split('T')[0];

    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = allRooms.filter(room => rooms.some(availRoom => availRoom._id === room._id)).slice(indexOfFirstRoom, indexOfLastRoom);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="container px-4 py-8 mx-auto">
            <div className='flex flex-row justify-center pb-10 space-x-4'>
                <label className='mt-2 font-bold'>Check-in:</label>
                <input
                    type="date"
                    value={roomcheckIn}
                    onChange={e => {
                        setCheckIn(e.target.value);
                    }}
                    className={`py-2 px-20 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.roomType && 'border-red-500'}`}
                    min={today}
                />
                <label className='pl-10 mt-2 font-bold'>Check-out:</label>
                <input
                    type="date"
                    value={roomcheckOut}
                    onChange={e => {
                        setCheckOut(e.target.value);
                    }}
                    className={`py-2 px-20 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.roomType && 'border-red-500'}`}
                    min={roomcheckIn} // Set min attribute dynamically
                />

                <label className='pl-10 mt-2 font-bold'>Room-Type</label>
                <select
                    value={roomType}
                    onChange={e => setRoomType(e.target.value)}
                    className='px-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                >
                    <option value="chalet">Chalet</option>
                    <option value="cottage">Cottage</option>
                    <option value="cabin">Cabin</option>
                </select>
                <button onClick={fetchAvailableRooms} hidden>Search</button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {currentRooms.map(room => (
                    <div key={room.id} className="overflow-hidden bg-white rounded-lg shadow-md">
                        {room.image && (
                            <img src={require(`../../../assets/${room.image}`)} alt={room.roomName} className="object-cover w-full h-64" />
                        )}
                        <div className="p-4">
                            <h2 className="mb-2 text-xl font-semibold">{room.roomName}</h2>
                            <p className="mb-2 text-gray-700">Type: {room.roomType}</p>
                            <p className="mb-2 text-gray-700">Max Count: {room.maxCount}</p>
                            <p className="mb-2 text-gray-700">Price: LKR.{room.price}</p>
                            <button className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600" onClick={() => window.location.href = `/Booking/${room._id}`} >Book Now</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-4">
                <ul className="pagination">
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

export default AvailableRooms;
