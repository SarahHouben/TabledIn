const { createUserDB, findUserDB } = require('../db/auth');
const passport = require('passport');
const { validationResult } = require('express-validator');

// @desc Signup to application
// @route POST /api/v2/signup/
// @access Public
exports.signup = async (req, res) => {
  const data = req.body;

  try {
    const errors = await validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ message: errors.errors[0].msg });
    }

    const user = await findUserDB(data);

    if (user) {
      return res
        .status(400)
        .json({ message: 'This username is already taken' });
    }

    const newUser = await createUserDB(data);
    if (newUser) {
      req.login(newUser, (err) => {
        if (err) {
          return res
            .status(500)
            .json({ message: 'Error while attempting to login' });
        }
        return res.json(newUser);
      });
    }
  } catch (err) {
    console.error(err);
  }
};

// @desc Login to application
// @route POST /api/v2/login/
// @access Public
exports.login = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.errors[0].msg });
  }
  passport.authenticate('local', (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Error while authenticating' });
    }
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    req.login(user, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: 'Error while attempting to login' });
      }
      return res.json(user);
    });
  })(req, res);
};

// @desc Logout from application
// @route DELETE /api/v2/logout/
// @access Privete - user
exports.logout = (req, res) => {
  req.logout();
  res.json({ message: 'Succesful logout' });
};

// @desc Check if user has an active session
// @route GET /api/v2/loggedin/
// @access Privete - user
exports.loggedin = (req, res) => {
  res.json(req.user);
};
