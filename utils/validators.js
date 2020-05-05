const { check } = require('express-validator');

exports.restaurantValidator = [
  check('name')
    .isLength({ min: 3 })
    .withMessage('Your restaurant name must be 5 characters min'),
  check('address')
    .isAlphanumeric(['de-DE'])
    .withMessage('Address must contain valid characters'),
  check('phone')
    .isMobilePhone()
    .withMessage('Please provide valid mobile phone number'),
  check('email')
    .normalizeEmail()
    .isEmail()
    .withMessage('You must provide valid Email Address'),
];

exports.authSignupValidator = [
  check('username')
    .isLength({ min: 5 })
    .withMessage('Your username must be 5 characters min'),
  check('password')
    .isLength({ min: 8 })
    .withMessage('Your password must be 8 characters min'),
  check('email')
    .normalizeEmail()
    .isEmail()
    .withMessage('You must provide valid Email Address'),
];
exports.authLoginValidator = [
  check('username')
    .isLength({ min: 5 })
    .withMessage('Your username must be 5 characters min'),
  check('password')
    .isLength({ min: 8 })
    .withMessage('Your password must be 8 characters min'),
];

exports.bookingValidator = [
  check('name')
    .isLength({ min: 3 })
    .withMessage('Your restaurant name must be 5 characters min'),
  check('phone')
    .isMobilePhone()
    .withMessage('Please provide valid mobile phone number'),
  check('email')
    .normalizeEmail()
    .isEmail()
    .withMessage('You must provide valid Email Address'),
  check('selectedDay').exists().withMessage('You must select date'),
  check('selectedDay').isAfter().withMessage("you can't select date from past"),
];

exports.plannerValidator = [
  check('selectedDay').exists().withMessage('You must select date'),
  check('selectedDay').isAfter().withMessage("you can't select date from past"),
];
