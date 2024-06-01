// Import required modules
const express = require('express');
const router = express.Router();
const Hotel_Package_booking = require('../models/Hotel_Package_booking'); // Assuming your model file is in a 'models' directory

// Route to create a new hotel booking
router.post('/add', async (req, res) => {
    try {
        const newBooking = await Hotel_Package_booking.create(req.body);
        res.status(201).json(newBooking);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route to get all hotel bookings
router.get('/', async (req, res) => {
    try {
        const bookings = await Hotel_Package_booking.find();
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to get a specific hotel booking by ID
router.get('/get/:id', async (req, res) => {
    try {
        const booking = await Hotel_Package_booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json(booking);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to update a hotel booking by ID
router.patch('/update/:id', async (req, res) => {
    try {
        const booking = await Hotel_Package_booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json(booking);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route to delete a hotel booking by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const booking = await Hotel_Package_booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json({ message: 'Booking deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
