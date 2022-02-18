const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
	username: String,
	password: String,
	email: String,
	reviews: [{ type: Schema.Types.ObjectId, ref: 'Review', default: [] }],
	comments: [{ type: Schema.Types.ObjectId, ref: 'Comment', default: [] }]
});

const User = model('User', userSchema);

module.exports = User;
