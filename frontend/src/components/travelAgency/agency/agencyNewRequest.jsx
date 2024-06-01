import React, { useEffect, useState } from "react";
import axios from "axios";

function AgencyNewRequest({ requestId, arrivalDate, departureDate, sentDate, userId }) {
  const [userData, setUserData] = useState({});
  
  const formattedSentDate = () => {
    const date = new Date(sentDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users/specific/${userId}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [userId]);

  const handleUpdateClick = (requestId) => {
    window.location = `/AgencyRequestDetails/${requestId}`;
  };

  return (
    <div onClick={() => handleUpdateClick(requestId)}>
      <div className='border border-green-300 flex gap-5 justify-between py-2.5 shadow-md bg-white   max-md:flex-wrap max-w-[900px] mx-auto mb-2 rounded-xl'>
        <div className='flex '>
          <h2 className='ml-5 text-sm font-bold leading-5 text-neutral-800'>{userData.name}</h2>
        </div>
        <div className='flex '>
          <div className='flex text-sm '>
            {/* max 60 chars */}
            <p className='flex text-gray-600 ml-[-500px]'>Arrival Date: {arrivalDate}</p>
            <p className='flex ml-10 text-gray-600'>Departure Date: {departureDate}</p>
          </div>
          <div className='flex gap-5 pr-5'>
            <p className='' name='message sent date'>
              {formattedSentDate()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgencyNewRequest;
