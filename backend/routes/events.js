const router = require("express").Router();
const Event = require("../models/Event");
const multer = require("multer");
const path = require("path");


// Configure storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/Images"); // Ensure this directory exists or multer will throw an error
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });



// Add an event with image
router.route("/addEvent").post(upload.single("file"), async (req, res) => {
  const { eventUserId, eventUserName, eventUserMobile, eventName, eventCategory, eventDate, eventTime, selectedTimeSlots, eventDescription, attendeeCount, totalCost, isPublic, ticketPrice, eventBookingDate, eventBookingTime } = req.body;
  const eventImage = req.file ? req.file.filename : ""; // Check if file exists

    // Convert selectedOptions to an array of ObjectIds
    let selectedOptions = [];
    if (req.body.selectedOptions && req.body.selectedOptions.length > 0) {
        selectedOptions = req.body.selectedOptions;
    }


  try {
    const newEvent = new Event({
      eventUserId,
      eventUserName,
      eventUserMobile,
      eventName,
      eventCategory,
      eventDate,
      eventTime,
      selectedTimeSlots,
      eventDescription,
      attendeeCount,
      selectedOptions,
      totalCost,
      isPublic,
      ticketPrice,
      eventImage,
      eventBookingDate,
      eventBookingTime
    });

    const savedEvent = await newEvent.save();
    res.json({ status: "Event Added", event: savedEvent });
  } catch (error) {
    console.error("Error adding event:", error.message);
    res.status(500).send({ status: "Error with adding event", error: error.message });
  }
});



// Get all events
router.route("/getAllEvents").get(async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error.message);
    res.status(500).send({ status: "Error with fetching events", error: error.message });
  }
});



// Update event
router.route("/updateEvent/:id").put(upload.single("file"), async (req, res) => {
  let eventId = req.params.id;
  const { eventName, eventCategory, eventDate, eventTime, selectedTimeSlots, eventDescription, attendeeCount, totalCost, isPublic, ticketPrice, eventBookingDate, eventBookingTime, eventRoomReservationId } = req.body;
  const eventImage = req.file ? req.file.filename : ""; // Check if file exists

  
    // Convert selectedOptions to an array of ObjectIds
    let selectedOptions = [];
    if (req.body.selectedOptions && req.body.selectedOptions.length > 0) {
        selectedOptions = req.body.selectedOptions;
    }
  try {
    const updateEvent = {
      eventName,
      eventCategory,
      eventDate,
      eventTime,
      selectedTimeSlots,
      eventDescription,
      attendeeCount,
      selectedOptions,
      totalCost,
      isPublic,
      ticketPrice,
      eventImage,
      eventBookingDate,
      eventBookingTime,
      eventRoomReservationId
    };

    const updatedEvent = await Event.findByIdAndUpdate(eventId, updateEvent, { new: true });
    res.status(200).send({ status: "Event Updated", event: updatedEvent });
  } catch (error) {
    console.error("Error updating event:", error.message);
    res.status(500).send({ status: "Error with updating event", error: error.message });
  }
});



// Update event
router.route("/updateEventReservation/:id").put(upload.single("file"), async (req, res) => {
  let eventId = req.params.id;
  const { eventName, eventCategory, eventDate, eventTime, selectedTimeSlots, eventDescription, attendeeCount, totalCost, isPublic, ticketPrice, eventBookingDate, eventBookingTime, eventRoomReservationId } = req.body;
  // const eventImage = req.file ? req.file.filename : ""; // Check if file exists
  // Convert selectedOptions to an array of ObjectIds
    let selectedOptions = [];
    if (req.body.selectedOptions && req.body.selectedOptions.length > 0) {
      selectedOptions = req.body.selectedOptions;
    }
  try {
    const updateEvent = {
      eventName,
      eventCategory,
      eventDate,
      eventTime,
      selectedTimeSlots,
      eventDescription,
      attendeeCount,
      totalCost,
      isPublic,
      ticketPrice,
      eventBookingDate,
      eventBookingTime,
      eventRoomReservationId
    };

    const updatedEvent = await Event.findByIdAndUpdate(eventId, updateEvent, { new: true });
    res.status(200).send({ status: "Event Updated", event: updatedEvent });
  } catch (error) {
    console.error("Error updating event:", error.message);
    res.status(500).send({ status: "Error with updating event", error: error.message });
  }
});



// Delete event
router.route("/deleteEvent/:id").delete(async (req, res) => {
  let eventId = req.params.id;

  try {
    await Event.findByIdAndDelete(eventId);
    res.status(200).send({ status: "Event Deleted" });
  } catch (error) {
    console.error("Error deleting event:", error.message);
    res.status(500).send({ status: "Error in deleting Event", error: error.message });
  }
});



// Get one event by ID
router.route("/getSelectedEvent/:id").get(async (req, res) => {
  let eventId = req.params.id;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).send({ status: "Event not found" });
    }
    res.status(200).send({ status: "Event Fetched", event });
  } catch (error) {
    console.error("Error fetching event:", error.message);
    res.status(500).send({ status: "Error with get Event", error: error.message });
  }
});


// // Get all events within a two-month period from today
// router.route("/popUpEvents").get(async (req, res) => {
//   try {
//     const currentDate = new Date();
//     const twoMonthsLater = new Date(currentDate);
//     twoMonthsLater.setMonth(twoMonthsLater.getMonth() + 2);

//     // Assuming your Event model has a date field named 'eventDate'
//     // Adjust the field name according to your actual model
//     const events = await Event.find({
//       eventDate: {
//         $gte: currentDate, // Greater than or equal to today
//         $lte: twoMonthsLater // Less than or equal to two months from today
//       }
//     });

//     res.json(events);
//   } catch (error) {
//     console.error("Error fetching events:", error.message);
//     res.status(500).send({ status: "Error with fetching events", error: error.message });
//   }
// });



router.route("/popUpEvents").get(async (req, res) => {
  try {
    const currentDate = new Date();
    const twoMonthsLater = new Date();
    twoMonthsLater.setMonth(twoMonthsLater.getMonth() + 2);

    const events = await Event.find({
      eventDate: {
        $gte: new Date(currentDate.toISOString()), // Convert to ISO format for comparison
        $lte: new Date(twoMonthsLater.toISOString()) // Convert to ISO format for comparison
      }
    });

    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error.message);
    res.status(500).send({ status: "Error with fetching events", error: error.message });
  }
});



// Get all public events
router.route("/publicEvents").get(async (req, res) => {
  try {
    const publicEvents = await Event.find({ isPublic: true });
    res.json(publicEvents);
  } catch (error) {
    console.error("Error fetching public events:", error.message);
    res.status(500).send({ status: "Error with fetching public events", error: error.message });
  }
});







// Route to fetch reserved slots for a given date
router.get('/reservedSlots/:eventDate', async (req, res) => {
  const eventDate = req.params.eventDate;
  try {
    // Find events that match the given date
    const events = await Event.find({ eventDate });

    // Extract reserved time slots from events
    const reservedSlots = events.flatMap(event => event.selectedTimeSlots);
    
    res.json({ reservedSlots });
  } catch (error) {
    console.error("Error fetching reserved slots:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});




module.exports = router;
