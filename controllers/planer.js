const { getWeekDay } = require('../services/planer');
const { openingTimes } = require('../services/planer');
const DayReport = require('../models/DayReport');
const Table = require('../models/Table');
const Booking = require('../models/Booking');
const Restaurant = require('../models/Restaurant');

exports.getReport = async (req, res) => {
  const { selectedDay } = req.body;

  const filterRestaurant = { owner: req.user._id };
  try {
    const restaurant = await Restaurant.findOne(filterRestaurant);

    const filterReport = {
      $and: [{ date: selectedDay }, { restaurant: restaurant._id }],
    };
    const report = await DayReport.findOne(filterReport);

    if (!report) {
      console.log('No schedule found for this day'.brightRed);
      return res.json({ message: 'No schedule found for this day.' });
    } else {
      console.log('Schedule Sent'.brightGreen);
      return res.json(report);
    }
  } catch (err) {
    console.error(err);
  }
};

exports.deleteReport = async (req, res) => {
  const { selectedDay } = req.body;
  try {
    const filterRestaurant = { owner: req.user._id };
    const restaurant = await Restaurant.findOne(filterRestaurant);
    const filterReport = {
      $and: [{ date: selectedDay }, { restaurant: restaurant._id }],
    };
    const report = await DayReport.findOneAndDelete(filterReport);
    const filterTable = {
      $and: [{ date: selectedDay }, { dayreport: report._id }],
    };
    const tables = await Table.deleteMany(filterTable);
    const filterBooking = {
      $and: [{ date: selectedDay }, { restaurant: restaurant._id }],
    };
    const booking = await Booking.deleteMany(filterBooking);

    console.log('Succesfully deleted'.brightGreen);
    res.json({ message: 'Succesfully deleted' });
  } catch (err) {
    console.error(err);
  }
};

exports.editReport = async (req, res) => {
  if (!req.body.selectedDay) {
    res.json({ message: 'You need to select the date' });
  } else {
    const user = req.user._id;
    const { selectedDay, open, opentime, closetime } = req.body;
    const trimOpenTime = Number(opentime.replace(':', ''));
    const trimCloseTime = Number(closetime.replace(':', ''));

    try {
      const day = await getWeekDay(selectedDay);
      const openingtime = {
        [day]: { opentime: trimOpenTime, closetime: trimCloseTime },
      };
      const combined = await openingTimes(openingtime);
      //  console.log(req.body.selectedDay)

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
      res.json({});
      console.log('Edited Report' .brightGreen);
    } catch (err) {
      console.error(err);
      res.json(err);
    }
  }
};
