const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
	author: String,
	title: String,
	description: String,
    imageUrl: String,
    videoUrl: String,
	likes: [String],
	comments: [{ type: Schema.Types.ObjectId, ref: 'Comment', default: [] }]
});

const Review = model('Review', reviewSchema);

module.exports = Review;