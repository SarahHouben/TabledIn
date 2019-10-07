const express = require("express");
const router = express.Router();
const DayReport = require("../models/DayReport");
const Table = require("../models/Table");
const Booking = require("../models/Booking");
const { Restaurant, timeslots } = require("../models/Restaurant");
function getWeekDay(date) {
  var weekdays = new Array(
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  );
  //Return the element that corresponds to that index.
  return weekdays[date + 1].toLowerCase();
}

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
            console.log('Succesfully deleted')
            res.json({ message: "Succesfully deleted" });
          })
          .catch(err => {
            console.log(err);
          });
      });
    });
  });
});

// Crating new dayReport with tables that have timeslots coresponding
//with dayReport open/close times.
router.post("/edit", (req, res) => {
  if(!req.body.selectedDay){
    console.log('You need to select the date')
    res.json({message:'You need to select the date'});
  }else{
  const user = req.user._id;
  const { selectedDay, open, opentime, closetime } = req.body;
  const trimOpenTime = Number(opentime.replace(":", ""));
  const trimCloseTime = Number(closetime.replace(":", ""));
  const dayIndex = new Date(selectedDay).getDay() - 1;
  
  const day = getWeekDay(dayIndex);

  
   console.log(req.body.selectedDay)
  
  const openingtime = {
    [day]: { opentime: trimOpenTime, closetime: trimCloseTime },
  };
  const opendays = {
    monday: {},
    tuesday: {},
    wednesday: {},
    thursday: {},
    friday: {},
    saturday: {},
    sunday: {},
  };
  const openingtimes = Object.assign(opendays, openingtime);

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

  Restaurant.findOne({ owner: user }).then(restaurant => {
    DayReport.create({
      restaurant: restaurant._id,
      open: open,
      date: selectedDay,
      timeslots: combined,
      weekdays: restaurant.weekdays,
      tables: restaurant.tables,
      openingtime: trimOpenTime,
      closingtime: trimCloseTime,
    }).then(dayreport => {
      if (dayreport.open) {
        dayreport.tables.map(el => {
          Table.create({
            dayreport: dayreport._id,
            tablecapacity: el.cap,
            tablenumber: el.num,
            timeslots: dayreport.timeslots[dayIndex].timeslots,
            date: dayreport.date,
          });
        });
      }
    }).then(()=>{
      console.log('Day report created');
      // res.json({message: 'Day report created'})
    }).catch(err =>{
      res.json(err)
    });
  });
}});

module.exports = router;
