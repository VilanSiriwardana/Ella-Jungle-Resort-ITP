const mongoose = require('mongoose');

//Defining room schemass
const roomSchema = new mongoose.Schema({

    roomName: {
        type:String
    },
    roomType: {
        type:String
    },
    maxCount: {
        type:Number
        
    },
    image: {
        type:String
    },
    description: {
        type:String
        
    },
    price: {
        type:Number  
    }
});

//create and export room model
module.exports = mongoose.model('Rooms', roomSchema);