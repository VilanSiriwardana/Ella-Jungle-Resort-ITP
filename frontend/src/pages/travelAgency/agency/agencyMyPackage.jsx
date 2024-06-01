import React, { useState, useEffect } from "react";
import axios from "axios";
import AgencyPackageCard from "../../../components/travelAgency/client/agencyPackageCard";
import AgencyPackageSearch from "../../../components/travelAgency/agency/agencyPackageSearch";
import { useSelector } from "react-redux";
import AgencyRequestList from "../agency/agencyRequestList";

function AgencyMyPackage() {
  const [agencyPackages, setAgencyPackages] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filteredPublishedPackages, setFilteredPublishedPackages] = useState([]);
  const [filteredUnpublishedPackages, setFilteredUnpublishedPackages] = useState([]);
  const [agencyId, setAgencyId] = useState(null);

  const { userInfo } = useSelector((state) => state.auth);
  const userMail = userInfo.email;

  //* Fetching agency by representer mail
  useEffect(() => {
    const fetchAgencyByRepresenterMail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/agencies/getByRepresenterMail/${userMail}`
        );
        setAgencyId(response.data[0]._id);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAgencyByRepresenterMail();
  }, [userMail]);

  // * Fetching agency packages
  useEffect(() => {
    const fetchAgencyPackages = async () => {
      try {
        const response = await axios.get(`/getAgencyPackageByAgencyId/${agencyId}`);
        setAgencyPackages(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAgencyPackages();
  }, [agencyId]);

  // Filter published and unpublished packages
  useEffect(() => {
    const filteredPublished = agencyPackages.filter((agencyPackage) => agencyPackage.published);
    setFilteredPublishedPackages(filteredPublished);

    const filteredUnpublished = agencyPackages.filter((agencyPackage) => !agencyPackage.published);
    setFilteredUnpublishedPackages(filteredUnpublished);
  }, [agencyPackages]);

  // Handle search input change
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  // Handle sort order change
  const handleSortChange = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
  };

  return (
    <div>
      <div className='flex flex-col justify-center mb-10'>
        <div className=''>
          <h1 className='flex justify-center text-4xl font-semibold'>My Packages</h1>

          <div className='flex flex-col'>
            <div className='flex justify-center mx-auto mt-10 mb-5 max-w-[800px]'>
              <AgencyPackageSearch
                handleSearchInputChange={handleSearchInputChange}
                handleSortChange={handleSortChange}
                sortOrder={sortOrder}
              />
            </div>

            <div className=''>
              <section className='w-[200px] text-xl bg-[#56ff9a] rounded-xl bg-opacity-20 mx-auto border border-green-500'>
                <p className='mt-4 ml-4 text-black'>Add new package</p>
                <div className='flex m-auto my-3 max-md:px-5'>
                  <button
                    className='w-[100px] mx-auto h-10 bg-[#16a34ad9] rounded-full border-gray-400 border text-white text-lg font-semibold relative overflow-hidden group hover:bg-gradient-to-r hover:from-[#16a34ad9] hover:to-green-400 hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300'
                    onClick={() => {
                      window.location.href = `/AgencyCreatePackage/${agencyId}/null`;
                    }}
                  >
                    Add
                    <span className='absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-20 rotate-12 group-hover:-translate-x-40 ease'></span>
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>

        <h1 className='flex mt-5 ml-40 text-2xl font-semibold'>Published Packages</h1>

        <div className='container grid flex-col self-center mt-10 justify-center grid-cols-2 gap-[50px] max-w-[1200px]'>
          {filteredPublishedPackages
            .filter((agencyPackage) =>
              agencyPackage.packageName.toLowerCase().includes(searchInput.toLowerCase())
            )
            .sort((a, b) =>
              sortOrder === "asc"
                ? a.packageName.localeCompare(b.packageName)
                : b.packageName.localeCompare(a.packageName)
            )
            .map((agencyPackage) => (
              <AgencyPackageCard
                key={agencyPackage._id}
                packageId={agencyPackage._id}
                packageName={agencyPackage.packageName}
                packageImage={agencyPackage.packageImage}
                packageDescription={agencyPackage.packageDescription}
                price={agencyPackage.price}
                fullDays={agencyPackage.fullDays}
                activityId={agencyPackage.activityId}
                roomId={agencyPackage.roomId}
                transportId={agencyPackage.transportId}
              />
            ))}
        </div>

        <h1 className='flex mt-20 ml-40 text-2xl font-semibold'>Unpublished Packages</h1>
        <div className='container grid flex-col self-center mt-10 justify-center grid-cols-2 gap-[50px] max-w-[1200px]'>
          {filteredUnpublishedPackages
            .filter((agencyPackage) =>
              agencyPackage.packageName.toLowerCase().includes(searchInput.toLowerCase())
            )
            .sort((a, b) =>
              sortOrder === "asc"
                ? a.packageName.localeCompare(b.packageName)
                : b.packageName.localeCompare(a.packageName)
            )
            .map((agencyPackage) => (
              <AgencyPackageCard
                key={agencyPackage._id}
                packageId={agencyPackage._id}
                packageName={agencyPackage.packageName}
                packageImage={agencyPackage.packageImage}
                packageDescription={agencyPackage.packageDescription}
                price={agencyPackage.price}
                fullDays={agencyPackage.fullDays}
                activityId={agencyPackage.activityId}
                roomId={agencyPackage.roomId}
                transportId={agencyPackage.transportId}
              />
            ))}
        </div>
      </div>
      <div>
        <AgencyRequestList agencyId={agencyId} />
      </div>
    </div>
  );
}

export default AgencyMyPackage;
