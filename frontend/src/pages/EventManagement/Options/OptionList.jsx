import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from 'react-redux'; // Import useSelector
import { Link } from "react-router-dom";
import bggreen from '../../../assets/eventImages/bggreen.jpg'; // Import the image

import ConfirmDeletion from '../Components/ConfirmDeletion'; // Import the modal component // Import the modal component
import CustomPopup from '../Components/CustomPopup'; // Import the modal component
import EventHeader from "../Components/EventHeader";

export default function OptionList() {
  const [allOptions, setOptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('info'); // 'info' or 'error'
  const user = useSelector(state => state.auth.userInfo); // `userInfo` may be null or contain `isAdmin`
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    async function getOptions() {
      try {
        const response = await axios.get("http://localhost:5000/option/allOptions");
        setOptions(response.data);
      } catch (error) {
        alert(error.message);
      }
    }
    getOptions();
  }, []);

  const confirmDelete = async () => {
    if (selectedOptionId) {
      try {
        await axios.delete(`http://localhost:5000/option/deleteOption/${selectedOptionId}`);
        // Custom success notification
        setPopupMessage("Option removed successfully!");
        setPopupType('info');
        setIsPopupOpen(true);
        setOptions(allOptions.filter(option => option._id !== selectedOptionId)); // Update state to remove the item
      } catch (error) {
        console.error("Error deleting option:", error.message);
        alert("Error deleting option. Please try again.");
        // Custom success notification
        setPopupMessage("Error removing option. Please try again.");
        setPopupType('error');
        setIsPopupOpen(true);
      }
    }
  };

  // Function to handle category filter
  const handleCategoryFilter = (category) => {
    // Check if the category is already selected
    const index = selectedCategories.indexOf(category);
    if (index === -1) {
      // If not selected, add it to the array
      setSelectedCategories([...selectedCategories, category]);
    } else {
      // If already selected, remove it from the array
      setSelectedCategories(selectedCategories.filter(cat => cat !== category));
    }
  };

  // Filter options based on selected categories
  const filteredOptions = selectedCategories.length === 0 ? allOptions : allOptions.filter(option =>
    selectedCategories.includes(option.optionCategory.toLowerCase())
  );

  // Get unique categories
  const categories = [...new Set(allOptions.map((option) => option.optionCategory))];

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
      <div className="relative z-10 flex flex-col justify-items-stretch mr-20 ml-20 min-h-screen p-2 items-center ">
        {/* Call Header */}
        <EventHeader />

        {user?.isAdmin && (
          <Link to="/addOption" className="flex items-center ml-5 mb-4 mt-1 text-white text-xl font-mclaren px-2 py-1 bg-blue-500 hover:bg-blue-800 rounded-3xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>Add Option
          </Link>
        )}

        {/* Category filter */}
        <div className="mb-2">
          {categories.map(category => (
            <button
              key={category}
              className={` text-white px-4 py-2 rounded-md mx-6 font-mclaren ${selectedCategories.includes(category.toLowerCase()) ? 'bg-green-900' : 'bg-theme-green'}`}
              onClick={() => handleCategoryFilter(category.toLowerCase())}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Loop through categories */}
{categories.map((category, index) => (
  // Only render if category is selected or no category is selected
  (selectedCategories.length === 0 || selectedCategories.includes(category.toLowerCase())) && (
    <div key={index}>
      {/* Category Title */}
      <div className="container mt-2  max-w-5xl mx-auto">
        <p className="bg-secondary-green rounded-3xl p-1 text-2xl font-bold textblack font-inika text-center">
          {category} Options
        </p>
      </div>
      {/* Cards for each category */}
      <div className="mb-14  justify-between grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4  w-full p-2">
        {/* Cards for this category */}
        {filteredOptions
          .filter((option) => option.optionCategory === category)
          .map((option) => (
            <div key={option._id} className="bg-white max-w-md max-h-ful px-4 m-4 rounded-t-md rounded-b-3xl border-secondary-green border-double border-8 overflow-hidden shadow-2xl hover:scale-up-110">
              <div className="container shadow-md rounded-3xl overflow-hidden w-full max-h-44">
                <img className="w-full h-full object-fill mt-3" src={`http://localhost:5000/Images/${option.optionImage}`} alt="Event" />
              </div>
              <div className="px-0 mb-3 mt-2 rounded-xl">
                <div className="pb-1">
                  <p className="text-lg font-semibold text-green-800 font-inika text-center">{option.optionName}</p>
                </div>
                <p className="text-sm font-mclaren text-center">{option.optionDescription}</p>

                <div className="flex justify-center ">
                  <p className="text-base text-blue-700 font-bold font-mclaren text-center px-1 pt-2 pb-1">{option.optionPrice} LKR</p>

                  {option.perPerson && (
                    <p className="text-base text-blue-700 font-bold font-lexend text-center px-1  pt-2 pb-1"> per person</p>
                  )}

                </div>

                {user?.isAdmin && (
                  <div className="mb-4 mt-1 flex justify-center items-center">
                    {/* Using Link component for Update button */}
                    <Link
                      to={`/updateOption/${option._id}`}
                      className="flex items-center text-white text-base font-mclaren px-2 py-0 bg-theme-green hover:bg-green-800 rounded-3xl"
                    ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                      </svg>
                      Update
                    </Link>
                    <button
                      className="flex items-center ml-5 text-white text-base font-mclaren px-2 py-0 bg-red-500 hover:bg-red-800 rounded-3xl"
                      onClick={() => {
                        setSelectedOptionId(option._id);
                        setIsModalOpen(true);
                      }}
                    ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                      Remove
                    </button>
                  </div>
                )}

              </div>
            </div>
          ))}
      </div>
    </div>
  )))}

        {/* Use the Confirm Deletion Modal here */}
        <ConfirmDeletion
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={confirmDelete}
        />

        {/* Your component structure */}
        <CustomPopup
          isOpen={isPopupOpen}
          message={popupMessage}
          onClose={() => {
            setIsPopupOpen(false);
            setIsModalOpen(false); // Close the modal
          }}
          type={popupType}
        />

      </div>
    </div>
  );
}
