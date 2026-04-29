const express = require("express");
const router = express.Router();

// Save a completed game
router.post("/", async (req, res) => {
  const db = req.app.locals.db;
  const { player1, player2, score, winner } = req.body;

  try {
    await db.query(
      `INSERT INTO games (player1, player2, score, winner)
       VALUES ($1, $2, $3, $4)`,
      [player1, player2, score, winner]
    );

    res.json({ success: true, message: "Game Saved" });
  } catch (error) {
    console.error("POST /api/games error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get all games (newest first)
router.get("/", async (req, res) => {
  const db = req.app.locals.db;

  try {
    const { rows } = await db.query(
      `SELECT * FROM games ORDER BY date DESC`
    );
    res.json(rows);
  } catch (error) {
    console.error("GET /api/games error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
