const express = require('express');
const router = express.Router();
const { getReport, deleteReport,editReport } = require('../controllers/planer');
const DayReport = require('../models/DayReport');
const Table = require('../models/Table');
const Booking = require('../models/Booking');

// Get date selected in calender
router.route('/').post(getReport).delete(deleteReport);;


// Crating new dayReport with tables that have timeslots coresponding
//with dayReport open/close times.
router.route('/edit').post(editReport);

module.exports = router;
