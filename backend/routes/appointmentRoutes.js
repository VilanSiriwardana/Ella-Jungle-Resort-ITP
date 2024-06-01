// routes/appointments.js
const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment');

// Create a new appointment
router.post('/', async (req, res) => {
    try {
        const newAppointment = new Appointment(req.body);
        await newAppointment.save();
        res.status(201).json(newAppointment);
    } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(500).json({ message: 'Failed to create appointment.' });
    }
});

// Get all appointments
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ message: 'Failed to fetch appointments.' });
    }
});

// Get a specific appointment by ID
router.get('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found.' });
        }
        res.json(appointment);
    } catch (error) {
        console.error('Error fetching appointment:', error);
        res.status(500).json({ message: 'Failed to fetch appointment.' });
    }
});

// Update an existing appointment by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedAppointment = await Appointment.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Appointment not found.' });
        }
        res.json(updatedAppointment);
    } catch (error) {
        console.error('Error updating appointment:', error);
        res.status(500).json({ message: 'Failed to update appointment.' });
    }
});

// Delete an appointment by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAppointment = await Appointment.findByIdAndDelete(id);
        if (!deletedAppointment) {
            return res.status(404).json({ message: 'Appointment not found.' });
        }
        res.json({ message: 'Appointment deleted successfully.' });
    } catch (error) {
        console.error('Error deleting appointment:', error);
        res.status(500).json({ message: 'Failed to delete appointment.' });
    }
});

module.exports = router;
