const express = require('express');
const router = express.Router();
const { bookingValidator } = require('../utils/validators');
const {
  createBooking,
  getBookings,
  deleteBooking,
} = require('../controllers/bookings');

router.route('/').post(bookingValidator, createBooking).get(getBookings);
router.route('/:id').delete(deleteBooking);

module.exports = router;
