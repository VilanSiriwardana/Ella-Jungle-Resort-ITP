import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TotalEarningsSpa = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        let url = "http://localhost:5000/api/finance/spaAppointments";
        if (selectedDate) {
          url += `?date=${selectedDate}`;
        }
        const response = await axios.get(url);
        const reservations = response.data;
        const totalEarnings = reservations.reduce((acc, reservation) => acc + reservation.totalPrice, 0);
        setTotalAmount(totalEarnings);
      } catch (err) {
        console.error('Error fetching reservations:', err);
      }
    };

    fetchReservations();
  }, [selectedDate]);

  return (
    <div className="bg-white">
      <h2 className="text-xl font-semibold mb-4">Total Earnings from Spa</h2>
      <div className="mb-6">
        <label htmlFor="selectedDate" className="text-lg">Select Date: </label>
        <input type="date" id="selectedDate" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}
        className="border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:border-green-500" />
      </div>
      <p className="text-lg"  id="spaAmount">Total Amount: Rs.{totalAmount.toFixed(2)}</p>
    </div>
  );
};

export default TotalEarningsSpa;
