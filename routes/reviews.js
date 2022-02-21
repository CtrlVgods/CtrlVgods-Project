const Review = require("../models/Review.model");
const Comment = require("../models/Comment.model");
const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const isLoggedOut = require("../middleware/isNotLoggedIn");
const isLoggedIn = require("../middleware/isLoggedIn");

router.route('/reviews/new', (req, res) => {
	res.render('review/new-review');
});

router.route("/reviews")
    .get((req, res)=>{
        Review.find()
            // .populate("user")
            .then((reviews)=>{
                res.render("review/review-all", {reviews})
            })
            .catch((err)=>{
                console.log(`Error: ${err}`);
    })
});

router.get("/reviews/:id", (req, res)=>{
    const reviewId = req.params.id;

    Review.findById()
})

/* router.post('/review/:id', (req, res) => {
	const reviewId = req.params.id;
	const { comment } = req.body;

	.create({
		user: req.session.currentUser._id,
		comment // comment: req.body.comment
	})
		.then((newReview) => {
			console.log(newReview);

			Room.findByIdAndUpdate(roomId, {
				$addToSet: { reviews: newReview._id }
			})
				.then((updatedRoom) => {
					console.log(updatedRoom);
					res.redirect(`/rooms/${roomId}`);
				})
				.catch((error) => {
					console.log(error);
				});
		})
		.catch((error) => {
			console.log(error);
		});
});

 router.route("/reviews/:id/detail")
    .get((req, res)=>{
        Review.findById()
            .then((review)=>{
                const userId = req.session.currentUser._id

                //if(isLoggedIn)
                //res.render("review/review-detail", {review})
            })
            .catch((err)=>{
                console.log(`Error: ${err}`);
    })
}); */



module.exports = router;