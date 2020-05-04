// ###### Milestone 1 ######
// 1. Default welcome intent -  Create default welcome intent for each
// restaurant and continue conversation with restaurants agent
// 2. Intent - User makes reservation at restaurant
// Take date, time and number of people from user and check if there are free tables.
// 3. Permission - If there is free table ask permission to take user's name and number or email from google.
// 4. Intent - Create reservation - Once its confirmed there is table user confirms as well
// 5. Intent - Cancel the reservation - user can ask to cancel reservation at any time
// ######  Milestone 2  ######
// 6. Agent/Create - Create specific Agent during Restaurant creation and assign webhook that has restaurant
// id in the end
// ## if not possible create custom webhook link which you would use to manually create Agent
// inside dialogflow interface
// ###### MILESTONE 3 ######
// 8. Integration - Google phone service
// bonus: websocket for displaying reservations as soon as they are made
// bonus: Ask about day speciality
// bonus: Try to create reservation in his calendar
// bonus: Give user directions to restaurant
// rendering page at certain amount of time
// bonus: opening times
// Try to make conversations as human as possible - its a real person substitute
'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router().use(bodyParser.json());
const axios = require('axios');
const moment = require('moment');
const Booking = require('../models/Booking');
const Restaurant = require('../models/Restaurant');
const {
  dialogflow,
  SignIn,
  Suggestions,
  DateTime,
  Permission,
} = require('actions-on-google');
// const dialogflow = require('dialogflow').v2beta1;
const app = dialogflow({ debug: false });

//When you invoke our application through google assistant, webhook is activated by the Dialogflow.
// First intent activated is always welcome intent - in our case intent which lets user choose restaurant.
// Depending on restaurant chosen, all following intents are connected to that restaurant
app.intent('Default Welcome Intent', (conv) => {
  conv.ask(`Welcome to TabledIn! Please choose a restaurant.`);
});
//All the following intents are "caught" by their name. Webhook searches our app for
//intent with exact same name as it was set in Dialogflow. Our idea was to name first intent
// by the restaurant id and all following intents would contain restaurant id in its name.
// This way we achieved that our DB can be queried dynamically and create fulfillments based
// on specific restaurant data.
Restaurant.find()
  .then((restaurants) => {
    //This is first intent for specific restaurant where we try to see what are his intentions.
    restaurants.forEach((rest) => {});
  })
  .catch((err) => {
    console.log(err);
  });
// When the reservation intent in Google Assistant is activated, dialogflow awaits for all the
// information to be extracted, in this case 1. guestnumber, 2.selectedDay, 3. arrivalTime
// We send this data through axios call and try to create reservation on our booking route.
// However we don't send the users name so actual booking will not be created.
Restaurant.find()
  .then((restaurants) => {
    restaurants.forEach((rest) => {
      app.intent(rest._id, (conv) => {
        conv.ask(`Welcome to ${rest.name}. How can I help you?`);
      });

      app.intent(
        `${rest._id} - reservation`,
        async (conv, { guestnumber, selectedDay, arrivalTime }, permision) => {
          const arrivaltime = moment(arrivalTime).format('HH:mm');
          const response = await axios.post(
            'http://localhost:5000/api/v2/bookings',
            {
              guestnumber,
              selectedDay,
              arrivaltime,
              owner: rest.owner._id,
              dialogflow: true,
            }
          );
          // Depending on situation we can get diferent responses from our booking route.
          // Each one of them has specific response to user (conv.ask()).
          if (
            response.data.message === 'Restaurant is closed at selected time'
          ) {
            conv.ask(
              `I'm afraid the restaurant is closed at that time. Can I help you with something else?`
            );
          } else if (
            response.data.message === 'No free tables. Pick another time.'
          ) {
            conv.ask(
              `I'm sorry, the restaurant is already fully booked at this time. Can I help you with something else?`
            );
          } else if (
            response.data.message === 'Closed on this day. Pick another date.'
          ) {
            conv.ask(
              `Unfortunately the restaurant is closed on that day. Can I help you with something else?`
            );
            //if did not get any of those responses it means that we got "cannot create without name"
            // warning. So now we send as parameters everything we got from user so far to the next intent
            // which is going to be activated with asking the permision for his name.
          } else {
            const parameters = {
              selectedDay: selectedDay,
              guestnumber: guestnumber,
              arrivalTime: arrivalTime,
            };
            conv.data.parameters = parameters;
            // We ask the user for permission to take his name from Google and automatically activate "permission"
            //intent
            conv.ask(
              new Permission({
                context: '',
                permissions: 'NAME',
              })
            );
          }
        }
      );
      //permission intent
      app.intent(
        `${rest._id} - reservation - name - permission`,
        async (conv, params, granted) => {
          const explicit = conv.arguments.get('PERMISSION'); // also retrievable w/ explicit arguments.get
          const name = conv.user.name;
          const data = conv.data.parameters;
          const arrivaltime = moment(data.arrivalTime).format('HH:mm');
          //we took all the data from previous intent and if the permission is granted this time we make
          //another axios call this time with name as well.
          if (granted) {
            const response = await axios.post(
              'http://localhost:5000/api/v2/bookings',
              {
                guestnumber: data.guestnumber,
                selectedDay: data.selectedDay,
                arrivaltime,
                owner: rest.owner._id,
                dialogflow: true,
                name: name.display,
              }
            );
            //Sending arrival time and date for personalized closing of conversation
            const parameters = {
              selectedDay: data.selectedDay,
              arrivalTime: arrivaltime,
            };
            conv.data.parameters = parameters;
            //After booking has been made we ask user if he needs anything else from us.
            conv.ask(
              `Thank you ${name.given}. Your reservation at ${rest.name} has been made. Can I help you with something else?`
            );
          } else {
            //If user denies giving his name
            conv.ask(
              "I'm sorry, but I cannot make a reservation without your name. Can I help you with something else?"
            );
          }
        }
      );
      // If user doesn't need anything else we activate personalized closing intent
      app.intent(`${rest._id} - reservation - end`, (conv, params) => {
        const date = conv.data.parameters.selectedDay;
        const day = moment(date).format('dddd');
        const tomorrow = moment().add(1, 'days').format('dddd');
        const today = moment().format('dddd');
        const time = conv.data.parameters.arrivalTime;
        if (date) {
          if (day == today) {
            conv.close(`Ok then, see you today at ${time}. Goodbye!`);
          } else if (day == tomorrow) {
            conv.close(`Ok then, see you tomorrow at ${time}. Goodbye!`);
          } else {
            conv.close(`Ok then, see you on ${day} at ${time}. Goodbye!`);
          }
        } else {
          conv.close('Thank you. Goodbye!');
        }
      });
      // If user asks for cancellation of the reservation this intent is activated
      // where we ask for users name
      app.intent(`${rest._id} - cancellation`, (conv, params) => {
        conv.ask(
          new Permission({
            context: 'Let me check that for you.',
            permissions: 'NAME',
          })
        );
      });
      //If reservation under users name exists we delete it and give
      //personalized response.
      app.intent(`${rest._id} - cancellation - name`, (conv, params) => {
        const name = conv.user.name;
        return Booking.findOneAndDelete({
          restaurant: rest._id,
          visitorname: name.display,
        })
          .then((booking) => {
            const date = booking.date;
            const day = moment(date).format('dddd');
            const tomorrow = moment().add(1, 'days').format('dddd');
            const today = moment().format('dddd');
            if (booking) {
              if (day == today) {
                conv.ask(
                  `Thank you ${name.given}, your reservation for today has been cancelled!`
                );
                conv.ask('Can I help you with something else?');
              } else if (day == tomorrow) {
                conv.ask(
                  `Thank you ${name.given}, your reservation for tomorrow has been cancelled!`
                );
                conv.ask('Can I help you with something else?');
              } else {
                conv.ask(
                  `Thank you ${name.given}, your reservation for ${day} has been cancelled!`
                );
                conv.ask('Can I help you with something else?');
              }
            } else {
              conv.ask(
                `I'm sorry ${name.given}, I cannot find a reservation under your name.`
              );
              conv.ask('Can I help you with something else?');
              console.log('Deleted booking');
            }
          })
          .catch((err) => {
            res.json(err);
          });
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });

router.post('/', app);

module.exports = router;
