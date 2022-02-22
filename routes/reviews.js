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



router.route('/:id/user-list', isLoggedIn,) 
.get((req, res)=> {
    const userId = req.session.currentUser
    const routeId = req.params.id
    if(userId._id === routeId){
      var isAuthor = true
    }else { var isAuthor = false}
    User.findById(userId)
    .populate({
      path : 'reviews',
      populate : {
        path : 'game'
      }
    })  
    .then((user)=>{
        console.log(user.reviews)
                 
            res.render("../views/reviews/reviewsList", user)

      
    })
})
   
module.exports = router;
