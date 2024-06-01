const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const custom_bookingSchema = new Schema(
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
      type: Date,
      required: true,
    },
    checkout_date: {
      type: Date,
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
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Custom_package_booking = mongoose.model(
  'Custom_package_booking',
  custom_bookingSchema
);

module.exports = Custom_package_booking;
