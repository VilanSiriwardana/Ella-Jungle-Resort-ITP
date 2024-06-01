import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import AgencyBgImg from "../../../assets/agencyBackground/agencybg5.png";
import AgencyNewRequest from "../../../components/travelAgency/agency/agencyNewRequest";
import emailjs from "@emailjs/browser";

function AgencyPackageDetails() {
  const { packageId } = useParams();
  const [packageDetails, setPackageDetails] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [agencyId, setAgencyId] = useState();
  const [transportDetails, setTransportDetails] = useState(null);
  const [roomDetails, setRoomDetails] = useState(null);
  const [activityDetails, setActivityDetails] = useState(null);
  const [requests, setRequests] = useState(null);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [showRequests, setShowRequests] = useState(false);
  const [userData, setUserData] = useState(null);
  const [oneRequest, setOneRequest] = useState(null);
  const [agency, setAgency] = useState(null);

  //  fetch package details
  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await axios.get(`/getAgencyPackageById/${packageId}`);
        setPackageDetails(response.data);
        fetchTransportDetails(response.data.transportId);
        fetchRoomDetails(response.data.roomId);
        fetchActivityDetails(response.data.activityId);
        setAgencyId(response.data.agencyId);
      } catch (error) {
        console.error("Error fetching package details:", error);
      }
    };

    fetchPackageDetails();
  }, [packageId]);

  //  back button press with reload
  useEffect(() => {
    const handlePopstate = () => {
      window.location.reload(); // Reload the page when navigating back
    };

    window.addEventListener("popstate", handlePopstate); // Add event listener for the popstate event

    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);

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

  //  fetch transport details
  const fetchTransportDetails = async (transportId) => {
    try {
      const response = await axios.get(`http://localhost:5000/getTransportById/${transportId}`);
      setTransportDetails(response.data.transport);
    } catch (error) {
      console.error("Error fetching transport details:", error);
    }
  };

  //  fetch room details
  const fetchRoomDetails = async (roomId) => {
    try {
      const response = await axios.get(`http://localhost:5000/residence/rooms/${roomId}`);
      setRoomDetails(response.data); // Assuming the response contains the entire room object
    } catch (error) {
      console.error("Error fetching room details:", error);
    }
  };

  //  fetch special activity details
  const fetchActivityDetails = async (activityId) => {
    try {
      const response = await axios.get(`http://localhost:5000/SpecialActivity/get/${activityId}`);
      setActivityDetails(response.data.specialActivity); // Assuming the activity object is nested under 'specialActivity'
    } catch (error) {
      console.error("Error fetching activity details:", error);
    }
  };

  // fetch request
  useEffect(() => {
    axios
      .get(`http://localhost:5000/getRequestsByAgency/${agencyId}`)
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching requests:", error);
      });
  }, [agencyId]);

  // fetch one request by id
  useEffect(() => {
    if (selectedRequestId) {
      axios
        .get(`http://localhost:5000/getRequestId/${selectedRequestId}`)
        .then((response) => {
          setOneRequest(response.data);
        })
        .catch((error) => {
          console.error("Error fetching requests:", error);
        });
    }
  }, [selectedRequestId]);

  // fetch user details
  useEffect(() => {
    if (oneRequest && oneRequest.clientRequest && oneRequest.clientRequest.UserId) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/users/specific/${oneRequest.clientRequest.UserId}`
          );
          setUserData(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [oneRequest]);

  //  handle update package
  const handleUpdatePackage = () => {
    window.location = `/AgencyCreatePackage/${packageDetails.agencyId}/${packageId}`;
  };

  // handle delete package
  const handleDeletePackage = async () => {
    // Display confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/deleteAgencyPackage/${packageId}`);
          window.location = `/AgencyMyPackage/${packageDetails.agencyId}`;
          Swal.fire({
            title: "Deleted!",
            text: "Package deleted successfully",
            icon: "success",
            showConfirmButton: false,
          });
        } catch (error) {
          console.error("Error deleting package:", error);
          // Show error alert if deletion fails
          Swal.fire({
            title: "Error!",
            text: "Failed to delete package.",
            icon: "error",
          });
        }
      }
    });
  };

  //  handle book now
  const handleBookNow = async (e) => {
    e.preventDefault();
    try {
      const serviceId = "ITP_2";
      const templateId = "Agency_Package_Booking";
      const publicKey = "PhbdsuemZ_N_JMOfn";

      const activityName = activityDetails ? activityDetails.activityName : "N/A";
      const transportType = transportDetails ? transportDetails.transportType : "N/A";

      const emailParams = {
        guestName: userData.name,
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
        guestEmail: userData.email,
      };

      const response = await axios.post("http://localhost:5000/addAgencyPackageReservation", {
        packageId: packageId,
        userId: oneRequest.clientRequest.UserId,
        fullName: userData.name,
        email: userData.email,
        contactNumber: userData.mobile,
        reservationDate: new Date(),
        checkIn: oneRequest.clientRequest.ArrivalDate,
        checkOut: oneRequest.clientRequest.DepartureDate,
        noOfAdults: oneRequest.clientRequest.NoOfAdults,
        noOfChildren: oneRequest.clientRequest.NoOfChildren,
        totalAmount: packageDetails.price,
        paymentStatus: false,
      });

      // Check if the response is successful
      if (response.status === 200) {
        await axios
          .put(`/UpdateRequest/${selectedRequestId}`, {
            Status: "booked",
          })
          .then((response) => {
            emailjs
              .send(serviceId, templateId, emailParams, publicKey)
              .then((response) => {
                console.log("Email sent successfully!", response.status, response.text);
              })
              .catch((error) => {
                console.error("Email could not be sent!", error);
              });
            Swal.fire({
              icon: "success",
              title: "Your reservation has been added successfully!",
              showConfirmButton: true,
            }).then(() => {
              window.location.reload();
            });
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
        text: "Failed to add reservation.",
      });
    }
  };

  // * handle publish package
  const handlePublishPackage = async () => {
    try {
      await axios.put(`http://localhost:5000/publishPackage/${packageId}`);
      console.log("Package published successfully");
      Swal.fire({
        icon: "success",
        title: "Package Published successfully!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error("Error publishing package:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.reload();
      });
    }
  };

  //  handle unpublish package
  const handleUnPublishPackage = async () => {
    try {
      await axios.put(`http://localhost:5000/unpublishPackage/${packageId}`);
      console.log("Package unpublished successfully");
      Swal.fire({
        icon: "success",
        title: "Package Unpublished successfully!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error("Error unpublishing package:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.reload();
      });
    }
  };

  return (
    <div
      className='mb-10'
      style={{
        backgroundImage: `url("${AgencyBgImg}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <div className='flex mx-auto my-5'>
        <h1 className='flex justify-center mx-auto text-2xl font-semibold'>Package Details</h1>
      </div>

      {packageDetails ? (
        <>
          <div className='container flex mx-auto w-[700px] border border-green-500 min-h-[100px] rounded-2xl bg-white bg-opacity-70'>
            {packageDetails && packageDetails.packageImage && (
              <img
                src={require(`../../../assets/agencyPackageImages/${
                  packageDetails.packageImage || "No_Image.png"
                }`)}
                alt='Package'
                className='mx-8 my-8 border border-green-500 h-[250px] rounded-xl w-[200px]'
              />
            )}
            {(!packageDetails || !packageDetails.packageImage) && (
              <img
                src={require(`../../../assets/agencyPackageImages/No_Image.png`)}
                alt='No'
                className='mx-8 my-8 border border-green-500 h-[250px] rounded-xl w-[200px]'
              />
            )}

            <div>
              <div className='flex mt-8 '>
                <div className=''>
                  <h2 className='mb-2 text-xl'>Package Name : </h2>
                  <h2 className='mb-2 text-xl'>Room Type : </h2>
                  <h2 className='mb-2 text-xl'>Special Activity : </h2>
                  <h2 className='mb-2 text-xl'>Full days : </h2>
                  <h2 className='mb-2 text-xl'>Commission : </h2>
                  <h2 className='mb-2 text-xl'>Discount : </h2>
                  <h2 className='mb-2 text-xl'>Price : </h2>
                  <h2 className='mb-2 text-xl'>Transport : </h2>
                </div>
                <div className='ml-5'>
                  <h2 className='mb-2 text-xl'>{packageDetails.packageName}</h2>
                  <h2 className='mb-2 text-xl'>{roomDetails && roomDetails.roomType}</h2>
                  <h2 className='mb-2 text-xl'>
                    {activityDetails && activityDetails.name}{" "}
                    {activityDetails ? "" : "Not Included"}
                  </h2>
                  <h2 className='mb-2 text-xl'>{packageDetails.fullDays}</h2>
                  <h2 className='mb-2 text-xl'>{packageDetails.commission} % </h2>
                  <h2 className='mb-2 text-xl'>{packageDetails.discount} %</h2>
                  <h2 className='mb-2 text-xl'>LKR {packageDetails.price} .00</h2>
                  <h2 className='mb-2 text-xl'>
                    {transportDetails && transportDetails.vehicleType}{" "}
                    {transportDetails ? "" : "Not Included"}
                  </h2>
                </div>
              </div>
              <div>
                <h2 className='mb-2 ml-[-230px] text-xl w-[400px]'>{packageDetails.description}</h2>
              </div>
            </div>
          </div>
          <div>
            <div className='flex justify-center gap-20 mx-auto mt-5'>
              <button
                className='border border-gray-300 mb-10 w-[200px] h-10 bg-green-500 rounded-full text-white text-lg font-semibold relative overflow-hidden group hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300'
                onClick={handleUpdatePackage}
              >
                Edit Package
              </button>
              <button
                className='border border-gray-300 mb-10 w-[200px] h-10 bg-red-500 rounded-full text-white text-lg font-semibold relative overflow-hidden group hover:bg-gradient-to-r hover:from-red-500 hover:to-red-400 hover:ring-2 hover:ring-offset-2 hover:ring-red-400 transition-all ease-out duration-300'
                onClick={handleDeletePackage}
              >
                Delete Package
              </button>
              {packageDetails && packageDetails.published ? (
                <button
                  id='PublishedBtn'
                  className='border border-gray-300 mb-10 w-[200px] h-10 bg-green-500 rounded-full text-white text-lg font-semibold relative overflow-hidden group hover:bg-gradient-to-r hover:from-red-500 hover:to-red-400 hover:ring-2 hover:ring-offset-2 hover:ring-red-400 transition-all ease-out duration-300'
                  onClick={handleUnPublishPackage}
                >
                  <span id='publish'>Published</span>
                  <span id='unpublish'>Unpublish</span>
                </button>
              ) : (
                <button
                  id='UnpublishedBtn'
                  className='border border-gray-300 mb-10 w-[200px] h-10 bg-red-500 rounded-full text-white text-lg font-semibold relative overflow-hidden group hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300'
                  onClick={handlePublishPackage}
                >
                  <span id='publish'>Publish</span>
                  <span id='unpublish'>Unpublished</span>
                </button>
              )}
            </div>

            <div className='mt-10'>
              <h1
                className='flex justify-center mx-auto text-2xl font-semibold cursor-pointer'
                onClick={() => setShowRequests(!showRequests)}
              >
                Accepted Requests
              </h1>
            </div>

            {showRequests && requests && requests.length > 0 && (
              <div className='container bg-gray-200 bg-opacity-80 mx-auto flex w-[1000px] border-black border flex-col rounded-xl mb-20 py-5'>
                <div className='container mx-auto'>
                  <div className='container px-[10px] flex-col flex'>
                    {requests
                      .filter((request) => request.Status === "accepted")
                      .map((request) => (
                        <div className='flex items-center'>
                          <div className='ml-3'>
                            <input
                              type='checkbox'
                              checked={selectedRequestId === request._id}
                              onChange={() => setSelectedRequestId(request._id)}
                              className='w-5 h-5 border border-green-500'
                            />
                          </div>
                          <div className='w-[950px]'>
                            <AgencyNewRequest
                              key={request._id}
                              requestId={request._id}
                              arrivalDate={request.ArrivalDate}
                              departureDate={request.DepartureDate}
                              sentDate={request.SentDate}
                              userId={request.UserId}
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            <div className='mt-10'>
              <h1 className='flex justify-center mx-auto text-2xl font-semibold'>Add Customers</h1>
            </div>

            <div className='flex justify-center w-[600px] rounded-xl mx-auto border border-green-500 min-h-10 bg-gray-400 bg-opacity-10'>
              {selectedRequestId && userData && (
                <form className='w-[400px]'>
                  <div>
                    <div className='my-5 '>
                      <label className='block text-xl font-medium text-gray-700'>Full Name</label>
                      <input
                        type='text'
                        className='border border-green-500  min-h-[auto] w-[400px] rounded-xl border-1  px-3 py-[0.32rem]'
                        placeholder='Enter Name'
                        value={userData.name}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>
                    <div className='my-3 '>
                      <label className='block text-xl font-medium text-gray-700 '>Email</label>
                      <input
                        type='email'
                        className='border border-green-500 w-[400px] min-h-[auto]  rounded-xl border-1  px-3 py-[0.32rem]'
                        placeholder='Enter Email'
                        value={userData.email}
                        onChange={(e) => setEmail(e.target.value)}
                        readOnly
                      />
                    </div>
                    <div className='my-3 '>
                      <label className='block text-xl font-medium text-gray-700'>
                        Contact Number
                      </label>
                      <input
                        type='text'
                        className='border border-green-500  min-h-[auto] w-[400px] rounded-xl border-1  px-3 py-[0.32rem]'
                        placeholder='Enter Date'
                        value={userData.mobile}
                        onChange={(e) => setContactNumber(e.target.value)}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className='flex '>
                    <div className='my-3 '>
                      <label className='block text-xl font-medium text-gray-700'>Check In</label>
                      <input
                        type='date'
                        className='border border-green-500  min-h-[auto] w-[180px] rounded-xl border-1  px-5 py-[0.32rem]'
                        placeholder='Enter Date'
                        value={oneRequest.clientRequest.ArrivalDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        readOnly
                      />
                    </div>
                    <div className='my-3 ml-10'>
                      <label className='block text-xl font-medium text-gray-700'>Check Out</label>
                      <input
                        type='date'
                        className='border border-green-500  min-h-[auto] w-[180px] rounded-xl border-1  px-5 py-[0.32rem]'
                        placeholder='Enter Date'
                        value={oneRequest.clientRequest.DepartureDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        min={checkInDate}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className='flex flex-col'>
                    <div className='flex items-center my-3'>
                      <label className='block mr-3 text-xl font-medium text-gray-700'>Adults</label>
                      <input
                        type='number'
                        className='border ml-5 border-green-500 min-h-[auto] w-[100px] rounded-xl border-1 px-5 py-[0.32rem]'
                        placeholder='Number of Adults'
                        value={oneRequest.clientRequest.NoOfAdults}
                        onChange={(e) => setAdults(e.target.value)}
                        min={1}
                        readOnly
                      />
                    </div>
                    <div className='flex items-center my-3'>
                      <label className='block mr-3 text-xl font-medium text-gray-700'>
                        Children
                      </label>
                      <input
                        type='number'
                        className='border border-green-500 min-h-[auto] w-[100px] rounded-xl border-1 px-5 py-[0.32rem]'
                        placeholder='Number of Children'
                        value={oneRequest.clientRequest.NoOfChildren}
                        onChange={(e) => setChildren(e.target.value)}
                        min={0}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className='flex items-center justify-between my-7'>
                    <button
                      className='w-[200px] h-10 bg-green-400 border border-gray-400 rounded-full text-white text-lg font-semibold relative overflow-hidden group hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300'
                      onClick={handleBookNow}
                    >
                      Book Now
                      <span className='absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease'></span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </>
      ) : (
        <div class='ring'>
          Loading
          <span class='spanid'></span>
        </div>
      )}
    </div>
  );
}

export default AgencyPackageDetails;
