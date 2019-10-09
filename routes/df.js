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
const axios = require("axios");
const moment = require("moment");
const bodyParser = require("body-parser");
const Booking = require("../models/Booking");
const DayReport = require("../models/DayReport");
const { Restaurant } = require("../models/Restaurant");
const Table = require("../models/Table");
const {
  dialogflow,
  SignIn,
  Suggestions,
  DateTime,
} = require("actions-on-google");
const app = dialogflow({ debug: true });

/** Adds Intent-name & callback key value pairs to app */

// app.intent('Default Welcome Intent', (conv) => {
//   conv.ask('Hi there! I can demonstrate helper intents, such as ' +
//     'confirmation, datetime and more. Which would you like to try?');
//   conv.ask(new Suggestions([
//     'Confirmation',
//     'DateTime',
//     'Permission',
//     'Place',
//     'Sign In',
//   ]));
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

// Creating booking
Restaurant.find().then(restaurants => {
  restaurants.forEach(res => {
    app.intent(
      `${res._id} - Reservation`,
      async (conv, { guestnumber, selectedDay, arrivalTime }) => {
        const arrivaltime = moment(arrivalTime).format("HH:mm");
        const response = await axios.post(
          "http://localhost:5555/api/bookings",
          {
            guestnumber,
            selectedDay,
            arrivaltime,
            owner: res.owner._id,
            dialogflow: true,
          }
        );
        // const options = {
        //   prompts: {
        //     initial: "When would you like to schedule the appointment?",
        //     date: "What day was that?",
        //     time: "What time works for you?",
        //   },
        // };

        if (response.data.message == "Restaurant is closed at selected time") {
          console.log("###################################", response.data);
        } else if (
          response.data.message == "No free tables. Pick another time."
        ) {
          conv.ask("No free tables. Pick another time. ");
          console.log("###################################", response.data);
        } else if (
          response.data.message == "Closed on this day. Pick another date"
        ) {
          conv.ask(response.data.message);
          console.log("###################################", response.data);
        } else {
          conv.ask(
            new Permission({
              context: "Hi there, to get to know you better",
              permissions: "NAME",
            })
          );
        }

        // .then(response => {
        // if response.data._id use that id to pass it to dialogflow and on the next intent use that id to update the booking

        // else if response.data.message ask to select other time

        // })
      }
    );
  });
});

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

//       }
//     );
//   });
// });

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
if (response.data.message == "Restaurant is closed at selected time") {
  conv.ask('Restaurant is closed at that time,please pick another time')

conv.followup(`${res._id}`, {
   guestnumber: guestnumber,
 });
} else if (
 response.data.message == "No free tables. Pick another time."
) {
 conv.ask('Restaurant is full,please pick another time?')
  conv.followup(`${res._id}`, {
   guestnumber: guestnumber,
   selectedDay: selectedDay,
 });
 console.log("###################################", response.data);
} else if (
 response.data.message == "Closed on this day. Pick another date"
) {
 conv.ask('Restaurant is closed on that day. Please pick another date?')
  conv.followup(`${res._id}`, {
   guestnumber: guestnumber,
 });
 console.log("###################################", response.data);
} else {
 conv.ask(
   new Permission({
     context: "Can i have your name please?",
     permissions: "NAME",
   })
 );
 const name = conv.user.name;
 console.log("#######################################", );
  conv.followup(`${res._id}success`)
}