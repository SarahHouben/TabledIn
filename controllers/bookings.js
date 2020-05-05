const { validationResult } = require('express-validator');
const {
  createBookingDB,
  getBookingsDB,
  deleteBookingDB,
} = require('../db/bookings');

// @desc Create Bookings along with DayReport
// @route POST /api/v2/bookings/
// @access Client and Dialogflow
exports.createBooking = async (req, res) => {
  try {
    const errors = await validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({ message: errors.errors[0].msg });
    }

    let owner;
    if (!req.body.dialogflow) {
      owner = req.user._id;
    } else {
      owner = req.body.owner;
    }
    const data = req.body;

    const booking = await createBookingDB(data, owner);

    res.json(booking);
  } catch (err) {
    console.error(err);
  }
};

// @desc Retrieve Bookings from DB
// @route GET /api/v2/bookings/
// @access Client
exports.getBookings = async (req, res) => {
  try {
    const user = req.user._id;

    const booking = await getBookingsDB(user);

    console.log('Bookings retrieved'.brightGreen);
    res.json(booking);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

// @desc Delete Bookings from DB
// @route DELETE /api/v2/bookings/
// @access Client
exports.deleteBooking = async (req, res) => {
  const id = req.params.id;

  try {
    const deleted = deleteBookingDB(id);

    if (deleted) {
      console.log('Booking Deleted'.brightGreen);
      res.json(deleted);
    }
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};
