const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const cookieParser = require('cookie-parser');
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js');

//Dananjaya
const userRoutes = require('./routes/userRoutes.js');
const agencyRoutes = require('./routes/agencyRoutes.js');

//Deanne
const hotelPackagesRouter = require('./routes/hotel_packages');
const Custom_packages_Router = require('./routes/custom_packages');
const Custom_packages_booking_Router = require('./routes/custom_bookingRoute');
const Hotel_packages_booking_Router = require('./routes/hotel_bookingRoute');

//Ishara
const feedbackRoutes = require('./routes/feedbackRoutes.js')
const faqRoutes = require('./routes/faqRoutes.js')
const agencyfeedbackRoutes = require('./routes/agencyfeedbackRoutes.js');
const financeRoutes = require('./routes/financeRoutes.js')
const roomfeedbackRoutes = require('./routes/roomfeedbackRoutes.js')


//Dushan
const roomRoutes = require('./routes/Rooms');
const reservationRoutes = require('./routes/reservationRoutes');

//Sayuni
const specialActivityRouter = require("./routes/SpecialActivity.js");
const reservationRouter = require("./routes/ActivityReservationRoutes.js");

//Sathma
const spaPackageRoutes = require('./routes/spaRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes'); // Import appointment routes

//Yasiru
const AgencyRequestRouter = require("./routes/agencyRequestRoutes");
const TransportRouter = require("./routes/transportRoutes");
const AgencyPackagesRouter = require("./routes/agencyPackagesRoutes");
const AgencyPackageReservationRouter = require("./routes/agencyPackageReservationRoutes");

//Vilan
const eventRouter = require("./routes/events.js");
const optionRouter = require("./routes/options.js");
const ticketRouter = require("./routes/tickets.js");


dotenv.config();
const port = process.env.PORT || 5000;
connectDB();
const cors = require('cors');
const app = express();

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Enable CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(cookieParser());

//Dananjaya
app.use('/api/users', userRoutes);
app.use('/api/agencies', agencyRoutes);


//Deanne
app.use('/hotelbooking', Hotel_packages_booking_Router);
app.use('/custombooking', Custom_packages_booking_Router);
app.use('/custom_packages', Custom_packages_Router);
app.use('/hotel_packages', hotelPackagesRouter);


//Ishara
app.use('/api/feedbacks',feedbackRoutes); 
app.use('/api/faq',faqRoutes);  
app.use('/api/agencyfeedbacks',agencyfeedbackRoutes); 
app.use('/api/finance',financeRoutes)
app.use('/api/roomfeedbacks',roomfeedbackRoutes)


//Dushan
app.use('/residence', roomRoutes);
app.use('/reservation', reservationRoutes);


//Sayuni
app.use("/SpecialActivity",specialActivityRouter);
app.use("/ActivityReservation",reservationRouter);


//Sathma
app.use('/api/spa-packages', spaPackageRoutes);
app.use('/api/appointments', appointmentRoutes); 

//Yasiru
app.use("/", AgencyRequestRouter);
app.use("/", TransportRouter);
app.use("/", AgencyPackagesRouter);
app.use("/", AgencyPackageReservationRouter);

//Vilan
app.use ("/event", eventRouter);
app.use ("/option", optionRouter);
app.use ("/ticket", ticketRouter);
app.use(express.static('public'))


if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.render('index'); // Render index.ejs
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
