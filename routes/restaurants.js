const express = require('express');
const router = express.Router();
const {restaurantValidator} = require('../utils/validators')
const {
  createRestaurant,
  getRestaurant,
  updateRestaurant,
} = require('../controllers/restaurants');

router
  .route('/')
  .get(getRestaurant)
  .post(restaurantValidator,createRestaurant)
  .put(restaurantValidator,updateRestaurant);

module.exports = router;
