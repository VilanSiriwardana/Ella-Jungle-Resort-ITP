const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AgencyRequestSchema = new Schema({
    ArrivalDate: {
        type: String,
        required: true
    },
    DepartureDate: {
        type: String,
        required: false
    },
    NoOfDays: { 
        type: Number,
        required: true
    },
    NoOfNights: {
        type: Number,
        required: true
    },
    NoOfAdults: {
        type: Number,
        required: true
    },
    NoOfChildren: {
        type: Number,
        required: true
    },
    RoomType: {
        type: String,
        required: true
    },
    RequestDescription: {
        type: String,
        required: true
    },
    UserId: {
        type: String,
        required: true
    },
    AgencyId: {
        type: String,
        required: true
    },
    SentDate: {
        type: Date,
        required: true
    },
    Status: {
        type: String,
        required: false
    }
    
});

const AgencyRequest = mongoose.model('AgencyRequest', AgencyRequestSchema);

module.exports = AgencyRequest;