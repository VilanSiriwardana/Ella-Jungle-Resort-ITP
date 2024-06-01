const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AgencyPackagesSchema = new Schema({
  packageName: {
    type: String,
    required: true,
  },
  packageImage: {
    type: String,
    required: false,
  },
  roomId: {
    type: String,
    required: true,
  },
  activityId: {
    type: String,
    required: false,
  },
  transportId: {
    type: String,
    required: false,
  },
  spaId: {
    type: String,
    required: false,
  },
  fullDays: {
    type: Number,
    required: true,
  },
  packageDescription: {
    type: String,
    required: false,
  },
  commission: {
    type: Number,
    required: false,
  },
  discount: {
    type: Number,
    required: false,
  },
  price: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isFinite,
      message: '{VALUE} is not a valid float value for price'
    }
  },
  agencyId: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    required: true,
  },
});

const AgencyPackages = mongoose.model("AgencyPackages", AgencyPackagesSchema);

module.exports = AgencyPackages;
