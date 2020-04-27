const express = require('express');
const router = express.Router();
const timeSlots = require('../utils/timeSlots');
const DayReport = require('../models/DayReport');
const Table = require('../models/Table');
const Booking = require('../models/Booking');
const Restaurant = require('../models/Restaurant');
