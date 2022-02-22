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
    
    Game.findOne({title:gameName})
        .then((game) => {
            
            res.redirect(`/games/${game.id}/details`)
        })
})

    












module.exports = router;