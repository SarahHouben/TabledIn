const express = require("express");
const router = express.Router();
const DayReport = require("../models/DayReport");
const Table = require("../models/Table");
const Booking = require("../models/Booking");
const { Restaurant } = require("../models/Restaurant");

// Get date selected in calender
router.post("/", (req, res) => {
  const selectedDay = req.body.selectedDay;
  const user = req.user._id;

  Restaurant.findOne({ owner: user }).then(restaurant => {
    DayReport.findOne({
      $and: [{ date: selectedDay }, { restaurant: restaurant._id }],
    })
      .then(dayreport => {
        if (!dayreport) {
          return res.json({ message: "No schedule found for this day." });
        }
        return res.json(dayreport);
      })
      .catch(err => {
        res.json(err);
      });
  });
});

router.delete("/", (req, res) => {
  const selectedDay = req.body.selectedDay;
  const user = req.user._id;
  
  Restaurant.findOne({ owner: user }).then(restaurant => {
    DayReport.findOneAndDelete({
      $and: [{ date: selectedDay }, { restaurant: restaurant._id }],
    }).then(dayreport => {
      Table.deleteMany({
        $and: [{ date: selectedDay }, { dayreport: dayreport._id }],
      }).then(tables => {
        Booking.deleteMany({
          $and: [{ date: selectedDay }, { restaurant: restaurant._id }],
        })
          .then(done => {
            res.json({ message: "Succesfully deleted" });
          })
          .catch(err => {
            console.log(err);
          });
      });
    });
  });
});

module.exports = router;
