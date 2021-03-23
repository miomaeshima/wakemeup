const Pool = require("pg").Pool;

const pool = new Pool({
    user:"postgres",
    password: "kobekobe",
    host:"localhost",
    database: "wakemeup",
    port: 5432
})

module.exports=pool;