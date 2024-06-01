
import React, {useState} from 'react'
import bggreen from '../../../assets/eventImages/bggreen.jpg';
import axios from "axios"   //axios for making HTTP requests
import { useSelector } from 'react-redux'; // Import useSelector
import {useNavigate} from 'react-router-dom'    //for programmatic navigation.
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import CustomPopup from '../Components/CustomPopup'; // Import the modal component
import EventHeader from "../Components/EventHeader";


export default function AddOption() {
    
  const [optionCategory, setOptionCategory] = useState("");
  const [optionName, setOptionName] = useState("");
  const [optionDescription, setOptionDescription] = useState("");
  const [perPerson, setPerPerson] = useState(false);
  const [optionPrice, setOptionPrice] = useState("");  
  const [file, setFile] = useState(null);
  
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('info'); // 'info' or 'error'

  const user = useSelector(state => state.auth.userInfo); // `userInfo` may be null or contain `isAdmin`

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();


  // Function to handle form submission
  function sendData(e) {
    e.preventDefault();

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
    formData.append("optionCategory", optionCategory);
    formData.append("optionName", optionName);
    formData.append("optionDescription", optionDescription);
    formData.append("perPerson", perPerson);
    formData.append("optionPrice", optionPrice);
    formData.append("file", file);

    axios.post("http://localhost:5000/option/addOption", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
         // Custom success notification
         setPopupMessage("Option added successfully!");
         setPopupType('info');
         setIsPopupOpen(true);

        setOptionCategory("");
        setOptionName("");
        setOptionDescription("");
        setOptionPrice("");
        setFile(null);

      })
      .catch((err) => {
        alert(err);
        // Custom success notification
        setPopupMessage("Error adding option. Please try again.");
        setPopupType('error');
        setIsPopupOpen(true);
      });
  }


  function validateInput(name, value) {
    switch (name) {
        case 'optionCategory':
            if (!value) return "Option Category is required";
            return "";
        case 'optionName':
            if (!value) return "Option Name is required";
            return "";
        case 'optionDescription':
            if (!value) return "optionDescription is required";
            if (value.length < 50) return "Description must be at least 50 characters long";
            return "";
        case 'optionPrice':
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
        case 'optionCategory':
            setOptionCategory(value);
            break;
        case 'optionName':
            setOptionName(value);
            break;
        case 'optionDescription':
            setOptionDescription(value);
            break;
        case 'optionPrice':
            setOptionPrice(value);
            break;
        default:
            break;
    }
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
              Add Option
            </span>
          </div>
          
          <form className="mt-3" onSubmit={sendData}>


            {/* Option Category */}
            <div className="px-12 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800" htmlFor="optionCategory">Option Category</label>
              <select
                className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
                placeholder="Select Category"
                name="optionCategory"
                id="optionCategory"
                value={optionCategory}
                onChange={handleInputChange}
              >
                <option value="" disabled className="text-gray-500">Select Category</option>
                <option value="Decoration">Decoration</option>
                <option value="Beverage ">Beverage </option>
                <option value="Entertainment">Entertainment</option>
                <option value="Photography">Photography</option>
                <option value="Other">Other</option>
              </select>
              {errors.optionCategory && <div className="text-red-600">{errors.optionCategory}</div>}
            </div>


            {/* Option Name */}
            <div className="px-12 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800" htmlFor="optionName">Option Name</label>
              <input className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
                type="text" placeholder="Enter Name" name="optionName" value={optionName}
                onChange={handleInputChange}
              />
              {errors.optionName && <div className="text-red-600">{errors.optionName}</div>}
            </div>



            {/* Event Description */}    
            <div className="px-12 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800" htmlFor="optionDescription">Option Description</label>
              <textarea cols="50" rows="8" placeholder="Enter Description" name="optionDescription" required value={optionDescription}
                className="h-24 w-full p-1 border border-gray-200 rounded text-lg font-lexend"
                onChange={handleInputChange}
              > </textarea>
              {errors.optionDescription && <div className="text-red-600">{errors.optionDescription}</div>}
            </div>
            
            
            {/* Price per Person */}
            <div className="pt-6 px-12">
              <label htmlFor="perPerson" className="flex items-center font-bold text-lg text-green-900 font-lexend">
                <input
                  type="checkbox"
                  id="perPerson"
                  name="perPerson"
                  checked={perPerson === true}
                  onChange={(e) => setPerPerson(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-green-600"
                />
                <span className="ml-2 text-black">Per Person - The price is determined per one person</span>
              </label>
            </div>


            {/* Option Price */}
            <div className="px-12 text-base font-semibold mt-2">
              <label className="block font-bold text-xl text-green-800" htmlFor="optionPrice">Option Price</label>
              <input required className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
                type="number" placeholder="Enter Price" name="optionPrice" value={optionPrice} min="1"
                onChange={handleInputChange}
              />
              {errors.optionPrice && <div className="text-red-600">{errors.optionPrice}</div>}
            </div>


            {/* Event Image */}
            <div className="px-12 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-green-800" htmlFor="file"> Option Image </label>
              <input type="file" id="file" name="file" accept="image/*" required
                className="w-full p-2 border border-gray-200 rounded-lg text-lg font-lexend focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>


            <div className="flex justify-center mt-5">
              <button className="flex items-center bg-green-700 text-white text-lg px-5 py-2 border border-green-800 rounded-full cursor-pointer font-bold hover:bg-green-400 hover:border-green-950" type="submit" name="submit" id="submit"> 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg> Add </button>

              <Link to={`/allOptions`} className="ml-16 flex items-center bg-red-700 text-white text-lg px-3 py-2 border border-red-800 rounded-full cursor-pointer font-bold hover:bg-red-400 hover:border-red-950" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg> Cancel </Link>
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


