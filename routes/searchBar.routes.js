const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Game = require("../models/Game.model");

const isLoggedIn = require("../middleware/isLoggedIn");
const GamesApi = require("../services/gamesApi");
const gamesApiHandler = new GamesApi();
const Review = require("../models/Review.model");
const User = require("../models/User.model");


router.post("/gameName", (req, res)=>{

    const gameName = req.body.gameName
    
   // Game.findOne({title:gameName})
   Game.find({title:{$regex: gameName,$options:'i'}})
        .then((resultGameList) => {
            
          //  res.redirect(`/games/${games[0].id}/details`)
            res.render(`../views/games/gameList.hbs`,{resultGameList})
        }).catch((err)=>{res.render("/gameName", { errorMessage: "Game not in database" })})
})

    











module.exports = router;