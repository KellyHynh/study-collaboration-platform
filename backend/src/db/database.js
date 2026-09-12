const { Pool } = require("pg");
const { db } = require("../config/env");

const pool = new Pool({
    host: db.host,
    port: db.port,
    database: db.database,
    user: db.user,
    password: db.password,
    ssl: process.env.DB_SSL === "true"
        ? { rejectUnauthorized: false }
        : false,
});

module.exports = pool;