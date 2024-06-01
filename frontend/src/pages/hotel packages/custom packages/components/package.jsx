//spa packages des - custom packages 

import React from 'react';
import img from '../../../../assets/tour_landing.jpg';

const CardComponent = ({  }) => {
  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg mb-8 mx-4"> 
      <div className="flex items-center">
        <div className="w-1/3">
          <img src={img} alt="Image" className="w-full h-auto" />
        </div>
        <div className="w-2/3 p-4">
          <h3 className="text-xl font-bold mb-2">Facial - Aromatic Purifying Facial</h3>
          <p className="text-lg text-gray-700 mb-4"> 
            60 min<br />
            LKR 16,500.00<br />
            Curate your Sri Lankan adventure with our Ella Jungle resort promotions.<br /> 
            Escape for a short break to explore the island’s highlights,<br /> 
            or leisurely sample all its wonders.<br /> 
          </p>
          <div className="flex justify-between">
            <button className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Select
            </button>
            <button className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              View More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
