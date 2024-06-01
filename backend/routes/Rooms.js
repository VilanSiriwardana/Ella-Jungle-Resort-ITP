const express = require('express');
const router = express.Router();
const Room = require('../models/Rooms');
const multer = require('multer');
const path = require('path');

// Set up multer storage for single image
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, '../frontend/src/assets/');
  },
  filename: function(req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, 'image-' + Date.now() + ext);
  }
});

const upload = multer({
  storage: storage
}).single('image'); // Specify single file upload

// Route to handle file upload
router.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading
      console.error('Multer error:', err);
      return res.status(500).send('An error occurred during file upload.');
    } else if (err) {
      // An unknown error occurred
      console.error('Unknown error:', err);
      return res.status(500).send('An unknown error occurred.');
    }

    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    
    // Send the file path in the response
    // Extract the filename from the uploaded file
    const filename = req.file.filename;

    // Send the filename in the response
    res.status(200).send({ filename });
  });
});
// Route to create a new room
router.post('/rooms', async (req, res) => {
  try {
    const { roomName, roomType, maxCount, description, price, image } = req.body;
    const room = new Room({ roomName, roomType, maxCount, description, price, image });
    await room.save();
    res.status(201).send(room);
  } catch (error) {
    console.error('Error adding room:', error);
    res.status(400).send(error);
  }
});

// Route to get all rooms
router.get('/rooms', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).send(rooms);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to get a single room by ID
router.get('/rooms/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).send({ error: 'Room not found' });
    }
    res.status(200).send(room);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to update a room by ID
router.patch('/rooms/:id', async (req, res) => {
  try {
    const allowedUpdates = ['roomName', 'roomType', 'maxCount', 'description', 'price'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    
    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates' });
    }

    const filteredUpdates = {};
    updates.forEach((update) => {
      if (allowedUpdates.includes(update)) {
        filteredUpdates[update] = req.body[update];
      }
    });

    const room = await Room.findByIdAndUpdate(req.params.id, filteredUpdates, { new: true, runValidators: true });
    
    if (!room) {
      return res.status(404).send({ error: 'Room not found' });
    }
    
    res.status(200).send(room);
  } catch (error) {
    console.error('Error updating room:', error);

    if (error.name === 'ValidationError') {
        return res.status(400).send({ error: error.message });
    } else if (error.name === 'CastError') {
        return res.status(400).send({ error: 'Invalid room ID' });
    }

    res.status(500).send({ error: 'An error occurred while updating the room' });
  }
});


// Route to delete a room by ID
router.delete('/rooms/:id', async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) {
      return res.status(404).send({ error: 'Room not found' });
    }
    res.status(200).send(room);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
