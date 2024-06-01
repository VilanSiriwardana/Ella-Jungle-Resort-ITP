import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector } from 'react-redux'; // Import useSelector
import { useParams } from "react-router-dom";
import {useNavigate} from 'react-router-dom'    //for programmatic navigation.
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import bggreen from '../../../assets/eventImages/bggreen.jpg'; // Import the image
import ConfirmDeletion from '../Components/ConfirmDeletion'; // Import the modal component
import CustomPopup from '../Components/CustomPopup'; // Import the modal component
import EventHeader from "../Components/EventHeader";
import EventRoomView from "./EventRoomView";

export default function ViewEvent() {
    const pdfRef = useRef();

    const [selectedEvent, setSelectedEvent] = useState(null);
    const { eventId } = useParams(); // Get the eventId from URL params

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [allOptions, setAllOptions] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);
 
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupType, setPopupType] = useState('info'); // 'info' or 'error'

    const [isDeleting, setIsDeleting] = useState(false);

    const timeSlots = [
      { id: 'slot1', label: '8am to 12pm', value: '08:00-12:00' },
      { id: 'slot2', label: '12pm to 4pm', value: '12:00-16:00' },
      { id: 'slot3', label: '4pm to 8pm', value: '16:00-20:00' },
      { id: 'slot4', label: '8pm to 12am', value: '20:00-00:00' },
    ];


    const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input, {
        scale: 2, // Increasing the scale factor to enhance quality
        useCORS: true, // Ensures that images hosted on different origins can be loaded correctly
    }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');      
        const pdf = new jsPDF('p', 'mm', 'a4');        
        const pdfWidth = pdf.internal.pageSize.getWidth();       
        const pdfHeight = pdf.internal.pageSize.getHeight();        
        const imgWidth = canvas.width / 2; // Adjust the width to account for the scale
        const imgHeight = canvas.height / 2; // Adjust the height to account for the scale
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2; // Center the image
        const imgY = 10;
        pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        pdf.save('eventDetails.pdf');
    });
};


  const user = useSelector(state => state.auth.userInfo); // `userInfo` may be null or contain `isAdmin`
  const navigate = useNavigate();

  
    useEffect(() => {
        // Fetch all options when the component mounts
        function getOptions() {
          axios.get("http://localhost:5000/option/allOptions")
            .then((res) => {
              setAllOptions(res.data);
            })
            .catch((err) => {
              alert(err.message);
            });
        }
        getOptions();
      }, []);
    

     
    useEffect(() => {
        // Fetch event data based on eventId when the component mounts
        async function getEventDetails() {
        try {
            const response = await axios.get(`http://localhost:5000/event/getSelectedEvent/${eventId}`);
            setSelectedEvent(response.data.event);
            console.log("Fetched Event Details Successfully");


            const eventSelectedOptions = response.data.event.selectedOptions || [];
            setSelectedOptions(eventSelectedOptions.map(id => id.toString())); // Ensuring IDs are strings for comparison

        
        } catch (error) {
            console.error("Error fetching event data:", error.message);
            alert("Error fetching event data. Please try again.");
        }
    }

    getEventDetails();
  }, [eventId]);

  

  const confirmDelete = async () => {
    if (selectedEventId) {
      try {
        await axios.delete(`http://localhost:5000/event/deleteEvent/${selectedEventId}`);
        setIsModalOpen(false); // Close the modal
        // Custom success notification
        setPopupMessage("Event Deleted Successfully!");
        setPopupType('info');
        setIsPopupOpen(true);


      } catch (error) {
        console.error("Error deleting event:", error.message);
        // Custom success notification
        setPopupMessage("Error deleting event. Please try again!");
        setPopupType('error');
        setIsPopupOpen(true);
      }
    }
  };
  

  
  if (!selectedEvent) {
    return <div>Loading...</div>;
  }


  // Get unique categories
  const categories = [...new Set(allOptions.map((option) => option.optionCategory))];


  // Function to determine if a category has any selected options
const hasSelectedOptions = (category) => {
  const optionsInCategory = allOptions.filter(option => option.optionCategory === category);
  return optionsInCategory.some(option => selectedOptions.includes(option._id.toString()));
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

//Convert eventTime to "hh:mm A" format
const formattedEventTime = formatEventTime(selectedEvent.eventTime);



const handleDeleteReservation = async () => {
  try {
    // Delete reservation from Reservation model
    await axios.delete(`/reservation/deleteReservation/${selectedEvent.eventRoomReservationId}`);
    
    // Delete reservation from Event model
    await axios.put(`http://localhost:5000/event/updateEventReservation/${selectedEvent._id}`, { eventRoomReservationId: null });

    // Refresh the page
    window.location.reload();

    // Set state to indicate successful deletion
    setIsDeleting(true);
  } catch (error) {
    console.error('Error deleting reservation:', error);
  }
};



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
      
    >
  </div>

     
    
    {/* Content Wrapper */}
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
            {/* Call Header */}
    <EventHeader/>
  
      {/* Your scrolling content */}
      
      <div className="container max-w-5xl p-5 mx-auto my-10 overflow-auto bg-fixed bg-opacity-50 border-8 border-double shadow-2xl rounded-3xl bg-gray-50 shadow-theme-green border-theme-green" >

        <div ref={pdfRef}>

      
  
        <div className="grid grid-cols-1 gap-10 pt-4 lg:px-40 sm:px-10 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1" >
            {/* Event Details */}
            <div className="container flex items-center justify-center w-full overflow-hidden shadow-md rounded-3xl h-96">
                <img className="object-fill w-full h-full" src={`http://localhost:5000/Images/${selectedEvent.eventImage}`} 
                />
            </div>
        </div>

            <div className="grid grid-cols-1 gap-10 pt-4 lg:px-40 sm:px-10 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1" >

            <div >
                {/* Event Name with Inika font */}
                <h1 className="text-4xl font-bold text-center text-green-800 font-inika">{selectedEvent.eventName}</h1>
                
                <div className="flex justify-between px-16 mt-1">
                {/* Event Date with Lexend font */}
                <h6 className="text-base text-center text-gray-600 font-lexend ">Ella Jungle Resort</h6>
                <h6 className="text-base text-center text-gray-600 font-lexend">{selectedEvent.eventCategory}</h6>

                </div>
                
                <div className="flex justify-between px-16 mt-2">
                <div className="flex items-center text-2xl font-bold text-center text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-1 w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                </svg>{selectedEvent.eventDate ? selectedEvent.eventDate.substr(0, 10) : ""}</div>

                <div className="flex items-center text-2xl font-bold text-center text-green-600 ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-1 w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>{formattedEventTime}</div>
                </div>

    
                {/* Event Description with McLaren font */}
                <div className="mt-2 p-des max-h-24">
                <p className="text-lg text-center font-mclaren">{selectedEvent.eventDescription}</p>

                <p className="mt-3 text-lg font-bold text-center font-lexend">Expected Attendees Count : {selectedEvent.attendeeCount}</p>
                </div>
            </div>


            
          <div className="ml-16">
            <p className="block ml-48 text-lg font-bold text-green-800">Time Slots :-</p>
              {timeSlots.map(slot => (
                selectedEvent.selectedTimeSlots.includes(slot.id) && ( // Check if the slot is selected
                  <div key={slot.id} className="ml-48 text-base font-semibold">
                    <input
                      readOnly
                      type="checkbox"
                      id={slot.id}
                      checked={true} // Always checked since it's a selected slot
                      className="w-4 h-4 border border-gray-300 rounded-md appearance-none form-checkbox focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent checked:bg-blue-600 checked:border-transparent checked:border-2"
                    />
                    <label htmlFor={slot.id} className="ml-2 text-base text-black">{slot.label}</label>
                  </div>
                )
              ))}
              </div>


            {/* Options Loop */}
            <div className="grid grid-cols-2 gap-6 lg:pl-2 lg:pr-0 sm:px-20 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">  
             

             {/* Filter and display only the categories that have selected options */}
          {categories.filter(category => hasSelectedOptions(category)).map((category, index) => (
                      <div key={index} className="ml-16 text-base font-semibold">
                        {/* Category Title */}
                        <p className="block mb-1 text-lg text-green-800 font-mclaren">{category}:-</p>
                        {/* Options for this category */}
              {allOptions.filter((option) => option.optionCategory === category && selectedOptions.includes(option._id.toString())).map((option) => (
                            <div key={option._id} className="form-check">
                              <input readOnly type="checkbox" id={option._id} name={option.optionName}
                                checked={selectedOptions.includes(option._id)}
                                className="w-4 h-4 border border-gray-300 rounded-md appearance-none form-checkbox focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent checked:bg-theme-green checked:border-transparent checked:border-2"
                              />
                              <label htmlFor={option._id} className="ml-2 text-base text-black">
                                {option.optionName}
                              </label>
                            </div>
                          ))}
                      </div>
                    ))}
            </div> 
            {/*Options Loop Ends Here*/}
            

            <div className="">
          {/* Display Total Cost of Public events for only Admins and the users who own the event*/}
            {selectedEvent.isPublic && (user?.isAdmin || selectedEvent.eventUserId === user?.userId) && (
            
              <p className="block text-xl font-bold text-center text-black">Total Cost: {selectedEvent.totalCost} LKR</p>
            
          )}

          {/* Display Total Cost of private events for all users */}
          {!selectedEvent.isPublic && (
              <p className="block text-xl font-bold text-center text-black">Total Cost: {selectedEvent.totalCost} LKR</p>
          )}
      


          {/* Display ticket price for public events */}
          {selectedEvent.isPublic && (
            <p className="mt-3 text-lg font-semibold text-green-900 font-mclaren">Grab Your Tickets Now for only <span className="text-red-800">{selectedEvent.ticketPrice} LKR !!</span> Enjoy the Moment</p>
          )}
      </div>

            <div className="font-semibold">
            <p className="text-lg text-green-80"></p>
          </div>


          {(selectedEvent?.eventRoomReservationId) && (user?._id == selectedEvent?.eventUserId  || user?.isAdmin == true) && (
              <div>
              {/* Conditional rendering of MyReservation */}
                <EventRoomView eventRoomReservationId={selectedEvent?.eventRoomReservationId}/>

                
            </div>
            )}


            {/* Empty div */}
            <div></div>

        </div>

        
    </div>


        {/* Button to open the Available Rooms component */}
{(user?.isAdmin || selectedEvent.eventUserId === user?._id) && (
  <div>
    {selectedEvent.eventRoomReservationId ? (
      // If eventRoomReservationId exists, render the button to update reservation
      <>
      {/* <div className="flex items-center justify-between mx-48 mt-1 mb-8">
        <button
          className="flex items-center px-2 py-1 text-sm text-white bg-green-500 font-mclaren hover:bg-green-700 rounded-3xl"
          onClick={() => navigate(`/availableRooms/${selectedEvent._id}`)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          Update Reservation
        </button>
        <button className="flex items-center mr-8 px-3 py-1 text-sm text-white bg-red-500 font-lexend hover:bg-red-800 rounded-xl" onClick={handleDeleteReservation} disabled={isDeleting}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

                  {isDeleting ? 'Removing...' : 'Remove Reservation'}
                </button>
                </div> */}
      </>
    ) : (
      // If eventRoomReservationId does not exist, render the button to reserve room
      <>
      <div className="flex items-center justify-between mx-56 mt-1 mb-8">
        <button
          className="flex items-center px-2 py-1 text-sm text-white bg-blue-700 font-mclaren hover:bg-blue-900 rounded-3xl"
          onClick={() => navigate(`/availableRooms/${selectedEvent._id}`)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>

          Reserve Room
        </button>
        <p className="items-center justify-center mt-2 ml-5">
          Click if you want to reserve a room for the event
        </p>
        </div>
      </>
    )}
  </div>
)}



  	<div className="mb-2">

    {selectedEvent?.isPublic == true && (
    <div className="flex items-center justify-center mt-0">
        <Link to={`/buyEventTicket/${selectedEvent._id}`} className="flex items-center px-2 py-1 text-xl text-white bg-blue-500 font-mclaren hover:bg-blue-800 rounded-3xl">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-1 w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg> Buy Ticket</Link>   
    </div> 
  )}
          


            

      



            {(user?.isAdmin || selectedEvent.eventUserId === user?._id) && (
                <div className="flex items-center justify-between mx-48 mt-8 mb-8">
                    {/* Using Link component for View button */}
                    <Link to={`/updateEvent/${selectedEvent._id}`} className="flex items-center px-2 py-1 text-xl text-white font-lexend bg-theme-green hover:bg-green-800 rounded-xl"> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>Update </Link>

                    <button className="flex items-center px-2 py-1 text-xl text-white bg-black font-lexend hover:bg-gray-800 rounded-xl" 
                    onClick={downloadPDF}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
</svg>

                        Download Report
                    </button>

                    
                    <button className="flex items-center px-3 py-1 text-xl text-white bg-red-500 font-lexend hover:bg-red-800 rounded-xl" 
                    onClick={() => {
                      setSelectedEventId(selectedEvent._id);
                      setIsModalOpen(true);
                    }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
                        Delete
                    </button>
                </div>  
                )}

                
        </div>  

       
    </div>
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
          if (selectedEvent.isPublic) {
            navigate("/events");
          } else {
            navigate("/myEvents");
          }
        }}
        type={popupType}
      />
      
    
    </div>
  </div>
  )
}


