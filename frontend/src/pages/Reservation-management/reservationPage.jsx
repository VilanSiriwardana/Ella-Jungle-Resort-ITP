import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';

const ReservationPage = () => {
    const [reservations, setReservations] = useState([]);

    const fetchReservations = async () => {
        try {
            const response = await axios.get('/reservation/bookings');
            setReservations(response.data);
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    const formatDate = (dateString) => {
        return dateString.substring(0, 10); // Extract first 10 characters (YYYY-MM-DD)
    };

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Reservation Details",
        onAfterPrint: () => console.log("Printing done")
    });

    const generateRef = useRef();

    const handleReport = useReactToPrint({
        content: () => generateRef.current,
        documentTitle: "Reservation Report",
        onAfterPrint: () => console.log("Report Printing done")
    });

    return (
        <div ref={generateRef}>
            <h1 className='text-center font-bold text-3xl my-20'>All Reservations</h1>
            <table className="min-w-full divide-y divide-gray-200 mx-auto">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            #
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Full Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Contact No
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Check In
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Check Out
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {reservations.map((reservation, index) => (
                        <tr key={reservation.id} className="hover:bg-gray-100 cursor-pointer">
                            <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{reservation.fullName}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{reservation.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{reservation.contactNumber.toString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{formatDate(reservation.checkIn)}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{formatDate(reservation.checkOut)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='flex justify-center mt-10 b=mb-10'>
                <button onClick={handleReport} className='bg-green-500 hover:bg-black text-white font-bold py-2 px-4 rounded print:hidden mb-10'>Generate Report</button>
            </div>
            <div style={{ display: 'none' }}>
                {reservations.map((reservation) => (
                    <div
                        key={reservation.id}
                        className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-2 my-10 mx-20"
                        ref={componentRef}
                    >
                        <h2 hidden>{reservation.roomID}</h2>
                        <p>{reservation.fullName}</p>
                        <p>{reservation.email}</p>
                        <p>{reservation.contactNumber.toString()}</p>
                        <p>Check In: {formatDate(reservation.checkIn)}</p>
                        <p>Check Out: {formatDate(reservation.checkOut)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReservationPage;
