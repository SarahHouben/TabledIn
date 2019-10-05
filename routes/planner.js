const express = require("express");
const router = express.Router();
const DayReport = require("../models/DayReport");
const { Restaurant } = require("../models/Restaurant");

// Get date selected in calender
router.post("/", (req, res) => {
  const selectedDay = req.body.selectedDay;

  const user = req.user._id;
  Restaurant.findOne({ owner: user }).then(restaurant => {
    DayReport.findOne({
      $and: [{ date: selectedDay }, { restaurant: restaurant._id }]
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


module.exports = router;
