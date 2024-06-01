import React, { useState, useEffect } from "react";
import bggreen from '../../../assets/eventImages/bggreen.jpg'; // Import the image
import axios from "axios"; // axios for making HTTP requests
import { useSelector } from 'react-redux'; // Import useSelector
import { useNavigate } from 'react-router-dom'; // for programmatic navigation
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import CustomPopup from '../Components/CustomPopup'; // Import the modal component
import EventHeader from "../Components/EventHeader";

export default function AddEvent() {
  const [eventName, setEventName] = useState("");
  const [eventCategory, setEventCategory] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState(""); // State for ticket buying time
  const [eventDescription, setEventDescription] = useState("");
  const [totalCost, setTotalCost] = useState(""); // Total cost state
  const [attendeeCount, setAttendeeCount] = useState(""); // Total cost state
  const [isPublic, setIsPublic] = useState(false);
  const [ticketPrice, setTicketPrice] = useState(""); // Tciket state 
  const [file, setFile] = useState(null);
  const [allOptions, setAllOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [reservedSlots, setReservedSlots] = useState([]);
  
  
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('info'); // 'info' or 'error'
  
  const [showDescription, setShowDescription] = useState(null);

  const user = useSelector(state => state.auth.userInfo); // `userInfo` may be null or contain `isAdmin`

  const [formError, setFormError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});

  const timeSlots = [
    { id: 'slot1', label: '8am to 12pm', value: '08:00-12:00' },
    { id: 'slot2', label: '12pm to 4pm', value: '12:00-16:00' },
    { id: 'slot3', label: '4pm to 8pm', value: '16:00-20:00' },
    { id: 'slot4', label: '8pm to 12am', value: '20:00-00:00' },
  ];

      // Get current date and time
      const currentDate = new Date();
      const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  

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


  function handleOptionChange(optionId, checked) {
    
    
    if (checked) {
      setSelectedOptions(prevSelectedOptions => [...prevSelectedOptions, optionId]);
    } else {
      setSelectedOptions(prevSelectedOptions => prevSelectedOptions.filter(id => id !== optionId));
    }
    

    // Check if the updated selected options meet the validation criteria
  if (selectedOptions.length < 2) {
        // If less than or equal to 3 options are selected, update the state and set an error message
        setErrors((prevErrors) => ({ ...prevErrors, selectedOptions: 'At least 3 options should be selected' }));
  } else {
    // If more than 3 options are selected, update the state and clear any error message
    setErrors((prevErrors) => ({ ...prevErrors, selectedOptions: '' }));
  }

    
  }



  const handleTimeSlotChange = (slotId) => {
    if (selectedTimeSlots.includes(slotId)) {
      setSelectedTimeSlots(prev => prev.filter(id => id !== slotId));
    } else {
      setSelectedTimeSlots(prev => [...prev, slotId]);
    }
    
  };
  


 // Fetch reserved slots for the selected date
 useEffect(() => {
  const fetchReservedSlots = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/event/reservedSlots/${eventDate}`);
      setReservedSlots(response.data.reservedSlots);
    } catch (error) {
      console.error("Error fetching reserved slots:", error.message);
    }
  };

  if (eventDate) {
    fetchReservedSlots();
  }
}, [eventDate]);


  
  
  // Function to calculate total cost
  const calculateTotalCost = () => {
    let cost = 0;
    selectedOptions.forEach((optionId) => {
      const selectedOption = allOptions.find(option => option._id === optionId);
      if (selectedOption) {
        // Multiply perPerson optionPrice by attendeeCount if it's a perPerson option
        const optionCost = selectedOption.perPerson ? selectedOption.optionPrice * attendeeCount : selectedOption.optionPrice;
        cost += optionCost;
      }
    });

    
    // Add additional cost for each selected time slot
    const timeSlotCost = selectedTimeSlots.length * 1000; // Assuming 1000 LKR per slot
    cost += timeSlotCost;


    return cost;
  };

  
  // Calculate total cost whenever selected options, selected time slots, or attendee count change
  useEffect(() => {
    const cost = calculateTotalCost();
    setTotalCost(cost);
  }, [selectedOptions, allOptions, selectedTimeSlots, attendeeCount]);


  function validateInput(name, value) {
    switch (name) {
        case 'eventName':
            if (!value) return "Event name is required";
            if (value.length < 20) return "Event name must be at least 20 characters long";
            if (!validateEventName(value)) {
                return "Event name should not exceed 10 words";
            }
            return "";
        case 'selectedOptions':
            if (selectedOptions.length < 3) {
                setErrors("At least 3 options should be selected");
              }
            return "";
        case 'eventDescription':
            if (!value) return "Event Description is required";
            if (value.length < 80) return "Description must be at least 80 characters long";
            if (value.length > 200) return "Description is too long";
            return "";
        case 'attendeeCount':
            if (!value) return "Attendee Count should be entered";
            if (value < 0) return "You can't add negative values";
            if (value < 5) return "Attendee count should be at least 5";
            return "";
        case 'ticketPrice':
            if (!value) return "Please enter the Ticket Price";
            if (value < 100) return "Ticket Price should exceed 100 LKR";
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
        case 'eventName':
            setEventName(value);
            break;
        case 'eventDescription':
            setEventDescription(value);
            break;
        case 'attendeeCount':
            setAttendeeCount(value);
            break;
        case 'ticketPrice':
            setTicketPrice(value);
            break;
        default:
            break;
    }
}

  // Function to handle form submission
  function sendData(e) {
    e.preventDefault();


     // Check if all fields are filled
     if (!eventName || !eventCategory || !eventDate || !eventDescription || attendeeCount == 0 || selectedOptions.length === 0) {
      setFormError("Please Fill all fields ");
      return;
    }

    if (!selectedTimeSlots.length > 0) {
      setFormError("Please Select at least One Time Slot");
      return;
    }else if (selectedOptions.length < 3) {
      setFormError("You must select at least 3 Options");
      return;
    }else{
      setFormError("");
    }


    const validationErrors = Object.keys(errors).reduce((acc, key) => {
        const error = validateInput(key, eval(key));
        if (error) acc[key] = error;
        return acc;
    }, {});

    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
    }


    const formData = new FormData();
    formData.append("eventUserId", user._id); // Append user ID
    formData.append("eventUserName", user.name); 
    formData.append("eventUserMobile", user.mobile); 
    formData.append("eventName", eventName);
    formData.append("eventCategory", eventCategory);
    formData.append("eventDate", eventDate);
    formData.append("eventTime", eventTime);
    formData.append("eventDescription", eventDescription);
    formData.append("attendeeCount", attendeeCount);
    formData.append("totalCost", totalCost);
    formData.append("isPublic", isPublic);
    formData.append("ticketPrice", ticketPrice);
    formData.append("file", file);
    formData.append("eventBookingDate", currentDate);
    formData.append("eventBookingTime", formattedTime);


    // Append selected option IDs
    selectedOptions.forEach((optionId) => {
      formData.append("selectedOptions[]", optionId);
    });

    // Append selected time slots excluding reserved slots
    const selectedTimeSlotsToAppend = selectedTimeSlots.filter(slotId => !reservedSlots.includes(slotId));

    // Append filtered selected time slots
    selectedTimeSlotsToAppend.forEach(slotId => {
      formData.append("selectedTimeSlots[]", slotId);
    });



    axios.post("http://localhost:5000/event/addEvent", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        // Custom success notification
        setPopupMessage("Event added successfully!");
        setPopupType('info');
        setIsPopupOpen(true);

        setEventName("");
        setEventCategory("");
        setEventDate("");
        setEventTime("");
        setSelectedTimeSlots([]);
        setEventDescription("");
        setSelectedOptions([]);
        setTotalCost(0);
        setIsPublic("");
        setTicketPrice(0);
        setFile(null);
        setFormError("");

      })
      .catch((err) => {
        alert(err);
        // Custom success notification
        setPopupMessage("Error adding event. Please try again.");
        setPopupType('error');
        setIsPopupOpen(true);
      });
  }

  // Get unique categories
  const categories = [...new Set(allOptions.map((option) => option.optionCategory))];


  // Function to get today's date in the format required by input type="date"
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
  
    // Pad month and day with leading zero if needed
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }
  
    return `${year}-${month}-${day}`;
  };

 

  // Function to validate event name
  const validateEventName = (name) => {
    const words = name.split(' ').filter(word => word !== ''); // Split by spaces and remove empty strings
    if (words.length > 10) {
      return false;
    }
    return true;
  };

  const handleEventTimeChange = (e) => {
    const selectedTime = e.target.value;
    const selectedHour = parseInt(selectedTime.split(":")[0], 10);

    // Check if the selected hour is between 8 and 21 (8 AM to 9 PM)
    if (selectedHour >= 8 && selectedHour <= 21) {
      setEventTime(selectedTime);
      setErrorMessage(""); // Clear error message if time is within range
    } else {
      // Reset the event time if it falls outside the allowed range
      setEventTime("");
      setErrorMessage("Please select a time between 8 AM and 10 PM.");
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
      ></div>

       
    {/* Call Header */}
    <EventHeader/>

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <div className="container my-10 max-w-4xl mx-auto p-10 bg-secondary-green shadow-2xl shadow-theme-green rounded-[50px] overflow-auto font-lexend opacity-80 border border-theme-green">
          <div className="text-5xl font-extrabold ...">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-800 to-black">
              Book Event
            </span>
          </div>
          
          <form className="mt-3" encType="multipart/form-data" onSubmit={sendData}>

            {/* Event Name */}
            <div className="px-12 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800" htmlFor="eventName">Event Name</label>
              <input type="text" placeholder="Enter Name" name="eventName" required value={eventName}
                className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
                onChange={handleInputChange}
              />
              {errors.eventName && <div className="text-red-600">{errors.eventName}</div>}
            </div>

            

            {/* Event Category */}
            <div className="px-12 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800"  htmlFor="eventCategory">Event Category</label>
              <select placeholder="Select Category" name="eventCategory" required id="eventCategory" value={eventCategory}
                onChange={(e) => setEventCategory(e.target.value)}
                className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
              >
                <option value="" disabled>Select Category</option>
                <option value="Wedding">Wedding</option>
                <option value="Birthday">Birthday</option>
                <option value="Christmas">Christmas</option>
                <option value="Halloween">Halloween</option>
                <option value="NewYear">NewYear</option>
                <option value="Other">Other</option>
              </select>
            </div>

      <div className="flex ">
        <div className="px-12 ">
            {/* Event Date */}
            <div className="text-base font-semibold mt-5">
                <label className="block font-bold text-xl text-green-800" htmlFor="eventDate">Event Date</label>
                <input type="date" placeholder="Event Date" name="eventDate" required value={eventDate}
                    min={getCurrentDate()} // Set the min attribute to today's date
                    className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
                    onChange={(e) => setEventDate(e.target.value)}
                />
            </div>


            {/* Event Time */}
            <div className=" text-base font-semibold mt-5">
            <label className="block font-bold text-xl text-green-800" htmlFor="eventTime">
              Event Time
            </label>
            <input
              type="time"
              placeholder="Event Time"
              name="eventTime"
              required
              value={eventTime}
              className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
              onChange={handleEventTimeChange}
            />
            </div>
      
    </div>

    <div className="pl-40 text-base font-semibold mt-5">
              <p className="block font-bold text-xl text-green-800 mb-3">Select Time Slots:</p>
              {timeSlots.map(slot => (
                <div key={slot.id} className="flex mt-2">
                  <input
                    type="checkbox"
                    id={slot.id}
                    disabled={reservedSlots.includes(slot.id)}
                    checked={selectedTimeSlots.includes(slot.id)}
                    onChange={() => handleTimeSlotChange(slot.id)}
                    className="form-checkbox h-5 w-5 text-green-600"
                  />
                  <label htmlFor={slot.id} className="ml-2 text-black">{slot.label}</label>
                  {reservedSlots.includes(slot.id) && (
                    <span className="ml-2 text-red-600">This time slot is already reserved</span>
                  )}
                </div>
              ))}
            </div>

            </div>
            
            {errorMessage && <span className="text-red-600 pl-12 text-base font-semibold mt-5">{errorMessage}</span>}


           


            {/* Event Description */}    
            <div className="px-12 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800" htmlFor="eventDescription">Event Description</label>
              <textarea cols="50" rows="8" placeholder="Enter Description" name="eventDescription" required value={eventDescription}
                className="h-24 w-full p-1 border border-gray-200 rounded text-lg font-lexend"
                onChange={handleInputChange}
              > 
              </textarea>
              {errors.eventDescription && <div className="text-red-600">{errors.eventDescription}</div>}
            </div>

            
            
            {/* Attendee Count*/}
            <div className="px-12 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800" htmlFor="attendeeCount">Attendee Count</label>
              <input type="number" placeholder="Enter Attendee Count" name="attendeeCount" required value={attendeeCount}
                className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check" min="5"
                onChange={handleInputChange}
              />
              {errors.attendeeCount && <div className="text-red-600">{errors.attendeeCount}</div>}
            </div>



        {/* Event Options */}
<div className="lg:pl-2 lg:pr-0 sm:px-20 pt-0 grid grid-cols-2 gap-10 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
  {categories.map((category, index) => (
    <div key={index} className="text-base font-semibold ml-16">
      {/* Category Title */}
      <p className="mt-5 mb-1 text-lg font-bold text-green-900">{category} Options:-</p>
      {/* Options for this category */}
      {allOptions.filter((option) => option.optionCategory === category).map((option) => (
        <div key={option._id} className="form-check flex items-center">
          <input
            type="checkbox"
            id={option._id}
            name={option.optionName}
            checked={selectedOptions.includes(option._id)}
            onChange={(e) => handleOptionChange(option._id, e.target.checked)}
            className="form-checkbox h-5 w-5 text-green-600"
          />
          <label
            htmlFor={option._id}
            className="ml-2 text-black cursor-pointer relative"
            onMouseEnter={() => setShowDescription(option._id)}
            onMouseLeave={() => setShowDescription(null)}
          >
            {option.optionName} - {option.optionPrice} LKR
            {/* Tooltip */}
            {showDescription === option._id && (
              <div className="absolute z-10 -top-10 left-36 font-lexend bg-green-600 text-white text-xs rounded shadow p-1 w-48">
                {option.optionDescription}
              </div>
            )}
          </label>
        </div>
      ))}
    </div>
  ))}


</div>
            <div className="px-12 text-base font-semibold mt-5">
            {errors.selectedOptions && (<div className="text-red-600 mb-3">{errors.selectedOptions}</div>)}
              <label className="block font-bold text-xl text-black">Total Cost: {totalCost} LKR</label>
            </div>





            {/* Is Public? */}
            <div className="lg:pl-2 lg:pr-0 sm:px-20 pt-4 grid grid-cols-2 gap-10 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 ">
                <div className="text-base font-semibold ml-16">
                    <div>
                        <label htmlFor="public" className="flex items-center">
                            <input
                                type="radio"
                                id="public"
                                name="isPublic"
                                value="true"
                                checked={isPublic === true}
                                onChange={() => setIsPublic(true)}
                                className="form-radio h-5 w-5 text-green-600"
                            />
                            <span className="ml-2 text-black">Public - The event will be published for all users.</span>
                        </label>
                        <p></p>
                    </div>

                    <div>
                        <label htmlFor="private" className="flex items-center">
                            <input
                                type="radio"
                                id="private"
                                name="isPublic"
                                value="false"
                                checked={isPublic === false}
                                onChange={() => setIsPublic(false)}
                                className="form-radio h-5 w-5 text-green-600"
                            />
                            <span className="ml-2 text-black">Private - The event will not be published.</span>
                        </label>

                    
                    
            {/* Ticket Price - Only displayed if isPublic is true */}
              {isPublic === true && (
                  <div className="  text-base font-semibold mt-4 flex justify">
                      <label className="flex items-center font-bold text-xl text-green-800 " htmlFor="ticketPrice">Ticket Price<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                      </svg>
                      </label>
                      <input required className=" p-0 ml-4 border border-gray-200 rounded text-lg font-lexend form-check"
                          type="number" placeholder="Enter Price" name="ticketPrice" value={ticketPrice} min="0"
                          onChange={handleInputChange}
                          
                      />
                      <label className="block font-bold text-xl text-green-800 felx" htmlFor="ticketPrice">LKR</label>
                      
                  </div>
                  
              )}   
              {errors.ticketPrice && <div className="text-red-600">{errors.ticketPrice}</div>} 
                    </div>
                </div>
            </div>

            {/* Event Image */}
            <div className="px-12 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800" htmlFor="file">
                Event Image
              </label>
              <input type="file" id="file" name="file" accept="image/*" 
                className="w-full p-2 border border-gray-200 rounded-lg text-lg font-lexend focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

            {/* Display form errors */}
            {formError && (
              <div className="ml-12 font-semibold text-xl font-lexend mt-3 text-red-600">
                <p>{formError}</p>
              </div>
            )}

            

            <div className="flex justify-center mt-5 ">
              <button className="flex items-center bg-green-700 text-white text-lg px-4 py-2 border border-green-800 rounded-full cursor-pointer font-bold hover:bg-green-400 hover:border-green-950" type="submit" name="submit" id="submit">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
              </svg>
              Book </button>

              <Link to={`/myEvents`} className="flex items-center ml-24 bg-red-700 text-white text-lg px-3 py-2 border border-red-800 rounded-full cursor-pointer font-bold hover:bg-red-400 hover:border-red-950" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              Cancel </Link>
            </div>
          </form>
        </div>

        {/* Your component structure */}
      <CustomPopup
          isOpen={isPopupOpen}
          message={popupMessage}
          onClose={() => {
            setIsPopupOpen(false);
            navigate("/myEvents");
          }}
          type={popupType}
        />


      </div>
    </div>
  );
}
