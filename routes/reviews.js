const Review = require("../models/Review.model");
const Comment = require("../models/Comment.model");
const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const isLoggedOut = require("../middleware/isNotLoggedIn");
const isLoggedIn = require("../middleware/isLoggedIn");









router.get("/reviews", (req, res) => {
	res.render("reviews/reviewList")
})


module.exports = router;