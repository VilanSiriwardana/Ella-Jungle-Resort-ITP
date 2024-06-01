import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from 'react-redux'; // Import useSelector
import bggreen from '../../../assets/eventImages/bggreen.jpg'; // Import the image
import {useNavigate} from 'react-router-dom'    //for programmatic navigation.
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import ConfirmDeletion from '../Components/ConfirmDeletion'; // Import the modal component // Import the modal component
import CustomPopup from '../Components/CustomPopup'; // Import the modal component
import EventHeader from "../Components/EventHeader";

export default function MyEvents() {

  const [allEvents, setEvents] = useState([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('info'); // 'info' or 'error'

  const user = useSelector(state => state.auth.userInfo); // `userInfo` may be null or contain `isAdmin`

  const navigate = useNavigate();

  useEffect(() => {
    function getEvents() {
      axios.get("http://localhost:5000/event/getAllEvents")
      .then((res) => {
        setEvents(res.data);
        // const publicEvents = res.data.filter(event => event.isPublic === true); // Filter only public events
        // setEvents(publicEvents);
      }).catch((err) => {
        alert(err.message);
      });
    }

    getEvents();
  }, []);


  const handleDeleteClick = (eventId) => {
    setSelectedEventId(eventId); // Set the option ID to state
    setIsModalOpen(true); // Show the modal
  };
  

  const confirmDelete = async () => {
    if (selectedEventId) {
      try {
        await axios.delete(`http://localhost:5000/event/deleteEvent/${selectedEventId}`);
        setIsModalOpen(false); // Close the modal
        // Custom success notification
        setPopupMessage("Event Deleted Successfully!");
        setPopupType('info');
        setIsPopupOpen(true);
        setEvents(allEvents.filter(event => event._id !== selectedEventId)); // Update state to remove the item
      } catch (error) {
        console.error("Error deleting event:", error.message);
        // Custom error notification
        setPopupMessage("Error deleting event. Please try again.");
        setPopupType('error');
        setIsPopupOpen(true);
      }
    }
  };


  
  // Function to format event time to "hh:mm A" format
const formatEventTime = (timeString) => {
  // Split the timeString into hours and minutes
  const [hours, minutes] = timeString.split(":");
  // Convert hours to number
  let parsedHours = parseInt(hours, 10);
  // Determine AM or PM
  const suffix = parsedHours >= 12 ? "PM" : "AM";
  // Adjust for 12-hour format
  parsedHours = parsedHours % 12 || 12;
  // Return formatted time
  return `${parsedHours}:${minutes} ${suffix}`;
};


// Sort events by event booking date in descending order
const sortedEvents = [...allEvents].sort((a, b) => {
  return new Date(b.eventBookingDate) - new Date(a.eventBookingDate);
});
  
  


  return (
    <div className="relative min-h-screen">
      
    {/* Background Image */}
    <div
      className="absolute inset-0 z-0 bg-fixed"
      style={{
        backgroundImage: `url(${bggreen})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    ></div>

    
    
  
    {/* Content Wrapper */}
    <div className="relative z-10 flex flex-col items-center min-h-screen">
      {/* Call Header */}
    <EventHeader/>
   

            
  
      {/* Your scrolling content */}
      
      {/* {allEvents && allEvents.map((event) => ( */}
        {sortedEvents.filter(event => event.eventUserId === user._id).map((event) => {
        //Convert eventTime to "hh:mm A" format
        const formattedEventTime = formatEventTime(event.eventTime);


        return(
      <div key={event._id} className="container bg-fixed my-5 max-w-5xl mx-auto p-5 bg-white bg-opacity-50 shadow-2xl shadow-theme-green rounded-3xl overflow-auto border-2 border-green-700">

      
  
      <div className="grid grid-cols-2 gap-16 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
    <div className="container shadow-md rounded-md overflow-hidden w-full max-h-80">
      <img className="w-full h-full object-fill" src={`http://localhost:5000/Images/${event.eventImage}`} alt="Event Image"
      />
    </div>
        <div className="px-0 py-4">
            {/* Event Name with Inika font */}
            <h1 className="text-3xl font-bold text-green-800 font-inika">{event.eventName}</h1>
            
            {/* Event Date with Lexend font */}
            <h6 className="flex items-center text-base text-gray-600 font-lexend">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>Ella Jungle Resort</h6>

            <div className="flex justify-between mt-2">
              <p className="flex items-center text-xl font-bold text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" /></svg>{event.eventDate ? event.eventDate.substr(0, 10) : ""}</p>

              <p className="flex items-center text-xl font-bold text-green-600 pr-12">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>{formattedEventTime}</p>
            </div>
  
            {/* Event Description with McLaren font */}
            <div className="p-des mt-2 max-h-24">
              <p className="text-base font-mclaren">{event.eventDescription}</p>
            </div>
  
            <div className="mt-8 flex justify-center items-center">


              {/* Using Link component for View button */}
              <Link to={`/updateEvent/${event._id}`} className="flex items-center text-white text-xl font-mclaren px-3 py-1  bg-blue-500 hover:bg-blue-800   rounded-3xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg> Update </Link>

              <Link to={`/viewEvent/${event._id}`} className="ml-5 flex items-center text-white text-xl font-mclaren px-6 py-1 bg-theme-green hover:bg-green-800 rounded-3xl ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg> View </Link>

              <button className="ml-5 flex items-center text-white text-xl font-mclaren px-3 py-1  bg-red-500 hover:bg-red-800 rounded-3xl" 
               onClick={() => {
                setSelectedEventId(event._id);
                setIsModalOpen(true);
              }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg> Delete </button>
            </div>
                      
        </div>  
  
      </div>
      
    </div>
    )})}
    {/* Scrolling content End*/}
  
      
      
      
      {/* Use the Confirm Deletion Modal here */}
      <ConfirmDeletion
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
      />


      {/* Your component structure */}
      <CustomPopup
          isOpen={isPopupOpen}
          message={popupMessage}
          onClose={() => {
            setIsPopupOpen(false);
            setIsModalOpen(false); // Close the modal
          }}
          type={popupType}
        />
    
    </div>
  </div>
  )
}


