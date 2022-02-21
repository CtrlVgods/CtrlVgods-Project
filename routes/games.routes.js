const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Game = require("../models/Game.model")

const isLoggedIn = require("../middleware/isLoggedIn")
const GamesApi = require("../services/gamesApi")
const gamesApiHandler = new GamesApi()
const Review = require("../models/Review.model")





router
  .route("/:gameId/details/create-review")
  .get(isLoggedIn,(req, res, next) => {
    const id = req.params.gameId
    gamesApiHandler
      .getOneGame(id)
      .then((game)=>{
        res.render("reviews/create-review", {gameDetail: game.data})

  })
})




router.get("/:gameId/details", (req, res)=> {
  const id = req.params.gameId
  
  gamesApiHandler
  .getOneGame(id)
  .then((game)=>{
    console.log(game.data)
    res.render("games/oneGame", {gameDetail: game.data})
  })
})


router.get("/", (req, res)=> {
  gamesApiHandler
  .getAllGames()
  .then((games)=>{
    let gameList=  {gameList: games}
    console.log(games.data[0].title)
    res.render("games/gameList", {gameList : games.data})
  })
  .catch((err)=>{console.log(err)})
})

module.exports = router;