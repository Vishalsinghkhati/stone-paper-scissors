const express = require("express");
const router = express.Router();

const Game = require("../models/Game");


// Save Game
router.post("/", async (req, res) => {
 try {

 const game = new Game(req.body);
 await game.save();

 res.json({
 success: true,
 message: "Game Saved"
 });

 } catch (error) {
 res.status(500).json(error);
 }
});


// Get All Games
router.get("/", async (req, res) => {
 try {

 const games = await Game.find().sort({ date: -1 });

 res.json(games);

 } catch (error) {
 res.status(500).json(error);
 }
});


module.exports = router;