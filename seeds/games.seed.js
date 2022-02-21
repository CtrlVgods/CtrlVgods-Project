require("dotenv/config")
const mongoose = require('mongoose');
require("../config/db.js");
const Game = require('../models/Game.model');

const games = require("./games.json")
//console.log("games length >>>>>>>>>>>>",games.length)

Game.deleteMany().then(()=>games.forEach((game)=> Game.create({id: game.id, title: game.title}))
)
