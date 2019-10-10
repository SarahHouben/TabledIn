// ###### Milestone 1 ######
// 1. Default welcome intent -  Create default welcome intent for each
// restaurant and continue conversation with restaurants Agent
// 2. Intent - User makes reservation at restaurant
// Take date,time and number of people from user and check if there are free tables.
// 3. Permision - If there is free table ask permition to take his name and number or email from google.
// 4. Intent - Create reservation - Once its confirmed there is table user confirms as well
// 5. Intent - Cancel the reservation - user can ask to cancel reservation at any time

// ######  Milestone 2  ######
// 6. Agent/Create - Create specific Agent during Restaurant creation and asign webhook that has restaurant
// id in the end
// ## if not possible create custom webhook link which you would use to manualy create Agent
// inside dialogflow interface
// 7. Intent/Permision - Ask about directions - we have code from greenspace
// 8. Intent/Permision - Ask how much time you need to get there - we have code from greenspace

// ###### MILESTONE 3 ######
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
  Permission,
} = require("actions-on-google");
const app = dialogflow({ debug: true });

app.intent("Default Welcome Intent", conv => {
  conv.ask(`Welcome to TabledIn! Please choose a restaurant.`);
});

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

// Creating booking
Restaurant.find()
  .then(restaurants => {
    restaurants.forEach(res => {
      app.intent(
        `${res._id} - reservation`,
        async (conv, { guestnumber, selectedDay, arrivalTime }, permision) => {
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
          console.log(response.data);

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
            const parameters = {
              selectedDay: selectedDay,
              guestnumber: guestnumber,
              arrivalTime: arrivalTime,
            };
            // conv.contexts.set('values', 5, parameters);
            conv.data.parameters = parameters;
            conv.ask(
              new Permission({
                context: "",
                permissions: "NAME",
              })
            );
          }
        }
      );
      app.intent(`${res._id} - reservation - name - permission`, async (conv, params, granted) => {
        const explicit = conv.arguments.get("PERMISSION"); // also retrievable w/ explicit arguments.get
        const name = conv.user.name;
        const data = conv.data.parameters;
        const arrivaltime = moment(data.arrivalTime).format("HH:mm");
        if (granted) {
          const response = await axios.post(
            "http://localhost:5555/api/bookings",
            {
              guestnumber: data.guestnumber,
              selectedDay: data.selectedDay,
              arrivaltime,
              owner: res.owner._id,
              dialogflow: true,
              name: name.display,
            }
          );
          const parameters = {
            selectedDay: data.selectedDay,
            arrivalTime: arrivaltime,
          };
          // conv.contexts.set('values', 5, parameters);
          conv.data.parameters = parameters;
          conv.ask(
            `Thank you ${name.given}. Your reservation at ${res.name} has been made. Can I help you with something else?`
          );
        } else {
          conv.ask(
            "We cannot make reservation without your name. Can i help you with something else?"
          );
        }
      });
      app.intent(`${res._id} - reservation - end`,  (conv, params) => {
        const date = conv.data.parameters.selectedDay;
        const day = moment(date).format("dddd");
        const tomorrow = moment()
          .add(1, "days")
          .format("dddd");
        const today = moment().format("dddd");
        const time = conv.data.parameters.arrivalTime;
        if(date){
        if (day == today) {
          conv.close(`Ok then see you today at ${time}. Goodbye!`);
        } else if (day == tomorrow) {
          conv.close(`Ok then see you tomorrow at ${time}. Goodbye!`);
        } else {
          conv.close(`Ok then see you on ${day} at ${time}. Goodbye!`);
        }
      }else{
        conv.close('Thank you very much. Goodbye!')
      }
      });

<<<<<<< HEAD
      
    })
=======
      app.intent(`${res._id} - cancellation`,  (conv, params) => {
        conv.ask(
          new Permission({
            context: "Let me check that for you.",
            permissions: "NAME",
          })
        );
      });
      app.intent(`${res._id} - cancellation - name`,  (conv, params) => {
        const name = conv.user.name;
        return Booking.findOneAndDelete({
          restaurant: res._id,
          visitorname: name.display,
        })
          .then(booking => {
            console.log('###########################', booking)
            const date = booking.date;
            const day = moment(date).format("dddd");
            const tomorrow = moment()
              .add(1, "days")
              .format("dddd");
            const today = moment().format("dddd");
             if (booking) {
              if (day == today) {
                 conv.ask(
                  `Thank you ${name.given},your reservation for today has been canceled !`
                );
                conv.ask("Can i help you with something else?");
              } else if (day == tomorrow) {
                conv.ask(
                  `Thank you ${name.given},your reservation for tomorrow has been canceled !`
                );
                conv.ask("Can i help you with something else?");
              } else {
                conv.ask(
                  `Thank you ${name.given},your reservation for ${day} has been canceled !`
                );
                conv.ask("Can i help you with something else?");
              }
            } else {
              conv.ask(
                `I am sorry ${name.given},we cannot find any reservation under your name`
              );
              conv.ask("Can i help you with something else?");
              console.log("Deleted booking");
            }
          })
          .catch(err => {
            res.json(err);
          });
      });
    });
>>>>>>> cancelation
  })
  .catch(err => {
    console.log(err);
  });


router.post("/", app);

module.exports = router;
