const express = require('express');
const router = express.Router();
const Custom_package_booking = require('../models/Custom_package_booking');
var nodemailer = require('nodemailer');

// Route to create a new custom package booking
router.post('/add', async (req, res) => {

    const {user_email} = req.body
    try {
        const newBooking = await Custom_package_booking.create(req.body);
        res.status(201).json(newBooking);
        
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'tdabey20@gmail.com',
              pass: 'trjd xueu rbfq sbac'
            }
          });
          
          var mailOptions = {
            from: 'tdabey20@gmail.com',
            to: user_email,
            subject: 'Welcome to Ella Jungle Resort',
            text: 'Booking Successful'
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route to get all custom package bookings
router.get('/', async (req, res) => {
    try {
        const bookings = await Custom_package_booking.find();
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to get a specific custom package booking by ID
router.get('/get/:id', async (req, res) => {
    try {
        const booking = await Custom_package_booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json(booking);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to update a custom package booking by ID
router.patch('/update/:id', async (req, res) => {
    try {
        const booking = await Custom_package_booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json(booking);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route to delete a custom package booking by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const booking = await Custom_package_booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json({ message: 'Booking deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
