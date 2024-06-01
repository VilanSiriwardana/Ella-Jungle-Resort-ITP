//to connect with mongodb import mongodb and assign it to a variable
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//create an object
const specialActivitiesSchema = new Schema({
  //properties of special activities
  name: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  distance: {
    type: Number,
    //required:true
  },

  price: {
    type: Number,
    required: true,
  },
  
  noOfGuests: {
    type: Number,
    required: true,
  },
});

//send the above properties to the db
const SpecialActivity = mongoose.model(
  'special_activities',
  specialActivitiesSchema
);

module.exports = SpecialActivity;
