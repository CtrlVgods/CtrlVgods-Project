const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
	author: String,
    text: String
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;