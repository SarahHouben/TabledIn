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
