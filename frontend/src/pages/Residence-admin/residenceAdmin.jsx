import React from 'react';

const ResidenceAdmin = () => {
    return (
        <div>
            <h1 className="text-4xl font-bold text-center mt-20 mb-20">Residence Management</h1>
            
                <div className="flex justify-center mt-10 mb-40">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-4 shadow-md">
                            <img src={require(`../../assets/Rooms.jpg`)} alt="Image 1" className="w-full h-64 object-cover" />
                            <h2 className="text-xl font-bold mt-4">Room Management</h2>
                           <button className="bg-green-500 hover:bg-black text-white font-bold py-2 px-4 mt-4 rounded"
                           onClick={() => window.location.href = `/roomPage`}>
                                View
                            </button>
                        </div>
                        <div className="bg-white p-4 shadow-md ml-10">
                            <img src={require(`../../assets/reservation.webp`)} alt="Image 2" className="w-full h-64 object-cover" />
                            <h2 className="text-xl font-bold mt-4">Reservation Management</h2>
                            <button className="bg-green-500 hover:bg-black text-white font-bold py-2 px-4 mt-4 rounded" 
                            onClick={() => window.location.href = `/allReservations`}>
                                View
                            </button>
                        </div>
                    </div>
                </div>
            </div>
       
    );
};

export default ResidenceAdmin;