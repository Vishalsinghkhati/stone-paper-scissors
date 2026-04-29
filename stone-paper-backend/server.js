const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const gameRoutes = require("./routes/gameRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// ─── PostgreSQL Pool (AWS RDS) ────────────────────────────────────────────────
const pool = new Pool({
  host: process.env.PG_HOST,         // e.g. mydb.xxxx.us-east-1.rds.amazonaws.com
  port: parseInt(process.env.PG_PORT || "5432"),
  database: process.env.PG_DATABASE, // e.g. sps_db
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  ssl: { rejectUnauthorized: false }, // Required for AWS RDS
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

// Make pool available to all route handlers via req.app.locals.db
app.locals.db = pool;

// ─── Auto-create table on startup ────────────────────────────────────────────
async function initDB() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS games (
        id       SERIAL PRIMARY KEY,
        player1  VARCHAR(100) NOT NULL,
        player2  VARCHAR(100) NOT NULL,
        score    VARCHAR(20)  NOT NULL,
        winner   VARCHAR(100) NOT NULL,
        date     TIMESTAMPTZ  DEFAULT NOW()
      );
    `);
    console.log("✅ PostgreSQL table ready");
  } finally {
    client.release();
  }
}

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/games", gameRoutes);

app.get("/", (_req, res) => res.send("SPS API Running (PostgreSQL)"));

// ─── Start ────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

initDB()
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ DB init failed:", err);
    process.exit(1);
  });
