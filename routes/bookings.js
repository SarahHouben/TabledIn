const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const DayReport = require("../models/DayReport");
const { Restaurant } = require("../models/Restaurant");
const Table = require("../models/Table");
const addMinutes = require("date-fns/addMinutes");


// POST /api/bookings
// create a new booking resource
router.post("/", (req, res) => {
 const selectedDay = req.body.selectedDay;
 const guestnumber = req.body.guestnumber;
 const arrivaltime = req.body.arrivaltime;
 const name = req.body.name;
 const phone = req.body.phone;
 const email = req.body.email;
 const owner = req.user._id;
 const dayIndex = new Date(selectedDay).getDay() - 1;
 console.log('date i get from fe',selectedDay);
 console.log('day INDEX',dayIndex);
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
   return weekdays[(dayIndex+1)].toLowerCase();
 }
  const day = getWeekDay(selectedDay);
  const resTime = Number(arrivaltime.replace(":", ""));

  //Finding users restaurant
  Restaurant.findOne(
    { owner: owner },
    { tables: 1, timeslots: 1, weekdays: 1 }
  ).then(restaurant => {
    //Checking if there is day report for specific restaurant and creating dayreport if there is none

    DayReport.findOne({
      $and: [{ date: selectedDay }, { restaurant: restaurant._id }],
    }).then(find => {
      //if there is a dayreport created it finds tables for that capacity and selected date
      if (find) {
        Table.find({
          $and: [
            { tablecapacity: { $gt: guestnumber - 1 } },
            { dayreport: find._id },
            { date: selectedDay },
          ],
        })
          .then(tables => {
            //Filters available tables for given timeslots and sorts by lowest capacity(that can fit
            //number of people that we need to make reservation)
            const availableTables = tables
              .filter(table => {
                let timeSlotArray = Object.keys(table.timeslots);
                let availabilityArray = Object.values(table.timeslots);
                let timeSlotIndex = timeSlotArray.indexOf(resTime.toString());
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
            //if there is table that can fit our reservation we take 0 index because its
            //table with lowest number of places for the number of people that we need to fit.
            //Now we set timeslots of given table that we reserved to true.
            if (availableTables.length > 0) {
              let timeSlotArray = Object.keys(availableTables[0].timeslots);
              let availabilityArray = Object.values(
                availableTables[0].timeslots
              );
              let timeSlotIndex = timeSlotArray.indexOf(resTime.toString());

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

              //We update table timeslots with updatedTimeslots object maped before
              Table.findByIdAndUpdate(
                availableTables[0]._id,
                { $set: { timeslots: updatedTimeslots } },
                { new: true }
              ).then(table => {
                //Creating booking with all the data that we used so far.
                Booking.create({
                  date: selectedDay,
                  visitorcount: guestnumber,
                  visitorname: name,
                  visitorphone: phone,
                  visitoremail: email,
                  tablenumber: table.tablenumber,
                  restaurant: restaurant._id,
                  timeslot: resTime,
                })
                  .then(booking => {
                    res.json(booking);
                  })
                  .catch(err => {
                    res.json(err);
                  });
              });
            } else {
              res.json({
                message: "No free tables. Pick another time.",
              });
            }
          })
          .catch(err => {
            res.json(err);
          });
      } else {
        //if there is no dayreport for that day it checks if the restaurant is open for that day
        //and creates the day report.
        if (restaurant.weekdays[day]) {
          DayReport.create({
            restaurant: restaurant._id,
            date: selectedDay,
            timeslots: restaurant.timeslots,
            weekdays: restaurant.weekdays,
            tables: restaurant.tables,
          })
            .then(dayReport => {
              //Day report creates tables for that day with timeslots coresponding
              //with opening times for that day.
              dayReport.tables.map(el => {
                Table.create({
                  dayreport: dayReport._id,
                  tablecapacity: el.cap,
                  tablenumber: el.num,
                  timeslots: dayReport.timeslots[dayIndex].timeslots,
                  date: dayReport.date,
                });
              });
            })
            .catch(err => {
              res.json(err);
            });
        } else {
          res.json({ message: "Closed on this day. Pick another date" });
        }
        //The reason we do this is not to copy all of our code when there is no day report
        //First we create report and tables and finish our request here,then we do same code again
        //only this time there is report for tis day and booking is created if possible
        res.json({
          //Maybe fire loading popup ?????
          message: "Dayreport created,click one more time to make reservation",
        });
      }
    });
  }).catch(err => {
    res.json(err);
  });;
});



//######## ############# ########## Get information for all bookings
router.get("/", (req, res) => {
  const user = req.user._id;
  Restaurant.findOne({owner:user}).then(restaurant=>{
  Booking.find({ restaurant: restaurant._id })
    .then(booking => {
      // console.log(booking);
      res.json(booking);
    })
    .catch(err => {
      res.json(err);
    });
  })
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

module.exports = router;
