var express = require('express');
const User = require('../models/User.model');
const isLoggedIn = require("../middleware/isLoggedIn")
var router = express.Router();

/* GET users listing. */
router.get('/profile', isLoggedIn, (req, res, next)=> {
    const userId = req.session.currentUser
    User.findById(userId)
    .populate({path: "reviews", model: "Review"})
    .populate({path: "comments", model: "Comment"})
    .then((user)=>{
        
        res.render('../views/user/profile', {user});
    })
});

module.exports = router;
