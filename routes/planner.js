const express = require('express');
const router = express.Router();
const { plannerValidator } = require('../utils/validators.js');
const {
  getReport,
  deleteReport,
  editReport,
} = require('../controllers/planer');

router.route('/').post(getReport).delete(plannerValidator, deleteReport);

router.route('/edit').post(plannerValidator, editReport);

module.exports = router;
