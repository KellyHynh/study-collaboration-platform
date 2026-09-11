const pool = require("./database");

const query = (text, params = []) => {
    return pool.query(text, params);
};

module.exports = query;