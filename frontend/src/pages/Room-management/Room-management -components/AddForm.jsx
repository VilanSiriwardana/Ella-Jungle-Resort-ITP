import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Roomform = () => {
  const [roomDetails, setRoomDetails] = useState({
    roomName: '',
    roomType: '',
    maxCount: '',
    description: '',
    price: '',
  });

  const [selectedFile, setSelectedFile] = useState(null); // Single file state
  const [errors, setErrors] = useState({}); // State for validation errors

  const handleChange = e => {
    const { name, value } = e.target;
    setRoomDetails(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const navigate = useNavigate(); // Access navigate object for redirection

  const handlefileChange = e => {
    setSelectedFile(e.target.files[0]); // Store the single selected file
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Simple form validation
    const errors = {};
    if (!roomDetails.roomName.trim()) {
      errors.roomName = 'Room name is required';
    }
    if (!roomDetails.roomType) {
      errors.roomType = 'Room type is required';
    }
    if (
      !roomDetails.maxCount ||
      isNaN(roomDetails.maxCount) ||
      roomDetails.maxCount > 4 ||
      roomDetails.maxCount < 0
    ) {
      errors.maxCount =
        'Max count must be a number and cannot exceed 4 and cannot be negative';
    }
    if (!selectedFile) {
      errors.image = 'Picture is required';
    }
    if (!roomDetails.description.trim()) {
      errors.description = 'Description is required';
    }
    if (
      !roomDetails.price ||
      isNaN(roomDetails.price) ||
      roomDetails.price < 0
    ) {
      errors.price = 'Price must be a number and cannot be negative';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const imageResponse = await axios.post('/residence/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const imagePath = imageResponse.data.filename;
      console.log('Image uploaded successfully:', imagePath);

      const roomDetailsWithImage = {
        ...roomDetails,
        image: imagePath,
      };

      const roomResponse = await axios.post(
        '/residence/rooms',
        roomDetailsWithImage
      );
      console.log('Room added successfully:', roomResponse.data);

      setRoomDetails({
        roomName: '',
        roomType: '',
        maxCount: '',
        description: '',
        price: '',
      });

      navigate('/roomPage'); // Replace '/roomPage' with your actual room details page path
    } catch (error) {
      console.error('Error adding room:', error);
    }
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='p-12 bg-green-200 rounded-lg shadow-lg w-96'>
        <h1 className='pb-8 font-sans text-4xl font-bold text-center text-black'>
          Add Rooms
        </h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-6'>
            <label
              htmlFor='roomName'
              className='block text-sm font-medium text-gray-700'
            >
              Room Name
            </label>
            <input
              type='text'
              id='roomName'
              name='roomName'
              value={roomDetails.roomName}
              onChange={handleChange}
              className={`mt-1 p-2 border rounded-md w-full ${
                errors.roomName && 'border-red-500'
              }`}
            />
            {errors.roomName && (
              <p className='mt-1 text-sm text-red-500'>{errors.roomName}</p>
            )}
          </div>
          <div className='mb-6'>
            <label
              htmlFor='roomType'
              className='block text-sm font-medium text-gray-700'
            >
              Room Type
            </label>
            <select
              id='roomType'
              name='roomType'
              value={roomDetails.roomType}
              onChange={handleChange}
              className={`mt-1 p-2 border rounded-md w-full ${
                errors.roomType && 'border-red-500'
              }`}
            >
              <option value=''>Select Room Type</option>
              <option value='chalet'>Chalet</option>
              <option value='cabin'>Cabin</option>
              <option value='cottage'>Cottage</option>
            </select>
            {errors.roomType && (
              <p className='mt-1 text-sm text-red-500'>{errors.roomType}</p>
            )}
          </div>
          <div className='mb-6'>
            <label
              htmlFor='maxCount'
              className='block text-sm font-medium text-gray-700'
            >
              Max Count
            </label>
            <input
              type='number'
              id='maxCount'
              name='maxCount'
              value={roomDetails.maxCount}
              onChange={handleChange}
              className={`mt-1 p-2 border rounded-md w-full ${
                errors.maxCount && 'border-red-500'
              }`}
            />
            {errors.maxCount && (
              <p className='mt-1 text-sm text-red-500'>{errors.maxCount}</p>
            )}
          </div>
          <div className='mb-6'>
            <label
              htmlFor='image'
              className='block text-sm font-medium text-gray-700'
            >
              Picture URL
            </label>
            <input
              type='file'
              id='image'
              name='image'
              onChange={handlefileChange}
              className={`mt-1 p-2 border rounded-md w-full ${
                errors.image && 'border-red-500'
              }`}
            />
            {errors.image && (
              <p className='mt-1 text-sm text-red-500'>{errors.image}</p>
            )}
          </div>
          <div className='mb-6'>
            <label
              htmlFor='description'
              className='block text-sm font-medium text-gray-700'
            >
              Description
            </label>
            <textarea
              id='description'
              name='description'
              value={roomDetails.description}
              onChange={handleChange}
              rows='3'
              className={`mt-1 p-2 border rounded-md w-full ${
                errors.description && 'border-red-500'
              }`}
            ></textarea>
            {errors.description && (
              <p className='mt-1 text-sm text-red-500'>{errors.description}</p>
            )}
          </div>
          <div className='mb-6'>
            <label
              htmlFor='price'
              className='block text-sm font-medium text-gray-700'
            >
              Price
            </label>
            <input
              type='text'
              id='price'
              name='price'
              value={roomDetails.price}
              onChange={handleChange}
              className={`mt-1 p-2 border rounded-md w-full ${
                errors.price && 'border-red-500'
              }`}
            />
            {errors.price && (
              <p className='mt-1 text-sm text-red-500'>{errors.price}</p>
            )}
          </div>
          <button
            type='submit'
            className='px-4 py-2 font-semibold text-white transition-colors duration-300 ease-in-out bg-green-700 rounded hover:bg-black'
          >
            Add Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default Roomform;
