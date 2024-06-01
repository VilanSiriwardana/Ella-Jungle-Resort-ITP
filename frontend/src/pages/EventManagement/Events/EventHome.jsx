import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from 'react-redux'; // Import useSelector
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import bggreen from '../../../assets/eventImages/bggreen.jpg'; // Import the image
import pic0 from '../../../assets/eventImages/flora4.jpg';
import pic1 from '../../../assets/eventImages/wedding7.jpg';
import pic2 from '../../../assets/eventImages/birthday3.jpg';
import pic3 from '../../../assets/eventImages/feast6.jpg';
import pic4 from '../../../assets/eventImages/christmas5.jpg';
import pic5 from '../../../assets/eventImages/wedding8.jpg';
import pic6 from '../../../assets/eventImages/halloween1.jpg';
import EventHeader from "../Components/EventHeader";


export default function EventHome() {

    const user = useSelector(state => state.auth.userInfo); // `userInfo` may be null or contain `isAdmin`

    // Existing state and useEffect hook
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [futureEvents, setFutureEvents] = useState([]);
    const [currentEventIndex, setCurrentEventIndex] = useState(0);



    useEffect(() => {
        function getEvents() {
          axios.get("http://localhost:5000/event/publicEvents")
          .then((res) => {
            if(res.data && res.data.length > 0) {
                setFutureEvents(res.data);
                setIsModalOpen(true); // Open the modal only if there are future events
              }
          }).catch((err) => {
            alert(err.message);
          });
        }
    
        getEvents();
      }, []);




    // Function to move to the next event
    const handleNextEvent = () => {
        if(currentEventIndex < futureEvents.length - 1) {
            setCurrentEventIndex(currentEventIndex + 1);
        } else {
            setIsModalOpen(false); // Close the modal if it's the last event
        }
    };


    // Function to skip the modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


// Assuming events is an array of event objects
const currentEvent = futureEvents[currentEventIndex];
    

      
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
    <div className="relative z-10 flex flex-col justify-items-stretch mr-20 ml-20 justify-center min-h-screen">
            {/* Call Header */}
    <EventHeader/>
  
      {/* Your scrolling content */}
      
      <div className="container bg-fixed my-5  mx-auto px-20  rounded-3xl overflow-auto bg-gray-50 bg-opacity-50 shadow-2xl shadow-theme-green " style={{
            backgroundImage: `url(${pic0})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
      }}>
        
    
  
        <div className="lg:px-0 sm:px-10 pt-0 grid grid-cols-1 gap-10 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1" >
            {/* Event Details */}
            <div className="container  shadow-md rounded-3xl overflow-hidden w-full h-auto flex items-center justify-center bg-fixed" >
                
                <div className="bg-white shadow-md rounded-3xl overflow-hidden w-full h-auto flex items-center justify-center bg-fixed">

                </div>
                
            </div>

            <div className=" px-0 pb-0 pt-0">
                {/* Event Name with Inika font */}
                <h1 className="text-3xl font-bold pl-96 text-white font-inika text-right">Crafting Unforgettable Moments: </h1>
                <h1 className="text-3xl font-bold pl-96 text-white font-inika text-right">Your Event Planning Journey Begins Here</h1>
            
    
                {/* Event Description with McLaren font */}
                <div className="px-40 mt-2 pt-56 pb-16">
                <p className="bg-secondary-green opacity-85 text-xl font-inika text-center rounded-3xl p-4">Welcome to our Event Planning Section, where ideas take flight and planning comes to life. Here, you're not just organizing an event; you're crafting experiences that will last a lifetime. With our tools and personalized guidance, we make your vision a seamless reality. Let's embark on this journey together, creating events that leave lasting impressions</p>
                </div>

            </div>
        
        </div>

        
        
    </div>
    {/* Scrolling content End*/}

    
        {/*Cards are wrapped here */}
        <div className=" flex  p-2 items-center justify-between">

            {/*One Card */}               
            <div className="bg-white max-w-md px-5 m-8 rounded-3xl overflow-hidden shadow-2xl hover:scale-up-110 " 
                style={{
                    backgroundImage: `url(${pic1})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
            {/* <img className="w-full" src={christmas1} alt="test" /> */}
                <div className="px-4 py-4 bg-secondary-green  opacity-85 m-2 mt-56 mb-4 rounded-xl">
                    <div className="font-bold text-xl pb-2">
                        <p className="text-base font-bold text-green-800 font-inika text-center">
                            From Planning to Execution - All Your Event Needs in One Place
                            </p>
                    </div>
                        <p className="text-sm font-mclaren text-center">Smooth event management, whether you're planning a large wedding, a birthday party, a social event, or a business conference</p>
                </div>

            </div>
            {/*One Card Ends*/}   


            {/*One Card */}               
            <div className="bg-white max-w-md px-5 m-8 rounded-3xl overflow-hidden shadow-2xl hover:scale-up-110 " 
                style={{
                    backgroundImage: `url(${pic2})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
            {/* <img className="w-full" src={christmas1} alt="test" /> */}
                <div className="px-4 py-4 bg-secondary-green opacity-85 m-2 mt-4 mb-56 rounded-xl">
                    <div className="font-bold text-xl pb-2">
                        <p className="text-base font-bold text-green-800 font-inika text-center">
                        Masterful Event Resource Management - Crafting Unforgettable Experiences
                        </p>
                    </div>
                    
                    <p className="text-sm font-mclaren text-center">
                    Efficiently allocate and manage event resources for flawless execution. Stay organized and focused on creating memorable experiences
                    </p>
                </div>

            </div>
            {/*One Card Ends*/}   


            {/*One Card */}               
            <div className="bg-white max-w-md px-5 m-8 rounded-3xl overflow-hidden shadow-2xl hover:scale-up-110 " 
                style={{
                    backgroundImage: `url(${pic3})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
            {/* <img className="w-full" src={christmas1} alt="test" /> */}
                <div className="px-4 py-4 bg-secondary-green  opacity-85 m-2 mt-56 mb-4 rounded-xl">
                    <div className="font-bold text-xl pb-2">
                        <p className="text-base font-bold text-green-800 font-inika text-center">Tailored Solutions for Your Vision and Budget</p></div>
                        <p className="text-sm font-mclaren text-center">Explore customizable options designed to fit your unique preferences and budget requirements, with event experience tailored to your needs.</p>
                </div>

            </div>
            {/*One Card Ends*/}   


        </div>
        {/*Cards end here */}




         {/*Cards are wrapped here */}
         <div className=" flex  p-2 items-center justify-between">

{/*One Card */}               
<div className="bg-white max-w-md px-5 m-8 rounded-3xl overflow-hidden shadow-2xl hover:scale-up-110 " 
    style={{
        backgroundImage: `url(${pic4})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }}
>
{/* <img className="w-full" src={christmas1} alt="test" /> */}
    <div className="px-4 py-4 bg-secondary-green  opacity-85 m-2 mt-56 mb-4 rounded-xl">
        <div className="font-bold text-xl pb-2">
            <p className="text-base font-bold text-green-800 font-inika text-center">
            Share Event Details Easily with Friends and Family
                </p>
        </div>
            <p className="text-sm font-mclaren text-center"> Share the Excitement Effortlessly: Easily Spread the Word About Your Event Details with Friends and Family via WhatsApp.</p>
    </div>

</div>
{/*One Card Ends*/}   


{/*One Card */}               
<div className="bg-white max-w-md px-5 m-8 rounded-3xl overflow-hidden shadow-2xl hover:scale-up-110 " 
    style={{
        backgroundImage: `url(${pic5})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }}
>
{/* <img className="w-full" src={christmas1} alt="test" /> */}
    <div className="px-4 py-4 bg-secondary-green opacity-85 m-2 mt-4 mb-56 rounded-xl">
        <div className="font-bold text-xl pb-2">
            <p className="text-base font-bold text-green-800 font-inika text-center">
            Monitor Your Expenses Every Step of the Way as You Plan Your Dream Event
            </p>
        </div>
        
        <p className="text-sm font-mclaren text-center">
        Enjoy financial transparency as you plan your event, monitoring expenses effortlessly. Enjoy complete financial transparency and control
        </p>
    </div>

</div>
{/*One Card Ends*/}   


{/*One Card */}               
<div className="bg-white max-w-md px-5 m-8 rounded-3xl overflow-hidden shadow-2xl hover:scale-up-110 " 
    style={{
        backgroundImage: `url(${pic6})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }}
>
{/* <img className="w-full" src={christmas1} alt="test" /> */}
    <div className="px-4 py-4 bg-secondary-green  opacity-85 m-2 mt-56 mb-4 rounded-xl">
        <div className="font-bold text-xl pb-2">
            <p className="text-base font-bold text-green-800 font-inika text-center">Group Discounts Available: Save on Spots for Five or More</p></div>
            <p className="text-sm font-mclaren text-center">Unlock Exclusive Group Discounts: Secure Your Spots for the Ultimate Event Experience and Enjoy Special Savings for Groups of Five or More</p>
    </div>

</div>
{/*One Card Ends*/}   


</div>
{/*Cards end here */}


        
             {/* Pop-up Modal for Advertisement */}
             {isModalOpen && currentEvent.isPublic && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-60 overflow-y-auto h-full w-full" id="my-modal">
                  <div className="relative top-28   mx-auto p-5 w-2/5 h-4/6 shadow-lg rounded-3xl bg-white border-secondary-green " 
                  style={{
                    backgroundImage: `url(http://localhost:5000/Images/${currentEvent.eventImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}>
                   
                    <div className="mx-16 my-14 text-center items-center bg-gray-500 opacity-70 rounded-3xl border-8 border-black border-double">
                    <Link to={`/viewEvent/${currentEvent._id}`}>
                      <h3 className="leading-6 text-2xl font-bold text-gray-950 font-inika pt-4 mx-8">{currentEvent.eventName}</h3>
                      <div className="px-7 py-1 pt-2">
                        <p className="text-base font-mclaren text-black">
                        {currentEvent.eventDescription}</p>
                        
                      </div>
                      <div className="text-lg font-semibold text-blue-600 text-center flex justify-between items-center mx-12 mt-1">
                        <p className="flex items-center text-sm font-mclaren text-black"> 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" /></svg>
                        {currentEvent.eventDate ? currentEvent.eventDate.substr(0, 10) : ""}</p>

                        <p className="flex items-center text-sm font-mclaren text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>Ella Jungle Resort</p>
                      </div>

                      </Link>

                      <div className="items-center px-4 pb-5 mt-3 flex justify-between mx-6">

                      <button className="flex items-center px-4 py-2 font-mclaren bg-black text-white text-base font-medium rounded-lg w-24 shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50" 
                        onClick={handleNextEvent}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3" />
                      </svg> Next </button>
                       
                        <Link to={`/buyEventTicket/${currentEvent._id}`} className="flex items-center px-4 py-2  font-mclaren bg-black text-white text-base font-medium rounded-lg w-24 shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"> 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        Buy </Link>

                        <button 
                        className="flex items-center px-4 py-2 font-mclaren bg-black text-white text-base font-medium rounded-lg w-24 shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50" 
                        onClick={handleCloseModal}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
                     </svg> Skip </button>
                      </div>

                      

                    </div>
                    
                  </div>
                </div>
              )}
              {/* Pop-up Ends Here */}

              
        
    </div>
  
    
  </div>
  )
}


