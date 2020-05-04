const express = require('express');
const router = express.Router();
const { getReport, deleteReport,editReport } = require('../controllers/planer');



router.route('/').post(getReport).delete(deleteReport);

router.route('/edit').post(editReport);

module.exports = router;
