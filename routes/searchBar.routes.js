const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const GamesApi = require("../services/gamesApi")
const gamesApiHandler = new GamesApi()








module.exports = router;