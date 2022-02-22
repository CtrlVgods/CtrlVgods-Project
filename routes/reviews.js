const Review = require("../models/Review.model");
const User = require("../models/User.model");
const Comment = require("../models/Comment.model");

const GamesApi = require("../services/gamesApi");
const gamesApiHandler = new GamesApi();
const fileUploader =  require("../config/cloudinary.js")

const router = require("express").Router();
const mongoose = require("mongoose");

const isLoggedOut = require("../middleware/isNotLoggedIn");
const isLoggedIn = require("../middleware/isLoggedIn");




router.get('/:reviewId/delete', isLoggedIn,(req, res)=> {
  console.log("===============================================>>>> entro aca")      
  const userId = req.session.currentUser
  const reviewId = req.params.reviewId
  Review.findById(reviewId)
  .populate("author")
  .then((review)=>{
    //  console.log("useID====>", userId.username, "review author ====>", review.author.username)   
    if(userId.username === review.author.username){
      Review.findByIdAndRemove(reviewId).then(()=>{res.redirect(`/reviews/${userId._id}/user-list`)})
         // console.log(review)
      } else{ res.redirect("/auth/login")}
  })
})

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
         // console.log(review)
      } else{ res.redirect("/auth/login")}
  })
})
.post( fileUploader.single("imageUrl"),(req,res)=>{

  const userId = req.session.currentUser._id
  const reviewId = req.params.reviewId
  const title = req.body.title
  const description = req.body.description
  const videoUrl = req.body.videoUrl
  const imageUrl = req.file && req.file.path
 // console.log("userId:",userId,"reviewId:",reviewId,)
  // if(videoUrl == "")videoUrl = null
  //console.log("pic/////////////////////////////////////////////////////////////", imageUrl)
  Review.findByIdAndUpdate(reviewId, {title, description,imageUrl,videoUrl},{new: true})
  .then((user)=>{
    res.redirect(`/reviews/${userId}/user-list`)
  })
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
    //console.log(user.reviews)
    
    res.render("../views/reviews/reviewsList", {user, isAuthor})
    
    
  })
})

router.get("/", async (req, res) => {
  var isNotAuthor = true
  const allReviews = await Review.find().populate("author").populate("game");
  res.render("reviews/reviewsList", { allReviews, isNotAuthor });
});

module.exports = router;
