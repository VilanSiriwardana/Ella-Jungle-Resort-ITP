import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from 'react-redux'; // Import useSelector
import bggreen from '../../../assets/eventImages/bggreen.jpg'; // Import the image
import {useNavigate} from 'react-router-dom'    //for programmatic navigation.
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import EventHeader from '../Components/EventHeader';

const TicketTable = () => {
    const [tickets, setTickets] = useState([]);
    const user = useSelector(state => state.auth.userInfo); // `userInfo` may be null or contain `isAdmin`
  
    useEffect(() => {
      const fetchTickets = async () => {
        try {
          const response = await axios.get('http://localhost:5000/ticket/allTickets');
          setTickets(response.data);
        } catch (error) {
          console.error('Error fetching tickets:', error);
        }
      };
  
      fetchTickets();
    }, []);

    // Sort events by event booking date in descending order
const sortedTickets = [...tickets].sort((a, b) => {
  return new Date(b.ticketBuyingDate) - new Date(a.ticketBuyingDate);
});
  


  return (
    <div className="relative min-h-screen">
      
  
    {/* Content Wrapper */}
    <div className="relative z-10 flex flex-col items-center  min-h-screen">

            
  
      {/* Your scrolling content */}
      {/* {allEvents && allEvents.map((event) => ( */}
      <h2 className="text-2xl font-bold text-green-800 mt-10 mb-4">Ticket Details</h2>
      <div className="shadow-2xl shadow-theme-green rounded-3xl overflow-hidden">
        <table className="min-w-full leading-normal opacity-80 bg-white">
          <thead className="font-bold text-left text-green-800 bg-green-100 rounded-t-3xl">
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200">Event Name</th>
              <th className="px-5 py-3 border-b-2 border-gray-200">User Name</th>
              <th className="px-5 py-3 border-b-2 border-gray-200">Email</th>
              <th className="px-5 py-3 border-b-2 border-gray-200">Mobile</th>
              <th className="px-5 py-3 border-b-2 border-gray-200">Count</th>
              <th className="px-5 py-3 border-b-2 border-gray-200">Total Cost</th>
              <th className="px-5 py-3 border-b-2 border-gray-200">Purchase Date</th>
              <th className="px-5 py-3 border-b-2 border-gray-200">Purchase Time</th>
            </tr>
          </thead>
          <tbody>
  {sortedTickets.map((ticket) => (
    // Check if the user is an admin or the ticket belongs to the user
    (user?.isAdmin || ticket.ticketUserId === user?._id) && (
      <tr key={ticket._id} className="border-b border-gray-200 hover:bg-green-50 hover:opacity-50 ">
        <td className="px-5 py-2">{ticket.eventName}</td>
        <td className="px-5 py-2">{ticket.ticketUserName}</td>
        <td className="px-5 py-2">{ticket.ticketUserEmail}</td>
        <td className="px-5 py-2">{ticket.ticketUserMobile}</td>
        <td className="px-5 py-2">{ticket.ticketCount}</td>
        <td className="px-5 py-2">{ticket.totalTicketCost}</td>
        <td className="px-5 py-2">{ticket.ticketBuyingDate ? ticket.ticketBuyingDate.substr(0, 10) : ""}</td>
        <td className="px-5 py-2">{ticket.ticketBuyingTime}</td>
      </tr>
    )
    
  ))}
</tbody>

        </table>
      </div>

    {/* Scrolling content End*/}
  
      
      
    
    </div>
     {/* Content Wrapper Ends Here*/}
     
  </div>
  );
}

export default TicketTable;


