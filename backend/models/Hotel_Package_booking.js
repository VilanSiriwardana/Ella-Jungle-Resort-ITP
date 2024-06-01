const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hotel_bookingSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    package_id: {
      type: String,
      required: true,
    },
    checkin_date: {
      type: Date, // Use Date type for date fields
      required: true,
    },
    checkout_date: {
      type: Date, // Use Date type for date fields
      required: true,
    },
    credit_card_no: {
      type: String,
      required: true,
    },
    name_on_card: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    exp_date: {
      type: Date, // Use Date type for date fields
      required: true,
    },
    // You can add more fields as needed
  },
  {
    timestamps: true,
  }
);

const Hotel_Package_booking = mongoose.model(
  'Hotel_Package_booking',
  hotel_bookingSchema
);

module.exports = Hotel_Package_booking;
