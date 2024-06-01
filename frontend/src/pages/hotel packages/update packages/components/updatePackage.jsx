import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";

export function UpdatePackage({ onUpdatePackages, packageId, package_name, room_name, SActivity_name, spa_name, package_des, price, package_img }) {
    const [open, setOpen] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [activities, setActivities] = useState([]);
    const [spas, setSpas] = useState([]);
    const [updatedPackName, setUpdatedPackName] = useState(package_name);
    const [updatedRoomName, setUpdatedRoomName] = useState(room_name);
    const [updatedSAName, setUpdatedSAName] = useState(SActivity_name);
    const [updatedSpaName, setUpdatedSpaName] = useState(spa_name);
    const [updatedPackDescription, setUpdatedPackDescription] = useState(package_des);
    const [updatedPrice, setUpdatedPrice] = useState(price);
    const [updatedImg, setUpdatedImg] = useState('');

    useEffect(() => {
      fetchRooms();
      fetchActivities();
      fetchSpas();
    }, []);

    const fetchRooms = () => {
      axios.get("/residence/rooms")
        .then(response => {
          setRooms(response.data);
        })
        .catch(error => {
          console.error("Error fetching rooms:", error);
        });
    };

    const fetchActivities = () => {
      axios.get("/SpecialActivity")
        .then(response => {
          setActivities(response.data);
        })
        .catch(error => {
          console.error("Error fetching special activities:", error);
        });
    };

    const fetchSpas = () => {
      axios.get("/api/spa-packages")
        .then(response => {
          setSpas(response.data);
        })
        .catch(error => {
          console.error("Error fetching spas:", error);
        });
    };

    const handleOpen = () => setOpen(!open);
  
    const handleUpdate = async () => {
      try {
        await axios.put(`/hotel_packages/update/${packageId}`, {
          package_name: updatedPackName,
          room_name: updatedRoomName,
          SActivity_name: updatedSAName,
          spa_name: updatedSpaName,
          package_des: updatedPackDescription,
          price: updatedPrice,
          img: updatedImg,
        });
  
        onUpdatePackages();
  
        alert("Package details updated successfully!");
        setOpen(false);
      } catch (error) {
        console.error("Error updating package details:", error.message);
        alert("Error updating package details. Please try again.");
      }
    };

    return (
      <>
        <Button onClick={handleOpen}>Update</Button>
        <Dialog
          size="xs"
          open={open}
          handler={handleOpen}
          className="bg-transparent shadow-none"
        >
          <Card className="mx-auto w-full max-w-[24rem]">
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4" color="blue-gray">
                Update Details
              </Typography>
              <Typography
                className="mb-3 font-normal"
                variant="paragraph"
                color="gray"
              >
                Enter new Details of the Package
              </Typography>
              <Typography className="-mb-2" variant="h6">
                Package Name
              </Typography>
              <Input label="Name" size="lg" value={updatedPackName} onChange={(e) => setUpdatedPackName(e.target.value)} />
              <Typography className="-mb-2" variant="h6">
                Room Name
              </Typography>
              <select
                className="w-full form-select"
                value={updatedRoomName}
                onChange={(e) => setUpdatedRoomName(e.target.value)}
              >
                <option value="">Select Room</option>
                {rooms.map(room => (
                  <option key={room._id} value={room.roomName}>{room.roomName}</option>
                ))}
              </select>
              <Typography className="-mb-2" variant="h6">
                Activity Name
              </Typography>
              <select
                className="w-full form-select"
                value={updatedSAName}
                onChange={(e) => setUpdatedSAName(e.target.value)}
              >
                <option value="">Select Special Activity</option>
                {activities.map(activity => (
                  <option key={activity._id} value={activity.name}>{activity.name}</option>
                ))}
              </select>
              <Typography className="-mb-2" variant="h6">
                Spa Package
              </Typography>
              <select
                className="w-full form-select"
                value={updatedSpaName}
                onChange={(e) => setUpdatedSpaName(e.target.value)}
              >
                <option value="">Select Spa Package</option>
                {spas.map(spa => (
                  <option key={spa._id} value={spa.spaPackageName}>{spa.spaPackageName}</option>
                ))}
              </select>
              <Typography className="-mb-2" variant="h6">
                Description
              </Typography>
              <Input label="Description" size="lg" value={updatedPackDescription} onChange={(e) => setUpdatedPackDescription(e.target.value)} />
              <Typography className="-mb-2" variant="h6">
                Price
              </Typography>
              <Input label="Price" size="lg" value={updatedPrice} onChange={(e) => setUpdatedPrice(e.target.value)} />
            </CardBody>
  
            <CardFooter className="pt-0">
              <Button className="bg-blue-500"  onClick={handleUpdate} fullWidth>
                Update
              </Button>
            </CardFooter>
          </Card>
        </Dialog>
      </>
    );
  }
