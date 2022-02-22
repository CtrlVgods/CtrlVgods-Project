const Review = require("../models/Review.model");
const User = require("../models/User.model");
const Comment = require("../models/Comment.model");

const GamesApi = require("../services/gamesApi");
const gamesApiHandler = new GamesApi();

const router = require("express").Router();
const mongoose = require("mongoose");

const isLoggedOut = require("../middleware/isNotLoggedIn");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/", async (req, res) => {
  const reviews = await Review.find().populate("author").populate("game");
  res.render("reviews/reviewsList", { reviews });
});

module.exports = router;