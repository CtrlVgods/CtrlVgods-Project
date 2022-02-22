const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Game = require("../models/Game.model");

const isLoggedIn = require("../middleware/isLoggedIn");
const GamesApi = require("../services/gamesApi");
const gamesApiHandler = new GamesApi();
const Review = require("../models/Review.model");
const User = require("../models/User.model");

router.get("/", (req, res)=>{
  Review.find().populate("game").populate("author").limit(3)
    .then((reviews)=>{
      console.log(reviews)
      res.render("index", reviews)
    })
})


module.exports = router;