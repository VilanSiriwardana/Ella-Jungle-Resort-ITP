import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AgencyDetailsSimple from "../../../components/travelAgency/client/agencyDetailsSimple";
import AgencySearch from "../../../components/travelAgency/client/agencySearch";
import { useSelector } from "react-redux";
import bg from "../../../assets/agencyBackground/agencybg5.png";

function AgencyList() {
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo?._id;

  const [agencies, setAgencies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAgencies, setFilteredAgencies] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  // * Fetching agencies
  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/agencies/");
        setAgencies(response.data);
      } catch (error) {
        console.error("Error fetching agencies:", error);
      }
    };

    fetchAgencies();
  }, []);

  // * Filter agencies based on search query
  useEffect(() => {
    const filtered = agencies.filter((agency) =>
      agency.agencyName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredAgencies(filtered);
  }, [searchQuery, agencies]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // * Sort agencies based on the selected sort option and sortOrder
  const handleSortChange = (sortBy) => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);

    // Sort agencies based on the selected sort option and sortOrder
    const sorted = [...filteredAgencies].sort((a, b) => {
      if (sortBy === "name") {
        return newSortOrder === "asc"
          ? a.agencyName.localeCompare(b.agencyName)
          : b.agencyName.localeCompare(a.agencyName);
      } else if (sortBy === "rating") {
        return newSortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating;
      }
      return 0;
    });

    setFilteredAgencies(sorted);
  };

  return (
    <div
      style={{
        backgroundImage: `url("${bg}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed", // Add this line
      }}
    >
      <div className='relative'>
        <img
          src='https://cdn.builder.io/api/v1/image/assets/TEMP/4679ea9add8d1b500755cddc88572db5b5edc0e21c1eb1fca547dd90b914ba02?apiKey=bd6dc691d3624fe581379f78a6e48c90&'
          alt='Travel Agents'
          className='w-full'
        />
        <div className='absolute bottom-0 left-0 w-full text-center text-white'>
          <h1 className='pb-5 text-6xl'>Travel Agencies</h1>
        </div>
      </div>

      <div className='flex mt-5 ml-10'>
        <div className='container flex-col justify-center ml-20'>
          {filteredAgencies.map((agency) => {
            return (
              <AgencyDetailsSimple
                key={agency._id}
                agencyId={agency._id}
                agencyName={agency.agencyName}
                businessRegistrationNumber={agency.businessRegistrationNumber}
                address={agency.address}
                mobile={agency.mobile}
                businessMail={agency.businessMail}
                rating={agency.rating}
                img={agency.img}
              />
            );
          })}
        </div>

        <div className='flex-1 mr-20'>
          <AgencySearch
            handleSearchInputChange={handleSearchInputChange}
            handleSortChange={handleSortChange}
            sortOrder={sortOrder}
          />
        </div>
      </div>
    </div>
  );
}

export default AgencyList;
