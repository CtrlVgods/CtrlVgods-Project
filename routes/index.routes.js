const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Game = require("../models/Game.model");

const isLoggedIn = require("../middleware/isLoggedIn");
const GamesApi = require("../services/gamesApi");
const gamesApiHandler = new GamesApi();
const Review = require("../models/Review.model");
const User = require("../models/User.model");

/* GET home page. */
router.get("/", async (req, res) => {

  gamesApiHandler
  .getOneGame(466)
    .then((game) => {
     
      res.render("index", game);
        })
        
    })

/* GET from API */


module.exports = router;
