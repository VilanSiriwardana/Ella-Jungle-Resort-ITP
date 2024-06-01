import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';
import bggreen from '../../../assets/eventImages/bggreen.jpg'; // Import the image
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import ConfirmDeletion from '../Components/ConfirmDeletion'; // Import the modal component
import CustomPopup from '../Components/CustomPopup'; // Import the modal component
import EventHeader from "../Components/EventHeader";

export default function EventList() {
  const [allEvents, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const user = useSelector(state => state.auth.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    function getEvents() {
      axios.get("http://localhost:5000/event/getAllEvents")
      .then((res) => {
        // Filter the response data to include only public events
        const publicEvents = res.data.filter(event => event.isPublic);
        setEvents(publicEvents);
        setSearchResults(publicEvents);
      }).catch((err) => {
        alert(err.message);
      });
    }
  
    getEvents();
  }, []);

  // Function to handle search query change
const handleSearchInputChange = (e) => {
  const query = e.target.value.toLowerCase();
  setSearchQuery(query);

  if (query.length > 0) {
    const filteredEvents = allEvents.filter(event =>
      event.eventName.toLowerCase().includes(query) ||
      event.eventDate.includes(query) ||
      event.eventCategory.toLowerCase().includes(query)
    );
    setSearchResults(filteredEvents);
  } else {
    setSearchResults(allEvents);
  }
};


// Function to handle category filter
const handleCategoryFilter = (category) => {
    // Check if the category is already selected
    const index = selectedCategories.indexOf(category);
    if (index === -1) {
      // If not selected, add it to the array
      setSelectedCategories([...selectedCategories, category]);
    } else {
      // If already selected, remove it from the array
      setSelectedCategories(selectedCategories.filter(cat => cat !== category));
    }
  };

  useEffect(() => {
    // Filter events based on selected categories
    if (selectedCategories.length === 0) {
      // If no categories selected, show all events
      setSearchResults(allEvents);
    } else {
      // If categories selected, filter events
      const filteredEvents = allEvents.filter(event =>
        selectedCategories.includes(event.eventCategory.toLowerCase())
      );
      setSearchResults(filteredEvents);
    }
  }, [selectedCategories, allEvents]);

    // List of categories available for filtering
    const categories = ["Christmas", "Halloween", "NewYear", "Other"];



  // Function to format event time to "hh:mm A" format
  const formatEventTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    let parsedHours = parseInt(hours, 10);
    const suffix = parsedHours >= 12 ? "PM" : "AM";
    parsedHours = parsedHours % 12 || 12;
    return `${parsedHours}:${minutes} ${suffix}`;
  };



  // Function to share event details via WhatsApp
const shareEventViaWhatsApp = (eventId) => {
  const event = allEvents.find(event => event._id === eventId);
  if (event) {
    const eventLink = `${window.location.origin}/viewEvent/${eventId}`;
    const formattedEventDate = event.eventDate ? event.eventDate.substr(0, 10) : "";
    const message = `Check out this event at Ella Jungle Resort:\nLink: *${eventLink}*\n\n*${event.eventName}*\n${event.eventDescription}\n*On ${formattedEventDate}, starting at ${formatEventTime(event.eventTime)}*\n`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  }
};


// Sort events by event booking date in descending order
const sortedEvents = [...searchResults].sort((a, b) => {
  return new Date(a.eventDate) - new Date(b.eventDate);
});



  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 z-0 bg-fixed"
        style={{
          backgroundImage: `url(${bggreen})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      <div className="relative z-10 flex flex-col items-center min-h-screen">
        <EventHeader />

        {/* Search bar */}
<div className="mb-4 flex">
  <input
    type="text"
    placeholder="Search by name, date, or category..."
    value={searchQuery}
    onChange={handleSearchInputChange}
    className="border border-gray-400 px-4 py-2 rounded-l-lg "
  />
  <p className="flex items-center bg-theme-green text-white px-2 py-2 rounded-r-lg font-mclaren"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>
 Search</p>


{/* Category filter */}
<div className="ml-40">
  {categories.map(category => (
    <button
      key={category}
      className={`text-white px-4 py-2 rounded-md mr-2 font-mclaren ${
        selectedCategories.includes(category.toLowerCase()) ? 'bg-green-900' : 'bg-theme-green'
      }`}
      onClick={() => handleCategoryFilter(category.toLowerCase())}
    >
      {category}
    </button>
  ))}
</div>

</div>





        {/* Event cards */}
        <div className="px-8 pb-3 justify-between grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-x-6  w-full ">
          
          {sortedEvents.map(event => (
            <div key={event._id} className="container bg-fixed my-3 max-w-5xl mx-auto p-5 bg-white bg-opacity-50 shadow-2xl shadow-theme-green rounded-3xl overflow-auto border-2 border-green-700">
              <div className="grid  grid-cols-2 gap-9 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                <div className="container shadow-md rounded-3xl overflow-hidden w-full max-h-64">
                  <img className="w-full h-full object-fill mt-3" src={`http://localhost:5000/Images/${event.eventImage}`} alt="Event" />
                </div>
                <div className="px-0 py-4">
                  <h1 className="text-xl font-bold text-green-800 font-inika">{event.eventName}</h1>
                  <div className="flex justify-between">
                    <h6 className="flex items-center text-xs text-gray-600 font-lexend">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 mr-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>Ella Jungle Resort</h6>
                    <p className="flex items-center text-xs text-gray-600 font-lexend mr-3">{event.eventCategory}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="flex items-center text-base font-bold text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" /></svg>{event.eventDate ? event.eventDate.substr(0, 10) : ""}</p>

                    <p className="flex items-center text-base font-bold text-green-600 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg> {formatEventTime(event.eventTime)}</p>
                  </div>
                  <div className=" mt-1 max-h-24">
                    <p className="text-sm font-mclaren">{event.eventDescription}</p>
                  </div>
                  <div className="mt-6 flex justify-center items-center">
                    <Link to={`/viewEvent/${event._id}`} className="flex items-center  text-white text-sm font-mclaren px-3 py-1 bg-theme-green hover:bg-green-500 rounded-3xl">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                        View
                      </Link>

                        <Link to={`/buyEventTicket/${event._id}`} className="flex items-center ml-4 text-white text-sm font-mclaren px-4 py-1 bg-blue-500 hover:bg-blue-800 rounded-3xl">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>Buy</Link>
                      
                      <button onClick={() => shareEventViaWhatsApp(event._id)} className="flex items-center text-white text-sm font-mclaren px-2 py-1 bg-green-600 hover:bg-green-900 rounded-3xl ml-4"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                    </svg> Share </button>

                </div>

              </div>

              </div>
            </div>
          ))}
        </div>
        {/* Event Cards End here */}
      </div>

    </div>
  )
}
