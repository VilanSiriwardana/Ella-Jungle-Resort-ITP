import React, { useState, useEffect } from "react";
import axios from "axios"   //axios for making HTTP requests
import {useNavigate} from 'react-router-dom'    //for programmatic navigation.
import bggreen from '../../../assets/eventImages/bggreen.jpg'; // Import the image
import { useSelector } from 'react-redux'; // Import useSelector
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import CustomPopup from '../Components/CustomPopup'; // Import the modal component
import EventHeader from "../Components/EventHeader";
import emailjs from "@emailjs/browser"

export default function BuyEventTicket() {
    const { eventId } = useParams(); // Get the eventId from URL params

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [ticketUserName, setTicketUserName] = useState("");  
    const [ticketUserEmail, setTicketUserEmail] = useState("");  
    const [ticketUserMobile, setTicketUserMobile] = useState("");  
    const [ticketCount, setTicketCount] = useState(1);  
    const [totalTicketCost, setTotalTicketCost] = useState("");  
    const [errors, setErrors] = useState({});
    
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupType, setPopupType] = useState('info'); // 'info' or 'error'

    // Get current date and time
  const currentDate = new Date();
  const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        
  const user = useSelector(state => state.auth.userInfo); // `userInfo` may be null or contain `isAdmin`

  const navigate = useNavigate();

  
  useEffect(() => {
    // Fetch event data based on eventId when the component mounts
    async function getEventDetails() {
      try {
        const response = await axios.get(`http://localhost:5000/event/getSelectedEvent/${eventId}`);
        setSelectedEvent(response.data.event);
        
      } catch (error) {
        console.error("Error fetching event data:", error.message);
        alert("Error fetching event data. Please try again.");
      }
    }

    getEventDetails();
  }, [eventId]);

  
  function validateInput(name, value) {
    switch (name) {
        case 'ticketUserName':
            if (!value) return "User name is required";
            if (value.length < 3) return "User name must be at least 3 characters long";
            return "";
        case 'ticketUserEmail':
            if (!value) return "Email is required";
            if (!/\S+@\S+\.\S+/.test(value)) return "Email address is invalid";
            return "";
        case 'ticketUserMobile':
            if (!value) return "Mobile number is required";
            if (!/^\d{10}$/.test(value)) return "Mobile number must be 10 digits";
            return "";
        case 'ticketCount':
            if (value < 1) return "At least one ticket must be purchased";
            return "";
        default:
            return "";
    }
}

function handleInputChange(e) {
    const { name, value } = e.target;
    setErrors({
        ...errors,
        [name]: validateInput(name, value)
    });
    switch (name) {
        case 'ticketUserName':
            setTicketUserName(value);
            break;
        case 'ticketUserEmail':
            setTicketUserEmail(value);
            break;
        case 'ticketUserMobile':
            setTicketUserMobile(value);
            break;
        case 'ticketCount':
            setTicketCount(value);
            break;
        default:
            break;
    }
}

  

  const calculateTotalCost = () => {
    let cost = 0;
    
    if (selectedEvent) {
        let baseCost = selectedEvent.ticketPrice * ticketCount;
        if (ticketCount > 5) {
            let discountCount = ticketCount - 5;
            let discount = discountCount * selectedEvent.ticketPrice * 0.15; // 15% discount for each ticket after 5
            baseCost -= discount;
        }
        cost = baseCost;
    }
    
    return cost;
};

  // Calculate total cost whenever ticket count or selectedEvent changes
  useEffect(() => {
    const cost = calculateTotalCost();
    setTotalTicketCost(cost);
  }, [ticketCount, selectedEvent]);


  
  function sendData(e) {
    e.preventDefault();

    const validationErrors = Object.keys(errors).reduce((acc, key) => {
        const error = validateInput(key, eval(key));
        if (error) acc[key] = error;
        return acc;
    }, {});

    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
    }

    const serviceId = "service_jzrxksn";
    const templateId = "template_85g2ken";
    const publicKey = "ui-N53tzWkbbLQ0md";


    const emailParams = {
      ticketUserEmail: ticketUserEmail,
      ticketUserName: ticketUserName,
      ticketCount: ticketCount,
      eventName: selectedEvent?.eventName,
      totalTicketCost: totalTicketCost,
      ticketBuyingDate: currentDate,
      ticketBuyingTime: formattedTime,
    };


  emailjs
        .send(serviceId, templateId, emailParams, publicKey)
        .then((response) => {
          console.log("Email sent successfully!", response.status, response.text);
        })
        .catch((error) => {
          console.error("Email could not be sent!", error);
        });

    const newTicket = {
        eventId,
        eventName: selectedEvent?.eventName,
        ticketUserId : user._id,
        ticketUserName,
        ticketUserEmail,
        ticketUserMobile,
        ticketCount,
        totalTicketCost,
        ticketBuyingDate: currentDate,
        ticketBuyingTime: formattedTime // Include formatted time
      }

      axios.post("http://localhost:5000/ticket/buyTicket", newTicket)
      .then(() => {
          // Custom success notification
         setPopupMessage("Ticket Purchased successfully!");
         setPopupType('info');
         setIsPopupOpen(true);

        //Resetting inout fields
          setTicketUserName("");
          setTicketUserEmail("");
          setTicketUserMobile("");
          setTicketCount("");
          setTotalTicketCost("");

          
      }).catch((err) => {
          alert(err);
          // Custom success notification
          setPopupMessage("Error Purchasing Ticket. Please try again.");
          setPopupType('error');
          setIsPopupOpen(true);
      })
  }

  useEffect(() => {
    if (user) {
        setTicketUserName(user.name || "");
        setTicketUserEmail(user.email || "");
        setTicketUserMobile(user.mobile || "");
        
    }
  }, [user]);


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
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">

  <div className="container my-10 max-w-3xl mx-auto p-10 bg-secondary-green opacity-90 shadow-2xl shadow-green-400 rounded-[50px] overflow-auto font-lexend">
    <div className="text-5xl font-extrabold ...">
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-800 to-black justify-center">
        Buy Ticket
      </span>
    </div>

    {selectedEvent && (
    <div className="text-3xl font-mclaren font-extrabold ...">
     <h1>{selectedEvent.eventName}</h1>
    </div>
    )}

    <form className="mt-3" onSubmit={sendData}>


      {/* User Name */}
      <div className="ml-30 text-base font-semibold mt-5">
        <label className="block font-bold text-xl text-green-800" htmlFor="ticketUserName">User Name</label>
        <input className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
          type="text" placeholder="Enter Name" name="ticketUserName" value={ticketUserName}
          onChange={handleInputChange}
        />
        {errors.ticketUserName && <div className="text-red-600">{errors.ticketUserName}</div>}
      </div>

      {/* User Email */}
      <div className="ml-30 text-base font-semibold mt-5">
        <label className="block font-bold text-xl text-green-800" htmlFor="ticketUserEmail">User Email</label>
        <input className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
          type="text" placeholder="Enter Email" name="ticketUserEmail" value={ticketUserEmail}
          onChange={handleInputChange}
        />
        {errors.ticketUserEmail && <div className="text-red-600">{errors.ticketUserEmail}</div>}
      </div>


      {/* User Mobile */}
      <div className="ml-30 text-base font-semibold mt-5">
        <label className="block font-bold text-xl text-green-800" htmlFor="ticketUserMobile">User Mobile</label>
        <input className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
          type="text" placeholder="Enter Mobile" name="ticketUserMobile" value={ticketUserMobile}
          onChange={handleInputChange}
        />
        {errors.ticketUserMobile && <div className="text-red-600">{errors.ticketUserMobile}</div>}
      </div>


      {/* Ticket Count */}
      <div className="ml-30 text-base font-semibold mt-5 flex">
        <label className="block font-bold text-xl text-green-800" htmlFor="ticketCount">Ticket Count : </label>
        <input className="w-20 p-0 ml-4 border border-gray-200 rounded text-lg font-lexend form-check"
          type="number" placeholder="Count" name="ticketCount" value={ticketCount}
          min="1"
          onChange={handleInputChange}
        />
        
        {selectedEvent && (
          <label className="ml-56 block font-bold text-lg text-green-900 font-mclaren" htmlFor="ticketCount">Ticket Price : {selectedEvent.ticketPrice} LKR</label>
        )}

      </div>


      {errors.ticketCount && <div className="text-red-600 text-base font-semibold flex">{errors.ticketCount}</div>}
      
      <div className="flex"> 
       <p className="block font-bold text-lg text-green-900 font-mclaren">
        More Friends, More Savings! Get <span className="text-red-800">15% Off</span> for Every Ticket Over 5!
      </p>

       
      </div>


      {/* Display total cost */}
      <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-black">Total Cost: {totalTicketCost} LKR</label>
            </div>


      <center>
        <br />
        <div className="flex justify-center mt-5 ">
        <button className="flex items-center bg-green-700 text-white text-lg px-6 py-2 border border-green-800 rounded-full cursor-pointer font-bold hover:bg-green-400 hover:border-green-950 " type="submit" name="submit" id="submit"> 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
         <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg> Buy </button>

        <Link to={`/viewEvent/${eventId}`} className="flex items-center ml-24 bg-red-700 text-white text-lg px-3 py-2 border border-red-800 rounded-full cursor-pointer font-bold hover:bg-red-400 hover:border-red-950" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 mr-1">
  <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
 Cancel </Link>
 </div>
      </center>
    </form>
  </div>

  {/* Your component structure */}
  <CustomPopup
          isOpen={isPopupOpen}
          message={popupMessage}
          onClose={() => {
            setIsPopupOpen(false);
            navigate(`/viewEvent/${eventId}`);
          }}
          type={popupType}
        />
</div>
</div>


  );
}

