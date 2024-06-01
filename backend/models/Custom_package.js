const mongoose = require('mongoose');

const customPackageSchema = mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true
    },
    spa_package_ids: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SpaPackage' // Reference to the Spapackage model
    }],
    special_activity_ids: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'special_activities' // Reference to the SpecialActivity model
    }],
    room_package_ids: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rooms' // Reference to the Rooms model
    }],
    total_price: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const CustomPackage = mongoose.model('CustomPackage', customPackageSchema);

module.exports = CustomPackage;
