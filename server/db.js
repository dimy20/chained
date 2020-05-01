const Pool = require('pg').Pool;
const pool = new Pool({
    user : 'postgres',
    password : 'D1myCs89_02',
    port : 5432,
    database : 'chained'
});
module.exports = pool;