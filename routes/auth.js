const express = require('express');
const router = express.Router();
const { signup, login, logout, loggedin } = require('../controllers/auth');
const { authLoginValidator,authSignupValidator } = require('../utils/validators');

router.route('/signup').post(authSignupValidator, signup);

router.route('/login').post(authLoginValidator, login);

router.route('/logout').delete(logout);

//check if user has an active session
router.route('/loggedin').get(loggedin);

module.exports = router;
