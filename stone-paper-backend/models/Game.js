const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({

player1: String,

player2: String,

score: String,

winner: String,

date: {
 type: Date,
 default: Date.now
}

});

module.exports = mongoose.model("Game", GameSchema);