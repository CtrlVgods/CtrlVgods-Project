const router = require("express").Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/User.model");
const isLoggedOut = require("../middleware/isNotLoggedIn");
const isLoggedIn = require("../middleware/isLoggedIn");
const saltRounds = 5;

router.post("/signup", isLoggedOut, (req, res) => {
    const { username, password } = req.body;
  
    if (!username) {
      return res
        .status(400)
        .render("auth/signup", { errorMessage: "Please, provide a username!" });
    }
  
    if (password.length < 5) {
      return res.status(400).render("auth/signup", {
        errorMessage: "Your password needs to be at least 5 characters long.",
      });
    };

    User.findOne({ username }).then((found) => {
      if (found) {
        return res
          .status(400)
          .render("auth.signup", { errorMessage: "Username already in use! Please provide a different one!" });
      }  
      // If user NOT found, CREATE user and HASH pwd!
      return bcrypt
        .genSalt(saltRounds)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hashedPassword) => {
          // CREATE USER and save in DB  
          return User.create({
            username,
            password: hashedPassword,
          });
        })
        .then((user) => {
          // BIND USER to SESSION object
          req.session.user = user;
          res.redirect("/");
        })
        // ERROR CATCHING
        .catch((error) => {
          if (error instanceof mongoose.Error.ValidationError) {
            return res
              .status(400)
              .render("auth/signup", { errorMessage: error.message });
          }
          if (error.code === 11000) {
            return res.status(400).render("auth/signup", {
              errorMessage:
                "Username need to be unique. The username you chose is already in use.",
            });
          }
          return res
            .status(500)
            .render("auth/signup", { errorMessage: error.message });
        });
    });
});

router.post("/login", isLoggedOut, (req, res, next) => {
  const { username, password } = req.body;

  if (!username) {
    return res
      .status(400)
      .render("auth/login", { errorMessage: "Please provide your username." });
  }

  if (password.length < 5) {
    return res.status(400).render("auth/login", {
      errorMessage: "Your password needs to be at least 5 characters long.",
    });
  }
  // Search in DB the USERNAME
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return res
          .status(400)
          .render("auth/login", { errorMessage: "Wrong credentials." });
      }
      // Check if PWD matches the one in the DB
      bcrypt.compare(password, user.password).then((isSamePassword) => {
        if (!isSamePassword) {
          return res
            .status(400)
            .render("auth/login", { errorMessage: "Wrong credentials." });
        }
        req.session.user = user;
        return res.redirect("/");
      });
    })
    // ERROR HANDLING HANDLES THIS
    .catch((err) => {
      next(err);
    });
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .render("auth/logout", { errorMessage: err.message });
    }
    res.redirect("/");
  });
});

router.get("/signup", isLoggedOut, (req, res) => {
    res.render("auth/signup");
});

router.get("/login", isLoggedOut, (req, res) => {
  res.render("auth/login");
});

module.exports = router;