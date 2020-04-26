const express = require('express');
const router = express.Router();
const {
  createRestaurant,
  getRestaurant,
  updateRestaurant,
} = require('../controllers/restaurants');

router
  .route('/')
  .get(getRestaurant)
  .post(createRestaurant)
  .put(updateRestaurant);

module.exports = router;
