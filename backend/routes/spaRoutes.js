const express = require('express');
const SpaPackage = require('../models/spaModel');

const router = express.Router();

// Create a new spa package
router.post('/', async (req, res) => {
  try {
    const { packageName, price, description, type } = req.body;

    const newSpaPackage = new SpaPackage({ packageName, price, description, type });
    await newSpaPackage.save();

    res.status(201).json(newSpaPackage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Retrieve all spa packages
router.get('/', async (req, res) => {
  try {
    const spaPackages = await SpaPackage.find();
    res.json(spaPackages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Retrieve a single spa package by ID
router.get('/:id', async (req, res) => {
  try {
    const spaPackage = await SpaPackage.findById(req.params.id);
    if (!spaPackage) {
      return res.status(404).json({ message: 'Spa package not found' });
    }
    res.json(spaPackage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a spa package by ID
router.put('/:id', async (req, res) => {
  try {
    const { packageName, price, description, type } = req.body;

    const updatedSpaPackage = await SpaPackage.findByIdAndUpdate(
      req.params.id,
      { packageName, price, description, type },
      { new: true }
    );

    if (!updatedSpaPackage) {
      return res.status(404).json({ message: 'Spa package not found' });
    }
    res.json(updatedSpaPackage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a spa package by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedSpaPackage = await SpaPackage.findByIdAndDelete(req.params.id);
    if (!deletedSpaPackage) {
      return res.status(404).json({ message: 'Spa package not found' });
    }
    res.json({ message: 'Spa package deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
