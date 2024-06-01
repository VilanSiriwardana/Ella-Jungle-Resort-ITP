import React, { useState, useEffect } from "react";
import bggreen from '../../../assets/eventImages/bggreen.jpg'; // Import the image
import axios from "axios";
import { useSelector } from 'react-redux'; // Import useSelector
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import {useNavigate} from 'react-router-dom'    //for programmatic navigation.

import CustomPopup from '../Components/CustomPopup'; // Import the modal component
import EventHeader from "../Components/EventHeader";

export default function UpdateEvent() {
  const [selectedOption, setSelectedOption] = useState(null);

  const [updatedOptionCategory, setUpdatedOptionCategory] = useState("");
  const [updatedOptionName, setUpdatedOptionName] = useState("");
  const [updatedOptionDescription, setUpdatedOptionDescription] = useState("");
  const [updatedPerPerson, setUpdatedPerPerson] = useState(false);
  const [updatedOptionPrice, setUpdatedOptionPrice] = useState(""); // Total cost state
  const [file, setFile] = useState(null);

  const { optionId } = useParams(); // Get the optionId from URL params
  const navigate = useNavigate();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('info'); // 'info' or 'error'

  const user = useSelector(state => state.auth.userInfo); // `userInfo` may be null or contain `isAdmin`

  const [errors, setErrors] = useState({});



  useEffect(() => {
    // Fetch event data based on eventId when the component mounts
    async function getOptionDetails() {
      try {
        const response = await axios.get(`http://localhost:5000/option/getOption/${optionId}`);
        setSelectedOption(response.data.option);
        console.log("Fetched Option Details Successfully");

       
      } catch (error) {
        console.error("Error fetching option data:", error.message);
        alert("Error fetching option data. Please try again.");
      }
    }

    getOptionDetails();
  }, [optionId]);

  
  
  useEffect(() => {
    if (selectedOption) {
        setUpdatedOptionCategory(selectedOption.optionCategory || "");
        setUpdatedOptionName(selectedOption.optionName || "");
        setUpdatedOptionDescription(selectedOption.optionDescription || "");
        setUpdatedPerPerson(selectedOption.perPerson || false);
        setUpdatedOptionPrice(selectedOption.optionPrice || "");
      
    }
  }, [selectedOption]);



  const handleUpdate = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const validationErrors = Object.keys(errors).reduce((acc, key) => {
        const error = validateInput(key, eval(key));
        if (error) acc[key] = error;
        return acc;
    }, {});

    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
    }


    const formData = new FormData();
    formData.append("optionName", updatedOptionName);
    formData.append("optionCategory", updatedOptionCategory);
    formData.append("optionDescription", updatedOptionDescription);
    formData.append("optionPrice", updatedOptionPrice);
    formData.append("file", file);

    try {
      await axios.put(`http://localhost:5000/option/updateOption/${optionId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Custom success notification
      setPopupMessage("Option details updated successfully!");
      setPopupType('info');
      setIsPopupOpen(true);


    } catch (error) {
      console.error("Error updating option details:", error.message);
      // Custom success notification
      setPopupMessage("Error updating option details. Please try again.");
      setPopupType('error');
      setIsPopupOpen(true);
    }
  };


  function validateInput(name, value) {
    switch (name) {
        case 'updatedOptionCategory':
            if (!value) return "Option Category is required";
            return "";
        case 'updatedOptionName':
            if (!value) return "Option Name is required";
            return "";
        case 'updatedOptionDescription':
            if (!value) return "optionDescription is required";
            if (value.length < 50) return "Description must be at least 50 characters long";
            return "";
        case 'updatedOptionPrice':
            if (!value) return "Option Price should be entered";
            if (value < 0) return "You can't add negative values";
            return "";
        default:
            return "";
    }
}


function handleInputChange(e) {
    const { name, value } = e.target;
    setErrors({
        ...errors,
        [name]: validateInput(name, value)
    });
    switch (name) {
        case 'updatedOptionCategory':
            setUpdatedOptionCategory(value);
            break;
        case 'updatedOptionName':
            setUpdatedOptionName(value);
            break;
        case 'updatedOptionDescription':
            setUpdatedOptionDescription(value);
            break;
        case 'updatedOptionPrice':
            setUpdatedOptionPrice(value);
            break;
        default:
            break;
    }
}


  if (!selectedOption) {
    return <div>Loading...</div>;
  }

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
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">

        <div className="container my-10 max-w-3xl mx-auto p-10 bg-secondary-green shadow-2xl shadow-green-400 rounded-[50px] overflow-auto font-lexend opacity-80">
          <div className="text-5xl font-extrabold ...">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-800 to-black justify-center">
              Update Event
            </span>
          </div>

          <form className="mt-3" onSubmit={handleUpdate}>

            {/* Option Category */}
            <div className="px-12 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800" htmlFor="updatedOptionCategory">Option Category</label>
              <select
                className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
                placeholder="Select Category"
                name="updatedOptionCategory"
                id="updatedOptionCategory"
                value={updatedOptionCategory} 
                onChange={(e) => setUpdatedOptionCategory(e.target.value)}
              >
                <option value="" disabled>Select Category</option>
                <option value="Decoration">Decoration</option>
                <option value="Beverage ">Beverage </option>
                <option value="Entertainment">Entertainment</option>
                <option value="Photography">Photography</option>
                <option value="Other">Other</option>
              </select>
              {errors.updatedOptionCategory && <div className="text-red-600">{errors.updatedOptionCategory}</div>}
            </div>


            {/* Option Name */}
            <div className="px-12 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800" htmlFor="updatedOptionName">Option Name</label>
              <input className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
                type="text" placeholder="Enter Name" name="updatedOptionName" value={updatedOptionName}
                onChange={handleInputChange}
              />
              {errors.updatedOptionName && <div className="text-red-600">{errors.updatedOptionName}</div>}
            </div>


            {/* Option Description */}
            <div className="px-12 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800" htmlFor="updatedOptionDescription">Option Description</label>
              <textarea cols="50" rows="8" placeholder="Enter Description" name="updatedOptionDescription"
                value={updatedOptionDescription}
                className="h-24 w-full p-1 border border-gray-200 rounded text-lg font-lexend"
                onChange={handleInputChange}
              ></textarea>
              {errors.updatedOptionDescription && <div className="text-red-600">{errors.updatedOptionDescription}</div>}
            </div>


          {/* Price per Person */}
            <div className="pt-6">
              <label htmlFor="perPerson" className="px-12 flex items-center font-bold text-lg text-green-900 font-lexend">
                <input
                  type="checkbox"
                  id="perPerson"
                  name="perPerson"
                  checked={updatedPerPerson === true}
                  onChange={(e) => setUpdatedPerPerson(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-green-600"
                /> 
                <span className="flex items-center ml-2 text-black"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-1">
  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
</svg>

 Per Person - The price is determined per one person</span>
              </label>
            </div>


            {/* Option Price */}
            <div className="px-12 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800" htmlFor="updatedOptionPrice">Option Price</label>
              <input className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
                type="number" placeholder="Enter Price" name="updatedOptionPrice" value={updatedOptionPrice}
                onChange={handleInputChange}
              />
              {errors.updatedOptionPrice && <div className="text-red-600">{errors.updatedOptionPrice}</div>}
            </div>

            {/* Image Upload */}
            <div className="px-12 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800" htmlFor="file"> Option Image </label>
              <input type="file" id="file" name="file" accept="image/*" required
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full p-2 border border-gray-200 rounded-lg text-lg font-lexend focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>


            <div className="flex justify-center mt-5">
              <button className="flex items-center bg-green-700 text-white text-lg px-3 py-2 border border-green-700 rounded-full cursor-pointer font-bold hover:bg-green-400 hover:border-green-950" type="submit" name="submit" id="submit"> 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg> Update </button>

              <Link to={`/allOptions`} className="ml-16 flex items-center bg-red-700 text-white text-lg px-3 py-2 border border-red-800 rounded-full cursor-pointer font-bold hover:bg-red-400 hover:border-red-950" type="button"   > 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>Cancel </Link>
            </div>

          </form>
        </div>

      {/* Your component structure */}
      <CustomPopup
          isOpen={isPopupOpen}
          message={popupMessage}
          onClose={() => {
            setIsPopupOpen(false);
            navigate("/allOptions");
          }}
          type={popupType}
        />

      </div>
    </div>
  );
}
