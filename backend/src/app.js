const express = require("express");
const cors = require("cors");
const pool = require("./db/database");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        message: "KnoVerse backend is running",
    });
});

// Start server
app.listen(PORT, async () => {
    console.log(`KnoVerse backend running at http://localhost:${PORT}`);

    try {
        const result = await pool.query("SELECT NOW()");
        console.log("PostgreSQL connected:", result.rows[0]);
    } catch (error) {
        console.error("PostgreSQL connection failed:", error.message);
    }
});