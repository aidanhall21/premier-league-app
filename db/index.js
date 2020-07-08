//This will initialize a Postgres database pool
//require the pg package and the pool class
const { Pool } = require('pg');

//use the config variable DATABASE_URL to connect to the database
//This variable is linked to a Heroku Postgres database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
}
