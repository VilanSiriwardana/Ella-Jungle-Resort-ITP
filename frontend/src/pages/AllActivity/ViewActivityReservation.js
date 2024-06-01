import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";



// Define a separate Table component
const Table = ({ activityReservations }) => (
    <table className="w-full table-auto">

        <thead className="bg-green-600">
            <tr >
                <th className="px-4 py-2 border-r border-black">Activity ID</th>
                <th className="px-4 py-2 border-r border-black">Guest ID</th>
                <th className="px-4 py-2 border-r border-black">Activity Name</th>
                <th className="px-4 py-2 border-r border-black">No. of People</th>
                <th className="px-4 py-2 border-r border-black">Activity Price</th>
                <th className="px-4 py-2 border-r border-black">Total Price</th>
            </tr>
        </thead>

        <tbody>
            {activityReservations.map((reservation) => (
                <tr key={reservation._id}>
                    <td className="px-4 py-2 border">{reservation.activityID}</td>
                    <td className="px-4 py-2 border">{reservation.guestID}</td>
                    <td className="px-4 py-2 border">{reservation.activityName}</td>
                    <td className="px-4 py-2 border">{reservation.noOfPeople}</td>
                    <td className="px-4 py-2 border">{reservation.activityPrice}</td>
                    <td className="px-4 py-2 border">{reservation.totalPrice}</td>
                </tr>
            ))}
        </tbody>
    </table>
);



// Define the ViewActivityReservation functional component
export default function ViewActivityReservation() {

    // Define state variable for activity reservations
    const [activityReservations, setActivityReservations] = useState([]);

    // Fetch activity reservations from the server upon component mounting
    useEffect(() => {
        axios.get("http://localhost:5000/ActivityReservation/allActivityReservation")
            .then((res) => {
                setActivityReservations(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);





    const tableRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => tableRef.current,
        documentTitle: "Activity Reservations Report",
        onAfterPrint: () => {
            alert("Activity Reservations Report Successfully Downloaded!");
        }
    });




    // Render the component JSX
    return (
        <div className="container min-h-screen mx-auto mt-8">
            <h2 className="mb-4 text-2xl font-bold">All Activity Reservations</h2>
            
            <div ref={tableRef} className="py-8">
                <Table activityReservations={activityReservations} />
            </div>
            <button className="px-5 py-2 text-white bg-red-500 rounded-full hover:bg-red-600 mt-14" onClick={handlePrint}> Download Report</button>
        </div>
    );
}


