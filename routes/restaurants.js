const express = require("express");
const router = express.Router();
const { Restaurant, timeslots } = require("../models/Restaurant");

// Create new restaurant document
router.post("/", (req, res) => {
  const name = req.body.name;
  const address = req.body.address;
  const phone = req.body.phone;
  const email = req.body.email;
  const logo = req.body.logo;
  const menu = req.body.menu;
  const weekdays = req.body.weekdays;
  const tablenumber = req.body.tablenumber;
  const tables = req.body.tables;
  const openingtimes = req.body.openingtimes;

  // map the timeslots array with the openingtimes in combined
  let combined = timeslots.map(timeSlotObj => {
    let businessTime = openingtimes[timeSlotObj.day];
    if (businessTime.opentime) {
      for (let key in timeSlotObj.timeslots) {
        let timeNum = Number(key);
        let openingTime = businessTime.opentime;
        let closingTime = businessTime.closetime;

        if (timeNum < closingTime && timeNum > openingTime)
          timeSlotObj.timeslots[key] = true;
      }
      return timeSlotObj;
    } else return timeSlotObj;
  });

  const owner = req.user._id;
  Restaurant.create({
    name: name,
    address: address,
    phone: phone,
    email: email,
    logo: logo,
    menu: menu,
    weekdays: weekdays,
    tablenumber: tablenumber,
    tables: tables,
    openingtime: openingtimes,
    timeslots: combined,
    owner: owner
  })
    .then(restaurant => {
      // console.log(restaurant);
      res.json(restaurant);
    })
    .catch(err => {
      res.json(err);
    });
});

// Gets data from existing restaurant document
router.get("/", (req, res) => {
  const user = req.user._id;

  Restaurant.findOne({ owner: user })
    .then(restaurant => {
      // console.log(restaurant);
      res.json(restaurant);
    })
    .catch(err => {
      res.json(err);
    });
});

//Update existing restaurant document
router.put("/", (req, res) => {
  const user = req.user._id;

  const name = req.body.name;
  const address = req.body.address;
  const phone = req.body.phone;
  const email = req.body.email;
  const logo = req.body.logo;
  const menu = req.body.menu;
  const weekdays = req.body.weekdays;
  const tablenumber = req.body.tablenumber;
  const tables = req.body.tables;
  const openingtimes = req.body.openingtimes;

  // map the timeslots array with the openingtimes in combined
  let combined = timeslots.map(timeSlotObj => {
    let businessTime = openingtimes[timeSlotObj.day];
    if (businessTime && businessTime.opentime) {
      for (let key in timeSlotObj.timeslots) {
        let timeNum = Number(key);
        let openingTime = businessTime.opentime;
        let closingTime = businessTime.closetime;

        if (timeNum < closingTime && timeNum > openingTime)
          timeSlotObj.timeslots[key] = true;
      }
      return timeSlotObj;
    } else return timeSlotObj;
  });

  const filter = { owner: user };
  Restaurant.findOneAndUpdate(
    filter,
    {
      name: name,
      address: address,
      phone: phone,
      email: email,
      logo: logo,
      menu: menu,
      weekdays: weekdays,
      tablenumber: tablenumber,
      tables: tables,
      openingtime: openingtimes,
      timeslots: combined
    },
    { new: true }
  )
    .then(restaurant => {
      console.log(restaurant);
      res.json(restaurant);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
