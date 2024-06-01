const router = require("express").Router();
const Reservation = require("../models/ActivityReservation");
const SpaReservation = require("../models/appointment");
const hotelPackageBooking = require("../models/Hotel_Package_booking");
const customPackageBooking = require("../models/Custom_package_booking");

// Route to fetch all Special Activity reservations
router.route("/allSpecialActivityReservations").get((req, res) => {
  Reservation.find()
    .then((reservations) => {
      res.json(reservations);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "An error occurred while fetching reservations" });
    });
});

// Route to fetch all special activity reservations, optionally filtered by date
router.route("/specialActivityReservations").get(async (req, res) => {
  const { date } = req.query;
  try {
    let query = {};
    if (date) {
      // Filter reservations by createdAt date
      query.createdAt = {
        $gte: new Date(date),
        $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1))
      };
    }
    const reservations = await Reservation.find(query);
    res.json(reservations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while fetching reservations" });
  }
});

//route to fetch all spa appointments
router.route("/allSpaAppointments").get((req, res) => {
    SpaReservation.find()
      .then((appointment) => {
        res.json(appointment);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "An error occurred while fetching appointments" });
      });
  });


// Route to fetch all spa appointments, optionally filtered by date
router.route("/spaAppointments").get(async (req, res) => {
  const { date } = req.query;
  try {
    console.log('Date:', date);
    let query = {};
    if (date) {
      query.appointmentDate = { $gte: new Date(date), $lt: new Date(date + 'T23:59:59') };
    }
    console.log('Query:', query);
    const appointments = await SpaReservation.find(query);
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while fetching appointments" });
  }
});

  //route to fetch all hotel package booking
router.route("/allHotelPackageBooking").get((req, res) => {
    hotelPackageBooking.find()
      .then((booking) => {
        res.json(booking);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "An error occurred while fetching bookings" });
      });
  });

  // Route to fetch all hotel package bookings, optionally filtered by date
router.route("/hotelPackageBookings").get(async (req, res) => {
  const { date } = req.query;
  try {
    let query = {};
    if (date) {
      // Filter bookings by createdAt date
      query.createdAt = {
        $gte: new Date(date),
        $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1))
      };
    }
    const bookings = await hotelPackageBooking.find(query);
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while fetching bookings" });
  }
});


    //route to fetch all Custom_package_booking
router.route("/allCustomPackageBooking").get((req, res) => {
    customPackageBooking.find()
      .then((booking) => {
        res.json(booking);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "An error occurred while fetching bookings" });
      });
  });


  // Route to fetch all custom package bookings, optionally filtered by date
router.route("/customPackageBookings").get(async (req, res) => {
  const { date } = req.query;
  try {
    let query = {};
    if (date) {
      // Filter bookings by createdAt date
      query.createdAt = {
        $gte: new Date(date),
        $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1))
      };
    }
    const bookings = await customPackageBooking.find(query);
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while fetching bookings" });
  }
});


module.exports = router;