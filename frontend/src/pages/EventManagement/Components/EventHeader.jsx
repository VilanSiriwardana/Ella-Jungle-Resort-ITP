import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";



function Header() {
  const [nav, setNav] = useState(false);
  const location = useLocation();

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="relative flex justify-between items-center h-14 w-auto mx-2 text-black">
      <h1 className="w-full text-xl font-bold font-lexend md:flex text-gray-900 m-2">Event Section</h1>

      <ul className="hidden md:flex font-lexend px-8">
        <NavLink to="/eventHome" currentPath={location.pathname}>Home</NavLink>
        <NavLink to="/events" currentPath={location.pathname}>Events</NavLink>
        <NavLink to="/addEvent" currentPath={location.pathname}>Book</NavLink>
        <NavLink to="/allOptions" currentPath={location.pathname}>Options</NavLink>
        <NavLink to="/myEvents" currentPath={location.pathname}>Bookings</NavLink>
        <NavLink to="/eventReports" currentPath={location.pathname}>Reports</NavLink>
      </ul>

      {/* Hamburger Menu for Mobile View */}
      {/* <div onClick={handleNav} className="block px-8">
        {!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      <div style={{
        backgroundImage: `url(${bggreen})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} className={!nav ? "fixed left-0 top-0 w-56 h-full border-r border opacity-95 ease-in-out duration-500" : "fixed left-[-100%]"}>
        <h1 className="w-full text-xl font-bold text-gray-900 m-4 font-lexend">Ella Jungle Resort</h1>

        <ul className="p-4 uppercase font-lexend">
          <li className="p-4 border-b border-gray-600"><Link to="/eventHome">Home</Link></li>
          <li className="p-4 border-b border-gray-600"><Link to="/events">Events</Link></li>
          <li className="p-4 border-b border-gray-600"><Link to="/allOptions">Book Event</Link></li>
          <li className="p-4 border-b border-gray-600"><Link to="/allOptions">Options</Link></li>
          <li className="p-4 border-b border-gray-600"><Link to="/test">My Bookings</Link></li>
        </ul>
      </div> */}
    </div>
  );
}

// NavLink component to handle active page styling
function NavLink({ to, currentPath, children }) {
  const isActive = currentPath === to;

  return (
    <li className={`p-2 px-10 hover:scale-110 hover:font-semibold ${isActive ? "text-green-600 text-lg font-semibold" : "text-black"}`}>
      <Link to={to}>
        {children}
      </Link>
    </li>
  );
}

export default Header;
