const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Game = require("../models/Game.model")

const isLoggedIn = require("../middleware/isLoggedIn")
const GamesApi = require("../services/gamesApi")
const gamesApiHandler = new GamesApi()
const Review = require("../models/Review.model");
const User = require("../models/User.model");





router
  .route("/:gameId/details/create-review")
  .get(isLoggedIn,(req, res, next) => {
    const id = req.params.gameId
    gamesApiHandler
      .getOneGame(id)
      .then((game)=>{
        let gameDetail =  {gameFromDB: game}
       
        res.render("reviews/create-review", {gameDetail: game})

  })
})
  .post(isLoggedIn,(req, res, next) => {

    const apiId = req.params.gameId
    const authorId = req.session.currentUser
    const {title,description} = req.body

        Game.findOne({id: apiId})
        .then((game)=>{
          console.log()
          Review.create( {title, author: authorId, description, game: game._id})
            .then((review) => {
         
            User.findOneAndUpdate({_id: authorId},
             {$push: { reviews: review }}, {new:true})
             .then(()=>{
               Game.findOneAndUpdate({id: apiId},
                {$push: { reviews: review }}, {new:true})
                 .then(()=>{
                   res.redirect("/")
                 })

             })

    
        }).catch(err => {console.log(err)});
    })

})




router.get("/:gameId/details", (req, res)=> {
  const id = req.params.gameId
  
  gamesApiHandler
  .getOneGame(id)
  .then((game)=>{
    
    res.render("games/oneGame", {gameDetail: game})
  })
})


router.get("/", (req, res)=> {
  gamesApiHandler
  .getAllGames()
  .then((games)=>{
    let gameList=  {gameList: games}
    
    res.render("games/gameList", {gameList : games})
  })
  .catch((err)=>{console.log(err)})
})

module.exports = router;