//customerize packages - summary table
import React from 'react';
import img from '../../../../assets/tour_landing.jpg';


const CardComponent_Custom_Summary = ({ selectedRoom }) => {
  if (!selectedRoom) {
    return <div>No room selected</div>; // Display a message if selectedRoom is null or undefined
  }

  return (
    <div className="bg-green-100 rounded-lg overflow-hidden shadow-md flex p-4 my-2 mx-2">
      <div className="w-1/2 flex flex-col items-start">
        <p className="text-lg font-bold mb-2">{selectedRoom.roomName}</p>
        <img src={img} alt="Room Image" className="w-48 h-32 object-cover mb-2" />
      </div>
      <div className="w-1/2 flex flex-col items-end justify-between">
        <p className="text-lg font-bold">Rs.{selectedRoom.price}</p>
        <button className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Change
        </button>
      </div>
    </div>
  );
};

export default CardComponent_Custom_Summary;
