const Review = require("../models/Review.model");
const User = require("../models/User.model");
const Comment = require("../models/Comment.model");

const GamesApi = require("../services/gamesApi");
const gamesApiHandler = new GamesApi();

const router = require("express").Router();
const mongoose = require("mongoose");

const isLoggedOut = require("../middleware/isNotLoggedIn");
const isLoggedIn = require("../middleware/isLoggedIn");



router.route('/:reviewId/edit', isLoggedIn,) 
.get((req, res)=> {
  const userId = req.session.currentUser
  const reviewId = req.params.reviewId
  Review.findById(reviewId)
  .populate("author")
  .populate("game")
  .then((review)=>{
    //  console.log("useID====>", userId.username, "review author ====>", review.author.username)   
    if(userId.username === review.author.username){      
          res.render("../views/reviews/review-edit", review)
          console.log(review)
      } else{ res.redirect("/auth/login")}
  })
})
.post((req,res)=>{
 
})

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
    
    res.render("../views/reviews/reviewsList", {user, isAuthor})
    
    
  })
})

router.get("/", async (req, res) => {
  var isNotAuthor = true
  const allReviews = await Review.find().populate("author").populate("game");
  res.render("reviews/reviewsList", { allReviews, isNotAuthor });
});

module.exports = router;
