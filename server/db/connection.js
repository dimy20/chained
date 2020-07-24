const monk = require("monk");
const db = monk("localhost/auth-testing"); // Creates auth-testing database;
module.exports = db;
