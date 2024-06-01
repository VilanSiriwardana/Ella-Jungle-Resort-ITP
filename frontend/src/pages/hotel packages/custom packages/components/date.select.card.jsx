//customerize packages - summary_select date

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateSelectionCard = () => {
  const [checkInDate, setCheckInDate] = useState(new Date()); // Initialize with current date
  const [checkOutDate, setCheckOutDate] = useState(null);

  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);
  };

  const handleCheckOutDateChange = (date) => {
    setCheckOutDate(date);
  };

  return (
    <div className="bg-green-100 rounded-lg overflow-hidden shadow-md flex p-4 my-2 mx-2">
      <div className="w-1/2 flex flex-col items-start"> {/* Left side for Check-in */}
        <p className="text-lg font-bold mb-2">Check-in Date</p>
        <DatePicker
          selected={checkInDate}
          onChange={handleCheckInDateChange}
          className="border rounded px-2 py-1 mb-2"
        />
      </div>
      <div className="w-1/2 flex flex-col items-end"> {/* Right side for Check-out */}
        <p className="text-lg font-bold mb-2">Check-out Date</p>
        <DatePicker
          selected={checkOutDate}
          onChange={handleCheckOutDateChange}
          className="border rounded px-2 py-1 mb-2"
        />
      </div>
    </div>
  );
};

export default DateSelectionCard;
