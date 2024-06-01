import React from "react";
import TicketTable from "../Tickets/TicketTable";
import EventHeader from "../Components/EventHeader";
import AllEvents from "./AllEvents";
import { useSelector } from "react-redux"; // Import useSelector
import bggreen from '../../../assets/eventImages/bggreen.jpg'; // Import the image

export default function EventReports() {
  const user = useSelector((state) => state.auth.userInfo); // userInfo may be null or contain `isAdmin

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
      <div className="relative z-10 flex flex-col items-center  min-h-screen">
        <EventHeader />
        <div>{user?.isAdmin && <AllEvents />}</div>

        <div><TicketTable /></div>
      </div>
    </div>
  );
}
