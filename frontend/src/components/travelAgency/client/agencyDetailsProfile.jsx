import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function AgencyDetailsProfile() {
  const { agencyId } = useParams();

  const [agencyData, setAgencyData] = useState({
    agencyName: "",
    address: "",
    img: "",
    mobile: "",
    businessRegistrationNumber: "",
    representerMail: "",
    businessMail: "",
    fax: "",
    taxIdNumber: "",
    description: "",
    websiteLink: "",
    rating: "",
    agentId: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://localhost:5000/api/agencies/get/${agencyId}`);
        const { data } = result; // Extract data from the result object
        setAgencyData(data); // Set the agencyData state with the received data
      } catch (error) {
        console.error("Error fetching agency data:", error);
      }
    };
    fetchData();
  }, [agencyId]);

  return (
    <div className='container flex flex-col min-h-[350px] mx-20 mt-3 '>
      <h1 className='self-start mt-3 mb-5 ml-3 text-4xl font-semibold'>{agencyData.agencyName}</h1>
      <div className='flex items-start'>
        <img
          className='ml-3 border border-green-200 shadow-lg w-72 h-72 rounded-3xl'
          src={require(`../../../assets/agencyImages/${agencyData.img || "No_Image.png"}`)}
          alt='Agency Logo'
        />
        <div className='flex flex-col items-start'>
          <div className='flex pl-5 text-xl'>
            <div>
              <p className='pb-4'>Reg No:</p>
              <p className='pb-4'>Address:</p>
              <p className='pb-4'>Telephone:</p>
              <p className='pb-4'>Email:</p>
              <p className='pb-4'>Fax:</p>
            </div>
            <div className='ml-10'>
              <p className='pb-4'>{agencyData.businessRegistrationNumber}</p>
              <p className='pb-4'> {agencyData.address}</p>
              <p className='pb-4'>{agencyData.mobile}</p>
              <p className='pb-4'>{agencyData.businessMail}</p>
              <p className='pb-4'>{agencyData.fax}</p>
            </div>
          </div>
          <div className='flex pl-5 mt-5 max-w-[700px]'>
            <p>{agencyData.description}</p>
          </div>
          <div className='flex gap-5 my-5 ml-5'>
            <a href={`https://wa.me/${agencyData.mobile}`}target="_blank" rel="noopener noreferrer">
              <img
                src={require("../../../assets/agencyBackground/whatsapp (1).png")}
                alt='facebook'
                className=' max-w-[50px] opacity-80'
              />
            </a>
            <a
              href={
                agencyData.websiteLink.startsWith("http")
                  ? agencyData.websiteLink
                  : `http://${agencyData.websiteLink}`
              }
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                src={require("../../../assets/agencyBackground/world.png")}
                alt='facebook'
                className=' max-w-[50px] mx-5'
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgencyDetailsProfile;
