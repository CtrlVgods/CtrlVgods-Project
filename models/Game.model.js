const { Schema, model } = require('mongoose');

const gameSchema = new Schema({
	id: String,
	title: String,
	reviews: [{ type: Schema.Types.ObjectId, ref: 'Review', default: [] }],
	thumbnail: String
   // rates: [[Number,author]]
});

const Game = model('Game', gameSchema);

module.exports = Game;