const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// POST /api/bookings
// create a new `booking` resource
router.post("/", (req, res) => {
  const selectedDay = req.body.selectedDay;
  const guestnumber = req.body.guestnumber;
  const arrivaltime = req.body.arrivaltime;
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;


  //CHECK BOOKING AVAILABILITY FUNCTION

  //check whether there is a DayReport for that date
  //NO: 1. Create DayReport for the date with default opening times and timeslots from Restaurant document
  //       2. DayReport creates Table documents with default availability for that date.
  //       3. Check in DayReport whether restaurant is open on that date (check if day in "weekdays" is true (open) or false (closed))
  //              4A. If Restaurant is closed on that day => Send message to be rendered under form: "Closed on this day. Pick another date"
  //               4B. If Restaurant is open on that day =>  Check Table documents for that day.  See if tables have available timeslot for that time with the correct capacity
  //                            5A. If no capacity on either table during that timeslot =>  Send message to be rendered under form: "No free tables. Pick another time."               
  //                            5B. If there is a matching table for that timeslot => Send message "Booking confirmed. Table number is: {tablenumber}" && CREATE BOOKING with correct data  


  // YES: same as above starting from 3.

  Booking.create({
    date: selectedDay,
    visitorcount: guestnumber,
    visitorname: name,
    visitorphone: phone,
    visitoremail: email
    //     timeslot: timeslot,
    // tablenumber: tablenumber,
  })
    .then(booking => {
      res.json(booking);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
