const mongoose = require('mongoose');

const Schema = mongoose.Schema ;

const create_packageSchema = new Schema({

    package_name : {
        type: String ,
        required: true
    },
    room_id : {
        type: String ,
        required: true
    },
    SActivity_id : {
        type: String ,
        required: true
    },
    spa_id : {
        type: String ,
        required: true
    },
    package_des : {
        type: String ,
        required: true
    },

    price : {
        type : Number ,
        required : true
    },
    package_img : {
        type: String ,
        required: true
    },

   
})

const Hotel_Package = mongoose.model("Hotel_Package",create_packageSchema);

module.exports = Hotel_Package;
