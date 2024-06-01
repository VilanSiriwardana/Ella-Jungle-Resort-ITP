import React, { useState, useEffect } from "react";
import axios from "axios";

function AgencySentRequest({
  key,
  requestId,
  RoomType,
  NoOfAdults,
  NoOfChildren,
  sentDate,
  AgencyId,
}) {
  const [formattedSentDate, setFormattedSentDate] = useState("");
  const [AgencyName, setAgencyName] = useState("");
  console.log(AgencyId);

  // * Fetch agency name
  useEffect(() => {
    const fetchAgencyName = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/agencies/get/${AgencyId}`
        );
        setAgencyName(response.data.agencyName || "");
      } catch (error) {
        console.error("Error fetching agency:", error);
      }
    };

    fetchAgencyName();
  }, [AgencyId]);

  useEffect(() => {
    const formattedDate = () => {
      const date = new Date(sentDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");

      return `${year}-${month}-${day} ${hours}:${minutes}`;
    };
    setFormattedSentDate(formattedDate());
  }, [sentDate]);

  const NoOfPersons = NoOfAdults + NoOfChildren;

  const handleUpdateClick = (requestId) => {
    window.location = `/AgencySentRequestDetails/${requestId}`;
  };

  return (
    <div>
      <div onClick={() => handleUpdateClick(requestId)}>
        <div className="border border-green-300 flex gap-5 justify-between py-2.5 shadow-md bg-white bg-opacity-80  max-md:flex-wrap max-w-[900px] mx-auto mb-2 rounded-xl">
          <div className="flex ">
            <h2 className="ml-5 text-sm font-bold leading-5 text-neutral-800">
              {AgencyName}
            </h2>
          </div>
          <div className="flex ">
            <div className="flex text-sm ">
              <p className="flex text-gray-600 ml-[-500px]">
                Room Type : {RoomType}
              </p>
              <p className="flex ml-10 text-gray-600">
                No of Persons: {NoOfPersons}
              </p>
            </div>
            <div className="flex gap-5 ">
              <p className="" name="message sent date">
                {formattedSentDate}
              </p>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4c9b973415e6ba1bace812d7c55154ed12ed535485ab212fb6c71cbe83671982?apiKey=bd6dc691d3624fe581379f78a6e48c90&"
                alt="IconScout feature icon 2"
                className="w-5 shrink-0 aspect-square"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgencySentRequest;
