const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
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
    agencyname: {
        type: String,
        required: true
    },
    agencyId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Agencyfeedback = mongoose.model("Agencyfeedback", feedbackSchema);
module.exports = Agencyfeedback;
