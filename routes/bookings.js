const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const DayReport = require("../models/DayReport");
const { Restaurant } = require("../models/Restaurant");
const Table = require("../models/Table");
const addMinutes = require("date-fns/addMinutes");

// POST /api/bookings
// create a new `booking` resource
router.post("/", (req, res) => {
  const selectedDay = req.body.selectedDay;
  const guestnumber = req.body.guestnumber;
  const arrivaltime = req.body.arrivaltime;
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  const owner = req.user._id;
  const dayIndex = new Date(selectedDay).getDay();
  function getWeekDay(date) {
    //Create an array containing each day, starting with Sunday.
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
    return weekdays[dayIndex].toLowerCase();
  }
  const day = getWeekDay(selectedDay);
  const newNum = Number(arrivaltime.replace(":", ""));

  //Finding users restaurant
  Restaurant.findOne(
    { owner: owner },
    { tables: 1, timeslots: 1, weekdays: 1 }
  ).then(restaurant => {
    //Checking if there is day report for specific restaurant and creating dayreport if there is none
    // console.log(restaurant.weekdays);
    DayReport.findOne({
      $and: [{ date: selectedDay }, { restaurant: restaurant._id }]
    }).then(find => {
      // console.log(find._id)
      if (find) {
        // console.log(find._id)
        Table.find({
          $and: [
            { tablecapacity: { $gt: guestnumber - 1 } },
            { dayreport: find._id },
            { date: selectedDay }
          ]
        }).then(tables => {
          console.log(newNum);
          /*  const hour = newNum.toString().slice(0,2)
          const minute = newNum.toString().slice(2,5) */
          // console.log(hour,minute)
          // var result = addMinutes(new Date(2014, 6, 10,Number(hour),Number(minute) ), 30,)
          // console.log(result)
          // //  console.log(tables)
          // const newNum1 = newNum
          // const newNum2 = newNum +15

          // const newNum3 = newNum + 30
          // const newNum4 = newNum + 45

          const futTable = tables
            .filter(table => {
              let timeSlotArray = Object.keys(table.timeslots);
              let availabilityArray = Object.values(table.timeslots);
              let timeSlotIndex = timeSlotArray.indexOf(newNum.toString());

              let checkArray = [];

              for (let i = 0; i <= 3; i++) {
                checkArray.push(
                  availabilityArray[
                    (timeSlotIndex + i) % availabilityArray.length
                  ]
                );
              }

              return !checkArray.includes(false);
            })
            .sort((a, b) => {
              return a.tablecapacity - b.tablecapacity;
            });

          // const timeObj = {[newNum1]: false,[newNum2]:false,[newNum3]:false,[newNum4]:false};
          /*   console.log("this is", futTable[0]); */
          let timeSlotArray = Object.keys(futTable[0].timeslots);
          let availabilityArray = Object.values(futTable[0].timeslots);
          let timeSlotIndex = timeSlotArray.indexOf(newNum.toString());

          let updatedTimeslots = availabilityArray
            .map((timeSlot, index) => {
              if (
                index !== timeSlotIndex &&
                index !== (timeSlotIndex + 1) % availabilityArray.length &&
                index !== (timeSlotIndex + 2) % availabilityArray.length &&
                index !== (timeSlotIndex + 3) % availabilityArray.length
              ) {
                return timeSlot;
              } else {
                return false;
              }
            })
            .reduce((acc, val, i) => {
              acc[timeSlotArray[i]] = val;
              return acc;
            }, {});

          Table.findByIdAndUpdate(
            futTable[0]._id,
            { $set: { timeslots: updatedTimeslots } },
            { new: true }
          ).then(table => {
            console.log(table);
          });
          // const reservedTable= Object.assign(futTable[0].timeslots, timeObj)

          // console.log(reservedTable)
        });
      } else {
        // console.log(restaurant.weekdays)
        if (restaurant.weekdays[day]) {
          DayReport.create({
            restaurant: restaurant._id,
            date: selectedDay,
            timeslots: restaurant.timeslots,
            weekdays: restaurant.weekdays,
            tables: restaurant.tables
          }).then(dayReport => {
            dayReport.tables.map(el => {
              Table.create({
                dayreport: dayReport._id,
                tablecapacity: el.cap,
                tablenumber: el.num,
                timeslots: dayReport.timeslots[dayIndex].timeslots,
                date: dayReport.date
              });
            });
          });
        } else {
          res.json({ message: "The restaurant is closed on that date" });
        }
      }
    });

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
  });

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




//######## ############# ########## Get information for all bookings
router.get("/", (req, res) => {
  const user = req.user._id;
  Booking.find({ owner: user })
    .then(booking => {
      console.log(booking);
      res.json(booking);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
