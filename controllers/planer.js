const { getReportDB, deleteReportDB, editReportDB } = require('../db/planer');
const { validationResult } = require('express-validator');

exports.getReport = async (req, res) => {
  const { selectedDay } = req.body;
  const owner = req.user._id;

  try {
    const report = await getReportDB(selectedDay, owner);

    res.json(report);
  } catch (err) {
    console.error(err);
  }
};

exports.deleteReport = async (req, res) => {
  const { selectedDay } = req.body;
  const owner = req.user._id;
  try {
    const errors = await validationResult(req);

    if (!errors.isEmpty()) {
      return { message: errors.errors[0].msg };
    }

    await deleteReportDB(selectedDay, owner);

    console.log('Succesfully deleted'.brightGreen);
    res.json({ message: 'Succesfully deleted' });
  } catch (err) {
    console.error(err);
  }
};

exports.editReport = async (req, res) => {
  const user = req.user._id;
  const data = req.body;
  try {
    const errors = await validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({ message: errors.errors[0].msg });
    }

    await editReportDB(data, user);

    res.json({});
    console.log('Edited Report'.brightGreen);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
};
