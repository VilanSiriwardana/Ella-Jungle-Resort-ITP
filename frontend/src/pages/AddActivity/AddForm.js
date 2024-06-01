

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import ActivityBackground from '../../assets/ActivityBackground.jpg';



const AddForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [distance, setDistance] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [noOfGuests, setnoOfGuests] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use useNavigate hook for navigation



  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);


    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("distance", distance);
    formData.append("price", price);
    formData.append("image", image);
    formData.append("noOfGuests", noOfGuests);



    try {

      /*
      // Check if the activity with the same name already exists
    const response = await axios.get(`http://localhost:5000/SpecialActivity/check/${name}`);
    if (response.data.exists) {
      // If the activity already exists, set an error state and style the input field
      setError("Activity is already added");
      setIsLoading(false);
      return;
    }
      */ 


      // Display custom alert message at the top of the page
      const alertDiv = document.createElement("div");
      alertDiv.innerHTML = `
      <div class="fixed top-2 left-0 right-0 z-50 flex items-center justify-center">
      <div class="bg-white text-black p-4 text-center w-96 rounded-lg py-8 shadow-lg"> 
        Special activity is adding... <br/><span id="loadingTime" class="font-bold">6</span> seconds remaining
        <div class="mt-2 h-2 bg-green-300 rounded-full">
          <div id="loadingBar" class="h-full bg-green-500 rounded-full"></div>
        </div>
      </div>
    </div>
  `;
      document.body.appendChild(alertDiv);
  
      // Update loading time every second
      let remainingTime = 6;
      const countdownInterval = setInterval(() => {
        remainingTime--;
        document.getElementById("loadingTime").textContent = remainingTime;
        document.getElementById("loadingBar").style.width = `${((6 - remainingTime) / 6) * 100}%`;
  
        // Clear interval when time is up
        if (remainingTime === 0) {
          clearInterval(countdownInterval);
          navigate("/activity");
          document.body.removeChild(alertDiv);
        }
      }, 1000);
  
      // Make POST request to add special activity
      await axios.post("http://localhost:5000/SpecialActivity/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
    } catch (error) {
      console.error(error);
      setError("Error adding special activity");
    } finally {
      setIsLoading(false);
    }
  };

  

//handle name input to only enter letters
const handleNameChange=(e)=>{
  const value = e.target.value.replace(/[^A-Za-z ]/gi, "");
  setName(value);
}



const handleDistanceChange = (e) => {
  const value = Math.max(0, parseFloat(e.target.value)); // Ensure non-negative float
  setDistance(value);
};

const handlePriceChange = (e) => {
  const value = Math.max(0, parseFloat(e.target.value)); // Ensure non-negative float
  setPrice(value);
};

const handleNoOfGuestsChange = (e) => {
  const value = Math.max(0, parseInt(e.target.value)); // Ensure non-negative integer
  setnoOfGuests(value);
};

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundImage: `url(${ActivityBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="bg-green-600 bg-opacity-50 flex items-center justify-center w-full max-w-[600px] rounded-xl py-14 px-11 text-xl font-extrabold text-black shadow-lg shadow-black">
        <form className="flex flex-col w-full" onSubmit={handleSubmit}>
          <h2 className="self-center mb-8 text-3xl text-white">Add a Special Activity</h2>
          
          {isLoading && <p>Loading...</p>}
                    {error && <p>Error: {error}</p>}


          <div>
            <label htmlFor="image" className="mt-4">Image</label><br />
            <input type="file" id="image" accept="image/*" onChange={handleFileChange} required />
          </div>

          <br />

          <div>
            <label htmlFor="name" className="mt-4">Name</label><br />
            <input type="text" id="name" className="mt-2 rounded-3xl bg-zinc-300 h-[47px] font-normal px-5 py-1 text-sm w-full"
              value={name} onChange={handleNameChange} required />
          </div>

          <br />

          <div>
            <label htmlFor="description" className="mt-8">Description</label>
            <textarea id="description" className="mt-3 max-w-full h-20 rounded-3xl bg-zinc-300 w-[509px] font-normal px-5 py-1 text-sm"
              value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>

          <br />

          <div>
             <label htmlFor="distance" className="mt-8">Distance(km)</label><br />
             <input type="number" id="distance" className="mt-2 rounded-3xl bg-zinc-300 h-[50px] font-normal px-5 py-1"
             value={distance} onChange={handleDistanceChange} required min="0" />
          </div>

          <br />

          <div>
            <label htmlFor="price" className="mt-8">Price Per Person (LKR)</label><br />
            <input type="number" id="price" className="mt-2 rounded-3xl bg-zinc-300 h-[50px] font-normal px-5 py-1"
              value={price} onChange={handlePriceChange} required min="0"/>
          </div>
          
          

          <div>
           <label htmlFor="noOfGuests" className="mt-8">Maximum no. of people:</label><br />
           <input type="number" id="noOfGuests" className="mt-2 rounded-3xl bg-zinc-300 h-[50px] font-normal px-5 py-1"
             value={noOfGuests} onChange={handleNoOfGuestsChange} required min="0"/>
          </div>

          <button type="submit" className="justify-center self-center px-8 py-3 mt-14 whitespace-nowrap bg-green-800 rounded-[60px] hover:bg-green-600 shadow-lg shadow-black">
            Submit
          </button>


        </form>
      </div>
    </div>
  );
};

export default AddForm;
