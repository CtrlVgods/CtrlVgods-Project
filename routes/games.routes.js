const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Game = require("../models/Game.model")
const isLoggedIn = require("../middleware/isLoggedIn")
const GamesApi = require("../services/gamesApi")
const gamesApiHandler = new GamesApi()
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