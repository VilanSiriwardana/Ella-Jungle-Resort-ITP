
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UpdatePackage } from '../../update packages/components/updatePackage';
import { Card, CardBody, Button, Dialog, Input } from '@material-tailwind/react'; // Import Dialog and Input components from Material Tailwind

export function BookingCardsContainer() {
  const [allPackages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPackages = async () => {
    try {
      const packagesResponse = await axios.get("/hotel_packages/");
      const roomsResponse = await axios.get("/residence/rooms");
      const activitiesResponse = await axios.get("/SpecialActivity");
      const spasResponse = await axios.get("/api/spa-packages");

      const packages = packagesResponse.data;
      const rooms = roomsResponse.data.reduce((acc, room) => ({ ...acc, [room._id]: room.roomName }), {});
      const activities = activitiesResponse.data.reduce((acc, activity) => ({ ...acc, [activity._id]: activity.name }), {});
      const spas = spasResponse.data.reduce((acc, spa) => ({ ...acc, [spa._id]: spa.packageName }), {});

      const updatedPackages = packages.map(pack => ({
        ...pack,
        room_name: rooms[pack.room_id],
        SActivity_name: activities[pack.SActivity_id],
        spa_name: spas[pack.spa_id],
      }));

      setPackages(updatedPackages);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle the error, such as displaying an error message to the user
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleUpdatePackages = () => {
    fetchPackages(); // Updated to fetch packages after update
  };

  const handleDeleteClick = (pack) => {
    setSelectedPackage(pack);
    setShowDeleteForm(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`/hotel_packages/delete/${selectedPackage._id}`);
      fetchPackages(); // Refresh packages after delete
      setSelectedPackage(null);
      setShowDeleteForm(false);
      alert("Package deleted successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  const filteredAgencies = allPackages.filter(pack =>
    pack.package_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto">
      <input
        type='text'
        placeholder='Search by Agency Name'
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className='flex-1 w-[200px] px-4 py-2 bg-gray-100 rounded-l-md focus:outline-none focus:bg-grey focus:ring-0 ml-[180px]'
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredAgencies.map((pack) => (
          <Card key={pack._id} className="flex flex-col h-full">
            <CardBody>
              <h2 className="mb-2 text-lg font-semibold">{pack.package_name}</h2>
              <p className="mb-4 text-sm text-gray-500">{pack.package_des}</p>
              <p className="mb-2 text-sm text-gray-500">Room: {pack.room_name}</p>
              <p className="mb-2 text-sm text-gray-500">Activity: {pack.SActivity_name}</p>
              <p className="mb-2 text-sm text-gray-500">Spa: {pack.spa_name}</p>
              <p className="text-sm text-gray-500">Price: {pack.price}</p>
            </CardBody>
            <div className="flex justify-between px-4 py-2 mt-auto">
              <Button className='bg-red-500' onClick={() => handleDeleteClick(pack)} color="lightGreen" size="sm">Delete</Button>
              <UpdatePackage 
                packageId={pack._id}
                package_name={pack.package_name}
                room_name={pack.room_name}
                SActivity_name={pack.SActivity_name}
                spa_name={pack.spa_name}
                package_des={pack.package_des}
                price={pack.price}
                onUpdatePackages={handleUpdatePackages}
              />
            </div>
          </Card>
        ))}
      </div>
      <Dialog size="xs" open={showDeleteForm} onClose={() => setShowDeleteForm(false)}>
        <div className="p-8">
          <h3 className="mb-4 text-lg font-semibold">Confirm Delete</h3>
          {selectedPackage && (
            <div className="mb-4">
              <p>Package Name: {selectedPackage.package_name}</p>
              <p>Room: {selectedPackage.room_name}</p>
              <p>Activity: {selectedPackage.SActivity_name}</p>
              <p>Spa: {selectedPackage.spa_name}</p>
              <p>Description: {selectedPackage.package_des}</p>
              <p>Price: {selectedPackage.price}</p>
            </div>
          )}
          <div className="flex justify-between">
            <Button className='bg-red-500' onClick={handleDeleteConfirm} color="lightGreen">Confirm Delete</Button>
            <Button className='bg-green-500' onClick={() => setShowDeleteForm(false)} color="lightGreen">Cancel</Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}