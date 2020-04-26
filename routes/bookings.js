const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const DayReport = require('../models/DayReport');
const { Restaurant } = require('../models/Restaurant');
const Table = require('../models/Table');
const { createBooking } = require('../controllers/bookings');

// POST /api/bookings
// create a new booking resource
router.route('/').post(createBooking);

//######## ############# ########## Get information for all bookings
router.get('/', (req, res) => {
  const user = req.user._id;
  Restaurant.findOne({ owner: user }).then((restaurant) => {
    Booking.find({ restaurant: restaurant._id })
      .then((booking) => {
        // console.log(booking);
        res.json(booking);
      })
      .catch((err) => {
        res.json(err);
      });
  });
});

//######## ############# ########## Delete booking with certain id

router.delete('/:id', (req, res) => {
  Booking.findByIdAndDelete(req.params.id)
    .then(() => {
      console.log('Deleted booking');
      res.json({ message: 'Deleted booking' });
    })
    .catch((err) => {
      res.json(err);
    });
});
const restaurantIds = Restaurant.find({ _id: 1 });
console.log(restaurantIds);
module.exports = router;
