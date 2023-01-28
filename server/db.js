const Pool = require('pg').Pool

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: 'postgres',
  database: 'Personal_Budget',
});

module.exports = pool
 

