const fs = require("fs");
const path = require("path");
const pool = require("../src/db/database");

async function migrate() {
    const client = await pool.connect();
    try {
        await client.query("BEGIN");
        const migrations = fs.readdirSync(path.join(__dirname, "../migrations"))
            .filter((file) => file.endsWith(".sql"))
            .sort();

        for (const migration of migrations) {
            process.stdout.write(`Applying ${migration}\n`);
            await client.query(fs.readFileSync(path.join(__dirname, "../migrations", migration), "utf8"));
        }

        await client.query("COMMIT");
        process.stdout.write(`Applied ${migrations.length} migrations.\n`);
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
        await pool.end();
    }
}

migrate().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
});