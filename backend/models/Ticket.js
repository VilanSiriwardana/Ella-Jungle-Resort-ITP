const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    eventId: {
        type: String,
    },
    eventName: {
        type: String,
    },

    ticketUserId: {
        type: String,
    },
    ticketUserName: {
        type: String,
    },

    ticketUserEmail: {
        type: String,   
    },

    ticketUserMobile: {
        type: String,   
    },

    ticketCount: {
        type: Number,
        required: true
    },

    totalTicketCost: {
        type: Number,
    },

    ticketBuyingDate: {
        type: Date,
    },

    ticketBuyingTime: {
        type: String,
    },

    
    

});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;

