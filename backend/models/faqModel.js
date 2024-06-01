const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const faqSchema = new Schema({
    faqtitle: {
        type: String,
        required: true
    },
    faqdescription: {
        type: String,
        required: true
    },
    replies: [{
        type: String 
    }],
    giverName: {
        type: String,
        required: true
    },
    giverId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const FAQ = mongoose.model("FAQ", faqSchema);

module.exports = FAQ;
