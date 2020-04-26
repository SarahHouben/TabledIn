const express = require('express');
const router = express.Router();
const { getWeekDay } = require('../utils/getWeekDay');
const { filterTables } = require('../utils/filterTables');
const { updateTables } = require('../utils/updateTables');
const Booking = require('../models/Booking');
const DayReport = require('../models/DayReport');
const Table = require('../models/Table');
const { Restaurant } = require('../models/Restaurant');

exports.createBooking = async (req, res) => {
  try{

  
  let owner;
  if (!req.body.dialogflow) {
    owner = req.user._id;
  } else {
    owner = req.body.owner;
  }

  const {
    selectedDay,
    guestnumber,
    arrivaltime,
    name,
    phone,
    email,
    dialogflow,
    webapp,
  } = req.body;

  const dayIndex = new Date(selectedDay).getDay() - 1;
  const day = await getWeekDay(selectedDay);
  const resTime = Number(arrivaltime.replace(':', ''));
  
  //Finding users restaurant
  const restaurant = await Restaurant.findOne(
    { owner: owner },
    { tables: 1, timeslots: 1, weekdays: 1, openingtime: 1 }
  );

  const find = await DayReport.findOne({
    $and: [{ date: selectedDay }, { restaurant: restaurant._id }],
  });

  

  
  //Checking if there is day report for specific restaurant and creating dayreport if there is none
  
  //if there is a dayreport created it finds tables for that capacity and selected date
 
  if (find && find.open) {
    const tables = await Table.find({
      $and: [
        { tablecapacity: { $gt: guestnumber - 1 } },
        { dayreport: find._id },
        { date: selectedDay },
      ],
    });
    // console.log(tables);
    const availableTables = await filterTables(tables, resTime);
    
    //if there is table that can fit our reservation we take 0 index because its
    //table with lowest number of places for the number of people that we need to fit.
    //Now we set timeslots of given table that we reserved to true.

    if (find.openingtime > resTime || find.closingtime < resTime) {
      
      console.log('Restaurant is closed at selected time'.red);
      res.json({ message: 'Restaurant is closed at selected time' });
    } else if (availableTables.length > 0) {
      const updatedTimeslots = await updateTables(availableTables, resTime);
      //We update table timeslots with updatedTimeslots object maped before
      if (name) {
        const table = await Table.findByIdAndUpdate(
          availableTables[0]._id,
          { $set: { timeslots: updatedTimeslots } },
          { new: true }
        );

        const booking = await Booking.create({
          date: selectedDay,
          visitorcount: guestnumber,
          visitorname: name,
          visitorphone: phone,
          visitoremail: email,
          tablenumber: table.tablenumber,
          restaurant: restaurant._id,
          timeslot: resTime,
          dialogflow: dialogflow,
          webapp: webapp,
        });

        console.log('booking created'.green);
        res.json(booking);
      } else {
        res.json({ message: 'You need name to make reservation' });
      }
    } else {
      console.log('No free tables. Pick another time.'.brightRed);
      res.json({
        message: 'No free tables. Pick another time.',
      });
    }
  } else {
    //if there is no dayreport for that day it checks if the restaurant is open for that day
    //and creates the day report.
    if (restaurant.weekdays[day] && !find) {
      const dayReport = await DayReport.create({
        restaurant: restaurant._id,
        open: true,
        date: selectedDay,
        timeslots: restaurant.timeslots,
        weekdays: restaurant.weekdays,
        tables: restaurant.tables,
        openingtime: restaurant.openingtime[day].opentime,
        closingtime: restaurant.openingtime[day].closetime,
      });

      await dayReport.tables.map((el) => {
        Table.create({
          dayreport: dayReport._id,
          tablecapacity: el.cap,
          tablenumber: el.num,
          timeslots: dayReport.timeslots[dayIndex].timeslots,
          date: dayReport.date,
        });
      });
      const find = await DayReport.findOne({
        $and: [{ date: selectedDay }, { restaurant: restaurant._id }],
      });

      const tables = await Table.find({
        $and: [
          { tablecapacity: { $gt: guestnumber - 1 } },
          { dayreport: find._id },
          { date: selectedDay },
        ],
      });

      const availableTables = await filterTables(tables, resTime);
      //if there is table that can fit our reservation we take 0 index because its
      //table with lowest number of places for the number of people that we need to fit.
      //Now we set timeslots of given table that we reserved to true.
      if (find.openingtime > resTime || find.closingtime < resTime) {
        console.log('Restaurant is closed at selected time'.red);
        res.json({
          message: 'Restaurant is closed at selected time',
        });
      } else if (availableTables.length > 0) {
        const updatedTimeslots = await updateTables(availableTables, resTime);

        //We update table timeslots with updatedTimeslots object maped before
        if (name) {
          const table = await Table.findByIdAndUpdate(
            availableTables[0]._id,
            { $set: { timeslots: updatedTimeslots } },
            { new: true }
          );
          //Creating booking with all the data that we used so far.

          const booking = await Booking.create({
            date: selectedDay,
            visitorcount: guestnumber,
            visitorname: name,
            visitorphone: phone,
            visitoremail: email,
            tablenumber: table.tablenumber,
            restaurant: restaurant._id,
            timeslot: resTime,
            webapp: webapp,
            dialogflow: dialogflow,
          });

          console.log('booking created');
          res.json(booking);
        } else {
          res.json({
            message: 'You need name to make reservation',
          });
        }
      } else {
        console.log('No free tables. Pick another time.');
        res.json({
          message: 'No free tables. Pick another time.',
        });
      }
    } else {
      console.log('Closed on this day. Pick another date');
      res.json({ message: 'Closed on this day. Pick another date.' });
    }
  }
}catch(err){
  console.error(err)
}
};
