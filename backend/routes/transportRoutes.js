const express = require('express');
const Router = express.Router();
const Transport = require("../models/transportModel");

// Middleware for parsing JSON request bodies
Router.use(express.json());

// Insert a new transport
Router.post("/addTransport", (req, res) => {
  const { vehicleType, pricePerKm, maxPassengers, image, description, agencyId } = req.body;

  const newTransport = new Transport({
    vehicleType,
    pricePerKm,
    maxPassengers,
    image,
    description,
    agencyId,
  });

  newTransport
    .save()
    .then(() => {
      res.json({ status: "Transport added", transport: newTransport });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ status: "Error adding transport", error: err.message });
    });
});




// Get all transports
Router.get("/getAllTransports", async (req, res) => {
  try {
    const transports = await Transport.find();
    res.status(200).json({ status: "All transports", transports: transports });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: "Error getting transports", error: err.message });
  }
});

// Find a transport by ID
Router.get("/getTransportById/:transportId", async (req, res) => {
  const { transportId } = req.params;
  try {
    const transport = await Transport.findById(transportId);
    if (!transport) {
      return res.status(404).json({ status: "Transport not found" });
    }
    res.status(200).json({ status: "Transport found", transport: transport });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ status: "Error finding transport", error: err.message });
  }
});

// Find transports by name
Router.get("/getTransportByType/:vehicleType", async (req, res) => {
  const { vehicleType } = req.params;
  try {
    const transports = await Transport.find({ vehicleType: vehicleType });
    res
      .status(200)
      .json({ status: "Transports found", transports: transports });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ status: "Error finding transports", error: err.message });
  }
});

// Update a transport by ID
Router.put("/updateTransport/:transportId", async (req, res) => {
  const { transportId } = req.params;
  try {
    const updatedTransport = await Transport.findByIdAndUpdate(
      transportId,
      req.body,
      { new: true }
    );
    if (!updatedTransport) {
      return res.status(404).json({ status: "Transport not found" });
    }
    res
      .status(200)
      .json({ status: "Transport updated", transport: updatedTransport });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ status: "Error updating transport", error: err.message });
  }
});

// Delete a transport by ID
Router.delete("/deleteTransport/:transportId", async (req, res) => {
  const { transportId } = req.params;
  try {
    const deletedTransport = await Transport.findByIdAndDelete(transportId);
    if (!deletedTransport) {
      return res.status(404).json({ status: "Transport not found" });
    }
    res
      .status(200)
      .json({ status: "Transport deleted", transport: deletedTransport });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ status: "Error deleting transport", error: err.message });
  }
});

module.exports = Router;
