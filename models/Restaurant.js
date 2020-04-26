const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema(
  {
    name: String,
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    address: String,
    phone: String,
    email: String,
    googleassistant: Boolean,
    phonegateway: Boolean,
    menu: String,
    logo: {
      type: String,
      default:
        'https://res.cloudinary.com/dmlqhwwfc/image/upload/v1570446767/TabledIn/tabledin_logo.png',
    },
    dayreports: [
      {
        type: Schema.Types.ObjectId,
        ref: 'DayReport',
      },
    ],
    bookings: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Booking',
      },
    ],
    weekdays: Schema.Types.Mixed,
    openingtimes: Schema.Types.Mixed,
    timeslots: {
      type: Array,
    },
    tablenumber: Number,
    tables: [Schema.Types.Mixed],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;
