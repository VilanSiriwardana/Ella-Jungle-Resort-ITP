const mongoose = require('mongoose');

const spaPackageSchema = new mongoose.Schema({
    packageName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
  
});

const SpaPackage = mongoose.model('SpaPackage', spaPackageSchema);

module.exports = SpaPackage;
