import React, { useState, useEffect } from "react";
import axios from "axios";
import AgencyPackageRoom from "../../../components/travelAgency/agency/agencyPackageRoom";
import AgencyPackageActivity from "../../../components/travelAgency/agency/agencyPackageActivity";
import AgencyPackageTransport from "../../../components/travelAgency/agency/agencyPackageTransport";
import { useParams } from "react-router-dom";
import AgencyPackageFinal from "../../../components/travelAgency/agency/agencyPackageFinal";
import AgencyBgImg from "../../../assets/agencyBackground/agencybg5.png";

function AgencyCreatePackage() {
  const { agencyId, packageId } = useParams();
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [selectedActivityId, setSelectedActivityId] = useState(null);
  const [selectedTransportId, setSelectedTransportId] = useState(null);

  // * Update the selected room ID
  const handleRoomSelection = (roomId) => {
    setSelectedRoomId(roomId);
  };

  // * Update the selected activity ID
  const handleActivitySelection = (activityId) => {
    setSelectedActivityId(activityId);
  };

  // * Update the selected transport ID
  const handleTransportSelection = (transportId) => {
    setSelectedTransportId(transportId);
  };

  const [activeTab, setActiveTab] = useState("Rooms");
  const [rooms, setRooms] = useState([]);
  const [activities, setActivities] = useState([]);
  const [transports, setTransports] = useState([]);

  // * Fetching package details
  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await axios.get(
          `/getAgencyPackageById/${packageId}`
        );
        const packageDetails = response.data;

        // Set the selected IDs based on package details
        setSelectedRoomId(packageDetails.roomId);
        setSelectedActivityId(packageDetails.activityId);
        setSelectedTransportId(packageDetails.transportId);
      } catch (error) {
        console.error("Error fetching package details:", error);
      }
    };

    fetchPackageDetails(); // Call the function here
  }, [packageId]);

  // * Fetching rooms
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:5000/residence/rooms");
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  // * Fetching activities
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/SpecialActivity/home"
        );
        setActivities(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchActivities();
  }, []);

  // * Fetching transports
  useEffect(() => {
    const fetchTransports = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/getAllTransports"
        );
        console.log("Transports response:", response.data);
        if (Array.isArray(response.data.transports)) {
          setTransports(response.data.transports);
        } else {
          console.error(
            "Error fetching transports: Response data is not an array"
          );
        }
      } catch (error) {
        console.error("Error fetching transports:", error);
      }
    };

    fetchTransports();
  }, []);

  // * Render the content based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "Rooms":
        return rooms.map((room) => (
          <AgencyPackageRoom
            key={room._id}
            roomId={room._id}
            roomName={room.roomName}
            image={room.image}
            description={room.description}
            price={room.price}
            isSelected={selectedRoomId === room._id} // Pass whether the room is selected or not
            onSelect={handleRoomSelection}
            showCheckbox={true}
          />
        ));

      case "Special Activities":
        return activities.map((activity) => (
          <AgencyPackageActivity
            key={activity._id}
            activityId={activity._id}
            activityName={activity.name}
            activityImage={activity.image}
            description={activity.description}
            price={activity.price}
            isSelected={selectedActivityId === activity._id} // Pass whether the activity is selected or not
            onSelect={handleActivitySelection}
            showCheckbox={true}
          />
        ));

      case "Transport":
        return transports.map((transport) => (
          <AgencyPackageTransport
            key={transport._id}
            transportId={transport._id}
            vehicleType={transport.vehicleType}
            pricePerKm={transport.pricePerKm}
            maxPassengers={transport.maxPassengers}
            image={transport.image}
            description={transport.description}
            agencyId={transport.agencyId}
            isSelected={selectedTransportId === transport._id} // Pass whether the transport is selected or not
            onSelect={handleTransportSelection}
            showCheckbox={true}
          />
        ));

      case "Create Package":
        return (
          <AgencyPackageFinal
            selectedRoomId={selectedRoomId}
            selectedActivityId={selectedActivityId}
            selectedTransportId={selectedTransportId}
            agencyId={agencyId}
            packageId={packageId}
          />
        );

      default:
        return null;
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
      <div className="container w-[900px] mx-auto border border-green-500 my-10 rounded-2xl bg-gray-100">
        <div className="container w-full mx-auto">
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">
              Create your package
            </label>
            <select
              id="tabs"
              className=""
              onChange={(e) => setActiveTab(e.target.value)}
              value={activeTab}
            >
              <option>Rooms</option>
              <option>Special Activities</option>
              <option>Transport</option>
              <option>Create Package</option>
            </select>
          </div>
          <ul className="hidden text-xl font-medium text-center text-gray-900 bg-green-200 border border-green-500 rounded-xl drop-shadow-lg sm:flex">
            <li
              className={`w-full focus-within:z-10 ${
                activeTab === "Rooms" && "bg-green-300"
              }`}
            >
              <button
                className="inline-block w-full py-3 border-r border-gray-200 rounded-l-2xl hover:text-green-500 focus:outline-none focus:bg-green-300 hover:bg-gray-50 focus:text-gray-500 focus:rounded-2xl"
                onClick={() => setActiveTab("Rooms")}
              >
                Rooms
              </button>
            </li>
            <li
              className={`w-full focus-within:z-10 ${
                activeTab === "Special Activities" && "bg-green-300"
              }`}
            >
              <button
                className="inline-block w-full py-3 border-r border-gray-200 hover:text-green-500 hover:bg-gray-50 focus:outline-none focus:bg-green-300 focus:text-gray-500"
                onClick={() => setActiveTab("Special Activities")}
              >
                Special Activities
              </button>
            </li>
            <li
              className={`w-full focus-within:z-10 ${
                activeTab === "Transport" && "bg-green-300"
              }`}
            >
              <button
                className="inline-block w-full py-3 border-r border-gray-200 hover:text-green-500 hover:bg-gray-50 focus:outline-none focus:bg-green-300 focus:text-gray-500"
                onClick={() => setActiveTab("Transport")}
              >
                Transport
              </button>
            </li>
            <li
              className={`w-full focus-within:z-10 ${
                activeTab === "Create Package" && "bg-green-300"
              }`}
            >
              <button
                className="inline-block w-full py-3 border-0 border-gray-200 rounded-r-lg hover:text-green-500 hover:bg-gray-50 focus:outline-none focus:bg-green-300 focus:text-gray-500"
                onClick={() => setActiveTab("Create Package")}
              >
                {packageId !== "null" ? "Update Package" : "Create Package"}
              </button>
            </li>
          </ul>
        </div>
        <div className=" rounded-b-2xl">{renderTabContent()}</div>
      </div>
    </div>
  );
}

export default AgencyCreatePackage;
