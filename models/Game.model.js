const { Schema, model } = require('mongoose');

const gameSchema = new Schema({
	apiId: String,
	reviews: [{ type: Schema.Types.ObjectId, ref: 'Review', default: [] }],
   // rates: [[Number,author]]
});

const Game = model('Game', gameSchema);

module.exports = Game;