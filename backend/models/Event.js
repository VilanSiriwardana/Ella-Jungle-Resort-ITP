const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    eventUserId: {
        type: String,
       
    },
    eventUserName: {
        type: String,
       
    },
    eventUserMobile: {
        type: String,
       
    },
    eventName: {
        type: String,
        required: true
    },

    eventCategory: {
        type: String,
        enum: ['Wedding', 'Birthday', 'Christmas', 'Halloween', 'NewYear', 'Other'],
        required: true
    },

    eventDate: {
        type: Date,
        required: true
    },

    eventTime: {
        type: String,
        required: true
    },

    selectedTimeSlots: [String], // Array of selected time slots

    eventDescription: {
        type: String,
        required: true
    },

    attendeeCount: {
        type: Number,
        required: true
    },

    selectedOptions: [String], // Save as an array of strings

    totalCost: {
        type: Number,
        required: true
    },

    isPublic: {
        type: Boolean,
    },

    ticketPrice: {
        type: Number,
    },

    eventImage: {
        type: String, // Store the filename or image URL
    },

    eventBookingDate: {
        type: Date,
    },

    eventBookingTime: {
        type: String,
    },

    eventRoomReservationId: {
        type: String,
    },


});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
