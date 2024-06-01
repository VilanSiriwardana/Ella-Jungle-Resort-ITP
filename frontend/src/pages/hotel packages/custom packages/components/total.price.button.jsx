//total price - custom packages

import React from 'react';

const TotalPriceButton = () => {
  return (
    <button className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex justify-between items-center w-full">
      <span>Total Price</span>
      <span>LKR 20,000</span>
    </button>
  );
};

export default TotalPriceButton;
