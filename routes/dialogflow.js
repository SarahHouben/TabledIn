
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



'use strict';

const {dialogflow} = require('actions-on-google');
const express = require("express");
const router = express.Router()
const bodyParser = require('body-parser')

const app = dialogflow({debug: true});

app.intent('Opening times', (conv) => {
  console.log('THIS IS RESPONSE' ,conv.request)
  conv.close('Hello, World!');
  // Complete your fulfillment logic and
  // send a response when the function is done executing
});


module.exports = router;