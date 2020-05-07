const { getWeekDay } = require('../utils/getWeekDay');
const { openingTimes } = require('../services/planer');
const { getRestaurantDB } = require('../db/restaurants');
const DayReport = require('../models/DayReport');
const Table = require('../models/Table');
const Booking = require('../models/Booking');
const Restaurant = require('../models/Restaurant');

exports.getReportDB = async (selectedDay, user) => {
  try {
    const restaurant = await getRestaurantDB(user);
    const filterReport = {
      $and: [{ date: selectedDay }, { restaurant: restaurant._id }],
    };

    const report = await DayReport.findOne(filterReport);

    if (!report) {
      console.log('No schedule found for this day'.brightRed);
      return { message: 'No schedule found for this day.' };
    } else {
      console.log('Schedule Sent'.brightGreen);
      return report;
    }
  } catch (err) {
    console.error(err);
  }
};

exports.deleteReportDB = async (selectedDay, user) => {
  try {
    const filterRestaurant = { owner: user };
    const restaurant = await Restaurant.findOne(filterRestaurant);
    const filterReport = {
      $and: [{ date: selectedDay }, { restaurant: restaurant._id }],
    };
    const report = await DayReport.findOneAndDelete(filterReport);
    const filterTable = {
      $and: [{ date: selectedDay }, { dayreport: report._id }],
    };
    await Table.deleteMany(filterTable);
    const filterBooking = {
      $and: [{ date: selectedDay }, { restaurant: restaurant._id }],
    };
    await Booking.deleteMany(filterBooking);
    return;
  } catch (err) {
    console.error(err);
  }
};

exports.editReportDB = async (data, user) => {
  const { selectedDay, open, opentime, closetime } = data;
  const trimOpenTime = Number(opentime.replace(':', ''));
  const trimCloseTime = Number(closetime.replace(':', ''));

  try {
    const day = await getWeekDay(selectedDay);
    const openingtime = {
      [day]: { opentime: trimOpenTime, closetime: trimCloseTime },
    };
    console.log(openingtime);
    const combined = await openingTimes(openingtime);

    const filter = { owner: user };
    const restaurant = await Restaurant.findOne(filter);
    const data = {
      restaurant: restaurant._id,
      open: open,
      date: selectedDay,
      timeslots: combined,
      weekdays: restaurant.weekdays,
      tables: restaurant.tables,
      openingtime: trimOpenTime,
      closingtime: trimCloseTime,
    };
    const report = await DayReport.create(data);

    if (report.open) {
      const dayIndex = new Date(selectedDay).getDay() - 1;
      await report.tables.map(async (el) => {
        const data = {
          dayreport: report._id,
          tablecapacity: el.cap,
          tablenumber: el.num,
          timeslots: report.timeslots[dayIndex].timeslots,
          date: report.date,
        };
        await Table.create(data);
      });
    }
    return;
  } catch (err) {
    console.error(err);
  }
};
