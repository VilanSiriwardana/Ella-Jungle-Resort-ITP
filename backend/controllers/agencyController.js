const Agency = require('../models/agencyModel');
const asyncHandler = require('express-async-handler');
const fs = require('fs');


// Insert new agency
const addAgency = asyncHandler(async (req, res) => {
    try {
      const {
        agencyName,
        address,
        mobile,
        img,
        businessRegistrationNumber,
        representerMail,
        businessMail,
        fax,
        taxIdNumber,
        description,
        websiteLink,
      } = req.body;
  
      const newAgency = new Agency({
        agencyName,
        address,
        mobile,
        img : req.file.filename,
        businessRegistrationNumber,
        representerMail,
        businessMail,
        fax,
        taxIdNumber,
        description,
        websiteLink,
      });
  
      await newAgency.save();
      res.status(201).json('Agency added');
    } catch (err) {
      console.error('Error adding agency:', err);
      res.status(400).json({ error: err.message });
    }
  });

// Read all agencies
const allAgency = asyncHandler(async (req, res) => {
  Agency.find()
    .then((agencies) => res.json(agencies))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// Update agency
const updateAgency = asyncHandler(async (req, res) => {
  Agency.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json('Agency updated'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// Delete agency
const deleteAgency = asyncHandler(async (req, res) => {
  Agency.findByIdAndDelete(req.params.id)
    .then(() => res.json('Agency deleted'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// Get specific agency
const specificAgency = asyncHandler(async (req, res) => {
  Agency.findById(req.params.id)
    .then((agency) => res.json(agency))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// get agency by representer mail
const getAgencyByRepresenterMail = asyncHandler(async (req, res) => {
  Agency.find({ representerMail: req.params.representerMail })
      .then(agency => res.json(agency))
      .catch(err => res.status(400).json("Error: " + err));
});


module.exports = {
  addAgency,
  allAgency,
  updateAgency,
  deleteAgency,
  specificAgency,
  getAgencyByRepresenterMail
};
