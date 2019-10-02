const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create array of time slots for each weekday
const getTimeslots = () => {
  return [
    "0800",
    "0815",
    "0830",
    "0845",
    "0900",
    "0915",
    "0930",
    "0945",
    "1000",
    "1015",
    "1030",
    "1045",
    "1100",
    "1015",
    "1130",
    "1145",
    "1100",
    "1115",
    "1130",
    "1145",
    "1200",
    "1215",
    "1230",
    "1245",
    "1300",
    "1315",
    "1330",
    "1345",
    "1400",
    "1415",
    "1430",
    "1445",
    "1500",
    "1515",
    "1530",
    "1545",
    "1600",
    "1615",
    "1630",
    "1645",
    "1700",
    "1715",
    "1730",
    "1745",
    "1800",
    "1815",
    "1830",
    "1845",
    "1900",
    "1915",
    "1930",
    "1945",
    "2000",
    "2015",
    "2030",
    "2045",
    "2100",
    "2115",
    "2130",
    "2145",
    "2200",
    "2215",
    "2230",
    "2245",
    "2300",
    "2315",
    "2330",
    "2345"
  ].reduce((acc, val) => {
    acc[val] = Boolean;
  }, {});
};

const openingTimes = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday"
].map(day => {
  return {
    open: Boolean,
    timeslots: getTimeslots()
  };
});

const restaurantSchema = new Schema(
  {
    restaurantname: String,
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    address: String,
    telefonnumber: String,
    email: String,
    menu: String,
    logo: {
      type: String,
      default:
        "https://res.cloudinary.com/dmlqhwwfc/image/upload/v1568703809/GreenSpace/default_user_image_gubmhl.png" // replace with our logo
    },
    dayreports: [
      {
        type: Schema.Types.ObjectId,
        ref: "DayReport"
      }
    ],
    bookings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Booking"
      }
    ],
    openingtime: openingTimes,
    tables: [{ tablenumber: String, tablecapacity: Number }]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;
