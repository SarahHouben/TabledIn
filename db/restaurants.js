const { timeSlots } = require('../services/restaurants');
const Restaurant = require('../models/Restaurant');
const Project = require('../models/Project');

exports.createRestaurantDB = async (resData, owner) => {
  try {
    const data = resData;
    data.timeslots = await timeSlots(data.openingtimes);
    
    data.owner = owner;

    const restaurant = await Restaurant.create(data);

    return restaurant;
  } catch (err) {
    console.error(err);
  }
};

exports.projectUpdateDB = async (restaurant) => {
  const update = {
    $set: { name: restaurant.name, owned: true, restaurant: restaurant._id },
  };
  const query = { owner: false };

  try {
    await Project.findOneAndUpdate(query, update);
    return;
  } catch (err) {
    console.error(err);
  }
};

exports.getRestaurantDB = async (user) => {
  const filter = { owner: user };
  try {
    const restaurant = await Restaurant.findOne(filter);
    return restaurant;
  } catch (err) {
    console.erro(err);
  }
};

exports.updateRestaurantDB = async (data, user) => {
  const filter = { owner: user };
  const option = { new: true };
  const update = data;

  update.timeSlots = await timeSlots(data.openingtimes);

  update.owner = user;

  try {
    const restaurant = await Restaurant.findOneAndUpdate(
      filter,
      update,
      option
    );
    return restaurant;
  } catch (err) {
    console.error(err);
  }
};
