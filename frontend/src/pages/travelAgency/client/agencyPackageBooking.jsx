import React, { useEffect, useState } from "react";
import { Input, initTWE } from "tw-elements";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import emailjs from "@emailjs/browser";
import AgencyBgImg from "../../../assets/agencyBackground/agencybg5.png";

// Initialize the tw-elements library
initTWE({ Input });

function AgencyPackageBooking() {
  const { packageId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo._id;
  const navigate = useNavigate();
  const [packageDetails, setPackageDetails] = useState(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [agencyId, setAgencyId] = useState("");
  const [agency, setAgency] = useState(null);
  const [transportDetails, setTransportDetails] = useState(null);
  const [roomDetails, setRoomDetails] = useState(null);
  const [activityDetails, setActivityDetails] = useState(null);

  // Ensure that the tw-elements library is initialized only once
  useEffect(() => {
    return () => {
      initTWE({});
    };
  }, []);

  // fetch agency details by agencyId
  //* fetch agency by id
  useEffect(() => {
    const fetchAgencyById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/agencies/get/${agencyId}`);
        setAgency(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAgencyById();
  }, [agencyId]);

  // * Fetching package details
  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await axios.get(`/getAgencyPackageById/${packageId}`);

        setPackageDetails(response.data);
        const agencyId = response.data.agencyId; // Extract the agencyId from the fetched package details
        setAgencyId(agencyId);
      } catch (error) {
        console.error("Error fetching package:", error);
      }
    };

    fetchPackageDetails();
  }, [packageId]);

  //  fetch transport details
  const fetchTransportDetails = async (transportId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/getTransportById/${packageDetails.transportId}`
      );
      setTransportDetails(response.data.transport);
    } catch (error) {
      console.error("Error fetching transport details:", error);
    }
  };

  //  fetch room details
  const fetchRoomDetails = async (roomId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/residence/rooms/${packageDetails.roomId}`
      );
      setRoomDetails(response.data); // Assuming the response contains the entire room object
    } catch (error) {
      console.error("Error fetching room details:", error);
    }
  };

  //  fetch special activity details
  const fetchActivityDetails = async (activityId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/SpecialActivity/get/${packageDetails.activityId}`
      );
      setActivityDetails(response.data.specialActivity); // Assuming the activity object is nested under 'specialActivity'
    } catch (error) {
      console.error("Error fetching activity details:", error);
    }
  };

  useEffect(() => {
    if (packageDetails && packageDetails.roomId) {
      fetchRoomDetails(packageDetails.roomId);
    }
    if (packageDetails && packageDetails.transportId) {
      fetchTransportDetails(packageDetails.transportId);
    }
    if (packageDetails && packageDetails.activityId) {
      fetchActivityDetails(packageDetails.activityId);
    }
  }, [packageDetails]);

  // * Handle booking
  const handleBookNow = async (e) => {
    e.preventDefault();

    const serviceId = "ITP_2";
    const templateId = "Agency_Package_Booking";
    const publicKey = "PhbdsuemZ_N_JMOfn";

    // Check if activityDetails is null
    const activityName = activityDetails ? activityDetails.activityName : "N/A";
    const transportType = transportDetails ? transportDetails.transportType : "N/A";

    const emailParams = {
      guestName: userInfo.name,
      agencyName: agency.agencyName,
      packageId: packageId,
      packageName: packageDetails.packageName,
      roomType: roomDetails.roomType,
      activity: `Special Activity : ${activityName || "N/A"}`,
      transport: `Transport : ${transportType || "N/A"}`,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      packagePrice: packageDetails.price,
      agencyEmail: agency.businessMail,
      guestEmail: userInfo.email,
    };

    try {
      const response = await axios.post("http://localhost:5000/addAgencyPackageReservation", {
        packageId: packageId,
        userId: userId,
        reservationDate: new Date(),
        checkIn: checkInDate,
        checkOut: checkOutDate,
        noOfAdults: adults,
        noOfChildren: children,
        totalAmount: packageDetails.price,
        paymentStatus: false,
      });

      // Check if the response is successful
      if (response.status === 200) {
        emailjs
          .send(serviceId, templateId, emailParams, publicKey)
          .then((response) => {
            console.log("Email sent successfully!", response.status, response.text);
          })
          .catch((error) => {
            console.error("Email could not be sent!", error);
          });
        // Update room reservation
        // await axios.post("/reservation/booking", {
        //   roomID: packageDetails.roomID,
        //   fullName: userInfo.name,
        //   email: userInfo.email,
        //   contactNumber: userInfo.number,
        //   checkIn: checkInDate,
        //   checkOut: checkOutDate,
        // });

        Swal.fire({
          icon: "success",
          title: "Your reservation has been added successfully!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          // Navigate to the AgencyDetails page
          navigate(`/AgencyDetails/${agencyId}`);
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    } catch (error) {
      console.error("Error adding reservation:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url("${AgencyBgImg}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed", // Add this line
      }}
    >
      <div className='flex mx-auto my-10'>
        <h1 className='flex mx-auto text-4xl'>Enter Your Details</h1>
      </div>

      <div className='flex justify-center w-[600px] mb-5 rounded-xl mx-auto border border-green-500 min-h-10 bg-white bg-opacity-70'>
        <form className='w-[400px]'>
          {packageDetails && (
            <>
              <div className='flex mb-5'>
                <h1 className='text-2xl text-black mt-7'>Package Name : </h1>
                <h1 className='text-2xl text-gray-700 mt-7'>{packageDetails.packageName}</h1>
              </div>

              <div className='flex'>
                <div className='my-3 '>
                  <label className='block text-xl font-medium text-gray-700'>Check In</label>
                  <input
                    type='date'
                    className='border border-green-500  min-h-[auto] w-[180px] rounded-xl border-1  px-3 py-[0.32rem]'
                    placeholder='Enter Date'
                    onChange={(e) => setCheckInDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
                <div className='my-3 ml-10'>
                  <label className='block text-xl font-medium text-gray-700'>Check Out</label>
                  <input
                    type='date'
                    className='border border-green-500  min-h-[auto] w-[180px] rounded-xl border-1  px-3 py-[0.32rem]'
                    placeholder='Enter Date'
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    min={checkInDate}
                    required
                  />
                </div>
              </div>

              <div className='flex flex-col'>
                <div className='flex items-center my-3'>
                  <label className='block mr-3 text-xl font-medium text-gray-700'>Adults</label>
                  <input
                    type='number'
                    className='border ml-5 border-green-500 min-h-[auto] w-[100px] rounded-xl border-1 px-3 py-[0.32rem]'
                    placeholder='Number of Adults'
                    onChange={(e) => {
                      if (e.target.value >= 1) {
                        setAdults(Math.abs(e.target.value));
                      }
                    }}
                    min={1}
                    required
                  />
                </div>
                <div className='flex items-center my-3'>
                  <label className='block mr-3 text-xl font-medium text-gray-700'>Children</label>
                  <input
                    type='number'
                    className='border border-green-500 min-h-[auto] w-[100px] rounded-xl border-1 px-3 py-[0.32rem]'
                    placeholder='Number of Children'
                    onChange={(e) => {
                      if (e.target.value >= 0) {
                        setChildren(Math.abs(e.target.value));
                      }
                    }}
                    min='0'
                  />
                </div>
              </div>

              <div className='flex items-center justify-between my-7'>
                <p className='text-2xl text-green-600'>LKR {packageDetails.price}.00</p>
                <button
                  className='w-[200px] h-10 bg-green-400 border border-gray-400 rounded-full text-white text-lg font-semibold relative overflow-hidden group hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300'
                  onClick={handleBookNow}
                >
                  Book Now
                  <span className='absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease'></span>
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default AgencyPackageBooking;
