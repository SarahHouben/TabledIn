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







​
module.exports = router;
