const { Pool } = require("pg")
const pool = new Pool({
  host: "3.135.192.47",
  user: "soundtryuser",
  password: "password",
  database:"scavengerhuntdb",
  max: 20,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0,
})

module.exports = {
  getPool: ()=> pool,
  query: (text, params, callback) => pool.query(text,params, callback)
};