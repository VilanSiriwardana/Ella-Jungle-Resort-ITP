import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AgencyDetailsProfile from "../../../components/travelAgency/client/agencyDetailsProfile";
import AgencyRequestPackage from "../../../components/travelAgency/client/agencyRequestPackage";
import AgencyPackageCard from "../../../components/travelAgency/client/agencyPackageCard";
import AgencyBgImg from "../../../assets/agencyBackground/agencybg5.png";

function AgencyDetails() {
  const { agencyId } = useParams();
  const [agencyPackages, setAgencyPackages] = useState([]);

  // * Fetching agency packages
  useEffect(() => {
    const fetchAgencyPackages = async () => {
      try {
        const response = await axios.get(`/getAgencyPackageByAgencyId/${agencyId}`);
        const sortedPackages = response.data.sort((a, b) =>
          a.packageName.localeCompare(b.packageName)
        );
        setAgencyPackages(sortedPackages);
      } catch (error) {
        console.error("Error fetching agency packages:", error);
      }
    };
    fetchAgencyPackages();
  }, [agencyId]);

  return (
    <div
      style={{
        backgroundImage: `url("${AgencyBgImg}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <div className='flex bg-gray-300 bg-opacity-50 rounded-b-2xl'>
        <div className='flex '>
          <AgencyDetailsProfile agencyId={agencyId} />
        </div>

        <AgencyRequestPackage agencyId={agencyId} />
      </div>
      <div>
        <div className='flex justify-center mt-20 mb-10'>
          <h1 className='flex justify-center text-4xl font-semibold'>Our Packages</h1>
        </div>
        <div className='flex justify-center mb-5'>
          <div className='container grid flex-col self-center justify-center grid-cols-2 gap-[50px] max-w-[1200px]'>
            {agencyPackages.map(
              (agencyPackage) => (
                console.log(agencyPackage),
                (
                  <AgencyPackageCard
                    key={agencyPackage._id} // This should remain as the key for React's internal use
                    packageId={agencyPackage._id} // Pass the package ID as a different prop
                    packageName={agencyPackage.packageName}
                    packageImage={agencyPackage.packageImage}
                    packageDescription={agencyPackage.packageDescription}
                    price={agencyPackage.price}
                    fullDays={agencyPackage.fullDays}
                    activityId={agencyPackage.activityId}
                    roomId={agencyPackage.roomId}
                    transportId={agencyPackage.transportId}
                    agencyId={agencyId}
                  />
                )
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgencyDetails;
