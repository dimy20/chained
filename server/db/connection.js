const monk = require("monk");
const db = monk("localhost/auth-testing");
module.exports = db;
