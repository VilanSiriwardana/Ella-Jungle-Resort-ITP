const mongoose = require('mongoose');

const transportSchema = new mongoose.Schema({
  vehicleType: {
    type: String,
    required: true,
  },
  pricePerKm: {
    type: Number,
    required: true,
  },
  maxPassengers: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  agencyId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Transport', transportSchema);