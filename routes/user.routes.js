var express = require('express');
const User = require('../models/User.model');
const isLoggedIn = require("../middleware/isLoggedIn")
var router = express.Router();

/* GET users listing. */


router.route('/profile/:id/edit', isLoggedIn,) 
.get((req, res)=> {
    const userId = req.session.currentUser
    const routeId = req.params.id
    User.findById(userId)
    .then((user)=>{
        if(userId._id === routeId){
            
            res.render("../views/user/profile-edit", user)

        } else {res.redirect("/auth/login")}
    })
})



router.route('/profile', isLoggedIn,) 
.get((req, res)=> {
    const userId = req.session.currentUser
    User.findById(userId)
    .populate("reviews")
    .populate("comments")
    .then((user)=>{
       
        res.render('../views/user/profile', user);
    })
})





module.exports = router;
