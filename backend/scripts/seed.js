const fs = require("fs");
const path = require("path");
const pool = require("../src/db/database");

async function seed() {
    const sql = fs.readFileSync(path.join(__dirname, "../seed/test-data.sql"), "utf8");
    await pool.query(sql);
    console.log("Demo seed applied.");
    await pool.end();
}

seed().catch(async (error) => {
    console.error(error.message);
    await pool.end();
    process.exitCode = 1;
});