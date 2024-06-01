const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        contactNumber: {
            type: String,
            required: true,
        },
        NIC: {
            type: String,
            required: true,
        },
        appointmentType: {
            type: String,
            required: true,
        },
        appointmentDate: {
            type: Date,
            required: true,
        },
        hours: {
            type: Number,
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
