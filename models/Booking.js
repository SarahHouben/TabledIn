const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    Date: Date,
    timeslot: String, //starting time
    tablenumber: String, //tablenumber from table which is booked
    visitorname: String,
    visitorcount: Number,
    visitorphone: String,
    visitoremail: String
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
