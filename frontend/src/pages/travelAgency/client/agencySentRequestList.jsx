import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AgencySentRequest from "../../../components/travelAgency/client/agencySentRequest";
import { useSelector } from "react-redux";

function AgencySentRequestList() {
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo._id;
  const [requests, setRequests] = useState([]);

  // * Fetch requests by user ID
  useEffect(() => {
    axios
      .get(`/getRequestByUser/${userId}`)
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching requests:", error);
      });
  }, [userId]);

  const acceptedRequests = requests.filter((request) => request.Status === "accepted");
  const rejectedRequests = requests.filter((request) => request.Status === "rejected");
  const pendingRequests = requests.filter((request) => request.Status === "pending");

  return (
    <div className='flex flex-col'>
      <h1 className='flex justify-center my-10 ml-2 text-4xl'>Sent Package Requests</h1>
      <div className='container mx-auto flex w-[1000px] border-black border flex-col rounded-xl bg-gray-400 bg-opacity-30 mb-10'>
        <div className='container mx-auto'>
          <h2 className='my-5 ml-10 text-xl font-medium'>Accepted Requests</h2>
          <div className='container px-[10px] flex-col flex'>
            {acceptedRequests.map((request) => {
              console.log(request);
              return (
                <AgencySentRequest
                  key={request._id}
                  requestId={request._id}
                  RoomType={request.RoomType}
                  NoOfAdults={request.NoOfAdults}
                  NoOfChildren={request.NoOfChildren}
                  sentDate={request.SentDate}
                  AgencyId={request.AgencyId}
                />
              );
            })}
          </div>
        </div>

        <div className='container mx-auto mt-[50px] mb-10'>
          <h2 className='my-5 ml-10 text-xl font-medium'>Pending Requests</h2>
          <div className='container px-[10px] flex-col flex'>
            {pendingRequests.map((request) => {
              console.log(request);
              return (
                <AgencySentRequest
                  requestId={request._id}
                  RoomType={request.RoomType}
                  NoOfAdults={request.NoOfAdults}
                  NoOfChildren={request.NoOfChildren}
                  sentDate={request.SentDate}
                  AgencyId={request.AgencyId}
                />
              );
            })}
          </div>
        </div>

        <div className='container mx-auto mt-[50px] mb-10'>
          <h2 className='my-5 ml-10 text-xl font-medium'>Rejected Requests</h2>
          <div className='container px-[10px] flex-col flex'>
            {rejectedRequests.map((request) => {
              return (
                <AgencySentRequest
                  requestId={request._id}
                  RoomType={request.RoomType}
                  NoOfAdults={request.NoOfAdults}
                  NoOfChildren={request.NoOfChildren}
                  sentDate={request.SentDate}
                  AgencyId={request.AgencyId}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgencySentRequestList;
