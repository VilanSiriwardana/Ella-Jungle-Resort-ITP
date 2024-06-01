import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

export default function AddPackage() {
  const [package_name, setPackageName] = useState("");
  const [room_id, setRoomId] = useState("");
  const [SActivity_id, setActivityId] = useState("");
  const [spa_id, setSpaId] = useState("");
  const [package_des, setPackageDes] = useState("");
  const [price, setPrice] = useState("");
  const [package_img, setPackageImg] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [activities, setActivities] = useState([]);
  const [spas, setSpas] = useState([]);

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

  const sendDate = (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    const formData = new FormData();
    formData.append("package_img", package_img);
    formData.append("package_name", package_name);
    formData.append("room_id", room_id);
    formData.append("SActivity_id", SActivity_id);
    formData.append("spa_id", spa_id);
    formData.append("package_des", package_des);
    formData.append("price", price);

    axios.post("/hotel_packages/add", formData)
      .then(() => {
        alert("Package Added");
        resetFields();
      })
      .catch((err) => {
        alert(err);
      });
  };

  const validateFields = () => {
    if (!package_name || !room_id || !SActivity_id || !spa_id || !package_des || !price || !package_img) {
      alert("Please fill in all fields and select options.");
      return false;
    }

    if (isNaN(Number(price))) {
      alert("Price should be a numerical value.");
      return false;
    }

    if (Number(price) < 0) {
      alert("Price should be a Positive value");
      return false;
    }

    return true;
  };

  const resetFields = () => {
    setPackageName("");
    setRoomId("");
    setActivityId("");
    setSpaId("");
    setPackageDes("");
    setPrice("");
    setPackageImg(null);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-4xl p-6 overflow-hidden bg-green-100 rounded shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xl font-bold">Add Package</div>
          <Link
            to='/table'
            className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700"
          >
            View All Packages
          </Link>
        </div>
        <form onSubmit={sendDate} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="package_name" className="block mb-1">
              Package Name
            </label>
            <input
              type="text"
              id="package_name"
              className="w-full form-input"
              placeholder="Enter Package name"
              value={package_name}
              onChange={(e) => setPackageName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="room_id" className="block mb-1">
              Room
            </label>
            <select
              id="room_id"
              className="w-full form-select"
              value={room_id}
              onChange={(e) => {
                setRoomId(e.target.value);
              }}
            >
              <option value="">Select Room</option>
              {rooms.map(room => (
                <option key={room._id} value={room._id}>{room.roomName}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="SActivity_id" className="block mb-1">
              Special Activity
            </label>
            <select
              id="SActivity_id"
              className="w-full form-select"
              value={SActivity_id}
              onChange={(e) => {
                setActivityId(e.target.value);
              }}
            >
              <option value="">Select Special Activity</option>
              {activities.map(activity => (
                <option key={activity._id} value={activity._id}>{activity.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="spa_id" className="block mb-1">
              Spa Package
            </label>
            <select
              id="spa_id"
              className="w-full form-select"
              value={spa_id}
              onChange={(e) => {
                setSpaId(e.target.value);
              }}
            >
              <option value="">Select Spa Package</option>
              {spas && spas.length > 0 && spas.map(spa => (
                <option key={spa._id} value={spa._id}>{spa.packageName}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="package_des" className="block mb-1">
              Package Description
            </label>
            <input
              type="text"
              id="package_des"
              className="w-full form-input"
              placeholder="Enter Package Description"
              value={package_des}
              onChange={(e) => setPackageDes(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block mb-1">
              Package Price
            </label>
            <input
              type="text"
              id="price"
              className="w-full form-input"
              placeholder="Enter Package Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="package_img" className="block mb-1">
              Package Image
            </label>
            <input
              type="file"
              id="package_img"
              className="w-full form-input"
              onChange={(e) => setPackageImg(e.target.files[0])}
            />
          </div>
          
          <button
            type="submit"
            className="px-4 py-2 font-bold text-white bg-green-400 rounded hover:bg-green-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
