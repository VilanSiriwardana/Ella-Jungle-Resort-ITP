const express = require('express');
const router = express.Router();
const CustomPackage = require('../models/Custom_package'); // Corrected import path

// Route for inserting a new custom package
router.post('/add', async (req, res) => {
  try {
    const {
      user_id,
      spa_package_ids,
      special_activity_ids,
      room_package_ids,
      total_price,
    } = req.body;
    const newCustomPackage = new CustomPackage({
      user_id,
      spa_package_ids,
      special_activity_ids,
      room_package_ids,
      total_price,
    });
    await newCustomPackage.save();
    res.status(201).json(newCustomPackage); // Return the created custom package
  } catch (error) {
    console.error('Error inserting custom package:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route for getting all custom packages with populated details from referenced models
router.get('/', async (req, res) => {
  try {
    const customPackages = await CustomPackage.find()
      .populate('spa_package_ids special_activity_ids room_package_ids'); // Populate referenced fields

    res.status(200).json(customPackages); // Return the array of custom packages with populated details
  } catch (error) {
    console.error('Error fetching custom packages:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route for updating a custom package by ID
router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPackage = await CustomPackage.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedPackage) {
      return res.status(404).json({ error: 'Custom package not found' });
    }
    res.status(200).json(updatedPackage); // Return the updated custom package
  } catch (error) {
    console.error('Error updating custom package:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route for deleting a custom package by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPackage = await CustomPackage.findByIdAndDelete(id);
    if (!deletedPackage) {
      return res.status(404).json({ error: 'Custom package not found' });
    }
    res.status(200).json({ message: 'Custom package deleted successfully' });
  } catch (error) {
    console.error('Error deleting custom package:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
