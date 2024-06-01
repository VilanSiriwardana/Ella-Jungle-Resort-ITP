const mongoose = require('mongoose');

const agencySchema = new mongoose.Schema(
  {
    agencyName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    businessRegistrationNumber: {
      type: String,
      required: true,
    },
    representerMail: {
      type: String,
      required: true,
    },
    businessMail: {
      type: String,
      required: true,
    },
    fax: {
      type: String,
      required: true,
    },
    taxIdNumber: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    websiteLink: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Agency = mongoose.model('Agency', agencySchema);

module.exports = Agency;
