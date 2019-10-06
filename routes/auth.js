const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");

//signup route with POST
// POST /api/auth/signup
router.post("/signup", (req, res) => {
  const { username, password, email } = req.body;
  console.log("REQ.BODY:", req.body);

  if (!password || password.length < 8) {
    //statuscode 400 - send error message so the server can tell (whether or) not user has been created
    return res
      .status(400)
      .json({ message: "Your password must be 8 characters min." });
  }

  if (!username) {
    return res.status(400).json({ message: "Your username cannot be empty" });
  }

  if (!email) {
    return res.status(400).json({ message: "Your email cannot be empty" });
  }

  User.findOne({ username })
    .then(found => {
      //check if username already exists
      if (found) {
        return res
          .status(400)
          .json({ message: "This username is already taken" });
      }
      //if username not found, create new user
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(password, salt);

      //by adding the "return", the catch below,also catches the errors from the user creation
      return User.create({ username: username, password: hash }).then(
        dbUser => {
          // res.json(dbUser);

          //Login the user on signup
          req.login(dbUser, err => {
            if (err) {
              return res
                .status(500)
                .json({ message: "Error while attempting to login" });
            }
            res.json(dbUser);
          });
        }
      );
    })
    .catch(err => {
      res.json(err);
    });
});

// login route with POST
router.post("/login", (req, res) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Error while authenticating" });
    }
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    req.login(user, err => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error while attempting to login" });
      }
      return res.json(user);
    });
  })(req, res);
});

// logout route with DELETE (could  use POST, GET or DELETE here)
router.delete("/logout", (req, res) => {
  req.logout();
  res.json({ message: "Succesful logout" });
});

//check if user has an active session
//GET / api/auth/loggedin
router.get("/loggedin", (req, res) => {
  res.json(req.user);
});

//RESET PW routes
// Route 1
// creeates unique code & sends code (hash) to user

//route 2
// Leads to form. in form implement code. check if code matches. if it does, enable user to reset pw. update PW in user document.

module.exports = router;

//DEFAULT SETUP

// const express = require("express");
// const passport = require('passport');
// const router = express.Router();
// const User = require("../models/User");

// // Bcrypt to encrypt passwords
// const bcrypt = require("bcrypt");
// const bcryptSalt = 10;

// router.get("/login", (req, res, next) => {
//   res.render("auth/login", { "message": req.flash("error") });
// });

// router.post("/login", passport.authenticate("local", {
//   successRedirect: "/",
//   failureRedirect: "/auth/login",
//   failureFlash: true,
//   passReqToCallback: true
// }));

// router.get("/signup", (req, res, next) => {
//   res.render("auth/signup");
// });

// router.post("/signup", (req, res, next) => {
//   const username = req.body.username;
//   const password = req.body.password;
//   const email = req.body.email;
//   if (username === "" || password === "" || email === "") {
//     res.render("auth/signup", { message: "Indicate username, email and password" });
//     return;
//   }

//   User.findOne({ username }, "username", (err, user) => {
//     if (user !== null) {
//       res.render("auth/signup", { message: "The username already exists" });
//       return;
//     }

//     const salt = bcrypt.genSaltSync(bcryptSalt);
//     const hashPass = bcrypt.hashSync(password, salt);

//     const newUser = new User({
//       username,
//       email,
//       password: hashPass
//     });

//     newUser.save()
//     .then(() => {
//       res.redirect("/");
//     })
//     .catch(err => {
//       res.render("auth/signup", { message: "Something went wrong" });
//     })
//   });
// });

// router.get("/logout", (req, res) => {
//   req.logout();
//   res.redirect("/");
// });

// module.exports = router;
