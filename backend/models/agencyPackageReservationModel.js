const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AgencyPackageReservationSchema = new Schema({
  packageId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  reservationDate: {
    type: Date,
    required: true,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  noOfAdults: {
    type: Number,
    required: true,
  },
  noOfChildren: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    required: true,
  },
});

const AgencyPackageReservation = mongoose.model("AgencyPackageReservation",AgencyPackageReservationSchema);

module.exports = AgencyPackageReservation;
