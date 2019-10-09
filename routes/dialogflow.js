// ###### Milestone 1 ######
// 1. Default welcome intent -  Create default welcome intent for each
// restaurant and continue conversation with restaurants Agent
// 2. Intent - User makes reservation at restaurant
// Take date,time and number of people from user and check if there are free tables.
// 3. Permision - If there is free table ask permition to take his name and number or email from google.
// 4. Intent - Create reservation - Once its confirmed there is table user confirms as well
// 5. Intent - Cancel the reservation - user can ask to cancel reservation at any time
​
// ######  Milestone 2  ######
// 6. Agent/Create - Create specific Agent during Restaurant creation and asign webhook that has restaurant
// id in the end
// ## if not possible create custom webhook link which you would use to manualy create Agent
// inside dialogflow interface
// 7. Intent/Permision - Ask about directions - we have code from greenspace
// 8. Intent/Permision - Ask how much time you need to get there - we have code from greenspace
​
// ###### MILESTONE 3 ######
// 8. Integration - Google phone service
// 8. Integration - Decide which other service we wonna use?
// bonus: websocket for displaying reservations as soon as they are made - otherwise use
// bonus: Ask about day speciality
// bonus: Try to create reservation in his calendar
// rendering page at sertain amount of time
// not neccessary: opening times
​
// Try to make conversations as human as possible - its a real person substitute
​
"use strict";
​
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router().use(bodyParser.json());
const axios = require("axios");
const moment = require("moment");
const Booking = require("../models/Booking");
const DayReport = require("../models/DayReport");
const { Restaurant } = require("../models/Restaurant");
const Table = require("../models/Table");
const {
  dialogflow,
  SignIn,
  Suggestions,
  DateTime,
  Permission
} = require("actions-on-google");
const app = dialogflow({ debug: true });
​
app.intent("Default Welcome Intent", conv => {
  conv.ask(`Welcome to TabledIn! Please choose a restaurant.`);
});
​
// app.intent("Welcome", conv => {
//   console.log('THIS IS RESPONSE')
//   const marko = Object.keys(conv.contexts.input)[0]
//   console.log(marko)
//   conv.ask('Welcome to Da Toni Pizzeria,how can i help you?')
// })
​
Restaurant.find()
  .then(restaurants => {
    restaurants.forEach(res => {
      app.intent(res._id, conv => {
        conv.ask(`Welcome to ${res.name}. How can I help you?`);
      });
    });
  })
  .catch(err => {
    console.log(err);
  });
​
// Creating booking
Restaurant.find()
  .then(restaurants => {
    restaurants.forEach(res => {
      app.intent(
        `${res._id} - Reservation`,
        async (conv, { guestnumber, selectedDay, arrivalTime }, permision) => {
          const arrivaltime = moment(arrivalTime).format("HH:mm");
          const response = await axios.post(
            "http://localhost:5555/api/bookings",
            {
              guestnumber,
              selectedDay,
              arrivaltime,
              owner: res.owner._id,
              dialogflow: true
            }
          );
          console.log(response.data);
​
          if (
            response.data.message == "Restaurant is closed at selected time"
          ) {
            conv.ask(
              `I'm afraid the restaurant is closed at that time. Can I help you with something else?`
            );
          } else if (
            response.data.message == "No free tables. Pick another time."
          ) {
            conv.ask(
              `I'm sorry, the restaurant is already fully booked at this time. Can I help you with something else?`
            );
          } else if (
            response.data.message == "Closed on this day. Pick another date"
          ) {
            conv.ask(
              `Unfortunately the restaurant is closed on that day. Can I help you with something else?`
            );
          } else {
            conv.ask(
              new Image({
                url:
                  "https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/imgs/160204193356-01-cat-500.jpg",
                alt: "A cat"
              })
            );
​
            // new Permission({
            //   context: "",
            //   permissions: "NAME"
            // })
            // new Permission({
            //   context: "",
            //   permissions: "NAME",
            //   guestnumber,
            //   selectedDay,
            //   arrivaltime,
            // })
            // );
          }
        }
      );
      app.intent(`${res._id}-name`, (conv, params, granted) => {
        const explicit = conv.arguments.get("PERMISSION"); // also retrievable w/ explicit arguments.get
        const name = conv.user.name;
        const firstName = conv.contexts.get("values").parameters["guestnumber"];
        console.log(name);
        console.log(
          "#heeeeeeeeereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
          params.guestnumber
        );
        conv.ask("what now?");
      });
    });
  })
  .catch(err => {
    console.log(err);
  });
​
//
// Restaurant.find().then(restaurants => {
//   restaurants.forEach(res => {
//     app.intent(
//       `${res._id} - Reservation`,
//       (conv, { guestnumber, selectedDay, arrivaltime }) => {
//         // const name = req.body.name;
//         // const phone = req.body.phone;
//         // const email = req.body.email;
//         // const owner = req.user._id;
//         const dayIndex = new Date(selectedDay).getDay() - 1;
//         const day = moment(selectedDay).format('dddd')
//         const time = moment(arrivaltime).format('hmm')
//         console.log(day)
//         console.log(dayIndex);
//         console.log(time)
//         conv.ask('Let me check that for you');
​
//       }
//     );
//   });
// });
​
router.post("/", app);
​
module.exports = router;