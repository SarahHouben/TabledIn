const express = require("express");
const router = express.Router();
const { Restaurant, timeslots } = require("../models/Restaurant");

// POST /api/restaurants
// create a new `restaurant` resource
// const getTimeslots = () => {
//   return [
//     "0800",
//     "0815",
//     "0830",
//     "0845",
//     "0900",
//     "0915",
//     "0930",
//     "0945",
//     "1000",
//     "1015",
//     "1030",
//     "1045",
//     "1100",
//     "1015",
//     "1130",
//     "1145",
//     "1100",
//     "1115",
//     "1130",
//     "1145",
//     "1200",
//     "1215",
//     "1230",
//     "1245",
//     "1300",
//     "1315",
//     "1330",
//     "1345",
//     "1400",
//     "1415",
//     "1430",
//     "1445",
//     "1500",
//     "1515",
//     "1530",
//     "1545",
//     "1600",
//     "1615",
//     "1630",
//     "1645",
//     "1700",
//     "1715",
//     "1730",
//     "1745",
//     "1800",
//     "1815",
//     "1830",
//     "1845",
//     "1900",
//     "1915",
//     "1930",
//     "1945",
//     "2000",
//     "2015",
//     "2030",
//     "2045",
//     "2100",
//     "2115",
//     "2130",
//     "2145",
//     "2200",
//     "2215",
//     "2230",
//     "2245",
//     "2300",
//     "2315",
//     "2330",
//     "2345"
//   ].reduce((acc, val) => {
//     return (acc[val] = Boolean);
//   }, {});
// };

// const openingTimes = [
//   "monday",
//   "tuesday",
//   "wednesday",
//   "thursday",
//   "friday",
//   "saturday",
//   "sunday"
// ].map(day => {
//   return {
//     open: {
//      type: Boolean,
//      default: true
//     },
//     timeslots: {
//      default: getTimeslots()
//     }
//   };
// });

// Create new restaurant document
router.post("/", (req, res) => {
  const name = req.body.name;
  const address = req.body.address;
  const phone = req.body.phone;
  const email = req.body.email;
  const weekdays = req.body.weekdays;
  const tablenumber = req.body.tablenumber;
  const tables = req.body.tables;
  const openingtimes = req.body.openingtimes;

  // map the timeslots array with the openingtimes in combined
  /* console.log(timeslots) */
  let combined = timeslots.map(timeSlotObj => {
    let businessTime = openingtimes[timeSlotObj.day];
    if (businessTime.opentime) {
      for (let key in timeSlotObj.timeslots) {
        let timeNum = Number(key);
        let openingTime = businessTime.opentime;
        let closingTime = businessTime.closetime;

        if (timeNum < closingTime && timeNum > openingTime)
          timeSlotObj.timeslots[key] = true;
      }
      return timeSlotObj;
    } else return timeSlotObj;
  });

  const owner = req.user._id;
  // console.log("Weekdays from server", weekdays);
  Restaurant.create({
    name: name,
    address: address,
    phone: phone,
    email: email,
    weekdays: weekdays,
    tablenumber: tablenumber,
    tables: tables,
    openingtime: openingtimes,
    timeslots: combined,
    owner: owner
  })
    .then(restaurant => {
      console.log(restaurant);
      res.json(restaurant);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/", (req, res) => {
  const user = req.user._id;

  Restaurant.findOne({ owner: user })
    .then(restaurant => {
      console.log(restaurant);
      res.json(restaurant);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
