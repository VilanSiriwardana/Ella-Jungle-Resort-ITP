const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({

    roomID : {
        type:String,
        required:true
    },
    userID : {
        type:String,
        required:true
    },

    fullName : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true
    },
    contactNumber : {
        type:Number,
        required:true
    },
    checkIn : {
        type:Date,
        required:true
    },
    checkOut : {
        type:Date,
        required:true
    }

});

module.exports = mongoose.model('reservation',reservationSchema);