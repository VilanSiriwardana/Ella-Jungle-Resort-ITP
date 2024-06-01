import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";
import AgencyBgImg from "../../../assets/agencyBackground/agencybg5.png";

function AgencyRequestDetails() {
  const { requestId } = useParams();
  const [userData, setUserData] = useState({}); // [1] Define state for user data
  const [agency, setAgency] = useState({});

  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [status, setStatus] = useState("");
  const [agencyContactNo, setAgencyContactNo] = useState("");
  const [agencyEmail, setAgencyEmail] = useState("");

  const serviceId = "ITP_Project";
  const templateId = "Request_Acknowledge";
  const publicKey = "mosump2O3-rWJQmt7";

  // * set initial state for request data
  const [requestData, setRequestData] = useState({
    ArrivalDate: "",
    DepartureDate: "",
    NoOfDays: "",
    NoOfNights: "",
    NoOfAdults: "",
    NoOfChildren: "",
    RoomType: "",
    RequestDescription: "",
    UserId: "",
    AgencyId: "",
    SentDate: "",
    Status: "",
  });

  // * Fetching request data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`/getRequestId/${requestId}`);
        const {
          ArrivalDate,
          DepartureDate,
          NoOfDays,
          NoOfNights,
          NoOfAdults,
          NoOfChildren,
          RoomType,
          RequestDescription,
          UserId,
          AgencyId,
          SentDate,
          Status,
        } = result.data.clientRequest;
        setRequestData({
          ArrivalDate,
          DepartureDate,
          NoOfDays,
          NoOfNights,
          NoOfAdults,
          NoOfChildren,
          RoomType,
          RequestDescription,
          UserId,
          AgencyId,
          SentDate,
          Status,
        });
      } catch (error) {
        console.error("Error fetching request data:", error);
      }
    };

    fetchData();
  }, [requestId]);

  //fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const result = await axios.get(
          `http://localhost:5000/api/users/specific/${requestData.UserId}`
        );
        setUserData(result.data);
        console.log("User data:", result.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [requestData.UserId]);

  useEffect(() => {
    const fetchAgencyById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/agencies/get/${requestData.AgencyId}`
        );
        setAgency(response.data);
        console.log("Agency data:", response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAgencyById();
  }, [requestData.AgencyId]);

  // * Function to handle accepting request
  const handleAcceptRequest = async () => {
    try {
      const updatedRequest = await axios.put(`http://localhost:5000/UpdateRequest/${requestId}`, {
        ...requestData,
        UserId: requestData.UserId,
        AgencyId: requestData.AgencyId,
        Status: "accepted",
      });
      if (updatedRequest.data.message === "Request Updated") {
        setStatus("Accepted");

        const emailParams = {
          guestName: userData.name,
          guestEmail: userData.email,
          agencyName: agency.agencyName,
          status: "accepted",
          agencyContactNo: agency.mobile,
          agencyEmail: agency.businessMail,
        };

        emailjs
          .send(serviceId, templateId, emailParams, publicKey)
          .then((response) => {
            console.log("Email sent successfully!", response.status, response.text);
            setGuestName("");
            setGuestEmail("");
            setAgencyName("");
            setAgencyContactNo("");
            setAgencyEmail("");
            console.log(emailParams);
          })
          .catch((error) => {
            console.error("Email could not be sent!", error);
          });

        Swal.fire({
          icon: "success",
          title: "Request Accepted!",
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            window.location = `/agencyHome/`;
          }
        });
      }
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const handleRejectRequest = async () => {
    try {
      const updatedRequest = await axios.put(`http://localhost:5000/UpdateRequest/${requestId}`, {
        ...requestData,
        UserId: requestData.UserId,
        AgencyId: requestData.AgencyId,
        Status: "rejected",
      });
      if (updatedRequest.data.message === "Request Updated") {
        setStatus("Rejected");

        const emailParams = {
          guestName: userData.name,
          guestEmail: userData.email,
          agencyName: agency.agencyName,
          status: "rejected",
          agencyContactNo: agency.mobile,
          agencyEmail: agency.businessMail,
        };

        emailjs
          .send(serviceId, templateId, emailParams, publicKey)
          .then((response) => {
            console.log("Email sent successfully!", response.status, response.text);
            setGuestName("");
            setGuestEmail("");
            setAgencyName("");

            setAgencyContactNo("");
            setAgencyEmail("");
            console.log(emailParams);
          })
          .catch((error) => {
            console.error("Email could not be sent!", error);
          });

        Swal.fire({
          icon: "success",
          title: "Request Rejected!",
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            window.location = `/agencyHome/`;
          }
        });
      }
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url("${AgencyBgImg}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <div className='text-4xl font-semibold text-center '>
        <h1 className='pt-5'>Received Request</h1>
      </div>
      <div className='flex bg-gray-200 rounded-2xl bg-opacity-60 container my-10  flex-col mx-auto  border border-green-500  max-w-[800px] '>
        <div className='flex mx-auto mt-10'>
          <form>
            <div className='flex items-start text-xl font-medium text-gray-900 form-group'>
              <div className='flex flex-col gap-2 mx-16 text-xl'>
                <div className='flex items-start mb-2 '>
                  <label>Client Name :</label>
                  <h1 className=' text-black  ml-[74px] text-2xl'>{userData.name}</h1>
                </div>
                <div className='flex items-start mb-2 '>
                  <label>Arrival Date :</label>
                  <input
                    type='date'
                    id='arrivalDate'
                    name='ArrivalDate'
                    className='ml-[80px] rounded-lg border border-green-500 pl-5 w-[160px] bg-white'
                    readOnly
                    value={requestData.ArrivalDate}
                    disabled
                  />
                </div>
                <div className='flex items-start mb-2'>
                  <label>Departure Date :</label>
                  <input
                    type='date'
                    className='ml-[49px] rounded-lg border border-green-500 pl-5 w-[160px] bg-white'
                    id='departureDate'
                    name='DepartureDate'
                    value={requestData.DepartureDate}
                    readOnly
                    disabled
                  />
                </div>
                <div className='flex items-start mb-2'>
                  <label>No. of Days : </label>
                  <input
                    type='number'
                    className='ml-[81px] w-16 rounded-lg border border-green-500 pl-5 bg-white'
                    id='noOfDays'
                    name='NoOfDays'
                    value={requestData.NoOfDays}
                    readOnly
                    disabled
                  />
                </div>
                {/* <div className='flex items-start mb-2'>
                  <label>Number of Nights</label>
                  <input
                    type='number'
                    className='ml-[40px] w-16 rounded-lg border border-green-500 pl-5'
                    id='noOfNights'
                    name='NoOfNights'
                    value={requestData.NoOfNights}
                    readOnly
                  />
                </div> */}
                <div className='flex items-start mb-2'>
                  <label>No. of Adults :</label>
                  <input
                    type='number'
                    className='ml-[68px] w-16 rounded-lg border border-green-500 pl-5 bg-white'
                    id='noOfAdults'
                    name='NoOfAdults'
                    value={requestData.NoOfAdults}
                    readOnly
                    disabled
                  />
                </div>
                <div className='flex items-start mb-2'>
                  <label>No. of Children :</label>
                  <input
                    type='number'
                    className='w-16 ml-[52px] rounded-lg border border-green-500 pl-5 bg-white'
                    id='noOfChildren'
                    name='NoOfChildren'
                    value={requestData.NoOfChildren}
                    readOnly
                    disabled
                  />
                </div>
              </div>

              <div className='flex flex-col ml-10 text-xl'>
                <div className='flex '>Room Type :</div>
                <div className='relative inline-flex hs-dropdown'>
                  <select
                    className='inline-flex items-center px-4 py-3 text-sm font-medium text-black bg-white border border-green-500 rounded-lg shadow-sm text hs-dropdown-toggle gap-x-2 hover:bg-gray-50 disabled:pointer-events-none '
                    aria-labelledby='hs-dropdown-default'
                    value={requestData.RoomType}
                    readOnly
                    disabled
                  >
                    <option value='' disabled>
                      Select Room Type
                    </option>
                    <option value='chalet' disabled>
                      Eco Jungle Chalet
                    </option>
                    <option value='cottage' disabled>
                      Eco Jungle Cottage
                    </option>
                    <option value='cabin' disabled>
                      Eco Jungle Cabin
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div className='flex flex-col mx-16 mt-5 mb-10'>
              <div className='mb-2 text-xl font-medium text-gray-900'>
                <label className='text-xl'>Special Requests :</label>
              </div>
              <div>
                <textarea
                  className='w-[600px] max-h-[100px] h-[100px] border-green-500 border rounded-lg p-5'
                  name='RequestDescription'
                  id='RequestDescription'
                  value={requestData.RequestDescription}
                  readOnly
                />
              </div>
            </div>
            {requestData.Status === "pending" && ( // Only render button for new requests
              <div>
                <button
                  id='spRequest'
                  className='border border-gray-300 mx-20 mb-10 w-[200px] h-10 bg-green-500 rounded-full text-white text-lg font-semibold relative overflow-hidden group hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300'
                  type='button' // Change type to button to prevent form submission
                  onClick={handleAcceptRequest}
                >
                  Accept Request
                  <span className='absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-20 rotate-12 group-hover:-translate-x-40 ease'></span>
                </button>
                <button
                  id='spRequest'
                  className='border border-gray-300 mx-20 mb-10 w-[200px] h-10 bg-red-500 rounded-full text-white text-lg font-semibold relative overflow-hidden group hover:bg-gradient-to-r hover:from-red-500 hover:to-red-400 hover:ring-2 hover:ring-offset-2 hover:ring-red-400 transition-all ease-out duration-300'
                  type='button' // Change type to button to prevent form submission
                  onClick={handleRejectRequest}
                >
                  Reject Request
                  <span className='absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-20 rotate-12 group-hover:-translate-x-40 ease'></span>
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AgencyRequestDetails;
