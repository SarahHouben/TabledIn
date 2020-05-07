const { getWeekDay } = require('../utils/getWeekDay');
const { filterTables } = require('../services/bookings');
const { updateTables } = require('../services/bookings');
const Booking = require('../models/Booking');
const DayReport = require('../models/DayReport');
const Table = require('../models/Table');
const Restaurant = require('../models/Restaurant');

exports.createBookingDB = async (data, owner) => {
  const {
    selectedDay,
    guestnumber,
    arrivaltime,
    name,
    phone,
    email,
    dialogflow,
    webapp,
  } = data;

  const dayIndex = new Date(selectedDay).getDay() - 1;
  const day = await getWeekDay(selectedDay);
  const arival = Number(arrivaltime.replace(':', ''));

  const filterRestaurant = {
    tables: 1,
    timeslots: 1,
    weekdays: 1,
    openingtimes: 1,
  };
  const restaurant = await Restaurant.findOne({ owner }, filterRestaurant);

  const filterReport = {
    $and: [{ date: selectedDay }, { restaurant: restaurant._id }],
  };
  const report = await DayReport.findOne(filterReport);

  //Checking if there is day report for specific restaurant and creating dayreport if there is none

  //if there is a dayreport created it finds tables for that capacity and selected date

  if (report && report.open) {
    const filter = {
      $and: [
        { tablecapacity: { $gt: guestnumber - 1 } },
        { dayreport: report._id },
        { date: selectedDay },
      ],
    };
    const tables = await Table.find(filter);
    console.log(tables);

    const availableTables = await filterTables(tables, arival);

    //if there is table that can fit our reservation we take 0 index because its
    //table with lowest number of places for the number of people that we need to fit.
    //Now we set timeslots of given table that we reserved to true.

    if (report.openingtime > arival || report.closingtime < arival) {
      console.log('Restaurant is closed at selected time'.red);
      return { message: 'Restaurant is closed at selected time' };
    } else if (availableTables.length > 0) {
      const updatedTimeslots = await updateTables(availableTables, arival);
      //We update table timeslots with updatedTimeslots object maped beforehand
      if (name) {
        const filter = availableTables[0]._id;
        const update = { $set: { timeslots: updatedTimeslots } };
        const option = { new: true };

        const table = await Table.findByIdAndUpdate(filter, update, option);

        const data = {
          date: selectedDay,
          visitorcount: guestnumber,
          visitorname: name,
          visitorphone: phone,
          visitoremail: email,
          tablenumber: table.tablenumber,
          restaurant: restaurant._id,
          timeslot: arival,
          dialogflow: dialogflow,
          webapp: webapp,
        };
        const booking = await Booking.create(data);

        console.log('booking created'.brightGreen);
        return booking;
      } else {
        return { message: 'You need name to make reservation' };
      }
    } else {
      console.log('No free tables. Pick another time.'.brightRed);
      return {
        message: 'No free tables. Pick another time.',
      };
    }
  } else {
    //if there is no dayreport for that day it checks if the restaurant is open for that day
    //and creates the day report.
    if (restaurant.weekdays[day] && !report) {
      const data = {
        restaurant: restaurant._id,
        open: true,
        date: selectedDay,
        timeslots: restaurant.timeslots,
        weekdays: restaurant.weekdays,
        tables: restaurant.tables,
        openingtime: restaurant.openingtimes[day].opentime,
        closingtime: restaurant.openingtimes[day].closetime,
      };
      const dayReport = await DayReport.create(data);

      await dayReport.tables.map((el) => {
        const data = {
          dayreport: dayReport._id,
          tablecapacity: el.cap,
          tablenumber: el.num,
          timeslots: dayReport.timeslots[dayIndex].timeslots,
          date: dayReport.date,
        };
        Table.create(data);
      });
      const filterReport = {
        $and: [{ date: selectedDay }, { restaurant: restaurant._id }],
      };

      const report = await DayReport.findOne(filterReport);

      const filterTable = {
        $and: [
          { tablecapacity: { $gt: guestnumber - 1 } },
          { dayreport: report._id },
          { date: selectedDay },
        ],
      };
      const tables = await Table.find(filterTable);

      const availableTables = await filterTables(tables, arival);
      //if there is table that can fit our reservation we take 0 index because its
      //table with lowest number of places for the number of people that we need to fit.
      //Now we set timeslots of given table that we reserved to true.
      if (report.openingtime > arival || report.closingtime < arival) {
        console.log('Restaurant is closed at selected time'.brightRed);
        return {
          message: 'Restaurant is closed at selected time',
        };
      } else if (availableTables.length > 0) {
        const updatedTimeslots = await updateTables(availableTables, arival);

        //We update table timeslots with updatedTimeslots object maped before
        if (name) {
          const filter = availableTables[0]._id;
          const update = { $set: { timeslots: updatedTimeslots } };
          const option = { new: true };

          const table = await Table.findByIdAndUpdate(filter, update, option);
          //Creating booking with all the data that we used so far.
          const data = {
            date: selectedDay,
            visitorcount: guestnumber,
            visitorname: name,
            visitorphone: phone,
            visitoremail: email,
            tablenumber: table.tablenumber,
            restaurant: restaurant._id,
            timeslot: arival,
            webapp: webapp,
            dialogflow: dialogflow,
          };

          const booking = await Booking.create(data);

          console.log('booking created'.brightGreen , booking);
          return booking;
        } else {
          return {
            message: 'You need name to make reservation',
          };
        }
      } else {
        console.log('No free tables. Pick another time.'.brightRed);
        return {
          message: 'No free tables. Pick another time.',
        };
      }
    } else {
      console.log('Closed on this day. Pick another date'.brightRed);
      return { message: 'Closed on this day. Pick another date.' };
    }
  }
};

exports.getBookingsDB = async (user) => {
  try {
    const restaurant = await Restaurant.findOne({ owner: user });
    const booking = await Booking.find({ restaurant: restaurant._id });

    return booking;
  } catch (err) {
    console.error(err);
  }
};

exports.deleteBookingDB = async (id) => {
  try {
    const deleted = await Booking.findByIdAndDelete(id);
    return deleted;
  } catch (err) {
    console.error(err);
  }
};
