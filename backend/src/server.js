const app = require("./app");
const pool = require("./db/database");
const { port } = require("./config/env");

const startServer = async () => {
    try {
        await pool.query("SELECT NOW()");

        console.log("PostgreSQL connected");

        app.listen(port, () => {
            console.log(`KnoVerse backend running at http://localhost:${port}`);
        });
    } catch (error) {
        console.error("PostgreSQL connection failed:", error.message);
        process.exit(1);
    }
};

startServer();