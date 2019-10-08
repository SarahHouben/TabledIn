// ###### Milstone 1 ######
// 1. Default welcome intent -  Create default welcome intent for each
// restaurant and continue conversation with restaurants Agent
// 2. Intent - User makes reservation at restaurant
// Take date,time and number of people from user and check if there are free tables.
// 3. Permision - If there is free table ask permition to take his name and number or email from google.
// 4. Intent - Create reservation - Once its confirmed there is table user confirms as well
// 5. Intent - Cancel the reservation - user can ask to cancel reservation at any time

// ######  Milstone 2  ######
// 6. Agent/Create - Create specific Agent during Restaurant creation and asign webhook that has restaurant
// id in the end
// ## if not possible create custom webhook link which you would use to manualy create Agent
// inside dialogflow interface
// 7. Intent/Permision - Ask about directions - we have code from greenspace
// 8. Intent/Permision - Ask how much time you need to get there - we have code from greenspace

// ###### MILSTONE 3 ######
// 8. Integration - Google phone service
// 8. Integration - Decide which other service we wonna use?
// bonus: websocket for displaying reservations as soon as they are made - otherwise use
// bonus: Ask about day speciality
// bonus: Try to create reservation in his calendar
// rendering page at sertain amount of time
// not neccessary: opening times

// Try to make conversations as human as possible - its a real person substitute

"use strict";

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const Booking = require("../models/Booking");
const DayReport = require("../models/DayReport");
const { Restaurant } = require("../models/Restaurant");
const Table = require("../models/Table");
const { dialogflow, SignIn, Suggestions } = require("actions-on-google");
const app = dialogflow({ debug: true });

// app.intent("Booking", conv => {
//   console.log("THIS IS RESPONSE", conv.request);

//   conv.close("Hello, World!");
//   // Complete your fulfillment logic and
//   // send a response when the function is done executing
// });

app.intent("Default Welcome Intent", conv => {
  conv.ask("Welcome to Tabled In ,please chose restaurant?");
});

// app.intent("Welcome", conv => {
//   console.log('THIS IS RESPONSE')
//   const marko = Object.keys(conv.contexts.input)[0]
//   console.log(marko)
//   conv.ask('Welcome to Da Toni Pizzeria,how can i help you?')
// })

Restaurant.find()
  .then(restaurants => {
    restaurants.forEach(res => {
      app.intent(res._id, conv => {
        
        // const marko = conv.contexts.input
        // console.log(marko)
        conv.ask(`Welcome to ${res.name} ,how can i help you?`);
      });
    });
  })
  .catch(err => {
    console.log(err);
  });

Restaurant.find()
  .then(restaurants => {
    restaurants.forEach(res => {
      app.intent(`${res._id} - Reservation`, (conv ,{numberofpeople,date,arivalTime}) => {
       
        
        conv.ask('Let me check that for you');
        

      });
    })
  })
  .catch(err => {
    console.log(err);
  });

// ["Welcome"].forEach(intent => {

//   app.intent(intent, conv => {
//     console.log('THIS IS RESPONSE')
//     // const marko = conv.contexts.input
//     // console.log(marko)
//     conv.ask('Welcome to Da Toni Pizzeria,how can i help you?')
//   })
// })

router.post("/", app);

module.exports = router;
