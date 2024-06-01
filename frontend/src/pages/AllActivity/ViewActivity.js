
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';




// Define the ViewActivity functional component
export default function ViewActivity() {


    // Define state variables for special activities and search term
    const [specialActivities, setSpecialActivities] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');



    // Fetch special activities data from the server upon component mounting
    useEffect(() => {
        function getSpecialActivities() {
            axios.get("http://localhost:5000/SpecialActivity/")
                .then((res) => {
                    setSpecialActivities(res.data);
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
        getSpecialActivities();
    }, []);



    // Define function to handle deletion of a special activity
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this special activity?")) {
            axios.delete("http://localhost:5000/SpecialActivity/delete/" + id)
                .then(res => {
                    console.log(res);
                    window.location.reload();
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
    }


    // Define function to handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }


    // Filter special activities based on search term
    const filteredActivities = specialActivities.filter(activity =>
        activity.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    // Render the component JSX
    return (
        <div className="container flex flex-col items-center min-h-screen mx-auto bg-green-200">
        <div className="container flex flex-col items-center mt-8">

        <button type="submit" className="justify-center px-8 py-3 mt-10 text-white bg-green-800 rounded-full shadow-lg whitespace-nowrap"
                onClick={() => window.location.href = `activity/add`}>
                Add Activity
        </button>

        <button type="submit" className="justify-center px-8 py-3 mt-4 text-white bg-green-800 rounded-full shadow-lg whitespace-nowrap"
               onClick={() => window.location.href = `activity/allActivityReservation`}  >
                View Reservations
        </button>

        <br/>  <h1 className="mb-4 text-5xl font-bold">All Special Activities</h1><br/>
            <input
                type="text"
                placeholder="Search activity"
                value={searchTerm}
                onChange={handleSearchChange}
                className="mb-4 px-4 py-2 w-[450px] rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
        </div>
        <div className="container flex flex-wrap items-stretch justify-center mt-8">
            {filteredActivities.map((SpecialActivity, index) => (
                <div key={SpecialActivity._id} className="flex flex-col justify-between p-6 mx-4 mb-6 bg-white rounded-lg shadow-lg shadow-black w-96">
                    {SpecialActivity.image && (
                        <img src={require(`../../assets/${SpecialActivity.image}`)} alt={SpecialActivity.name} className="w-full mb-4" />)}
                    <div className="flex-grow">
                        <p className="mb-2 text-lg font-semibold">
                            <span className="font-bold">Name:</span> {SpecialActivity.name}
                        </p>
                        <br />
                        <p className="mb-2 text-lg font-normal">
                            <span className="font-bold">Description:</span> {SpecialActivity.description}
                        </p>
                        <br />
                        <p className="mb-2 text-lg font-normal">
                            <span className="font-bold">Distance(km):</span> {parseFloat(SpecialActivity.distance).toFixed(2)}
                        </p>
                        <br />
                        <p className="mb-2 text-lg font-normal">
                            <span className="font-bold">Price Per Person (LKR):</span> {parseFloat(SpecialActivity.price).toFixed(2)}
                        </p>
                        <br/>
                        
                        <p className="mb-2 text-lg font-normal">
                            <span className="font-bold">Maximum no.Of people:</span>{SpecialActivity.noOfGuests}
                        </p>



                    </div>
                    <div className="flex justify-between mt-4">
                        <Link to={`/activity/update/${SpecialActivity._id}`} className="px-5 py-2 text-white bg-green-500 rounded-full hover:bg-green-600">Update</Link>
                        <button className="px-5 py-2 text-white bg-red-500 rounded-full hover:bg-red-600" onClick={() => handleDelete(SpecialActivity._id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
}