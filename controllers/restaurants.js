const { validationResult } = require('express-validator');
const { shellScript } = require('../services/google/ShellScript');
const { createAgent } = require('../services/google/CreateAgent');
const { deleteAgent } = require('../services/google/DeleteAgent');
const { uploadKey } = require('../services/google/UploadKey');
const {
  createRestaurantDB,
  getRestaurantDB,
  updateRestaurantDB,
} = require('../db/restaurants');



// @desc Create Restaurant and Dialogflow agent
// @route POST /api/v2/restaurants/
// @access Client
exports.createRestaurant = async (req, res) => {
  const data = req.body;
  const owner = req.user._id;

  try {
    const errors = await validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ message: errors.errors[0].msg });
    }

    const restaurant = await createRestaurantDB(data, owner);

    if (restaurant.googleassistant) {
      await projectUpdateDB(restaurant);

      await shellScript(project.id);

      await createAgent(project.id, restaurant.name);

      await uploadKey(project.id, restaurant.name);
      // deleteAgent('mmadqweqwegcls7777dasdd')
    }
    console.log(
      `Restaurant by the name of ${restaurant.name} was created by ${restaurant.owner}`
        .brightGreen
    );
    res.json(restaurant);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
};

// @desc Get Restaurant
// @route GET /api/v2/restaurants/
// @access Client
exports.getRestaurant = async (req, res) => {
  const user = req.user._id;

  try {
    const restaurant = await getRestaurantDB(user);

    res.json(restaurant);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

// @desc Update Restaurant
// @route PUT /api/v2/restaurants/
// @access Client
exports.updateRestaurant = async (req, res) => {
  const user = req.user._id;
  const data = req.body;

  try {
    const errors = await validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ message: errors.errors[0].msg });
    }

    const restaurant = await updateRestaurantDB(data, user);

    res.json(restaurant);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};
