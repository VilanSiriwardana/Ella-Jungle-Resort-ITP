const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomfeedbackSchema = new Schema({
    fbtitle: {
        type: String,
        required: true
    },
    fbdescription: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    giverName: {
        type: String,
        required: true
    },
    giverId: {
        type: String,
        required: true
    },
    roomname: {
        type: String,
        required: true
    },
    roomId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Roomfeedback = mongoose.model("Roomfeedback", roomfeedbackSchema);
module.exports = Roomfeedback;
