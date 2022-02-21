const Review = require("../models/Review.model");
const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const isLoggedOut = require("../middleware/isNotLoggedIn");
const isLoggedIn = require("../middleware/isLoggedIn");

router.route("/reviews")
    .get((req, res)=>{
        Review.find()
            .then((reviews)=>{
                res.render("review/review-all", {reviews})
            })
            .catch((err)=>{
                console.log(`Error: ${err}`);
    })
});

router.route("/detail")
    .get((req, res)=>{
        Review.findById()
            .then((review)=>{
                res.render("review/review-detail", {review})
            })
            .catch((err)=>{
                console.log(`Error: ${err}`);
    })
});

module.exports = router;